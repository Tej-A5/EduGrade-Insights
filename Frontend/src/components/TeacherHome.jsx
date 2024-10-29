import React from 'react';

const TeacherHome = () => {
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
                    <button className="w-full mt-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
                        Add Result
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default TeacherHome;
