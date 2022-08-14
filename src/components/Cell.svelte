<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let cell: boolean
  export let cellIndex: number

  const dispatch = createEventDispatcher()
</script>

<div
  class="h-3 w-3 {cell ? 'bg-green-500' : 'bg-neutral-500'}"
  on:click={() => dispatch('cellClick', cellIndex)}
/>
