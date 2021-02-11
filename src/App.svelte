<script>
  const SIZE = 3;
  const ITER = Array(SIZE).fill(0);

  let board;
  let marker;
  let message;
  newGame();

  function evaluate(rowIndex, columnIndex) {
    const row = board[rowIndex];
    const marker = row[columnIndex];
    const column = board.map(row => row[columnIndex]);
    const diag1 = ITER.map((_, i) => board[i][i]);
    const diag2 = ITER.map((_, i) => board[SIZE - 1 - i][i]);
    const options = [row, column, diag1, diag2];
    if (options.some(option => option.every(cell => cell === marker))) {
      message = marker + ' wins!';
    }
  }

  function move(rowIndex, columnIndex) {
    const row = board[rowIndex];
    const current = row[columnIndex];
    if (current === '') {
      row[columnIndex] = marker;
      marker = marker === '✕' ? '◯' : '✕';
      board = board; // trigger reactivity
      evaluate(rowIndex, columnIndex);
    }
  }

  function newGame() {
    board = [];
    for (let _ = 0; _ < SIZE; _++) {
      const row = Array(SIZE).fill('');
      board.push(row);
    }
    marker = '✕';
    message = '';
  }
</script>

<main>
  <h1>Tic Tac Toe</h1>
  {#each board as row, rowIndex}
    <div class="row">
      {#each row as marker, columnIndex}
        <div class="column" on:click={() => move(rowIndex, columnIndex)}>
          {marker}
        </div>
      {/each}
    </div>
  {/each}
  <div class="message">{message}</div>
  <button on:click={newGame}>New Game</button>
</main>

<style>
  .column {
    box-sizing: border-box;
    font-size: 2rem;
    height: var(--size);
    line-height: var(--size);
    margin: 0;
    padding: 0;
    text-align: center;
    width: var(--size);
  }

  .column:not(:first-of-type) {
    border-left: 1px solid black;
  }

  main {
    --size: 3rem;
    display: inline-flex;
    flex-direction: column;
    font-family: sans-serif;
  }

  .message {
    color: blue;
    font-size: 2rem;
    height: 3rem;
    text-align: center;
  }

  .row {
    display: flex;
    justify-content: center;
    height: var(--size);
  }

  .row:not(:first-of-type) .column {
    border-top: 1px solid black;
  }
</style>
