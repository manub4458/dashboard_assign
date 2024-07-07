<script>
    import { onMount } from 'svelte';
  
    // Declare a reactive variable to hold total documents
    let totalDocuments = 0;
  
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/data/totaldocuments");
        const data = await response.json();
        totalDocuments = data; // Update the reactive variable
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Use onMount to fetch data when the component is mounted
    onMount(() => {
      fetchData();
    });
  </script>
  
  <!-- Your Svelte component's markup -->
  <div class="w-full p-4 rounded-xl">
    <div class="space-y-5">
        <!-- <div class="flex items-center justify-center rounded-full bg-neutral-800 h-12 w-12">
            <IoDocumentOutline class="h-8 w-8 text-zinc-200 "/>
        </div> -->
        <div class="space-y-1">
            <span class="text-3xl text-emerald-600 font-semibold block bg-emerald-400/30 w-fit px-4 py-2 rounded-badge">
                {totalDocuments}
            </span>
            <p class="text-zinc-600 font-semibold text-sm">Total Documents</p>
        </div>
    </div>
    <div class="mt-6 md:mt-10 flex flex-col space-y-4 w-fit items-center">
        <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-600">Relevance</h3>
        <div class="h-8 w-8 rounded-full bg-neutral-700 text-white text-xl font-bold flex items-center justify-center p-2">
            <p>Vs</p>
        </div>
        <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-600" >Likelihood</h3>
    </div>
</div>
  