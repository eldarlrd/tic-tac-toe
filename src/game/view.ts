import { createElement as h, type FC } from 'react';

import Footer from '@/components/footer.ts';
import Header from '@/components/header.ts';
import { type View } from '@/site/types.ts';

const View: FC<View> = ({
  mode,
  winner,
  actor,
  gridBoxes,
  onSwitchMode,
  onRestart
}) => {
  return h(
    'div',
    {
      className:
        'min-vh-100 flex flex-column items-center justify-between bg-near-white'
    },
    h(Header),

    h(
      'main',
      {
        className:
          'w-100 pb5 pt4 h-100 flex flex-column items-center justify-center'
      },
      h(
        'section',
        {
          className:
            'flex flex-column items-center justify-center mt4 mb4 f3 avenir dark-blue b'
        },
        h(
          'div',
          { className: 'mb3' },
          h(
            'button',
            {
              onClick: async () => {
                await onSwitchMode('PvE');
              },
              title: 'Player vs. Environment',
              style: { width: '7.5rem' },
              className: `${
                mode === 'PvE' ? 'active-button' : ''
              } mr2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
            },
            h('i', { className: 'fa-solid fa-robot h1 w1 mr3' }),
            ' PvE'
          ),
          h(
            'button',
            {
              onClick: async () => {
                await onSwitchMode('PvP');
              },
              title: 'Player vs. Player',
              style: { width: '7.5rem' },
              className: `${
                mode === 'PvP' ? 'active-button' : ''
              } ml2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
            },
            h('i', { className: 'fa-solid fa-user h1 w1 mr2' }),
            ' PvP'
          )
        ),

        winner === '' ?
          h(
            'div',
            { style: { height: '28px', lineHeight: '28px' } },
            h(
              'span',
              null,
              'Player ',
              h(
                'span',
                {
                  style: {
                    fontFamily: 'Patrick Hand, cursive'
                  },
                  className: actor === 'X' ? 'b blue' : 'b dark-red'
                },
                actor === 'X' ? 'O' : 'X'
              ),
              ' to move'
            )
          )
        : winner === 'None' ?
          h(
            'div',
            { style: { height: '28px', lineHeight: '28px' } },
            "It's a draw!"
          )
        : h(
            'div',
            null,
            mode === 'PvE' && winner === 'O' ? 'Computer ' : 'Player ',
            h(
              'span',
              {
                style: {
                  fontFamily: 'Patrick Hand, cursive',
                  height: '28px'
                },
                className: winner === 'X' ? 'b dark-red' : 'b blue'
              },
              winner
            ),
            ' wins!'
          ),

        h(
          'section',
          {
            id: 'gameBoard',
            style: { width: '21rem', height: '21rem' },
            className: 'mt4 mb3 cf'
          },
          gridBoxes
        ),
        h(
          'button',
          {
            onClick: async () => {
              await onRestart();
            },
            className:
              'avenir bw0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'
          },
          h('i', { className: 'fa-solid fa-repeat mr2' }),
          'Restart'
        )
      )
    ),
    h(Footer)
  );
};

export default View;
