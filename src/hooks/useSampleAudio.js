const ctx = new AudioContext();

const buffer = new AudioBufferSourceNode(ctx);
const gain = new GainNode(ctx);
const pan = new StereoPannerNode(ctx);

const res = await fetch('src/assets/sample.mp3');
const arrayBuffer = await res.arrayBuffer();
buffer.buffer = await ctx.decodeAudioData(arrayBuffer);

buffer.connect(gain);
gain.connect(pan);
pan.connect(ctx.destination);

export default () => ({ buffer, gain, pan });
