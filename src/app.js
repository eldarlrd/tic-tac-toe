import { h } from 'inferno-hyperscript';
import Header from './components/header';
import Footer from './components/footer';
import 'tachyons';

export default function App() {
  const gridBoxes = [];

  function gridLoop() {
    for (let i = 1; i <= 9; i++) {
      gridBoxes.push(
        h('div', {key: i, id: i, style: {'height': 'calc(100% / 3)'}, class: 'board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center'}, [
          h('span', { class: 'b flex items-center justify-center dark-red',
          style: { 'font-family': 'Patrick Hand, cursive', 'font-size': '5em' } }, 'X')
        ])
      )
    }
  }

  gridLoop();

  return h('div', { class: 'min-vh-100 flex flex-column items-center justify-between bg-near-white' }, [
    h(Header),
    h('main', {class: 'w-100 pb5 pt4 h-100 flex flex-column items-center justify-center'}, [
      h('section', {class: 'flex flex-column items-center justify-center mb4 f3 avenir dark-blue b'}, [
        h('div', {class: 'mb3'}, [
          h('button', { title: 'Player vs. Player', style: {'width': '7.5rem'}, class:'mr2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, [
            h('i', {class: 'fa-solid fa-user h1 w1 mr2'}), ' PvP'
          ]),
          h('button', { title: 'Player vs. Environment', style: {'width': '7.5rem'}, class:'ml2 mb2 avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, [
            h('i', {class: 'fa-solid fa-robot h1 w1 mr3'}), ' PvE'
        ])
        ]),
        h('div', [
          'Player ', h('span', {style: {'font-family': 'Patrick Hand, cursive'}, class: 'b dark-red'}, 'X'), ' wins!'
        ])
      ]),
      h('section#gameBoard', {style: {'width': '21em', 'height': '21em'}, class: 'mb3 cf'}, [
        gridBoxes
      ]),
      h('button', {class: 'avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, [
        h('i', {class: 'fa-solid fa-repeat mr2'}), 'Restart'
      ])
    ]),
    h(Footer)
  ]);
}

// Easter Egg
console.log("Tiktaq'to approved."); //eslint-disable-line