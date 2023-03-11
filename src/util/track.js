// x = 150, y = 60, w = 63, h = 125

export const track = (id, video, streaming, points) => {
  const cap = new cv.VideoCapture(video);

  const frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  cap.read(frame);

  const windows = points.map(({ x, y, w, h }) => {
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

    return { roiHist, trackWindow };
  });

  const termCrit = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 100, 1);

  const hsv = new cv.Mat(video.height, video.width, cv.CV_8UC3);
  const hsvVec = new cv.MatVector();
  hsvVec.push_back(hsv);
  const dst = new cv.Mat();

  const FPS = 30;

  const process = () => {
    try {
      if (!streaming()) {
        frame.delete();
        dst.delete();
        hsvVec.delete();
        windows.forEach(({ roiHist }) => roiHist.delete());
        hsv.delete();
        return;
      }
      const begin = Date.now();

      cap.read(frame);
      cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
      cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

      windows.forEach(({ trackWindow, roiHist }, i) => {
        cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

        const [trackBox, tw] = cv.CamShift(dst, trackWindow, termCrit);
        windows[i].trackWindow = tw;

        const pts = cv.rotatedRectPoints(trackBox);
        // const pts = [
        //   { x: points[i].x, y: points[i].y },
        //   { x: points[i].x + points[i].w, y: points[i].y },
        //   { x: points[i].x + points[i].w, y: points[i].y + points[i].h },
        //   { x: points[i].x, y: points[i].y + points[i].h }
        // ];

        cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
        cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
        cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
        cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);
      });

      cv.imshow(id, frame);

      setTimeout(process, 1000 / FPS - (Date.now() - begin));
    } catch (err) {
      console.error(err);
    }
  }

  setTimeout(process, 0);
}
