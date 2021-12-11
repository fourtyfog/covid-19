import React, { useEffect, useRef }  from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';



function SimpleChart(props){

	console.log(props.data)

	const chartRef = useRef(null);

	useEffect(() => {
		Chart.register(zoomPlugin);
		const ctx = chartRef.current.getContext("2d");
		new Chart(ctx, {
			type: props.type,
			data: {
				labels: props.label,
				datasets: props.data
			},
			options: {
				transitions: {
		      show: {
		        animations: {
		          x: {
		            from: 0
		          },
		          y: {
		            from: 0
		          }
		        }
		      },
		      hide: {
		        animations: {
		          x: {
		            to: 0
		          },
		          y: {
		            to: 0
		          }
		        }
		      }
		    },
		    plugins: {
					...props.options,
		      zoom: {
		      	pan: {
		         	enabled: true,
		          mode: 'xy'
		        },
		        zoom: {
		          wheel: {
		            enabled: true,
		          },
		          pinch: {
		            enabled: true
		          },
		          mode: 'xy',
		        }
		      }
		    }
		  }
		});
	}, [])

	return (
		<div>
			<canvas
			id="myChart"
			ref={chartRef}
			/>
		</div>
	)
	
}


SimpleChart.defaultProps = {
  label: [],
  data: [],
  options: {},
  type: "line",
  loading: false
}


export default SimpleChart;