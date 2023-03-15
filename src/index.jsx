/* @refresh reload */
import { hashIntegration, Route, Router, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import Home from './Home';
import canvasFix from '../src/util/canvasFix';

import './styles/index.css';
import Mapping from './views/Mapping';

canvasFix();

const App = lazy(() => import('./views/App'));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

render(() => (
  <Router source={ hashIntegration() }>
    <Routes>
      <Route path="/" component={ Home } />
      <Route path="/app" component={ App } />
      <Route path="/mapping" component={ Mapping } />
    </Routes>
  </Router>
), root);
