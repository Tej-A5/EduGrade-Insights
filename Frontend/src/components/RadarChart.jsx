import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ registrationId, examType }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchRadarData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/radar-chart-data', {
                    params: { registrationId, examType },
                });
                setChartData(response.data.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching radar chart data:', error);
            }
        };

        fetchRadarData();
    }, [registrationId, examType]);

    if (!chartData) {
        return <p>Loading...</p>;
    }

    const labels = chartData.map((entry) => entry.subject);
    const scores = chartData.map((entry) => entry.score);

    const data = {
        labels,
        datasets: [
            {
                label: `Marks in ${examType}`,
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Score: ${context.raw}`,
                },
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Radar data={data} options={options} />
        </div>
    );
};

export default RadarChart;
