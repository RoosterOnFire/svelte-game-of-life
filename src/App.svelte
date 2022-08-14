<script lang="ts">
  import Cell from './components/Cell.svelte'
  import Button from './components/Button.svelte'

  let cells = makeEmptyCells()
  let cellsGeneration: number = 0
  let gameLoopState: 'stop' | 'start' = 'stop'
  let gameLoopInterval: NodeJS.Timer | undefined = undefined

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
    clearInterval(gameLoopInterval)
    gameLoopInterval = undefined
    cells = makeEmptyCells()
    cellsGeneration = 0
    gameLoopState = 'stop'
  }

  function handleCellClick(cellXIndex: number, cellYIndex: number) {
    cells[cellYIndex][cellXIndex] = !cells[cellYIndex][cellXIndex]
  }

  function handleGameLoopClick() {
    if (gameLoopState === 'stop') {
      gameLoopState = 'start'
      gameLoopInterval = setInterval(() => {
        gameLoop()
      }, 200)
    } else if (gameLoopState === 'start') {
      clearInterval(gameLoopInterval)
      gameLoopState = 'stop'
    }
  }

  function gameLoop() {
    cellsGeneration += 1
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
    <div class="mx-auto">Generation number: {cellsGeneration}</div>
    <Button on:click={handleGameLoopClick}>Start/Stop/Resume</Button>
    <Button on:click={randomizeCells}>Randomize</Button>
    <Button on:click={clearBoard}>Clear</Button>
  </div>
</main>
