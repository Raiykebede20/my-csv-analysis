
// Data for Chart.js (comes from Flask backend)
const chartData = {{ chart_data | tojson | safe }};
const chartLabels = {{ chart_labels | tojson | safe }};

// Numeric Chart (Histogram-like or Scatter, for simplicity let's use a Bar chart if few unique values, otherwise suggest Histogram idea)
if (chartData.numeric && chartLabels.numeric) {
    const numericCtx = document.getElementById('numericChart').getContext('2d');

    // For simplicity, let's just plot the raw numeric values as a bar chart.
    // For a true histogram, you'd need to calculate bins in Python.
    new Chart(numericCtx, {
        type: 'line', // Line chart is better for showing trends of numeric data
        data: {
            labels: Array.from({length: chartData.numeric.length}, (_, i) => i + 1), // Simple index as label
            datasets: [{
                label: chartLabels.numeric,
                data: chartData.numeric,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Data Point Index'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: chartLabels.numeric
                    }
                }]
            }
        }
    });
}

// Categorical Chart (Bar Chart)
if (chartData.categorical_labels && chartLabels.categorical) {
    const categoricalCtx = document.getElementById('categoricalChart').getContext('2d');
    new Chart(categoricalCtx, {
        type: 'bar',
        data: {
            labels: chartData.categorical_labels,
            datasets: [{
                label: 'Count of ' + chartLabels.categorical,
                data: chartData.categorical_counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 102, 0.6)',
                    'rgba(120, 200, 20, 0.6)',
                    'rgba(20, 120, 200, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 102, 1)',
                    'rgba(120, 200, 20, 1)',
                    'rgba(20, 120, 200, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}