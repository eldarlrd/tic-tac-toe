import {
  Component,
  createElement as h,
  type ReactElement,
  type MouseEvent
} from 'react';

import gameOverAudio from '#/sfx/gameOver.opus';
import restartAudio from '#/sfx/paperFlip.opus';
import scribbleAudio from '#/sfx/scribble.opus';
import Footer from '@/components/footer.ts';
import Header from '@/components/header.ts';

// @ts-expect-error: missing type declaration
import 'tachyons';
import '@fontsource/patrick-hand/index.css';

const victoryConditions: number[][] = [
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

type AppMode = 'PvE' | 'PvP';
type Actor = 'X' | 'O' | '';
type Winner = 'X' | 'O' | 'None' | '';

type AppProps = object;
interface AppState {
  actor: Actor;
  winner: Winner;
  mode: AppMode;
  gridBoxes: ReactElement[];
  gameOver: boolean;
  tiles: HTMLCollectionOf<HTMLDivElement>;
}

export default class App extends Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      actor: '',
      winner: '',
      mode: 'PvE',
      gridBoxes: [],
      gameOver: false,
      tiles: document.getElementsByClassName(
        'board'
      ) as HTMLCollectionOf<HTMLDivElement>
    };
  }

  public override componentDidMount(): void {
    this.gridLoop();
  }

  public override render(): ReactElement {
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
                  await this.switchMode('PvE');
                },
                title: 'Player vs. Environment',
                style: { width: '7.5rem' },
                className: `${
                  this.state.mode === 'PvE' ? 'active-button' : ''
                } mr2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
              },
              h('i', { className: 'fa-solid fa-robot h1 w1 mr3' }),
              ' PvE'
            ),
            h(
              'button',
              {
                onClick: async () => {
                  await this.switchMode('PvP');
                },
                title: 'Player vs. Player',
                style: { width: '7.5rem' },
                className: `${
                  this.state.mode === 'PvP' ? 'active-button' : ''
                } ml2 mb2 avenir bw0 bg-animate pointer bg-transparent dark-blue b f3 br-pill pa2 ba bw1 b--dark-blue`
              },
              h('i', { className: 'fa-solid fa-user h1 w1 mr2' }),
              ' PvP'
            )
          ),

          this.state.winner === '' ?
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
                    className:
                      this.state.actor === 'X' ? 'b blue' : 'b dark-red'
                  },
                  this.state.actor === 'X' ? 'O' : 'X'
                ),
                ' to move'
              )
            )
          : this.state.winner === 'None' ?
            h(
              'div',
              { style: { height: '28px', lineHeight: '28px' } },
              "It's a draw!"
            )
          : h(
              'div',
              null,
              this.state.mode === 'PvE' && this.state.winner === 'O' ?
                'Computer '
              : 'Player ',
              h(
                'span',
                {
                  style: {
                    fontFamily: 'Patrick Hand, cursive',
                    height: '28px'
                  },
                  className: this.state.winner === 'X' ? 'b dark-red' : 'b blue'
                },
                this.state.winner
              ),
              ' wins!'
            )
        ),

        h(
          'section',
          {
            id: 'gameBoard',
            style: { width: '21rem', height: '21rem' },
            className: 'mt2 mb3 cf'
          },
          this.state.gridBoxes
        ),
        h(
          'button',
          {
            onClick: async () => {
              await this.restart();
            },
            className:
              'avenir bw0 bg-animate pointer bg-transparent dark-blue b mt4 f3 br-pill pl3 pr3 pt2 pb2 ba bw1 b--dark-blue'
          },
          h('i', { className: 'fa-solid fa-repeat mr2' }),
          'Restart'
        )
      ),
      h(Footer)
    );
  }

  private async checkConditions(): Promise<void> {
    await this.checkVictory(this.state.tiles);
    await this.checkDraw(this.state.tiles);
  }

  private async checkVictory(tiles: AppState['tiles']): Promise<void> {
    const victoryState = victoryConditions.filter(condition => {
      const [aIdx, bIdx, cIdx] = condition;
      const a = tiles[aIdx - 1].innerText;
      const b = tiles[bIdx - 1].innerText;
      const c = tiles[cIdx - 1].innerText;

      return a !== '' && a === b && b === c;
    });

    if (victoryState.length > 0) {
      await new Audio(gameOverAudio).play();
      victoryState.forEach(state => {
        for (const i of state) tiles[i - 1].classList.add('bg-light-green');
      });

      this.setState({
        winner: this.state.actor,
        gameOver: true
      });
    }
  }

  private async checkDraw(tiles: AppState['tiles']): Promise<void> {
    const drawState = Array.from(tiles).every(tile => {
      return tile.innerText.includes('X') || tile.innerText.includes('O');
    });

    if (drawState) {
      await new Audio(gameOverAudio).play();
      this.setState({
        winner: this.state.winner === '' ? 'None' : this.state.winner,
        gameOver: true
      });
    }
  }

  private async switchMode(mode: AppState['mode']): Promise<void> {
    if (mode === this.state.mode) return;
    await this.restart();
    this.setState({
      mode
    });
  }

  private async restart(): Promise<void> {
    await new Audio(restartAudio).play();
    this.setState({
      actor: '',
      winner: '',
      gridBoxes: [],
      gameOver: false
    });
    this.gridLoop();
  }

  // Placing Marks
  private async addActor(tile: AppState['tiles'][number]): Promise<void> {
    if (this.state.gameOver) await this.restart();
    else if (tile.innerText !== '') return;
    else if (this.state.mode === 'PvP') {
      await new Audio(scribbleAudio).play();
      this.switchActor();
      tile.innerText = this.state.actor;
      tile.classList.add(tile.innerText === 'X' ? 'dark-red' : 'blue');
      await this.checkConditions();
    } else {
      await new Audio(scribbleAudio).play();
      this.switchActor();
      tile.innerText = 'X';
      tile.classList.add('dark-red');
      await this.checkConditions();
      if (this.state.winner === '') await this.computerMove();
    }
  }

  private async computerMove(): Promise<void> {
    this.switchActor();
    const emptyTiles = Array.from(this.state.tiles).filter(
      emptyTile => emptyTile.innerText === ''
    );

    emptyTiles[0].innerText = 'O';
    emptyTiles[0].classList.add('blue');
    await this.checkConditions();
  }

  private switchActor(): void {
    this.setState({
      actor: this.state.actor === 'X' ? 'O' : 'X'
    });
  }

  // Populate the Board
  private gridLoop(): void {
    const arr: ReactElement[] = [];

    for (let i = 1; i <= 9; i++)
      arr.push(
        h(
          'div',
          {
            key: i,
            id: i,
            onClick: async (e: MouseEvent<HTMLDivElement>) => {
              await this.addActor(e.currentTarget);
            },
            style: {
              height: 'calc(100% / 3)',
              fontFamily: 'Patrick Hand, cursive',
              fontSize: '5rem'
            },
            className:
              'b board ba bw1 b--dark-blue pointer fl w-third flex items-center justify-center'
          },
          ''
        )
      );
    this.setState({ gridBoxes: arr });
  }
}

// Easter Egg
console.log("🦎 Tiktaq'to approved.");
