<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import qs from 'query-string';
    import DataColumn from './DataColumn.svelte';
  
    let page = 1;
    let response = [];
    let filter = "";
    let query = "";
  
    const fetchData = async () => {
      try {
        const url = qs.stringifyUrl({
          url: "http://localhost:8000/v1/filter",
          query: {
            page: page,
            filter: filter, // Ensure filter is included in the query
            query: query,
          },
        });
  
        const { data } = await axios.get(url);
        response = data;
  
      } catch (error) {
        console.error(error);
      }
    };
  
    onMount(() => {
      fetchData();
    });
  
    const handleQueryChange = (event) => {
      page = 1;
      query = event.target.value;
      fetchData();
    };
  
    const handleFilterChange = (event) => {
      page = 1; // Reset page on filter change
      query = ""; // Clear query to avoid conflicts
      filter = event.target.value;
      fetchData();
    };
  
    const handlePrevPage = () => {
      if (page > 1) {
        page--;
        fetchData();
      }
    };
  
    const handleNextPage = () => {
      page++;
      fetchData();
    };
  </script>
  
  
  
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <input
        class="bg-gray-100 focus:outline-none max-w-56 w-full h-10 rounded-lg px-2 text-zinc-700 border-2 border-zinc-300"
        placeholder="Search"
        value={query}
        onInput={handleQueryChange}
      />
      <select
        value={filter}
        onInput={handleFilterChange}
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
        <thead>
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
        </thead>
        <tbody>
          {#each response as data, index}
            <DataColumn
              data={data}
              index={index}
              page={page}
              key={data.id} 
            />
          {/each}
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-end gap-6">
      <button
        class="bg-neutral-900 rounded-md text-white hover:bg-neutral-900/90 px-4 py-2 disabled:bg-neutral-900/80"
        on:click={handlePrevPage}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        class="bg-neutral-900 rounded-md text-white hover:bg-neutral-900/90 px-4 py-2"
        on:click={handleNextPage}
      >
        Next
      </button>
    </div>
  </div>
  
  <style>
    /* Add your custom styles for the table and components here */
  </style>
  