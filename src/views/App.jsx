import Video from '../components/Video';
import useVideo from '../hooks/useVideo';
import styles from '../styles/app.module.css';

const App = () => {
  const { setStreaming } = useVideo();

  return (
    <div class={ styles.app }>
      <Video />
      <button onClick={ () => setStreaming(true) }>Start</button>
    </div>
  );
};

export default App;
