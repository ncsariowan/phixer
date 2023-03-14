import Video from '../components/Video';
import useSampleAudio from '../hooks/useSampleAudio';
import useVideo from '../hooks/useVideo';
import styles from '../styles/app.module.css';
import { start } from '../util/video';

const App = () => {
  const ctx = new AudioContext();

  const { setStreaming } = useVideo();
  const { stems } = useSampleAudio();

  var streaming = false;
  var playing = false;

  return (
    <div class={styles.app}>
      <Video />
      <button onClick={() => {
        setStreaming(true);
        // streaming = !streaming;
        // setStreaming(streaming);

        // playing = false;
        // buffer.stop();
      }
      }>Start</button>
      <button onClick={() => {

        if (!playing) {
          const startTime = ctx.currentTime + 0.5;
          for (const s of stems) {
            s.play(startTime);
          }
          playing = true;
        } else {
          for (const s of stems) {
            s.stop();
          }
          playing = false
        }

      }}>Play</button>
    </div>
  );
};

export default App;
