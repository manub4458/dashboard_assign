<script>
    import { onMount } from 'svelte';
    import { Scatter } from 'svelte-chartjs';
    import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
  
    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
  
    let chartData = {
      datasets: [],
    };
    export const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    const colors = [
      "#ff6384",
      "#6b1f82",
      "#458ae6",
      "#50bf77",
      "#f27d07",
      "#ff0f0f",
    ];
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/data/intensity");
        const inputData = response.data;
  
        const formattedData = inputData.reduce((acc, entry) => {
          const { year, data } = entry;
  
          const existingYear = acc.find((d) => d.year === year);
          if (existingYear) {
            existingYear.data.push(data);
          } else {
            acc.push({
              year,
              data: [data],
            });
          }
  
          return acc;
        }, []);
  
        const updatedChartData = {
          datasets: formattedData.flatMap((yearData) => {
            return yearData.data.map((monthData, index) => ({
              label: `${yearData.year} - ${monthData[0].month}`,
              data: monthData[0].intensity.map((intensity, index) => ({
                x: index + 1,
                y: intensity || 0,
              })),
              backgroundColor: colors[index],
            }));
          }),
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
      height: 200px; /* Adjust as needed */
    }
  </style>
  
  <div class="chart-container">
    <Scatter options={options} data={chartData} />
  </div>
  
  <!-- <script>
    export const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  </script> -->
  