import { createEffect, onCleanup, onMount } from 'solid-js';
import usePoints from '../hooks/usePoints';
import useStems from '../hooks/useStems';
import useVideo from '../hooks/useVideo';
import { track } from '../util/track';
import { start, stop } from '../util/video';

const Video = () => {
  let ref;
  let interactive;

  const [points, setPoints] = usePoints();

  const { video, streaming, setStreaming } = useVideo();
  const { stems } = useStems();

  video.style.transform = 'rotateY(180deg)';
  video.style.position = 'absolute';
  video.style['z-index'] = '-10';

  onMount(() => start(video));

  let callback = (i, points) => {
    if (i < stems.length) {

      let stem = stems[i];

      var centerX = (points[0].x + points[1].x + points[2].x + points[3].x) / 4;
      var centery = (points[0].y + points[1].y + points[2].y + points[3].y) / 4;

      var area = calcPolygonArea(points);

      var gainValue = area / (video.width * video.height)


      var panValue = parseFloat(((centerX / video.width) * -2) + 1)


      if (isFinite(panValue)) {
        stem.setPan((panValue));
      }

      if (isFinite(gainValue)) {
        // todo better mapping
        stem.setGain((2 * gainValue));
      }


    }
  };

  createEffect(() => {
    if (streaming()) {
      track(ref, video, streaming, points, callback);
      interactive.getContext('2d').clearRect(0, 0, interactive.width, interactive.height);
      interactive.style.display = 'none';
    }
  });

  onCleanup(() => stop(video, setStreaming));

  const handleClick = e => {
    const { left, top, width } = interactive.getBoundingClientRect();
    const x = width - (e.clientX - left);
    const y = e.clientY - top;

    const ctx = interactive.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;

    const length = 69;
    setPoints([...points(), { x: x - length / 2, y: y - length / 2, w: length, h: length * 2 }]);
    ctx.strokeRect(x - length / 2, y - length / 2, length, length * 2);
  };

  return (
    <div style={ { position: 'relative', height: '480px', width: '640px' } }>
      { video }
      <canvas ref={ ref } style={ { position: 'absolute' } } />
      <canvas ref={ interactive } style={ { position: 'absolute', 'z-index': 10 } } onClick={ handleClick } width="640" height="480" />
    </div>
  );
};


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


export default Video;
