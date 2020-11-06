// functions for setting up properties for chart-js-2 with proper parameters

function chartData(props) {
  return(
      {
        labels: props.timeList,
        datasets: [
          {
            label: 'Temperature: ',
            type: "line",
            fill: false,
            lineTension: 0.1,
            backgroundColor: props.temperatureColor,
            borderColor: props.temperatureColor,
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: props.temperatureColor,
            pointBackgroundColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: props.temperatureColor,
            pointHoverBorderColor: props.temperatureColor,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            yAxisID: 'y-axis-2',
            data: props.valListT
          },
          {
            label: 'Precipitation: ',
            type: "bar",
            yAxisID: 'y-axis-1',
            fill: true,
            backgroundColor: props.rainColor,
            borderColor: props.rainColor,
            hoverBackgroundColor: props.rainColor,
            hoverBorderColor: props.rainColor,
            data: props.valListRain
          }
        ]
      }
  )
};

function chartOptions (props) {
  return (
    {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            type: "time",
            labels: props.timeList,
            time:{unit: "day"},
            display: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              min: 0,
              max: 5
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              min: -12,
              max: 15
            }
          }
        ]
      }
    }
  );
};


export { chartData, chartOptions};
