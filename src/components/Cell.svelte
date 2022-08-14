<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let cell: boolean

  const dispatch = createEventDispatcher()
</script>

<div
  class="h-3 w-3 {cell ? 'bg-neutral-600' : 'bg-neutral-400'}"
  on:click={() => dispatch('click')}
/>
