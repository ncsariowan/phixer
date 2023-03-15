import { createSignal } from 'solid-js';

const [streaming, setStreaming] = createSignal(false);

const video = document.createElement('video');

video.autoplay = true;
video.playsInline = true;

const width = document.body.getBoundingClientRect().width / 2;
const height = 0.75 * width;

video.height = height;
video.width = width;

export default () => ({ video, streaming, setStreaming, height, width });
