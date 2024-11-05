// // src/components/Signup.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState('student'); // Default to student
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Username:', username);
//         console.log('Email:', email);
//         console.log('Password:', password);
//         console.log('User Type:', userType);

//         // Redirect based on user type
//         if (userType === 'student') {
//             navigate('/student-registration');
//         } else if (userType === 'teacher') {
//             navigate('/teacher');
//         }
//     };
//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Username</label>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
        
//             {/* Radio Buttons for User Type */}
//             <fieldset className="mt-4">
//                 <legend className="block text-sm font-medium text-gray-700">I am a:</legend>
//                 <div className="flex items-center mt-2">
//                     <input
//                         type="radio"
//                         id="student"
//                         name="userType"
//                         value="student"
//                         checked={userType === 'student'}
//                         onChange={(e) => setUserType(e.target.value)}
//                         className="mr-2"
//                     />
//                     <label htmlFor="student" className="text-sm">Student</label>
//                 </div>
//                 <div className="flex items-center mt-2">
//                     <input
//                         type="radio"
//                         id="teacher"
//                         name="userType"
//                         value="teacher"
//                         checked={userType === 'teacher'}
//                         onChange={(e) => setUserType(e.target.value)}
//                         className="mr-2"
//                     />
//                     <label htmlFor="teacher" className="text-sm">Teacher</label>
//                 </div>
//             </fieldset>
        
//             <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//                 Sign Up
//             </button>
//         </form>
//     );
  
// };

// export default Signup;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Signup = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('student'); // Default role
//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = { name, email, password, role };

//         try {
//             const response = await axios.post('http://localhost:5000/api/users/signup', formData);
//             console.log(response.data.message);
//             // Redirect or perform additional actions after successful signup
//              // Redirect based on role
//             if (role === 'student') {
//                 navigate('/student-registration'); // Redirect to student registration
//             } 
//             else {
//                 navigate('/teacher-registration'); // Redirect to teacher registration
//             }
//         } catch (error) {
//             console.error('Error signing up user:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                     required
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700">Role</label>
//                 <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                 >
//                     <option value="student">Student</option>
//                     <option value="teacher">Teacher</option>
//                 </select>
//             </div>
//             <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//                 Sign Up
//             </button>
//         </form>
//     );
// };

// export default Signup;
