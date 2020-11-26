import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css';

const Chart = ({ charts ,  currentLabel , calculateLabel }) => {
    const labels = []
    const data = [];
    if (charts) {
        charts.sort((a, b) => {
            return new Date(a.item) - new Date(b.item)
        })
    }
    charts.map((val) => {
        labels.push(val.item);
        data.push(val.val.toFixed(3))
    })

    const ready = {
        labels,
        datasets: [
          {
            fill: false,
            lineTension: 0.5,
            borderColor: '#f3eac2',
            borderWidth: 2,
            data
          }
        ]
      }

    return (
        <div className='chart'>
            <Line height='100%'
                data={ready}
                options={{
                    title: {
                        display: true,
                        text: `The rate ${currentLabel} to ${calculateLabel}`,
                        fontSize: 20
                    },
                    legend: {
                        display: false,
                        position: 'top'
                    },
                    maintainAspectRatio: false
                    
                }}
            />
        </div>
    )
}

export default Chart;