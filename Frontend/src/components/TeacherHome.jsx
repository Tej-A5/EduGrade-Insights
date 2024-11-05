import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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


const TeacherHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [resultType, setResultType] = useState('mid-sem');
    const [resultTypebar, setResultTypebar] = useState('mid-sem');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [classes, setClasses] = useState([]); // State for classes

    const [subject, setSubject] = useState('sei'); // Default subject
    // const [subjects, setSubjects] = useState([]);
    const [marksData, setMarksData] = useState([]);
    const [year, setYear] = useState(2024);   
    const [scores, setScores] = useState([]);
    const [classform, setClassform] = useState(false);
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [classbranch, setClassbranch] = useState('');
    const [classyear, setClassyear] = useState('');
    const [classsubject, setClasssubject] = useState('');

    useEffect(() => {
        const storedTeacher = JSON.parse(localStorage.getItem('teacher'));
        if (storedTeacher) {
            setTeacher(storedTeacher);
            console.log(storedTeacher);
            fetchClasses(storedTeacher.name);
        } else {
            navigate('/');
        }
        const fetchMarksData = async () => {
            try {
                // console.log(storedStudent.year);
                // console.log(year);
                // console.log(storedStudent.subject);
                // console.log(storedStudent.resultType);
                // console.log(storedStudent.year);
                // console.log(storedStudent.regid);
                // console.log(storedStudent);
                const response = await axios.get(
                    `http://localhost:5000/api/marks?subject=${subject}&resultType=${resultTypebar}&year=${year}`
                );
                setMarksData(response.data.scores);
                // console.log(response.data.scores);
            } catch (error) {
                console.error('Error fetching marks data:', error);
            }
        };
        const fetchLowestScores = async () => {
            console.log("gg");
    
            try {
                // setError(null);
                const response = await axios.get(`http://localhost:5000/api/lowest-scores?subject=${subject}&resultType=${resultTypebar}&year=${year}`);
                if (Array.isArray(response.data.lowestScores)) {
                    setScores(response.data.lowestScores);
                } else {
                    console.error("Unexpected data format:", response.data);
                    setScores([]);
                }
                // console.log("Lowest scores fetched:", response.data.lowestScores);
            } catch (err) {
                console.log(err.response?.data?.message );
            }
        };

        fetchMarksData();
        fetchLowestScores();
    }, [navigate, subject, resultTypebar, year]);

    

    const fetchClasses = async (teacherName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/classes/by-teacher?name=${encodeURIComponent(teacherName)}`);
            if (response.data.success) {
                setClasses(response.data.classes); // Store fetched classes in state
            } else {
                console.error('Failed to fetch classes:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('teacher');
        navigate('/');
    };

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleCsvUpload = async () => {
        if (!csvFile || !selectedSubject || !selectedYear) return;

        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('resultType', resultType);
        formData.append('subject', selectedSubject);
        formData.append('year', selectedYear);

        try {
            const response = await axios.post('http://localhost:5000/api/results/upload-csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data.message);
            setIsModalOpen(false); // Close modal on successful upload
        } catch (error) {
            console.error('Error uploading CSV:', error);
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
                text: `Marks Distribution for ${subject} (${resultTypebar}) ${year}`,
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

    const handleClick = (tempyear, tempsubject) => {
        setYear(tempyear);
        setSubject(tempsubject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setMessage('');
        const email = teacher.email;
        console.log("abc0");
        try {
            const response = await axios.post(`http://localhost:5000/api/teachersclass/add-class?email=${email}&year=${classyear}&branch=${classbranch}&subject=${classsubject}`);
            console.log(response);
            // setMessage(response.data.message);
        } catch (error) {
            // setMessage(error.response?.data?.message || 'Error adding class');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {/* Navbar */}
            <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
                <h1 className="text-2xl font-semibold">TeacherHome</h1>
                {teacher && <h2>Hello, {teacher.name}</h2>}
                {/* <button onClick={handleLogout} className="text-red-500 hover:underline ml-4">Logout</button> */}
            </nav>

            {/* Main content area */}
            <div className="flex flex-grow mx-4 mb-4 space-x-4">
                {/* Left Sidebar - Class List */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <ul>
                        <li>
                            <button onClick={handleLogout} className="w-full py-2 px-4 text-left text-red-200 hover:bg-red-600 rounded">Logout</button>
                        </li>
                    </ul>
                    <h3 className="text-lg font-semibold m-4">Class List</h3>
                    <ul>
                        {classes.map((classItem, index) => (
                            <li key={index} className="mb-2">
                                <button
                                    onClick={() => handleClick(classItem.year, classItem.subject)}
                                    className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                                >
                                    {classItem.year} - {classItem.branch} - {classItem.subject}
                                </button>
                                
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
                    <div className="space-y-6">
                        <section className="p-6 bg-slate-300 bg-opacity-100 text-black rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Marks Histogram</h2>

                                {/* Dropdowns for Subject and Result Type */}
                                <div className="flex space-x-4">
                                    {/* <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        <option value="">Select Subject</option>
                                        {classes.map((classItem, index) => (
                                            <option key={index} value={classItem.subject}>
                                                {classItem.subject}
                                            </option>
                                        ))}
                                    </select> */}
                                    <select
                                        value={resultTypebar}
                                        onChange={(e) => setResultTypebar(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        <option value="mid-sem">Mid Sem</option>
                                        <option value="end-sem">End Sem</option>
                                        <option value="final-grade">Final Grade</option>
                                    </select>
                                    {/* <select 
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        <option value="">Select Year</option>
                                        {classes.map((classItem, index) => (
                                            <option key={index} value={classItem.year}>
                                                {classItem.year}
                                            </option>
                                        ))}
                                    </select> */}
                                </div>
                                
                            </div>
                            <div style={{ width: '80%', margin: '0 auto' }}>
                                    <Bar data={data} options={options} />
                            </div>
                        </section>

                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Class Activities</h2>
                            <p>This section can contain additional information related to the class.</p>
                            <h3>5 Lowest Scores</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Registration ID</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.registrationId}</td>
                                            <td>{entry.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </main>

                {/* Right Sidebar - Add Result Button */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Options</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                        Add Result
                    </button>
                    <button
                        onClick={() => setClassform(true)}
                        className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                        Add Class
                    </button>
                </aside>
            </div>

            {/* CSV Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h3 className="text-xl font-semibold mb-4">Upload Results CSV</h3>
                        <select
                            value={resultType}
                            onChange={(e) => setResultType(e.target.value)}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="mid-sem">Mid Sem</option>
                            <option value="end-sem">End Sem</option>
                            <option value="final-grade">Final Grade</option>
                        </select>

                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="">Select Subject</option>
                            {classes.map((classItem, index) => (
                                <option key={index} value={classItem.subject}>
                                    {classItem.subject}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="">Select Year</option>
                            {classes.map((classItem, index) => (
                                <option key={index} value={classItem.year}>
                                    {classItem.year}
                                </option>
                            ))}
                        </select>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCsvUpload}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {classform && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">

                    
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <h2 className="text-xl font-semibold mb-4">Add Class</h2>
                            {/* <label>
                                Teacher Email:
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label> */}
                            <label>
                                Year:
                                <input type="text" 
                                    value={classyear} 
                                    onChange={(e) => setClassyear(e.target.value)} 
                                    required 
                                    className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                                />
                            </label>
                            <label>
                                Branch:
                                <input type="text" 
                                    value={classbranch} 
                                    onChange={(e) => setClassbranch(e.target.value)} 
                                    required 
                                    className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                                />
                            </label>
                            <label>
                                Subject:
                                <input type="text" 
                                    value={classsubject} 
                                    onChange={(e) => setClasssubject(e.target.value)} 
                                    required 
                                    className="mb-4 w-full border border-gray-300 p-2 rounded-md"/>
                            </label>
                            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Class</button>
                            {/* {message && <p>{message}</p>} */}
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
};

export default TeacherHome;
