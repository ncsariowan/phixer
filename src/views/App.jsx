import Video from '../components/Video';
import useSampleAudio from '../hooks/useSampleAudio';
import useVideo from '../hooks/useVideo';
import styles from '../styles/app.module.css';

const App = () => {
  const { setStreaming } = useVideo();
  const { buffer, gain, pan } = useSampleAudio();

  return (
    <div class={ styles.app }>
      <Video />
      <button onClick={ () => setStreaming(true) }>Start</button>
      <button onClick={ () => buffer.start() }>Play</button>
    </div>
  );
};

export default App;
