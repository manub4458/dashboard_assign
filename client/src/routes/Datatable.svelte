<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import qs from 'query-string';
  import DataColumn from './DataColumn.svelte';

  let page = 1;
  let response = [];
  let filter = '';
  let query = '';
  let itemsPerPage = 10;

  $: queryParams = { page, filter, query, limit: itemsPerPage };

  async function fetchData() {
    try {
      const url = qs.stringifyUrl({
        url: 'http://localhost:8000/v1/filter',
        query: queryParams
      });

      const { data } = await axios.get(url);
      response = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  $: {
    console.log('Fetching data with:', queryParams);
    fetchData();
  }

  function handleQueryChange(e) {
    query = e.target.value;
    page = 1;
  }

  function handleFilterChange(e) {
    filter = e.target.value;
    query = '';
    page = 1;
  }

  function previousPage() {
    if (page > 1) {
      page -= 1;
    }
  }

  function nextPage() {
    page += 1;
  }

  onMount(fetchData);
</script>

<div class="w-full space-y-4">
  <div class="flex items-center justify-between">
    <input
      class="bg-gray-100 focus:outline-none max-w-56 w-full h-10 rounded-lg px-2 text-zinc-700 border-2 border-zinc-300"
      placeholder="Search"
      bind:value={query}
      on:input={handleQueryChange}
    />
    <select
      bind:value={filter}
      on:change={handleFilterChange}
      class="select select-ghost w-full max-w-xs focus:bg-gray-100 text-zinc-700 focus:text-zinc-600 font-semibold"
    >
      <option value="">Filter</option>
      <option value="end_year">End Year</option>
      <option value="topic">Topics</option>
      <option value="sector">Sector</option>
      <option value="region">Region</option>
      <option value="pestle">PEST</option>
      <option value="source">Source</option>
      <option value="country">Country</option>
    </select>
  </div>
  <div class="flex flex-col gap-y-2 overflow-y-auto border border-zinc-200 p-4 rounded-lg">
    <table>
      <tr class="text-zinc-700 font-semibold">
        <th>No.</th>
        <th>Country</th>
        <th>Topic</th>
        <th>End Year</th>
        <th>Sector</th>
        <th>Pestle</th>
        <th>Source</th>
        <th>Region</th>
      </tr>
      {#each response as data, index}
        <DataColumn 
          {data} 
          index={(page - 1) * itemsPerPage + index + 1} 
          {page} 
        />
      {/each}
    </table>
  </div>
  <div class="flex items-center justify-between">
    <div>
      Showing {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, (page - 1) * itemsPerPage + response.length)}
    </div>
    <div class="flex items-center gap-6">
      <button
        class="bg-neutral-900 rounded-md text-white hover:bg-neutral-900/90 px-4 py-2 disabled:bg-neutral-900/80"
        on:click={previousPage}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        class="bg-neutral-900 rounded-md text-white hover:bg-neutral-900/90 px-4 py-2"
        on:click={nextPage}
      >
        Next
      </button>
    </div>
  </div>
</div>