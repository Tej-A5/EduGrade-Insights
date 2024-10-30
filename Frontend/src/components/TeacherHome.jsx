// import React from 'react';

// const TeacherHome = () => {
//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//             {/* Navbar */}
//             <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
//                 <h1 className="text-2xl font-semibold">TeacherHome</h1>
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
//                     <button className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
//                         Add Result
//                     </button>
//                 </aside>
//             </div>
//         </div>
//     );
// };

// export default TeacherHome;

// import React, { useState } from 'react';
// import axios from 'axios';

// const TeacherHome = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [csvFile, setCsvFile] = useState(null);

//     const handleFileChange = (e) => {
//         setCsvFile(e.target.files[0]);
//     };

//     const handleCsvUpload = async () => {
//         if (!csvFile) return;

//         const formData = new FormData();
//         formData.append('file', csvFile);

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

//     return (
//         <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//             {/* Navbar */}
//             <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
//                 <h1 className="text-2xl font-semibold">TeacherHome</h1>
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

import React, { useState } from 'react';
import axios from 'axios';

const TeacherHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [csvFile, setCsvFile] = useState(null);
    const [resultType, setResultType] = useState('mid-sem'); // Default value for result type

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleCsvUpload = async () => {
        if (!csvFile) return;

        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('resultType', resultType); // Append the selected result type

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
                            <p>Content for the class overview section goes here. This could include an introduction or any other primary information.</p>
                        </section>

                        {/* Bottom Section */}
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Class Activities</h2>
                            <p>This section can contain additional information, a summary, or any relevant supporting details related to the class.</p>
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
