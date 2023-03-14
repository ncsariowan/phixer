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
        var res = await fetch(url);
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

const stemPaths = ["Guitar.wav", "Marie.wav", "Joey.wav", "Bass.wav", "Drums.wav"]
var stems = [];

for (var s of stemPaths) {
    stems.push(new Stem("src/assets/stems/" + s));
}

export default () => ({ stems });
