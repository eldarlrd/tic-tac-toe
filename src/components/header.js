import { h } from 'inferno-hyperscript';

export default function Header() {
  return h(
    'header',
    {
      class:
        'pa2 f4 bg-dark-blue near-white w-100 flex tc justify-center items-center'
    },
    [h('h1', { class: 'avenir' }, 'Tic Tac Toe')]
  );
}
