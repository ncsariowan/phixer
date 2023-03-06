import styles from './styles/home.module.css';
import { Link } from '@solidjs/router';

const Home = () => (
  <div class={styles.home}>
    <h1 class={styles.title}>Welcome to our app</h1>
    <p class={styles.subtitle}>Click below to get started</p>
    <Link href="/app">
      <button class={styles.button}>Start App</button>
    </Link>
  </div>
);

export default Home;
