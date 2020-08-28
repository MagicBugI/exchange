import React , { useState }from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({charts , target , current}) => {
        const labels= []
        const data = [];
        
        charts.map((val , index)=>{
            labels.push(val.item);
            data.push(val.val)
        })
        const ready = {
            labels,
            datasets:[{
                label:`${target}`,
                data,
                backgroundColor:['rgb(75 , 192 ,192 , 0.6)'],
                borderWidth:3
            }]
        }

    return (
        <Line data={ready}></Line>
    )
}

export default Chart;