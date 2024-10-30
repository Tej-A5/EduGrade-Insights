import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import Login from './Login';
// import Signup from './Signup';

function Home() {
  // const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Your password"
              required
            />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                  // value={role}
                  // onChange={(e) => setRole(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
              </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform transition duration-200 hover:scale-105"
          >
            Login
          </button>
        </form>
        {/* {isLogin ? <Login /> : <Signup />} */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Signup as  {' '}
            <button
              className="font-medium text-indigo-500 hover:text-indigo-600 hover:underline"
              onClick={() => navigate('/student-registration')}
            >
              Student
            </button>
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Signup as{' '}
            <button
              className="font-medium text-indigo-500 hover:text-indigo-600 hover:underline"
              onClick={() => navigate('/teacher')}
            >
              Teacher
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
