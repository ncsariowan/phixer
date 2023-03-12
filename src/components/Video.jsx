import { createEffect, onCleanup, onMount } from 'solid-js';
import usePoints from '../hooks/usePoints';
import useVideo from '../hooks/useVideo';
import { track } from '../util/track';
import { start, stop } from '../util/video';

const Video = () => {
  let ref;
  let interactive;

  const [points, setPoints] = usePoints();

  const { video, streaming, setStreaming } = useVideo();

  video.style.transform = 'rotateY(180deg)';
  video.style.position = 'absolute';
  video.style['z-index'] = '-10';

  onMount(() => start(video));

  createEffect(() => {
    if (streaming()) {
      track(ref, video, streaming, points);
      interactive.getContext('2d').clearRect(0, 0, interactive.width, interactive.height);
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

export default Video;
