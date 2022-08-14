<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<button
  type="button"
  class="bg-neutral-200 hover:bg-neutral-300 text-neutral-900"
  on:click={() => dispatch('click')}
>
  <slot />
</button>
