import bass from '../assets/stems/Bass.mp3';
import drums from '../assets/stems/Drums.mp3';
import guitar from '../assets/stems/Guitar.mp3';
import joey from '../assets/stems/Joey.mp3';
import marie from '../assets/stems/Marie.mp3';

const ctx = new AudioContext();

class Stem {
  constructor(url) {
    this.loadBuffer(url);

    this.gainNode = new GainNode(ctx);
    this.panNode = new StereoPannerNode(ctx);
    this.gainNode.connect(this.panNode);
    this.panNode.connect(ctx.destination);

    this.setGain(0);
  }

  async loadBuffer(url) {
    let res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    this.buffer = await ctx.decodeAudioData(arrayBuffer);
  }

  play(time) {
    this.sourceNode = ctx.createBufferSource();
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.buffer = this.buffer;

    this.sourceNode.start(time);
  }

  stop() {
    this.sourceNode.stop();
  }

  setGain(gain) {
    this.gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  }

  setPan(pan) {
    this.panNode.pan.setValueAtTime(pan, ctx.currentTime);
  }
}

const stemPaths = [guitar, marie, joey, bass, drums];
let stems = [];

for (const s of stemPaths) {
  stems.push(new Stem(s));
}

export default () => ({ stems });
