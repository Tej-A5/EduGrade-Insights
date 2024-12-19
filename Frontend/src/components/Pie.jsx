import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CreditsPieChart = ({ registrationId, semester }) => {
    const [subjectCredits, setSubjectCredits] = useState([]);

    useEffect(() => {
        const fetchSubjectCredits = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/credits`, {
                    params: { registrationId, semester }
                });
                setSubjectCredits(response.data.subjectCredits);
                // console.log(response);
            } catch (error) {
                console.error('Error fetching subject credits:', error);
            }
        };

        fetchSubjectCredits();
    }, [registrationId, semester]);

    // Prepare data for the pie chart
    const data = {
        labels: subjectCredits.map((entry) => entry.subject),
        datasets: [
            {
                label: 'Credits',
                data: subjectCredits.map((entry) => entry.credit),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
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
                    label: (tooltipItem) => `Credits: ${tooltipItem.raw}`,
                },
            },
            title: {
                display: true,
                text: `Credit Distribution for Semester ${semester}`,
            },
        },
    };

    return (
        <div style={{ width: '60%', margin: '0 auto' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default CreditsPieChart;
