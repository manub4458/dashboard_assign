<script>
    import { onMount } from 'svelte';
    import { Pie } from 'svelte-chartjs';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import required components
    import axios from 'axios';
  
    ChartJS.register(ArcElement, Tooltip, Legend); // Register components
  
    let chartData = {
      labels: [],
      datasets: [],
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/data/country");
        const data = response.data.data.filter((value) => value._id !== "");
        const countries = [];
        const count = [];
  
        for (let i = 0; i < data.length; i++) {
          countries.push(data[i]["_id"]);
          count.push(data[i]["count"]);
        }
  
        // Ensure at least one data point is non-zero for pie chart visibility
        if (count.every(value => value === 0)) {
          console.warn("All data points are zero. Pie chart might not be visible.");
        }
  
        const updatedChartData = {
          labels: countries,
          datasets: [
            {
              label: 'published',
              data: count,
              backgroundColor: [
                '#fc743a',
                '#fcba03',
                '#fc3a3a',
                '#a23afc',
                '#3ad6fc',
                '#3afc64',
              ],
            },
          ],
        };
  
        chartData = updatedChartData; // Update chart data state
      } catch (error) {
        console.error(error);
      }
    };
  
    onMount(() => {
      fetchData();
    });
  </script>
  
  <style>
    /* Add your custom styles for the chart here, e.g., height */
    .chart-container {
      height: 600px; /* Adjust as needed */
    }
  </style>
  
  <div class="chart-container ">
    <Pie data={chartData} 
    height="600"
    width="1000"
    />
  </div>
  