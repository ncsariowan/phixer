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
  node.stop();
};

var node;
var nodeGain;
var pan;

export default (id, x = 150, y = 60, w = 63, h = 125) =>
  setTimeout(async () => {
    const audioCtx = new AudioContext();
    var node = audioCtx.createBufferSource();
    nodeGain = audioCtx.createGain();
    pan = audioCtx.createStereoPanner();
    const res = await fetch("./src/assets/Tom A Extended.wav");
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    node.buffer = audioBuffer;

    node.connect(nodeGain);
    nodeGain.connect(pan);
    pan.connect(audioCtx.destination);

    node.start();


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

        var centerX = (pts[0].x + pts[1].x + pts[2].x + pts[3].x) / 4;
        var centery = (pts[0].y + pts[1].y + pts[2].y + pts[3].y) / 4;

        var area = calcPolygonArea(pts);

        var gainValue = area / (video.width * video.height)


        var panValue = parseFloat(((centerX / video.width) * -2) + 1)

        // console.log(panValue);

        if (isFinite(panValue)) {
          pan.pan.setValueAtTime(panValue, audioCtx.currentTime);
        }

        if (isFinite(gainValue)) {
          // todo better mapping
          nodeGain.gain.setValueAtTime(2 * gainValue, audioCtx.currentTime);
        }

        setTimeout(processVideo, 1000 / FPS - (Date.now() - begin));
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(processVideo, 0);
  }, 2000);

  function calcPolygonArea(vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i].x;
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
      var subY = vertices[i].y;

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }

    return Math.abs(total);
}