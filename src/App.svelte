<script lang="ts">
  import Cell from './components/Cell.svelte'
  import Button from './components/Button.svelte'

  let cells = makeEmptyCells()
  let generation = 0

  function makeEmptyCells(x = 50, y = 30) {
    const cells = []

    for (let yIndex = 0; yIndex < y; yIndex++) {
      for (let xIndex = 0; xIndex < x; xIndex++) {
        if (cells[xIndex] === undefined) {
          cells[xIndex] = []
        }

        cells[xIndex][yIndex] = false
      }
    }

    return cells
  }

  function randomizeCells() {
    cells = cells.map((cellRow) => cellRow.map(() => Math.random() > 0.5))
  }

  function clearBoard() {
    cells = makeEmptyCells()
  }

  function handleCellClick(cellXIndex: number, cellYIndex: number) {
    cells[cellYIndex][cellXIndex] = !cells[cellYIndex][cellXIndex]
  }
</script>

<main class="flex justify-center align-middle flex-col">
  <div class="grid grid-cols-board gap-1">
    {#each cells as cellRow, cellYIndex}
      {#each cellRow as cell, cellXIndex}
        <Cell {cell} on:click={() => handleCellClick(cellXIndex, cellYIndex)} />
      {/each}
    {/each}
  </div>
  <div class="flex flex-col">
    <div class="mx-auto">Generation number: {generation}</div>
    <Button>Start/Stop/Resume</Button>
    <Button on:click={randomizeCells}>Randomize</Button>
    <Button on:click={clearBoard}>Clear</Button>
  </div>
</main>
