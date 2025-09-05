import { createElement as h, type ReactElement } from 'react';

export default function Footer(): ReactElement {
  return h(
    'footer',
    {
      className:
        'pa3 avenir flex items-center justify-center w-100 bg-dark-blue tc'
    },
    h(
      'p',
      {
        className:
          'b flex flex-column items-center justify-center tc f4 near-white'
      },
      '© 2023 - 2025',
      h(
        'a',
        {
          className:
            'near-white grow flex items-center justify-center tc mt2 no-underline',
          title: 'Source',
          target: '_blank',
          type: 'text/html',
          rel: 'noreferrer external author',
          href: 'https://github.com/eldarlrd/tic-tac-toe'
        },
        h('i', {
          className: 'fa-brands fa-github mr1'
        }),
        'eldarlrd'
      )
    )
  );
}
