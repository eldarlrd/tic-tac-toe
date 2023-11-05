// @flow strict
import { Component } from 'inferno';
import { h } from 'inferno-hyperscript';

import Header from './components/header';
import Footer from './components/footer';

// $FlowExpectedError[cannot-resolve-module]
import scribbleAudio from './assets/scribble.ogg';
// $FlowExpectedError[cannot-resolve-module]
import gameOverAudio from './assets/game-over.ogg';
// $FlowExpectedError[cannot-resolve-module]
import restartAudio from './assets/paper-flip.ogg';

import 'tachyons';

// prettier-ignore
const victoryConditions /*: number[][] */ = [
  // Horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // Vertical
  [1,
   4,
   7      ],
  [   2,
      5,
      8   ],
  [      3,
         6,
         9],
  // Diagonal
  [1,
      5,
         9],
  [      3,
      5,
   7      ]
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      actor: '',
      winner: '',
      mode: 'PvE',
      gridBoxes: [],
      gameOver: false,
      tiles: document.getElementsByClassName('board')
    };
  }

  componentWillMount() {
    this.gridLoop();
  }

  checkConditions() {
    this.checkVictory(this.state.tiles);
    this.checkDraw(this.state.tiles);
  }

  checkVictory(tiles /*: HTMLCollection<HTMLElement> */) {
    const victoryState = victoryConditions.filter(condition => {
      return condition.every(i => {
        return tiles[i - 1].innerText === this.state.actor;
      });
    });

    if (victoryState.length > 0) {
      new Audio(gameOverAudio).play();
      victoryState.forEach(state => {
        for (let i of state) {
          tiles[i - 1].classList.add('bg-light-green');
        }
      });

      this.setState({
        winner: this.state.actor,
        gameOver: true
      });
    }
  }

  // prettier-ignore
  checkDraw(tiles /*: HTMLCollection<HTMLElement> */) {
    const drawState = [...tiles].every(tile => {
      // $FlowIssue[incompatible-use]
      return tile.innerText.includes('X') || tile.innerText.includes('O');
    });

    if (drawState) {
      new Audio(gameOverAudio).play();
      this.setState({
        winner: this.state.winner === '' ? 'None' : this.state.winner,
        gameOver: true
      });
    }
  }

  // prettier-ignore
  switchMode(mode /*: string */) {
    if (mode === this.state.mode) return;
    this.restart();
    this.setState({
      mode
    });
  }

  restart() {
    new Audio(restartAudio).play();
    this.setState({
      actor: '',
      winner: '',
      gridBoxes: [],
      gameOver: false
    });
    this.gridLoop();
  }

  // Placing Marks
  // prettier-ignore
  addActor(tile /*: HTMLDivElement */) {
    if (this.state.gameOver) this.restart();
    else if (tile.innerText !== '') return;
    else if (this.state.mode === 'PvP') {
      new Audio(scribbleAudio).play();
      this.switchActor();
      tile.innerText = this.state.actor;
      tile.classList.add(tile.innerText === 'X' ? 'dark-red' : 'blue');
      this.checkConditions();
    } else {
      new Audio(scribbleAudio).play();
      this.switchActor();
      tile.innerText = 'X';
      tile.classList.add('dark-red');
      this.checkConditions();
      if (this.state.winner === '') this.computerMove();
    }
  }

  computerMove() {
    this.switchActor();
    const emptyTiles = [...this.state.tiles].filter(
      emptyTile => emptyTile.innerText === ''
    );
    emptyTiles[0].innerText = 'O';
    emptyTiles[0].classList.add('blue');
    this.checkConditions();
  }

  switchActor() {
    this.setState({
      actor: this.state.actor === 'X' ? 'O' : 'X'
    });
  }

  // Populate the Board
  gridLoop() {
    const arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push(
        h(
          'div',
          {
            key: i,
            id: i,
            onClick: e => this.addActor(e.target),
            style: {
              height: 'calc(100% / 3)',
              'font-family': 'Patrick Hand, cursive',
              'font-size': '5em'
            },
            class:
              'b board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center'
          },
          ''
        )
      );
    }
    this.setState({ gridBoxes: arr });
  }

  // prettier-ignore
  render() /*: HTMLDivElement */ {
    return h(
      'div',
      {
        class:
          'min-vh-100 flex flex-column items-center justify-between bg-near-white'
      },
      [
        h(Header),

        h(
          'main',
          {
            class:
              'w-100 pb5 pt4 h-100 flex flex-column items-center justify-center'
          },
          [
            h(
              'section',
              {
                class:
                  'flex flex-column items-center justify-center mt4 mb4 f3 avenir dark-blue b'
              },
              [
                h('div', { class: 'mb3' }, [
                  h(
                    'button',
                    {
                      onClick: () => this.switchMode('PvE'),
                      title: 'Player vs. Environment',
                      style: { width: '7.5rem' },
                      class: `${
                        this.state.mode === 'PvE' ? 'active-button' : ''
                      } mr2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
                    },
                    [h('i', { class: 'fa-solid fa-robot h1 w1 mr3' }), ' PvE']
                  ),
                  h(
                    'button',
                    {
                      onClick: () => this.switchMode('PvP'),
                      title: 'Player vs. Player',
                      style: { width: '7.5rem' },
                      class: `${
                        this.state.mode === 'PvP' ? 'active-button' : ''
                      } ml2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
                    },
                    [h('i', { class: 'fa-solid fa-user h1 w1 mr2' }), ' PvP']
                  )
                ]),

                this.state.winner === ''
                  ? h('div', { style: { height: '28px', 'line-height': '28px' } }, [
                      h('span', [
                        'Player ',
                        h(
                          'span',
                          {
                            style: {
                              'font-family': 'Patrick Hand, cursive'
                            },
                            class:
                              this.state.actor === 'X' ? 'b blue' : 'b dark-red'
                          },
                          this.state.actor === 'X' ? 'O' : 'X'
                        ),
                        ' to move'
                      ])
                    ])

                  : this.state.winner === 'None'
                  ? h('div', { style: { height: '28px', 'line-height': '28px' } }, "It's a draw!")
                  : h('div', [
                      this.state.mode === 'PvE' && this.state.winner === 'O'
                        ? 'Computer ' : 'Player ',
                      h(
                        'span',
                        {
                          style: {
                            'font-family': 'Patrick Hand, cursive',
                            height: '28px'
                          },
                          class:
                            this.state.winner === 'X' ? 'b dark-red' : 'b blue'
                        },
                        this.state.winner
                      ),
                      ' wins!'
                    ])
              ]
            ),

            h(
              'section#gameBoard',
              { style: { width: '21em', height: '21em' }, class: 'mt2 mb3 cf' },
              [this.state.gridBoxes]
            ),
            h(
              'button',
              {
                onClick: () => this.restart(),
                class:
                  'avenir bw0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'
              },
              [h('i', { class: 'fa-solid fa-repeat mr2' }), 'Restart']
            )
          ]
        ),
        h(Footer)
      ]
    );
  }
}

// Easter Egg
console.log("Tiktaq'to approved."); //eslint-disable-line
