import { type ReactElement } from 'react';

type Mode = 'PvE' | 'PvP';
type Actor = 'X' | 'O' | '';
type Winner = 'X' | 'O' | 'None' | '';

type Props = object;

interface Logic {
  actor: Actor;
  winner: Winner;
  mode: Mode;
  gridBoxes: ReactElement[];
}

interface View extends Logic {
  onSwitchMode: (mode: State['mode']) => void | Promise<void>;
  onRestart: () => void | Promise<void>;
}

interface State extends Logic {
  gameOver: boolean;
  tiles: HTMLCollectionOf<HTMLDivElement>;
}

export { type Props, type View, type State };
