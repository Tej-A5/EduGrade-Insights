// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Graph = ({subject, resultType, year}) => {
//     const [marksData, setMarksData] = useState([]);

//     useEffect(() => {
//         // const storedStudent = JSON.parse(localStorage.getItem('student'));
//         const fetchMarksData = async () => {
//             try {
//                 const response = await axios.get(
//                     `http://localhost:5000/api/marks?subject=${subject}&resultType=${resultType}&year=${year}`
//                 );
//                 setMarksData(response.data.scores);
//                 console.log(response.data.scores);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error('Error fetching marks data:', error);
//             }
//         };

//         fetchMarksData();
//     }, [subject, resultType, year]);

//     const getMarksDistribution = () => {
//         const intervals = new Array(20).fill(0); // Array to hold count for each 5-mark bin (0-100)
//         // console.log(marksData.year);
//         marksData.forEach(mark => {
//             if (mark >= 0 && mark <= 100) {
//                 const index = Math.floor(mark / 5);
//                 intervals[index] += 1;
//             }
//         });

//         return intervals;
//     };

//     // Prepare chart data
//     const marksDistribution = getMarksDistribution();
//     const labels = Array.from({ length: 20 }, (_, i) => `${i * 5}-${i * 5 + 4}`);

//     const data = {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Number of Students',
//                 data: marksDistribution,
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: `Marks Distribution for ${subject} (${resultType}) ${year}`,
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: 'Number of Students',
//                 },
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Marks Range',
//                 },
//             },
//         },
//     };

//     return (
//         <div style={{ width: '80%', margin: '0 auto' }}>
//                 <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default Graph;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ subject, resultType, year }) => {
    const [marksData, setMarksData] = useState([]);
    const [stats, setStats] = useState({
        average: 0,
        median: 0,
        highest: 0,
        lowest: 0
    });

    useEffect(() => {
        const fetchMarksData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/marks?subject=${subject}&resultType=${resultType}&year=${year}`
                );
                setMarksData(response.data.scores);
                calculateStatistics(response.data.scores);
            } catch (error) {
                console.error('Error fetching marks data:', error);
            }
        };

        fetchMarksData();
    }, [subject, resultType, year]);

    const calculateStatistics = (data) => {
        if (!data || data.length === 0) return;

        const sortedData = [...data].sort((a, b) => a - b);
        const sum = data.reduce((acc, val) => acc + val, 0);
        const average = sum / data.length;
        const median = data.length % 2 === 0
            ? (sortedData[data.length / 2 - 1] + sortedData[data.length / 2]) / 2
            : sortedData[Math.floor(data.length / 2)];
        const highest = Math.max(...data);
        const lowest = Math.min(...data);

        setStats({ average, median, highest, lowest });
    };

    const getMarksDistribution = () => {
        const intervals = new Array(20).fill(0);
        marksData.forEach(mark => {
            if (mark >= 0 && mark <= 100) {
                const index = Math.floor(mark / 5);
                intervals[index] += 1;
            }
        });
        return intervals;
    };

    const marksDistribution = getMarksDistribution();
    const labels = Array.from({ length: 20 }, (_, i) => `${i * 5}-${i * 5 + 4}`);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Number of Students',
                data: marksDistribution,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
            title: {
                display: true,
                text: `Marks Distribution for ${subject} (${resultType}) ${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Students',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Marks Range',
                },
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }} className='flex flex-row'>
            <Bar data={data} options={options} />
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Statistics</h3>
                <p><strong>Average:</strong> {stats.average.toFixed(2)}</p>
                <p><strong>Median:</strong> {stats.median}</p>
                <p><strong>Highest:</strong> {stats.highest}</p>
                <p><strong>Lowest:</strong> {stats.lowest}</p>
            </div>
        </div>
    );
};

export default Graph;
