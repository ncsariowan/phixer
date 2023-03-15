import Video from '../components/Video';
import useStems from '../hooks/useStems';
import useVideo from '../hooks/useVideo';
import styles from '../styles/app.module.css';

const App = () => {
  const ctx = new AudioContext();

  const { setStreaming } = useVideo();
  const { stems } = useStems();

  let playing = false;

  return (
    <div class={ styles.app }>
      <div class={ styles.video }>
        <Video />
      </div>
      <div class={ styles.wrap }>
        <button onClick={ () => {
            setStreaming(true);
            // streaming = !streaming;
            // setStreaming(streaming);

            // playing = false;
            // buffer.stop();
          } }
        >
          Start
        </button>
        <button onClick={ () => {
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
              playing = false;
            }

          } }
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default App;
