let streaming = false;

const video = document.createElement('video');

video.autoplay = true;
video.playsInline = true;

video.height = 480;
video.width = 640;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(s => {
    video.srcObject = s;
    video.play();
  })
  .catch(err => console.error(`An error occurred: ${ err }`));

video.addEventListener('canplay', () => {
  if (!streaming) {
    streaming = true;
  }
}, false);

export const stop = () => {
  video.srcObject.getTracks().forEach(track => track.stop());
  streaming = false;
};

export default (id, x = 150, y = 60, w = 63, h = 125) =>
  setTimeout(() => {
    const cap = new cv.VideoCapture(video);

    const frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    cap.read(frame);

    let trackWindow = new cv.Rect(x, y, w, h);

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

    roi.delete();
    hsvRoi.delete();
    mask.delete();
    low.delete();
    high.delete();
    hsvRoiVec.delete();

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
          frame.delete();
          dst.delete();
          hsvVec.delete();
          roiHist.delete();
          hsv.delete();
          return;
        }
        const begin = Date.now();

        cap.read(frame);
        cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
        cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
        cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

        [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);

        const pts = cv.rotatedRectPoints(trackBox);

        cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
        cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
        cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
        cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);
        cv.imshow(id, frame);

        setTimeout(processVideo, 1000 / FPS - (Date.now() - begin));
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(processVideo, 0);
  }, 2000);
