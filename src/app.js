import 'tachyons';
import { h } from 'inferno-hyperscript';

export const App = () => {
  return h('h1', { class: 'bg-green white' }, 'Hello World!');
};
