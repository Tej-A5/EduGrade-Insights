// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const TeacherRegistration = () => {
//     const navigate = useNavigate(); // Initialize useNavigate
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [department, setDepartment] = useState('');
//     // const [experience, setExperience] = useState('');
//     const [year, setYear] = useState('');
//     const [branch, setBranch] = useState('');
//     const [subject, setSubject] = useState('');
//     const [classes, setClasses] = useState([]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = { name, email, password, department, classes };

//         try {
//             const response = await axios.post('http://localhost:5000/api/teachers/register', formData);
//             console.log(response.data.message);
//             localStorage.setItem('teacher', JSON.stringify(response.data.teacher));
//             navigate('/teacherhome');
//         } catch (error) {
//             console.error('Error registering teacher:', error);
//         }
//     };

//     const handleAddClass = () => {
//         const newClass = { year, branch, subject };
//         setClasses([...classes, newClass]);
//         setYear('');
//         setBranch('');
//         setSubject('');
//     };

//     const handleRemoveClass = (index) => {
//         setClasses(classes.filter((_, i) => i !== index));
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
//                         <label className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Password"
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
//                     {/* Form fields */}
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
//                                 placeholder="Class"
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
//                                         <th className="py-2 border-b text-left px-4">Class</th>
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
//                         // onClick={() => navigate('/teacherhome')}
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
import { useNavigate } from 'react-router-dom';

const TeacherRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: '',
        branch: '',
        subject: '',
        classes: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, department, classes } = formData;

        try {
            const response = await axios.post('http://localhost:5000/api/teachers/register', { name, email, password, department, classes });
            console.log('Response from server:', response.data);

            // Check if teacher data exists in the response before storing it
            if (response.data && response.data.teacher) {
                localStorage.setItem('teacher', JSON.stringify(response.data.teacher));
                navigate('/teacherhome');
            } else {
                console.error('Registration failed: No teacher data in response');
            }
        } catch (error) {
            console.error('Error registering teacher:', error);
        }
    };

    const handleAddClass = () => {
        const newClass = { year: formData.year, branch: formData.branch, subject: formData.subject };
        setFormData((prevData) => ({
            ...prevData,
            classes: [...prevData.classes, newClass],
            year: '',
            branch: '',
            subject: ''
        }));
    };

    const handleRemoveClass = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            classes: prevData.classes.filter((_, i) => i !== index)
        }));
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
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    {/* Add Class Section */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Add Classes Teaching</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <input
                                type="text"
                                name="year"
                                placeholder="Year"
                                value={formData.year}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="branch"
                                placeholder="Branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Class"
                                value={formData.subject}
                                onChange={handleChange}
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
                    {formData.classes.length > 0 && (
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
                                    {formData.classes.map((classItem, index) => (
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
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherRegistration;
