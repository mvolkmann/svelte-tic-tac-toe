export const BOARD_SIZE = 3;

// This is used by the evaluate function.
const ITER = Array(BOARD_SIZE).fill(0);

export const MARKER_O = '◯';
export const MARKER_X = '✕';

// This returns a boolean indicating whether
// the move at the given position results in a win.
export function isWin(board, rowIndex, columnIndex) {
  const row = board[rowIndex];
  const marker = row[columnIndex];
  if (!marker) return false;
  const column = board.map(row => row[columnIndex]);
  const diag1 = ITER.map((_, i) => board[i][i]);
  const diag2 = ITER.map((_, i) => board[BOARD_SIZE - 1 - i][i]);
  const options = [row, column, diag1, diag2];
  return options.some(option => option.every(cell => cell === marker));
}

// This attempts to place a marker at a specified board location
// and returns a boolean indicating whether it was successful.
export function place(board, marker, rowIndex, columnIndex) {
  const row = board[rowIndex];
  const current = row[columnIndex];
  const empty = current === '';
  if (empty) row[columnIndex] = marker;
  return empty;
}

export function newBoard() {
  const board = [];
  for (let _ = 0; _ < BOARD_SIZE; _++) {
    const row = Array(BOARD_SIZE).fill('');
    board.push(row);
  }
  return board;
}
