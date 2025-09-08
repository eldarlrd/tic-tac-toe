import { VICTORY_CONDITIONS } from '@/site/config.ts';
import { type State } from '@/site/types.ts';

const getWinner = (board: State['actor'][]): State['actor'] => {
  for (const [a, b, c] of VICTORY_CONDITIONS) {
    const A = board[a - 1];
    const B = board[b - 1];
    const C = board[c - 1];

    if (A !== '' && A === B && B === C) return A;
  }

  return '';
};

const evaluate = (board: State['actor'][], depth: number): number => {
  const w = getWinner(board);

  if (w === 'O') return 10 - depth; // Computer wins
  if (w === 'X') return depth - 10; // Player wins

  return 0; // Draw
};

const hasEmpty = (board: State['actor'][]): boolean =>
  board.some(c => c === '');

const minimax = (
  board: State['actor'][],
  depth: number,
  isMax: boolean,
  alpha: number,
  beta: number
): number => {
  const score = evaluate(board, depth);

  if (score !== 0) return score;
  if (!hasEmpty(board)) return 0;

  if (isMax) {
    let best = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] !== '') continue;
      board[i] = 'O';
      const val = minimax(board, depth + 1, false, alpha, beta);

      board[i] = '';
      best = Math.max(best, val);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }

    return best;
  } else {
    let best = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] !== '') continue;
      board[i] = 'X';
      const val = minimax(board, depth + 1, true, alpha, beta);

      board[i] = '';
      best = Math.min(best, val);
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }

    return best;
  }
};

const findBestMove = (board: State['actor'][]): number => {
  const empties = board
    .map((v, i) => (v === '' ? i : -1))
    .filter(i => i !== -1);

  if (empties.length === 9) return 4;
  if (board[4] === '') return 4;

  let bestVal = -Infinity;
  let bestMove = -1;

  for (const i of empties) {
    board[i] = 'O';
    const moveVal = minimax(board, 0, false, -Infinity, Infinity);

    board[i] = '';
    if (moveVal > bestVal) {
      bestVal = moveVal;
      bestMove = i;
    }
  }

  return bestMove !== -1 ? bestMove : (empties[0] ?? -1);
};

export default findBestMove;
