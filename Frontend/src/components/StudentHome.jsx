// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Graph from './Graph';
import SgpaGraph from './SgpaGraph';
import CreditsPieChart from './Pie';
import RadarChart from './RadarChart';

const StudentHome = () => {
    const [subject, setSubject] = useState(''); // Default subject
    const [resultType, setResultType] = useState('mid-sem'); // Default result type
    const [year, setYear] = useState(null);   
    const [subjects, setSubjects] = useState([]);
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);
    const [regiid, setRegiid] = useState();
    const navigate = useNavigate();
    const [semester, setSemester] = useState("1");

    const [home, setHome] = useState(true);
    // const [details, setDetails] = useState(false);

    useEffect(() => {
        const storedStudent = JSON.parse(localStorage.getItem('student'));
        if (storedStudent && storedStudent.year) {
            setYear(storedStudent.year); // Assuming year is a property of the stored student object
            setUser(storedStudent);
            setRegiid(storedStudent.regid);
            // console.log(storedStudent);
        }
        fetchSubjects(storedStudent.regid);
        fetchScores(storedStudent.regid);
        // console.log(user);
    }, []);

    const fetchSubjects = async (registrationId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/subjects?registrationId=${registrationId}`);
            // console.log("gg");
            // console.log(response.data);
            if (response.data) {
                setSubjects(response.data.subjects); // Set subjects from response
                // console.log(response.data.subjects);
            } else {
                // setError("No subjects found for this registration ID.");
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            // setError("Failed to fetch subjects. Please try again later.");
        }
    };

    const fetchScores = async (registrationId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/results/scores?registrationId=${registrationId}`);

            setScores(response.data.scores);
            // console.log(response.data.scores);
            // setMessage('');
        } catch (error) {
            setScores([]);
            // setMessage(error.response?.data?.message || 'Error fetching scores');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('student');
        navigate('/');
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
                            <button onClick={() => setHome(true)} className="w-full py-2 px-4 text-left text-indigo-200 hover:bg-indigo-600 rounded">Home</button>
                        </li>
                        <li className="mb-4">
                            <button onClick={() => setHome(false)}  className="w-full py-2 px-4 text-left text-indigo-200 hover:bg-indigo-600 rounded">Details</button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="w-full py-2 px-4 text-left text-red-200 hover:bg-red-600 rounded">Logout</button>
                        </li>
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
                    {home && (
                        <div className="flex flex-col mx-4 mb-4 space-y-6">
                            {/* Top Section - Histogram */}
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
                                            <option value=" ">Select Subject</option>
                                            {subjects.map((subject, index) => (
                                                <option key={index} value={subject}>
                                                    {subject}
                                                </option>
                                            ))}
                                        </select> */}
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
                                <Graph subject={subject} resultType={resultType} year={year} />
                            </section>
                            <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-2">Class Activities</h2>
                                <p>This section can contain additional information related to the class.</p>
                                <div>
                                    <table border="1" cellPadding="10" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Exam Type</th>
                                                <th>Year</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scores.map((mark, subjectIndex) => (
                                                mark.exams.map((exam, examIndex) => (
                                                    <tr key={`${subjectIndex}-${examIndex}`}>
                                                        <td>{mark.subject}</td>
                                                        <td>{exam.type}</td>
                                                        <td>{exam.year}</td>
                                                        <td>{exam.score}</td>
                                                    </tr>
                                                ))
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}
                    {!home && (
                        <div className="flex flex-col mx-4 mb-4 space-y-6">
                            <section className="p-6 bg-slate-300 bg-opacity-100 text-black rounded-lg shadow-lg">
                                <SgpaGraph registrationId={regiid} />

                                <div className="flex space-x-4">
                                    <select
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        className="p-2 rounded-md bg-white text-gray-700"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>

                                <CreditsPieChart registrationId={regiid} semester={semester} />

                                <select
                                    value={resultType}
                                    onChange={(e) => setResultType(e.target.value)}
                                    className="p-2 rounded-md bg-white text-gray-700"
                                >
                                    <option value="mid-sem">Mid Sem</option>
                                    <option value="end-sem">End Sem</option>
                                    <option value="final-grade">Final Grade</option>
                                </select>
                                <RadarChart registrationId={regiid} examType={resultType} />
                            </section>
                        </div>
                    )}
                </main>

                {/* Right Sidebar */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Subject List</h3>
                    <ul>
                        {subjects.map((subject, index) => (
                            <li key={index} className="mb-2">
                                <button
                                    onClick={() => setSubject(subject)}
                                    className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                                >
                                    {/* {classItem.year} - {classItem.branch} - {classItem.subject} */}
                                    {subject}
                                </button>
                                
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default StudentHome;
