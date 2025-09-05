import { createElement as h, type ReactElement } from 'react';

export default function Header(): ReactElement {
  return h(
    'header',
    {
      className:
        'pa2 f4 bg-dark-blue near-white w-100 flex tc justify-center items-center'
    },
    h('h1', { className: 'avenir' }, 'Tic Tac Toe')
  );
}
