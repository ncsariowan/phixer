export const stop = (video, setStreaming) => {
  video.srcObject?.getTracks().forEach(track => track.stop());
  setStreaming(false);
};

export const start = video =>
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(s => {
      video.srcObject = s;
      video.play();
    })
    .catch(err => console.error(`An error occurred: ${ err }`));
