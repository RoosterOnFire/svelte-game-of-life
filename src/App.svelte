<script lang="ts">
  import Cell from './components/Cell.svelte'
  import Button from './components/Button.svelte'

  let cells = makeEmptyCells()
  let generation = 0

  function makeEmptyCells(x = 50, y = 30) {
    return new Array(50 * 30).fill(false, 0)
  }

  function randomizeCells() {
    cells = cells.map(() => Math.random() > 0.5)
  }

  function clearBoard() {
    cells = makeEmptyCells()
  }

  function handleCellClick(cellIndex: number) {
    cells = cells.map((value, index) => {
      return index === cellIndex ? !value : value
    })
  }
</script>

<main class="flex justify-center align-middle flex-col">
  <div class="grid grid-cols-board gap-1">
    {#each cells as cell, cellIndex}
      <Cell
        {cell}
        {cellIndex}
        on:cellClick={(event) => handleCellClick(event.detail)}
      />
    {/each}
  </div>
  <div class="flex flex-col">
    <div class="mx-auto">Generation number: {generation}</div>
    <Button>Start/Stop/Resume</Button>
    <Button on:click={randomizeCells}>Randomize</Button>
    <Button on:click={clearBoard}>Clear</Button>
  </div>
</main>
