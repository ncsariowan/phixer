const ctx = new AudioContext();

class Stem {
    constructor(url) {
        this.loadBuffer(url);

        this.gainNode = new GainNode(ctx);
        this.panNode = new StereoPannerNode(ctx);
        this.gainNode.connect(this.panNode);
        this.panNode.connect(ctx.destination);
    }

    async loadBuffer(url) {
        var res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        this.buffer = await ctx.decodeAudioData(arrayBuffer);
    }

    play(time) {
        const sourceNode = ctx.createBufferSource();
        sourceNode.connect(this.gainNode);
        console.log(this.buffer);
        sourceNode.buffer = this.buffer;

        sourceNode.start(time);
    }
}

const stemPaths = ["Guitar.wav", "Marie.wav", "Joey.wav", "Bass.wav", "Drums.wav"]
var stems = [];

for (var s of stemPaths) {
    stems.push(new Stem("src/assets/stems/" + s));
}

export default () => ({ stems });
