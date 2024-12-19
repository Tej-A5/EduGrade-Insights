import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SgpaGraph = ({ registrationId }) => {
    const [sgpaData, setSgpaData] = useState([]);

    useEffect(() => {
        const fetchSgpaData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/sgpa/all`, {
                    params: { registrationId }
                });
                setSgpaData(response.data.sgpaData);
            } catch (error) {
                console.error('Error fetching SGPA data:', error);
            }
        };

        fetchSgpaData();
    }, [registrationId]);

    const data = {
        labels: sgpaData.map((entry) => `Semester ${entry.semester}`),
        datasets: [
            {
                label: 'SGPA',
                data: sgpaData.map((entry) => entry.sgpa),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.2
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `SGPA for Each Semester of Student ${registrationId}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 10, // Assuming SGPA is out of 10
                title: {
                    display: true,
                    text: 'SGPA',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Semester',
                },
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default SgpaGraph;
