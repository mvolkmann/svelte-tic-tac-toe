import {
  BOARD_SIZE,
  isWin,
  MARKER_O,
  MARKER_X,
  place,
  newBoard
} from './tic-tac-toe';

test('should create board', () => {
  const board = newBoard();
  expect(board.length).toBe(BOARD_SIZE);
  for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
    const row = board[rowIndex];
    expect(row.length).toBe(BOARD_SIZE);
    for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
      expect(row[columnIndex]).toBe('');
    }
  }
});

test('should place marker', () => {
  let board = newBoard();
  for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
    const row = board[rowIndex];
    for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
      expect(row[columnIndex]).toBe('');
      place(board, MARKER_X, rowIndex, columnIndex);
      expect(row[columnIndex]).toBe(MARKER_X);
    }
  }
});

test('should detect win', () => {
  let board = newBoard();
  expect(isWin(board, 0, 0)).toBe(false);

  const lastIndex = BOARD_SIZE - 1;

  // Test row wins.
  for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
    board = newBoard();
    for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
      place(board, MARKER_X, rowIndex, columnIndex);
      if (columnIndex !== lastIndex) {
        expect(isWin(board, rowIndex, columnIndex)).toBe(false);
      }
    }
    for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
      expect(isWin(board, rowIndex, columnIndex)).toBe(true);
    }
  }

  // Test column wins.
  for (let columnIndex = 0; columnIndex < BOARD_SIZE; columnIndex++) {
    board = newBoard();
    for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
      place(board, MARKER_O, rowIndex, columnIndex);
      if (rowIndex !== lastIndex) {
        expect(isWin(board, rowIndex, columnIndex)).toBe(false);
      }
    }
    for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
      expect(isWin(board, rowIndex, columnIndex)).toBe(true);
    }
  }

  // Test first diagonal wins.
  board = newBoard();
  for (let index = 0; index < BOARD_SIZE; index++) {
    place(board, MARKER_X, index, index);
    if (index !== lastIndex) {
      expect(isWin(board, index, index)).toBe(false);
    }
  }
  for (let index = 0; index < BOARD_SIZE; index++) {
    expect(isWin(board, index, index)).toBe(true);
  }

  // Test second diagonal wins.
  board = newBoard();
  for (let index = 0; index < BOARD_SIZE; index++) {
    place(board, MARKER_X, index, lastIndex - index);
    if (index !== lastIndex) {
      expect(isWin(board, index, index)).toBe(false);
    }
  }
  for (let index = 0; index < BOARD_SIZE; index++) {
    expect(isWin(board, index, lastIndex - index)).toBe(true);
  }
});
