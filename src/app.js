import { h } from 'inferno-hyperscript';
import { Component } from 'inferno';
import Header from './components/header';
import Footer from './components/footer';
import 'tachyons';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      actor: 'X',
      winner: '',
      mode: 'PvP',
      gridBoxes: []
    }
  }

  componentWillMount() {
    this.gridLoop()
  }

  switchActor() {
    this.setState({
      actor: this.state.actor === 'X' ? 'O' : 'X',
    })
  }

  switchMode(state) {
    this.setState({
      mode: state,
    })
  }

  // Populate the Board
  gridLoop() {
    let arr =[];
    for (let i = 1; i <= 9; i++) {
      arr.push(
        h('div', { key: i, id: i, onClick: e => {this.switchActor(); (console.log(e.target.id))}, style: {'height': 'calc(100% / 3)'}, class: 'board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center'}, [
          h('span', { class: 'b flex items-center justify-center',
          style: { 'font-family': 'Patrick Hand, cursive', 'font-size': '5em' } }, '')
        ])
      )
    } this.setState({ gridBoxes: arr });
  }

  render() {
    return h('div', { class: 'min-vh-100 flex flex-column items-center justify-between bg-near-white' }, [
      h(Header),
      h('main', {class: 'w-100 pb5 pt4 h-100 flex flex-column items-center justify-center'}, [
        h('section', {class: 'flex flex-column items-center justify-center mb4 f3 avenir dark-blue b'}, [
          h('div', {class: 'mb3'}, [
            h('button', { onClick: () => this.switchMode('PvE'), title: 'Player vs. Environment', style: {'width': '7.5rem'}, class: `${this.state.mode === 'PvE' ? 'active-button' : ''} mr2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue`}, [
              h('i', {class: 'fa-solid fa-robot h1 w1 mr3'}), ' PvE'
            ]),
            h('button', { onClick: () => this.switchMode('PvP'), title: 'Player vs. Player', style: {'width': '7.5rem'}, class: `${this.state.mode === 'PvP' ? 'active-button' : ''} ml2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue`}, [
              h('i', {class: 'fa-solid fa-user h1 w1 mr2'}), ' PvP'
            ])
          ]),
          this.state.winner !== '' ? h('div', [
            'Player ', h('span', {style: {'font-family': 'Patrick Hand, cursive'}, class: this.state.winner === 'X' ? 'b dark-red' : 'b blue'}, this.state.winner), ' wins!'
          ]) : h('div', [
            this.state.mode === 'PvP' ? 'Player vs Player' : 'Player vs Computer'
          ])
        ]),
        h('section#gameBoard', {style: {'width': '21em', 'height': '21em'}, class: 'mb3 cf'}, [
          this.state.gridBoxes
        ]),
        h('button', {class: 'avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, [
          h('i', {class: 'fa-solid fa-repeat mr2'}), 'Restart'
        ])
      ]),
      h(Footer)
    ]);
  }
}

// Easter Egg
console.log("Tiktaq'to approved."); //eslint-disable-line