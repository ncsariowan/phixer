let streaming = false;

const video = document.createElement('video');

video.height = 480;
video.width = 640;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`An error occurred: ${ err }`);
  });

video.addEventListener(
  'canplay',
  () => {
    if (!streaming) {
      streaming = true;
    }
  },
  false
);

setTimeout(() => {
  const cap = new cv.VideoCapture(video);

// take first frame of the video
  const frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  cap.read(frame);

// hardcode the initial location of window
  let trackWindow = new cv.Rect(150, 60, 63, 125);

// set up the ROI for tracking
  const roi = frame.roi(trackWindow);

  const hsvRoi = new cv.Mat();
  cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
  cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);

  const mask = new cv.Mat();
  const lowScalar = new cv.Scalar(30, 30, 0);
  const highScalar = new cv.Scalar(180, 180, 180);
  const low = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), lowScalar);
  const high = new cv.Mat(hsvRoi.rows, hsvRoi.cols, hsvRoi.type(), highScalar);
  cv.inRange(hsvRoi, low, high, mask);

  const roiHist = new cv.Mat();
  const hsvRoiVec = new cv.MatVector();
  hsvRoiVec.push_back(hsvRoi);
  cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
  cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

// delete useless mats.
  roi.delete();
  hsvRoi.delete();
  mask.delete();
  low.delete();
  high.delete();
  hsvRoiVec.delete();

// Setup the termination criteria, either 10 iteration or move by at least 1 pt
  const termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1);

  const hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
  const hsvVec = new cv.MatVector();
  hsvVec.push_back(hsv);
  const dst = new cv.Mat();
  let trackBox = null;

  const FPS = 30;
  function processVideo() {
    try {
      if (!streaming) {
        // clean and stop.
        frame.delete();
        dst.delete();
        hsvVec.delete();
        roiHist.delete();
        hsv.delete();
        return;
      }
      const begin = Date.now();

      // start processing.
      cap.read(frame);
      cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
      cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
      cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

      // apply camshift to get the new location
      [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);

      // Draw it on image
      let pts = cv.rotatedRectPoints(trackBox);
      // let pts = [
      //   {x:150,y:60},
      //   {x:150,y:60+125},
      //   {x:150+63,y:60},
      //   {x:150+63,y:60+125}
      // ]
      cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
      cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
      cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
      cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);
      cv.imshow('canvas', frame);

      // schedule the next one.
      let delay = 1000/FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    } catch (err) {
      console.error(err);
    }
  }

// schedule the first one.
  setTimeout(processVideo, 0);
}, 2000);

