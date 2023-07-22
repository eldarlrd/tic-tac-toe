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
          style: { 'font-family': 'cursive', 'font-size': '5em' } }, 'X')
        ])
      )
    }
  }

  gridLoop();

  return h('div', { class: 'min-vh-100 flex flex-column items-center justify-between bg-near-white' }, [
    h(Header),
    h('main', {class: 'w-100 pb5 pt5 h-100 flex flex-column items-center justify-center'}, [
      h('span', {class: 'mb4 f3 avenir dark-blue b'}, [
        'Player ', h('span', {class: 'dark-red'}, 'X'), ' wins!'
      ]),
      h('section#gameBoard', {style: {'width': '21em', 'height': '21em'}, class: 'cf'}, [
        gridBoxes
      ]),
      h('button', {class: 'avenir bw0 outline-0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'}, 'Restart')
    ]),
    h(Footer)
  ]);
}

// Easter Egg
console.log("Tiktaq'to approved."); //eslint-disable-line