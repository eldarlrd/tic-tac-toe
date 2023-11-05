// @flow strict
import { h } from 'inferno-hyperscript';

// prettier-ignore
export default function Footer() /*: HTMLDivElement */ {
  return h(
    'footer',
    {
      class: 'pa3 avenir flex items-center justify-center w-100 bg-dark-blue tc'
    },
    [
      h(
        'p',
        {
          class:
            'b flex flex-column items-center justify-center tc f4 near-white'
        },
        [
          '© 2023',
          h(
            'a',
            {
              class:
                'near-white grow flex items-center justify-center tc mt1 no-underline outline-0',
              title: 'Go to the Source',
              target: '_blank',
              type: 'text/html',
              rel: 'noopener noreferrer nofollow external author',
              href: 'https://github.com/eldarlrd/tic-tac-toe'
            },
            [
              h('i', {
                class: 'fa-brands fa-github mr1'
              }),
              'eldarlrd'
            ]
          )
        ]
      )
    ]
  );
}
