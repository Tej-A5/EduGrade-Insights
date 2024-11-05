// import React from 'react';
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

const StudentHome = () => {
    const [subject, setSubject] = useState('sei'); // Default subject
    const [resultType, setResultType] = useState('mid-sem'); // Default result type
    const [marksData, setMarksData] = useState([]);
    const [year, setYear] = useState(null);   
    const [subjects, setSubjects] = useState([]);
    const [regId, setRegId] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem('student'));
        if (storedStudent && storedStudent.year) {
            setYear(storedStudent.year); // Assuming year is a property of the stored student object
            setRegId(storedStudent.regid);
            // console.log(storedStudent.year);
        }
        console.log(storedStudent);
        // console.log(storedStudent);
        if (storedStudent ) {
            setUser(storedStudent);
            // console.log(storedStudent.year);
        } else {
            // Redirect or show an error if the user is not a student
            // navigate('/login');
        }
    }, []);

    // Fetch marks data based on selected subject and result type
    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem('student'));
        const fetchMarksData = async () => {
            try {
                // console.log(storedStudent.year);
                // console.log(year);
                // console.log(storedStudent.subject);
                // console.log(storedStudent.resultType);
                console.log(storedStudent.year);
                console.log(storedStudent.regid);
                console.log(storedStudent);
                const response = await axios.get(
                    `http://localhost:5000/api/marks?subject=${subject}&resultType=${resultType}&year=${storedStudent.year}`
                );
                setMarksData(response.data.scores);
                console.log(response.data.scores);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching marks data:', error);
            }
        };

        fetchMarksData();
        // const loggedUser = JSON.parse(localStorage.getItem('student'));
        
        // const registrationId = storedStudent.regid; // Adjust if necessary

        if (storedStudent.regid) {
            fetchSubjects(storedStudent.regid);
        } else {
            // setError("No registration ID found in local storage.");
        }
    }, [subject, resultType, year, regId]);

    
    const fetchSubjects = async (registrationId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/subjects?registrationId=${registrationId}`);
            console.log("gg");
            console.log(response.data);
            if (response.data) {
                setSubjects(response.data.subjects); // Set subjects from response
                console.log(response.data.subjects);
            } else {
                // setError("No subjects found for this registration ID.");
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            // setError("Failed to fetch subjects. Please try again later.");
        }
    };

    const getMarksDistribution = () => {
        const intervals = new Array(20).fill(0); // Array to hold count for each 5-mark bin (0-100)
        // console.log(marksData.year);
        marksData.forEach(mark => {
            if (mark >= 0 && mark <= 100) {
                const index = Math.floor(mark / 5);
                intervals[index] += 1;
            }
        });

        return intervals;
    };

    // Prepare chart data
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
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {/* Navbar */}
            <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
                <h1 className="text-2xl font-semibold">Studenthome</h1>
                
                <h1>Welcome, {user ? user.name : 'Student'}!</h1>
            </nav>
            

            {/* Main content area */}
            <div className="flex flex-grow mx-4 mb-4 space-x-4">
                {/* Left Sidebar */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <ul>
                        <li className="mb-4">
                            <button className="w-full py-2 px-4 text-left text-indigo-200 hover:bg-indigo-600 rounded">Home</button>
                        </li>
                        <li>
                            <button className="w-full py-2 px-4 text-left text-red-200 hover:bg-red-600 rounded">Logout</button>
                        </li>
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
                    <div className="flex flex-col mx-4 mb-4 space-y-6">
                        {/* Top Section - Histogram */}
                        <section className="p-6 bg-slate-300 bg-opacity-100 text-black rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Marks Histogram</h2>

                                {/* Dropdowns for Subject and Result Type */}
                                <div className="flex space-x-4">
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        {/* <option value="sei">sei</option>
                                        <option value="AT">AT</option> */}
                                        <option value="">Select Subject</option>
                                        {subjects.map((subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={resultType}
                                        onChange={(e) => setResultType(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        <option value="mid-sem">Mid Sem</option>
                                        <option value="end-sem">End Sem</option>
                                        <option value="final-grade">Final Grade</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div style={{ width: '80%', margin: '0 auto' }}>
                                    <Bar data={data} options={options} />
                            </div>
                            
                        </section>
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Class Activities</h2>
                            <p>This section can contain additional information related to the class.</p>
                        </section>
                    </div>

                </main>

                {/* Right Sidebar */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Subject List</h3>
                    <button
                        className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                        Add Subject
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default StudentHome;
