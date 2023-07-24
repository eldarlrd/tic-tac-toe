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
]

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      actor: '',
      winner: '',
      mode: 'PvP',
      gridBoxes: [],
      gameOver: false
    }
  }

  componentWillMount() {
    this.gridLoop()
  }

  switchActor(tile) {
    if (tile.innerText) return;
    this.setState({
      actor: this.state.actor === 'X' ? 'O' : 'X',
    })
  }

  switchMode(state) {
    if (this.state.mode === state) return;
    this.restart();
    this.setState({
      mode: state,
    })
  }

  checkConditions() {
    const tiles = document.getElementsByClassName('board');
    this.checkVictory(tiles);
    this.checkDraw(tiles);
  }

  checkVictory(tiles) {
    const gameOverEffect = new Audio(gameOverAudio);
    const victoryState = victoryConditions.some(condition => {
      return condition.every(i => {
        return tiles[i - 1].innerText === this.state.actor;
      })
    });

    if (victoryState) {
      gameOverEffect.play();
      this.setState({
        winner: this.state.actor,
        gameOver: true
      });
    }
  }

  checkDraw(tiles) {
    const gameOverEffect = new Audio(gameOverAudio);
    const drawState = [...tiles].every(tile => {
      return tile.innerText.includes('X') || tile.innerText.includes('O')
    });

    if (drawState) {
      gameOverEffect.play();
      this.setState({
        winner: this.state.winner === '' ? 'None' : this.state.winner,
        gameOver: true
      })
    }
  }

  addActor(tile) {
    const scribbleEffect = new Audio(scribbleAudio);
    if (this.state.gameOver) this.restart();
    else if (tile.innerText) return;
    else {
      scribbleEffect.play();
      this.switchActor(tile);
      tile.innerText = this.state.actor;
      tile.classList.add(tile.innerText === 'X' ? 'dark-red' : 'blue')
      this.checkConditions();
    }
  }

  restart() {
    const restartEffect = new Audio(restartAudio);
    restartEffect.play();
    this.setState({
      actor: '',
      winner: '',
      gridBoxes: [],
      gameOver: false
    }); this.gridLoop()
  }

  // Populate the Board
  gridLoop() {
    let arr =[];
    for (let i = 1; i <= 9; i++) {
      arr.push(
        h('div', { key: i, id: i, onClick: e => this.addActor(e.target),
        style: {'height': 'calc(100% / 3)', 'font-family': 'Patrick Hand, cursive', 'font-size': '5em'},
        class: 'b board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center'},
        '')
      )
    } this.setState({ gridBoxes: arr });
  }

  render() {
    return h('div', { class: 'min-vh-100 flex flex-column items-center justify-between bg-near-white' }, [
      h(Header),
      h('main', {class: 'w-100 pb5 pt4 h-100 flex flex-column items-center justify-center'}, [
        h('section', {class: 'flex flex-column items-center justify-center mb4 f3 avenir dark-blue b'}, [
          h('div', {class: 'mb3'}, [
            h('button', { onClick: () => this.switchMode('PvE'), title: 'Player vs. Environment',
            style: {'width': '7.5rem'},
            class: `${this.state.mode === 'PvE' ? 'active-button' : ''} mr2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue`}, [
              h('i', {class: 'fa-solid fa-robot h1 w1 mr3'}), ' PvE'
            ]),
            h('button', { onClick: () => this.switchMode('PvP'), title: 'Player vs. Player',
            style: {'width': '7.5rem'},
            class: `${this.state.mode === 'PvP' ? 'active-button' : ''} ml2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue`}, [
              h('i', {class: 'fa-solid fa-user h1 w1 mr2'}), ' PvP'
            ])
          ]),
          this.state.winner === '' ? h('div', {style: {'height': '28px'}}, [
            this.state.mode === 'PvP' ? 'Player vs Player' : 'Player vs Computer'
          ]) : this.state.winner === 'None' ? h('div', {style: {'height': '28px'}}, "It's a draw!")
          : h('div', [
            'Player ', h('span', {style: {'font-family': 'Patrick Hand, cursive', 'height': '28px'},
            class: this.state.winner === 'X' ? 'b dark-red' : 'b blue'}, this.state.winner), ' wins!'
          ])
        ]),
        h('section#gameBoard', {style: {'width': '21em', 'height': '21em'}, class: 'mb3 cf'}, [
          this.state.gridBoxes
        ]),
        h('button', {onClick: () => this.restart(), class: 'avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, [
          h('i', {class: 'fa-solid fa-repeat mr2'}), 'Restart'
        ])
      ]),
      h(Footer)
    ]);
  }
}

// Easter Egg
console.log("Tiktaq'to approved."); //eslint-disable-line