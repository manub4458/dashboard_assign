<script>
	import Header from './Header.svelte';
	import '../app.css';
    import Likelohood from './Likelohood.svelte';
    import Piechart from './Piechart.svelte';
    import Intensity from './Intensity.svelte';
    import Datatable from './Datatable.svelte';
    import Insights from './Insights.svelte';
    // import Total from './TotalDocument.svelte';
	import { onMount } from 'svelte';
    import TotalDocument from './TotalDocument.svelte';

  // Declare a reactive variable to hold total documents
 
</script>

<div class="app h-full">
	<Insights />
	<Datatable />
	
	<div class="flex items-center justify-center">
		<div class="w-full max-w-7xl grid md:grid-cols-4 gap-10 border border-zinc-300 p-4 rounded-lg bg-gray-50">
			<TotalDocument/>
			<div class="col-span-3">
				<Likelohood/>
			</div>
		</div>
	</div>
	<div class="w-full h-max flex mt-20 flex-col items-center gap-y-4 p-4 justify-center border border-zinc-200 rounded-lg">
		<h3 class="font-semibold px-4 py-1.5 rounded-full bg-neutral-800 text-white">Country Wise Articles</h3>
		<Piechart />
	</div>
	<div>
	
		
	</div>
	 <!-- <Total /> -->
	<main >
		<slot />
	</main>
 
	
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	/* footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
