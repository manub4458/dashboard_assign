
<script>
    export let options = []; // Array of options for the menu
    export let value = ""; // Selected value from the menu
  </script>
  
  <select bind:value class="select select-ghost w-full max-w-xs focus:bg-gray-100 text-zinc-700 focus:text-zinc-600 font-semibold">
    {#if options.length === 0}
      <option disabled selected>Loading...</option>
    {:else}
      <option disabled selected>Choose an option</option>
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    {/if}
  </select>
  