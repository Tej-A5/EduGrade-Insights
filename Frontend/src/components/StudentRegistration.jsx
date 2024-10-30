import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
    const [formData, setFormData] = useState({
        registrationId: '',
        name: '',
        email: '',
        course: '',
        year: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/students/register', formData);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error registering student:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold">Student Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Registration ID Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration ID</label>
                        <input
                            name="registrationId"
                            placeholder="Registration ID"
                            type="text"
                            value={formData.registrationId}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"  
                            placeholder="Name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Course Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <input
                            name="course"  
                            placeholder="Course"
                            type="text"
                            value={formData.course}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Year Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            name="year"
                            placeholder="Year"
                            type="text"
                            value={formData.year}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => navigate('/studenthome')}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistration;
