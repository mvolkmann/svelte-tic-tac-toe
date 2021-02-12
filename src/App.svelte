<script>
  import {isWin, MARKER_O, MARKER_X, place, newBoard} from './tic-tac-toe';

  let board;
  let marker;
  let message;
  let winCount = {
    [MARKER_O]: 0,
    [MARKER_X]: 0
  };

  newGame();

  function attemptPlace(rowIndex, columnIndex) {
    if (place(board, marker, rowIndex, columnIndex)) {
      board = board; // trigger reactivity
      if (isWin(board, rowIndex, columnIndex)) {
        message = marker + ' wins!';
        winCount[marker]++;
        //TODO: Don't allow additional moves after a win until new game.
      } else {
        // Switch to the other marker.
        marker = marker === MARKER_X ? MARKER_O : MARKER_X;
      }
    } else {
      alert('failed to place');
    }
  }

  function newGame() {
    board = newBoard();
    marker = MARKER_X;
    message = '';
  }
</script>

<main>
  <h1>Tic Tac Toe</h1>
  {#each board as row, rowIndex}
    <div class="row">
      {#each row as marker, columnIndex}
        <div
          class="column"
          on:click={() => attemptPlace(rowIndex, columnIndex)}
        >
          {marker}
        </div>
      {/each}
    </div>
  {/each}
  <div class="message">{message}</div>
  <button on:click={newGame}>New Game</button>
  <div>{MARKER_X} wins: {winCount[MARKER_X]}</div>
  <div>{MARKER_O} wins: {winCount[MARKER_O]}</div>
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
