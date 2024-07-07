<script>
    export let value = ""; // Bound value for search input
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    const handleChange = (event) => {
      value = event.target.value;
      dispatch('input', value); // Emit input event with current value
    };
  </script>
  
  <input type="text" bind:value on:input={handleChange} placeholder="Search..." class="bg-gray-100 focus:outline-none max-w-56 w-full h-10 rounded-lg px-2 text-zinc-700 border-2 border-zinc-300" />
  