<script lang="ts">
  import { onMount } from 'svelte'
  import Button from './components/Button.svelte'
  import Cell from './components/Cell.svelte'

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

        cells[yIndex][xIndex] = false
      }
    }

    return cells
  }

  function randomizeCells() {
    cells = cells.map((cellRow) => cellRow.map(() => Math.random() > 0.5))
    cellsGeneration = 0
  }

  function clearBoard() {
    clearInterval(gameLoopInterval)
    gameLoopInterval = undefined
    cells = makeEmptyCells()
    cellsGeneration = 0
    gameLoopState = 'stop'
  }

  function handleCellClick(cellXIndex: number, cellYIndex: number) {
    if (gameLoopState === 'start') {
      return
    }

    cells[cellYIndex][cellXIndex] = !cells[cellYIndex][cellXIndex]
  }

  function manageGameLoop() {
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

    const newCells = []

    for (let yIndex = 0; yIndex < 30; yIndex++) {
      for (let xIndex = 0; xIndex < 50; xIndex++) {
        const topCells = cells[yIndex - 1]
        const hasTop = topCells !== undefined

        const bottomCells = cells[yIndex + 1]
        const hasBottom = bottomCells !== undefined

        const currentCellNeigbours = [
          hasTop ? topCells[xIndex - 1] : false,
          hasTop ? topCells[xIndex] : false,
          hasTop ? topCells[xIndex + 1] : false,
          cells[yIndex][xIndex - 1],
          cells[yIndex][xIndex + 1],
          hasBottom ? bottomCells[xIndex - 1] : false,
          hasBottom ? bottomCells[xIndex] : false,
          hasBottom ? bottomCells[xIndex + 1] : false,
        ]

        const neighboursAlive = currentCellNeigbours.filter(
          (neighbour) => neighbour === true
        ).length

        let newCellAlive = false

        const isCurrentCellAlive = cells[yIndex][xIndex] === true
        if (isCurrentCellAlive) {
          // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          // Any live cell with more than three live neighbours dies, as if by overpopulation.
          // Any live cell with two or three live neighbours lives on to the next generation.
          newCellAlive = neighboursAlive === 2 || neighboursAlive === 3
        } else {
          // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          newCellAlive = neighboursAlive === 3
        }

        if (newCells[yIndex] === undefined) {
          newCells[yIndex] = []
        }

        newCells[yIndex][xIndex] = newCellAlive
      }
    }

    cells = newCells
  }

  onMount(() => {
    randomizeCells()
    manageGameLoop()
  })
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
    <Button on:click={manageGameLoop}>Start/Stop/Resume</Button>
    <Button on:click={randomizeCells}>Randomize</Button>
    <Button on:click={clearBoard}>Clear</Button>
  </div>
</main>
