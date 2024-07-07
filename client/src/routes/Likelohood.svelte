<script>
    import { onMount } from 'svelte';
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
    import axios from 'axios';
    // import TotalDocument from './TotalDocument.svelte';
  
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
    let chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [30, 50, 11, 30, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [30, 50, 11, 30, 90],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
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
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/data/relevancevslikelihood");
        const { relevance, likelihood } = response.data;
  
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const completeRelevance = [];
        const completeLikelihood = [];
  
        allMonths.forEach(month => {
          const existingEntry = relevance.find(entry => entry._id === month);
          const totalRelevance = existingEntry ? existingEntry.totalRelevance : 0;
          completeRelevance.push({ "_id": month, "totalRelevance": totalRelevance });
        });
  
        allMonths.forEach(month => {
          const existingEntry = likelihood.find(entry => entry._id === month);
          const totalLikelihood = existingEntry ? existingEntry.totalLikelihood : 0;
          completeLikelihood.push({ "_id": month, "totalLikelihood": totalLikelihood });
        });
  
        const sortedRelevance = completeRelevance.sort((a, b) => {
          const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return monthsOrder.indexOf(a._id) - monthsOrder.indexOf(b._id);
        });
  
        const sortedLikelihood = completeLikelihood.sort((a, b) => {
          const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return monthsOrder.indexOf(a._id) - monthsOrder.indexOf(b._id);
        });
  
        const relevanceValue = sortedRelevance.map(value => value.totalRelevance);
        const likelihoodValue = sortedLikelihood.map(value => value.totalLikelihood);
  
        chartData = {
          labels: allMonths,
          datasets: [
            {
              label: 'Total Relevance is ',
              data: relevanceValue,
              backgroundColor: '#ff4747',
            },
            {
              label: 'Total Likelihood is ',
              data: likelihoodValue,
              backgroundColor: '#ffd447',
            },
          ],
        };
  
        // Update the chart with new data
        updateChart();
      } catch (error) {
        console.log(error);
      }
    };
  
    let chart;
  
    onMount(() => {
      fetchData();
  
      const ctx = document.getElementById('likeliChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options,
      });
    });
  
    const updateChart = () => {
      if (chart) {
        chart.data = chartData;
        chart.update();
      }
    };
  </script>
  

   
    <canvas id="likeliChart" width="300" height="80"></canvas>

  