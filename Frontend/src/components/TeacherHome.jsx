// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TeacherHome = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [csvFile, setCsvFile] = useState(null);
//     const [resultType, setResultType] = useState('mid-sem'); // Default value for result type
//     const navigate = useNavigate();
//     const [teacher, setTeacher] = useState(null);
//     const [year, setYear] = useState(''); // New state for year

//     useEffect(() => {
//         // Check if teacher info is saved in localStorage
//         const storedTeacher = localStorage.getItem('teacher');
//         if (storedTeacher) {
//             setTeacher(JSON.parse(storedTeacher));
//         } else {
//             // Redirect to login if no teacher is found in localStorage
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem('teacher'); // Clear teacher info on logout
//         navigate('/login');
//     };

//     const handleFileChange = (e) => {
//         setCsvFile(e.target.files[0]);
//     };

//     const handleCsvUpload = async () => {
//         if (!csvFile || !year) return;

//         const formData = new FormData();
//         formData.append('file', csvFile);
//         formData.append('resultType', resultType); // Append the selected result type
//         formData.append('year', year); // Include year in FormData

//         try {
//             const response = await axios.post('http://localhost:5000/api/results/upload-csv', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log(response.data.message);
//             setIsModalOpen(false); // Close modal on successful upload
//         } catch (error) {
//             console.error('Error uploading CSV:', error);
//         }
//     };

//     // Check if the teacher data is loaded before rendering the component
//     if (!teacher) {
//         return <div>Loading...</div>; // Display loading state while fetching teacher info
//     }

//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//             {/* Navbar */}
//             <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
//                 <h1 className="text-2xl font-semibold">TeacherHome</h1>
//                 <h2>Hello, {teacher.name}</h2>
//             </nav>

//             {/* Main content area */}
//             <div className="flex flex-grow mx-4 mb-4 space-x-4">
//                 {/* Left Sidebar - Student List */}
//                 <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
//                     <h3 className="text-lg font-semibold mb-4">Student List</h3>
//                     <ul>
//                         <li className="mb-2">Student A</li>
//                         <li className="mb-2">Student B</li>
//                         <li className="mb-2">Student C</li>
//                         <li className="mb-2">Student D</li>
//                         <li className="mb-2">Student E</li>
//                     </ul>
//                 </aside>

//                 {/* Center Content */}
//                 <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
//                     <div className="space-y-6">
//                         {/* Top Section */}
//                         <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
//                             <h2 className="text-xl font-bold mb-2">Class Overview</h2>
//                             <p>Content for the class overview section goes here. This could include an introduction or any other primary information.</p>
//                         </section>

//                         {/* Bottom Section */}
//                         <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
//                             <h2 className="text-xl font-bold mb-2">Class Activities</h2>
//                             <p>This section can contain additional information, a summary, or any relevant supporting details related to the class.</p>
//                         </section>
//                     </div>
//                 </main>

//                 {/* Right Sidebar - Add Result Button */}
//                 <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
//                     <h3 className="text-lg font-semibold mb-2">Options</h3>
//                     <ul>
//                         <li className="mb-2">Class A</li>
//                         <li className="mb-2">Class B</li>
//                         <li className="mb-2">Class C</li>
//                         <li className="mb-2">Class D</li>
//                     </ul>
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
//                     >
//                         Add Result
//                     </button>
//                 </aside>
//             </div>

//             {/* CSV Upload Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-md shadow-md w-96">
//                         <h3 className="text-xl font-semibold mb-4">Upload Results CSV</h3>
//                         <select
//                             value={resultType}
//                             onChange={(e) => setResultType(e.target.value)}
//                             className="mb-4 w-full border border-gray-300 p-2 rounded-md"
//                         >
//                             <option value="mid-sem">Mid Sem</option>
//                             <option value="end-sem">End Sem</option>
//                             <option value="final-grade">Final Grade</option>
//                         </select>
//                         <select
//                             value={year}
//                             onChange={(e) => setYear(e.target.value)}
//                             className="mb-4 w-full border border-gray-300 p-2 rounded-md"
//                         >
//                             <option value="">Select Year</option>
//                             <option value="2022">2022</option>
//                             <option value="2023">2023</option>
//                             <option value="2024">2024</option>
//                             {/* Add more years as needed */}
//                         </select>
//                         <input
//                             type="file"
//                             accept=".csv"
//                             onChange={handleFileChange}
//                             className="mb-4 w-full border border-gray-300 p-2 rounded-md"
//                         />
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleCsvUpload}
//                                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                             >
//                                 Upload
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TeacherHome;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [resultType, setResultType] = useState('mid-sem');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    
    useEffect(() => {
        // Check if teacher info is saved in localStorage
        const storedTeacher = JSON.parse(localStorage.getItem('teacher'));
        console.log('Stored teacher data:', localStorage.getItem('teacher'));
        console.log(storedTeacher);
        if (storedTeacher ) {
            setTeacher(storedTeacher);
        } else {
            // Redirect to login if no teacher is found in localStorage
            navigate('/');
        }
    }, [navigate]); // Adding navigate to dependency array

    const handleLogout = () => {
        localStorage.removeItem('teacher'); // Clear teacher info on logout
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

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {/* Navbar */}
            <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
                <h1 className="text-2xl font-semibold">TeacherHome</h1>
                {teacher ? (  // Check if teacher is not null
                    <h2>Hello, {teacher.name}</h2>
                ) : (
                    <h2>Hello, Guest</h2> // Fallback in case teacher data is not available
                )}
            </nav>

            {/* Main content area */}
            <div className="flex flex-grow mx-4 mb-4 space-x-4">
                {/* Left Sidebar - Student List */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Student List</h3>
                    <ul>
                        <li className="mb-2">Student A</li>
                        <li className="mb-2">Student B</li>
                        <li className="mb-2">Student C</li>
                        <li className="mb-2">Student D</li>
                        <li className="mb-2">Student E</li>
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
                    <div className="space-y-6">
                        {/* Top Section */}
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Class Overview</h2>
                            <p>Content for the class overview section goes here.</p>
                        </section>

                        {/* Bottom Section */}
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Class Activities</h2>
                            <p>This section can contain additional information related to the class.</p>
                        </section>
                    </div>
                </main>

                {/* Right Sidebar - Add Result Button */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Options</h3>
                    <ul>
                        <li className="mb-2">Class A</li>
                        <li className="mb-2">Class B</li>
                        <li className="mb-2">Class C</li>
                        <li className="mb-2">Class D</li>
                    </ul>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                    >
                        Add Result
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
                        {/* Subject Selection */}
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="">Select Subject</option>
                            {/* Replace with actual subjects from teacher data */}
                            {teacher && teacher.classes.map((classItem, index) => (
                                <option key={index} value={classItem.subject}>
                                    {classItem.subject}
                                </option>
                            ))}
                        </select>
                        {/* Year Selection */}
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="mb-4 w-full border border-gray-300 p-2 rounded-md"
                        >
                            <option value="">Select Year</option>
                            {teacher && teacher.classes.map((classItem, index) => (
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
        </div>
    );
};

export default TeacherHome;
