import { createSignal } from 'solid-js';

const [points, setPoints] = createSignal([]);

export default () => [points, setPoints];
