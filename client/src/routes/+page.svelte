<script>
	import { onMount } from 'svelte';
	import {
	  Chart as ChartJS,
	  CategoryScale,
	  LinearScale,
	  BarElement,
	  BarController,
	  Title,
	  Tooltip,
	  Legend,
	} from 'chart.js';
	import axios from 'axios';
  
	import MdPublish from 'svelte-icons/md/MdPublish.svelte';
	import TiFolderAdd from 'svelte-icons/ti/TiFolderAdd.svelte'
	// Register Chart.js components
	ChartJS.register(
	  CategoryScale,
	  LinearScale,
	  BarElement,
	  BarController,
	  Title,
	  Tooltip,
	  Legend
	);
  
	let barData = {
	  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  datasets: []
	};
	let published = {
	  max: 0,
	  total: 0,
	};
	let added = {
	  max: 0,
	  total: 0,
	};
	let growth = 0;
  
	const calculateTotalGrowth = (data) => {
	  let totalGrowth = 0;
  
	  for (let i = 1; i < data.length; i++) {
		const countCurrent = data[i].count;
		const countPrevious = data[i - 1].count;
  
		const monthlyGrowth = ((countCurrent - countPrevious) / countPrevious) * 100;
		totalGrowth += monthlyGrowth;
	  }
  
	  return parseFloat(totalGrowth.toFixed(2));
	}
  
	const fetchData = async () => {
	  try {
		const response = await axios.get("http://localhost:8000/v1/data/published");
		const data = response.data.data.filter((value) => value._id !== "lid");
  
		const sortedData = data.sort((a, b) => {
		  const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		  return monthsOrder.indexOf(a._id) - monthsOrder.indexOf(b._id);
		});
  
		const totalGrowth = calculateTotalGrowth(sortedData);
		growth = totalGrowth;
  
		const values = sortedData.map((value) => value.count);
		const maxValue = Math.max(...values);
		const total_values = values.reduce((a, b) => a + b, 0);
  
		published.max = maxValue;
		published.total = total_values;
  
		const formattedData = {
		  labels: barData.labels,
		  datasets: [
			{
			  label: "Month wise data",
			  data: values,
			  backgroundColor: 'rgba(255, 99, 132, 0.5)',
			  barThickness: 40, // Adjust bar width here
			},
		  ],
		};
  
		barData = formattedData;
  
		// Create the chart after data is available
		const ctx = document.getElementById('barChart').getContext('2d');
		new ChartJS(ctx, {
		  type: 'bar',
		  data: barData,
		  options: {
			responsive: true,
			plugins: {
			  legend: {
				display: false,
			  },
			},
			scales: {
			  x: {
				type: 'category',
				grid: {
				  display: false,
				},
				ticks: {
				  display: true,
				},
			  },
			  y: {
				display: false,
			  },
			},
		  },
		});
	  } catch (error) {
		console.error(error);
	  }
	}
  
	const fetchAddedData = async () => {
	  try {
		const response = await axios.get("http://localhost:8000/v1/data/added");
		const data = response.data.data.filter((value) => value._id !== "lid");
		const values = data.map((value) => value.count);
  
		const maxValue = Math.max(...values);
		const total_values = values.reduce((a, b) => a + b, 0);
  
		added.max = maxValue;
		added.total = total_values;
	  } catch (error) {
		console.error(error);
	  }
	}
  
	onMount(() => {
	  fetchData();
	  fetchAddedData();
	});
  </script>
  <style>
	.col-span-2 { grid-column: span 2 / span 2; }
	.p-4 { padding: 1rem; }
	.md\:p-6 { padding: 1.5rem; }
	.border { border-width: 1px; }
	.border-zinc-200 { border-color: #e5e7eb; }
	.rounded-lg { border-radius: 0.5rem; }
	.w-full { width: 100%; }
	.grid { display: grid; }
	.md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	.gap-y-8 { gap: 2rem; }
	.flex { display: flex; }
	.flex-col { flex-direction: column; }
	.space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
	.space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
	.text-lg { font-size: 1.125rem; }
	.md\:text-xl { font-size: 1.25rem; }
	.font-bold { font-weight: 700; }
	.text-zinc-600 { color: #525252; }
	.bg-green-400\/40 { background-color: rgba(74, 222, 128, 0.4); }
	.text-emerald-500 { color: #10b981; }
	.text-xl { font-size: 1.25rem; }
	.font-semibold { font-weight: 600; }
	.rounded-lg { border-radius: 0.5rem; }
	.col-span-2 { grid-column: span 2 / span 2; }
	.border-zinc-200 { border-color: #e5e7eb; }
	.rounded-md { border-radius: 0.375rem; }
	.mt-8 { margin-top: 2rem; }
	.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	.gap-4 { gap: 1rem; }
	.md\:gap-6 { gap: 1.5rem; }
	.p-4 { padding: 1rem; }
	.md\:px-8 { padding-left: 2rem; padding-right: 2rem; }
	.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
	.items-center { align-items: center; }
	.gap-4 { gap: 1rem; }
	/* .p-1.5 { padding: 0.375rem; } */
	.bg-violet-500\/30 { background-color: rgba(139, 92, 246, 0.3); }
	.rounded-md { border-radius: 0.375rem; }
	.text-violet-500 { color: #8b5cf6; }
	.h-7 { height: 1.75rem; }
	.w-7 { width: 1.75rem; }
	.text-lg { font-size: 1.125rem; }
	.font-medium { font-weight: 500; }
	.text-2xl { font-size: 1.5rem; }
	.text-zinc-600 { color: #525252; }
	.gap-3 { gap: 0.75rem; }
	.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
	.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
	.text-sm { font-size: 0.875rem; }
	.bg-sky-600 { background-color: #0284c7; }
	.text-white { color: #ffffff; }
	.rounded-full { border-radius: 9999px; }
	.w-full { width: 100%; }
	.bg-violet-500\/20 { background-color: rgba(139, 92, 246, 0.2); }
	.h-2 { height: 0.5rem; }
	.bg-violet-400 { background-color: #a78bfa; }
	/* .p-1.5 { padding: 0.375rem; } */
	.bg-rose-500\/30 { background-color: rgba(244, 114, 182, 0.3); }
	.rounded-md { border-radius: 0.375rem; }
	.text-rose-500 { color: #f472b6; }
	.h-7 { height: 1.75rem; }
	.w-7 { width: 1.75rem; }
	.text-lg { font-size: 1.125rem; }
	.font-medium { font-weight: 500; }
	.text-2xl { font-size: 1.5rem; }
	.text-zinc-600 { color: #525252; }
	.gap-3 { gap: 0.75rem; }
	.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
	.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
	.text-sm { font-size: 0.875rem; }
	.bg-sky-600 { background-color: #0284c7; }
	.text-white { color: #ffffff; }
	.rounded-full { border-radius: 9999px; }
	.w-full { width: 100%; }
	.bg-rose-500\/20 { background-color: rgba(244, 114, 182, 0.2); }
	.h-2 { height: 0.5rem; }
	.bg-rose-400 { background-color: #f9a8d4; }
  </style>
  <div class="">
	<div class="col-span1-1 p-4 md:p-6 border border-zinc-200 rounded-lg">
		<div class="w-full grid md:grid-cols-3 gap-y-8">
		  <div class="flex flex-col space-y-6">
			<div class="space-y-2">
			  <h2 class="text-lg md:text-xl font-bold text-zinc-600">Published Articles</h2>
			  <h3 class="text-zinc-600">Total number of articles that are published month on month.</h3>
			</div>
			<div class="flex items-center justify-center px-4 py-4 w-fit bg-green-400/40 text-emerald-500 text-xl font-semibold   rounded-lg">
			  +{growth}%
			</div>
			<p class="text-zinc-600 text-lg">Total increment in published articles in a complete year.</p>
		  </div>
		  <div class="col-span-2">
			<!-- <Bar {options} {barData} /> -->
		  </div>
		</div>
		
		<div class="border border-zinc-200 rounded-md mt-8 grid grid-cols-2 p-4 md:px-8 gap-4 md:gap-6">
		  <div class="space-y-4">
			<div class="flex items-center gap-4">
			  <div class="p-1.5 bg-violet-500/30 w-7 rounded-md">
				<TiFolderAdd class="text-violet-500 h-7 w-7" />
			  </div>
			  <h3 class="text-lg font-medium text-zinc-600">Added</h3>
			</div>
			<div class="text-2xl font-medium text-zinc-600 flex items-center gap-3">
			  <span>+ {added.total} </span>
			  <div class="px-3 py-1 text-sm bg-sky-600 text-white rounded-full w-fit">
				Total
			  </div>
			</div>
			<div class="bg-violet-500/20 h-2 w-full rounded-full">
			  <div class="h-2 bg-violet-400 rounded-full" style="width: {(added.max*100)/( added.total)}%" />
			</div>
		  </div>
		  
		  <div class="space-y-4">
			<div class="flex items-center gap-4">
			  <div class="p-1.5 bg-rose-500/30 w-7 rounded-md">
				<MdPublish class="text-rose-500 h-7 w-7" />
			  </div>
			  <h3 class="text-lg font-medium text-zinc-600">Published</h3>
			</div>
			<div class="text-2xl font-medium text-zinc-600 flex items-center gap-3">
			  <span>+ {published.total} </span>
			  <div class="px-3 py-1 text-sm bg-sky-600 text-white rounded-full w-fit">
				Total
			  </div>
			</div>
			<div class="bg-rose-500/20 h-2 w-full rounded-full">
			  <div class="h-2 bg-rose-400 rounded-full" style="width: {(published.max*100)/( published.total)}%" />
			</div>
		  </div>
		</div>
	  </div>
	  <canvas id="barChart" width="400" height="100"></canvas>
  </div>
  
 
  