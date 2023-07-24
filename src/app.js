import { h } from 'inferno-hyperscript';
import { Component } from 'inferno';
import Header from './components/header';
import Footer from './components/footer';
import scribbleAudio from './assets/scribble.ogg';
import gameOverAudio from './assets/game-over.ogg';
import restartAudio from './assets/paper-flip.ogg';
import 'tachyons';

const victoryConditions = [
  // Horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // Diagonal
  [1, 5, 9],
  [3, 5, 7]
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      actor: '',
      winner: '',
      gridBoxes: [],
      gameOver: false
    };
  }
  // Call to Populate
  componentWillMount() {
    this.gridLoop();
  }
  // Game Over Conditions
  checkConditions() {
    const tiles = document.getElementsByClassName('board');
    this.checkVictory(tiles);
    this.checkDraw(tiles);
  }

  checkVictory(tiles) {
    const victoryState = victoryConditions.filter(condition => {
      return condition.every(i => {
        return tiles[i - 1].innerText === this.state.actor;
      });
    });

    if (victoryState.length === 1) {
      new Audio(gameOverAudio).play();
      for (let i of victoryState[0]) {
        tiles[i - 1].classList.add('bg-light-green');
      }

      this.setState({
        winner: this.state.actor,
        gameOver: true
      });
    }
  }

  checkDraw(tiles) {
    const drawState = [...tiles].every(tile => {
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
  // Restart
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
  addActor(tile) {
    if (this.state.gameOver) this.restart();
    else if (tile.innerText) return;
    else {
      new Audio(scribbleAudio).play();
      this.switchActor(tile);
      tile.innerText = this.state.actor;
      tile.classList.add(tile.innerText === 'X' ? 'dark-red' : 'blue');
      this.checkConditions();
    }
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

  render() {
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
                this.state.winner === ''
                  ? h('div', { style: { height: '28px' } }, [
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
                  ? h('div', { style: { height: '28px' } }, "It's a draw!")
                  : h('div', [
                      'Player ',
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
                  'avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'
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
