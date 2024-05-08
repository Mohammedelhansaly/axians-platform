import React from 'react'
import './Chart.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ data }) => {
    const equipements1 = data.map(e => e.equipements);
    const equipmentByDate = equipements1.reduce((acc, equipment, index) => {
        const dates = data.map(e => new Date(e.created_at).getFullYear());

        const date = dates[index];


        acc[date] = (acc[date] || 0) + equipment.length;
        if (Object.keys(acc).length > 11) {
            const oldestYear = Math.min(...Object.keys(acc));
            delete acc[oldestYear];
        }
        return acc;
    }, {});

    // console.log(equipmentByDate);
    const labels = Object.keys(equipmentByDate);
    const counts = Object.values(equipmentByDate);

    return (
        <>
            <Bar
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Equipement',
                        data: counts,
                        backgroundColor: '#a20067'
                    }],

                }}
            />
        </>
    )
}

export default Chart