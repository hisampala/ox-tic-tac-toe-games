
import { Session } from 'next-auth';
import { TypeTicTacToe } from '../../types/tictactoe.type';

import { HistoryService } from '../history';
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],            // Diagonals
];
const check_winner = (player: string, board: Array<TypeTicTacToe>): boolean => {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
};
const save = (is_winner: boolean, session: Session) => {
  const { email, id, image, name } = session.user
  return HistoryService.create({ is_winner, user_email: email, user_id: id, user_image: image, user_name: name })
}
const get_point = (session: Session)=>{
  return HistoryService.get_point(session.user.id)
}
const minimax = (board: Array<TypeTicTacToe>, depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
  const winner = gameService.check_winner('O', board) ? 'O' : gameService.check_winner('X', board) ? 'X' : null;

  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every(cell => cell !== null)) return 0;

  const emptyIndices = board.map((cell, i) => (cell === null ? i : null)).filter(i => i !== null) as number[];

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let index of emptyIndices) {
      board[index] = 'O';
      const score = minimax(board, depth + 1, alpha, beta, false);
      board[index] = null;
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break; // Beta cut-off
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let index of emptyIndices) {
      board[index] = 'X';
      const score = minimax(board, depth + 1, alpha, beta, true);
      board[index] = null;
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break; // Alpha cut-off
    }
    return bestScore;
  }
};

const get_com_move = (board: Array<TypeTicTacToe>): number => {
  const emptyIndices = board.map((cell, i) => (cell === null ? i : null)).filter(i => i !== null) as number[];

  if (emptyIndices.length === 0) return -1;

  let bestScore = -Infinity;
  let bestMove = -1;
  let alpha = -Infinity;
  let beta = Infinity;

  for (let index of emptyIndices) {
    board[index] = 'X'; // Assume 'X' is the computer's move
    const score = minimax(board, 0, alpha, beta, false);
    board[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
};

export const gameService = {
  check_winner,
  save,
  get_point,
  get_com_move
}