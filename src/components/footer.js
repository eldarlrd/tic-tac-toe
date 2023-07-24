import { h } from 'inferno-hyperscript';
const githubURL = 'https://github.com/eldarlrd';

export default function Footer() {
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
          'by',
          h(
            'a',
            {
              class:
                'near-white grow flex items-center justify-center tc mt1 no-underline outline-0',
              title: 'Go to GitHub',
              target: '_blank',
              rel: 'noreferrer',
              href: githubURL
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