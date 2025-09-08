import {
  Component,
  createElement as h,
  type MouseEvent,
  type ReactElement
} from 'react';

import gameOverAudio from '#/sfx/gameOver.opus';
import restartAudio from '#/sfx/paperFlip.opus';
import scribbleAudio from '#/sfx/scribble.opus';
import findBestMove from '@/game/minimax.ts';
import View from '@/game/view.ts';
import { VICTORY_CONDITIONS } from '@/site/config.ts';
import { type Props, type State } from '@/site/types.ts';

// @ts-expect-error: missing type declaration
import 'tachyons';
import '@fontsource/patrick-hand/index.css';

export default class App extends Component<Props, State> {
  public constructor(props: Props) {
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
    window.addEventListener('keydown', this.handleKeyDown);
    this.gridLoop();
  }

  public override componentWillUnmount(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R')
      void this.restart();
  };

  private async checkConditions(): Promise<boolean> {
    const hasWinner = await this.checkVictory(this.state.tiles);

    if (hasWinner) return true;

    return await this.checkDraw(this.state.tiles);
  }

  private async checkVictory(tiles: State['tiles']): Promise<boolean> {
    const victoryState = VICTORY_CONDITIONS.filter(condition => {
      const [aIdx, bIdx, cIdx] = condition;
      const a = tiles[aIdx - 1].innerText;
      const b = tiles[bIdx - 1].innerText;
      const c = tiles[cIdx - 1].innerText;

      return a !== '' && a === b && b === c;
    });

    if (victoryState.length > 0) {
      await new Audio(gameOverAudio).play();

      const [aIdx] = victoryState[0];
      const winnerSymbol = tiles[aIdx - 1].innerText as State['winner'];

      victoryState.forEach(state => {
        for (const i of state) tiles[i - 1].classList.add('bg-light-green');
      });

      this.setState({
        winner: winnerSymbol,
        gameOver: true
      });

      return true;
    }

    return false;
  }

  private async checkDraw(tiles: State['tiles']): Promise<boolean> {
    const drawState = Array.from(tiles).every(tile => {
      return tile.innerText.includes('X') || tile.innerText.includes('O');
    });

    if (drawState) {
      await new Audio(gameOverAudio).play();
      this.setState({
        winner: this.state.winner === '' ? 'None' : this.state.winner,
        gameOver: true
      });

      return true;
    }

    return false;
  }

  private async switchMode(mode: State['mode']): Promise<void> {
    if (mode === this.state.mode) return;
    await this.restart();
    this.setState({
      mode
    });
  }

  private async restart(): Promise<void> {
    await new Audio(restartAudio).play();

    Array.from(this.state.tiles).forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('dark-red', 'blue', 'bg-light-green');
    });

    this.setState({
      actor: '',
      winner: '',
      gridBoxes: [],
      gameOver: false
    });

    this.gridLoop();
  }

  // Placing Marks
  private async addActor(tile: State['tiles'][number]): Promise<void> {
    if (this.state.gameOver) {
      await this.restart();

      return;
    }

    if (tile.innerText !== '') return;

    if (this.state.mode === 'PvP') {
      const actorToPlace: State['actor'] = this.state.actor === 'X' ? 'O' : 'X';

      await new Audio(scribbleAudio).play();

      tile.innerText = actorToPlace;
      tile.classList.add(actorToPlace === 'X' ? 'dark-red' : 'blue');

      this.setState({ actor: actorToPlace });

      const over = await this.checkConditions();

      if (over) return;
    } else {
      const actorToPlace: State['actor'] = 'X';

      await new Audio(scribbleAudio).play();

      tile.innerText = actorToPlace;
      tile.classList.add('dark-red');

      this.setState({ actor: actorToPlace });

      const over = await this.checkConditions();

      if (!over) await this.computerMove();
    }
  }

  private async computerMove(): Promise<void> {
    if (this.state.gameOver) return;

    const board = Array.from(this.state.tiles).map(
      t => t.innerText as 'X' | 'O' | ''
    );
    const bestIndex = findBestMove(board);

    if (bestIndex < 0) return;

    const target = this.state.tiles[bestIndex];

    if (target.innerText !== '') return;

    target.innerText = 'O';
    target.classList.add('blue');

    this.setState({ actor: 'O' });

    await this.checkConditions();
  }

  // Populate Board
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

  public override render(): ReactElement {
    return h(View, {
      mode: this.state.mode,
      winner: this.state.winner,
      actor: this.state.actor,
      gridBoxes: this.state.gridBoxes,
      onSwitchMode: async (m: State['mode']) => {
        await this.switchMode(m);
      },
      onRestart: async () => {
        await this.restart();
      }
    });
  }
}

// Easter Egg
console.log("🦎 Tiktaq'to approved.");
