import { onCleanup, onMount } from 'solid-js';
import video, { stop } from '../util/video';

const Video = () => {
  let ref;

  onMount(() => {
    video(ref)
  });

  onCleanup(() => stop());

  return (
    <canvas ref={ ref } />
  );
};

export default Video;
