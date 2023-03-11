import { createSignal } from 'solid-js';

const [streaming, setStreaming] = createSignal(false);

const video = document.createElement('video');

video.autoplay = true;
video.playsInline = true;

video.height = 480;
video.width = 640;

export default () => ({ video, streaming, setStreaming });
