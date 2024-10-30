// import React, { useState } from 'react';

// const TeacherRegistration = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [department, setDepartment] = useState('');
//     const [year, setYear] = useState('');
//     const [branch, setBranch] = useState('');
//     const [subject, setSubject] = useState('');
//     const [classes, setClasses] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Teacher Name:', name);
//         console.log('Email:', email);
//         console.log('Department:', department);
//         console.log('Classes:', classes);
//         // Handle form submission logic here
//     };

//     const handleAddClass = () => {
//         const newClass = { year, branch, subject };
//         setClasses([...classes, newClass]);
//         setYear('');
//         setBranch('');
//         setSubject('');
//     };

//     const handleRemoveClass = (index) => {
//         const updatedClasses = classes.filter((_, i) => i !== index);
//         setClasses(updatedClasses);
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//             <div className="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-lg">
//                 <h2 className="text-center text-2xl font-bold">Teacher Registration</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Name</label>
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Department</label>
//                         <input
//                             type="text"
//                             value={department}
//                             onChange={(e) => setDepartment(e.target.value)}
//                             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                             required
//                         />
//                     </div>

//                     {/* Add Class Section */}
//                     <div className="mt-4">
//                         <h3 className="text-lg font-semibold">Add Classes Teaching</h3>
//                         <div className="grid grid-cols-3 gap-2 mt-2">
//                             <input
//                                 type="text"
//                                 placeholder="Year"
//                                 value={year}
//                                 onChange={(e) => setYear(e.target.value)}
//                                 className="p-2 border border-gray-300 rounded-md"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Branch"
//                                 value={branch}
//                                 onChange={(e) => setBranch(e.target.value)}
//                                 className="p-2 border border-gray-300 rounded-md"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Subject"
//                                 value={subject}
//                                 onChange={(e) => setSubject(e.target.value)}
//                                 className="p-2 border border-gray-300 rounded-md"
//                             />
//                         </div>
//                         <button
//                             type="button"
//                             onClick={handleAddClass}
//                             className="mt-3 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                         >
//                             Add Class
//                         </button>
//                     </div>

//                     {/* Classes Table */}
//                     {classes.length > 0 && (
//                         <div className="mt-6">
//                             <h3 className="text-lg font-semibold mb-2">Classes Teaching</h3>
//                             <table className="min-w-full bg-white border border-gray-200 rounded-md">
//                                 <thead>
//                                     <tr>
//                                         <th className="py-2 border-b text-left px-4">Year</th>
//                                         <th className="py-2 border-b text-left px-4">Branch</th>
//                                         <th className="py-2 border-b text-left px-4">Subject</th>
//                                         <th className="py-2 border-b text-left px-4">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {classes.map((classItem, index) => (
//                                         <tr key={index}>
//                                             <td className="py-2 border-b px-4">{classItem.year}</td>
//                                             <td className="py-2 border-b px-4">{classItem.branch}</td>
//                                             <td className="py-2 border-b px-4">{classItem.subject}</td>
//                                             <td className="py-2 border-b px-4">
//                                                 <button
//                                                     onClick={() => handleRemoveClass(index)}
//                                                     className="text-red-500 hover:text-red-700"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TeacherRegistration;

import React, { useState } from 'react';
import axios from 'axios';

const TeacherRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [experience, setExperience] = useState('');
    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [subject, setSubject] = useState('');
    const [classes, setClasses] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, department, experience, classes };

        try {
            const response = await axios.post('http://localhost:5000/api/teachers/register', formData);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error registering teacher:', error);
        }
    };

    const handleAddClass = () => {
        const newClass = { year, branch, subject };
        setClasses([...classes, newClass]);
        setYear('');
        setBranch('');
        setSubject('');
    };

    const handleRemoveClass = (index) => {
        setClasses(classes.filter((_, i) => i !== index));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold">Teacher Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    {/* Form fields */}
                    {/* Add Class Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Add Classes Teaching</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Class"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddClass}
                            className="mt-3 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Class
                        </button>
                    </div>
                    {/* Classes Table */}
                    {classes.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Classes Teaching</h3>
                            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                <thead>
                                    <tr>
                                        <th className="py-2 border-b text-left px-4">Year</th>
                                        <th className="py-2 border-b text-left px-4">Branch</th>
                                        <th className="py-2 border-b text-left px-4">Class</th>
                                        <th className="py-2 border-b text-left px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((classItem, index) => (
                                        <tr key={index}>
                                            <td className="py-2 border-b px-4">{classItem.year}</td>
                                            <td className="py-2 border-b px-4">{classItem.branch}</td>
                                            <td className="py-2 border-b px-4">{classItem.subject}</td>
                                            <td className="py-2 border-b px-4">
                                                <button
                                                    onClick={() => handleRemoveClass(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4"
                        onClick={() => navigate('/teacherhome')}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherRegistration;
