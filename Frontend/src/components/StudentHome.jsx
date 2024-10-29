import React from 'react';

const StudentHome = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {/* Navbar */}
            <nav className="bg-indigo-700 bg-opacity-40 text-white py-4 px-6 shadow-md m-4 rounded-lg">
                <h1 className="text-2xl font-semibold">Studenthome</h1>
            </nav>

            {/* Main content area */}
            <div className="flex flex-grow mx-4 mb-4 space-x-4">
                {/* Left Sidebar */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <ul>
                        <li className="mb-4">
                            <button className="w-full py-2 px-4 text-left text-indigo-200 hover:bg-indigo-600 rounded">Home</button>
                        </li>
                        <li>
                            <button className="w-full py-2 px-4 text-left text-red-200 hover:bg-red-600 rounded">Logout</button>
                        </li>
                    </ul>
                </aside>

                {/* Center Content */}
                <main className="flex-grow p-6 bg-indigo-800 bg-opacity-40 text-white rounded-lg shadow-lg">
                    <div className="space-y-6">
                        {/* Top Section */}
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Top Section</h2>
                            <p>Content for the top section goes here. This could include an introduction or any other primary information.</p>
                        </section>

                        {/* Bottom Section */}
                        <section className="p-4 bg-indigo-900 bg-opacity-60 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">Bottom Section</h2>
                            <p>This section can contain additional information, a summary, or any relevant supporting details.</p>
                        </section>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-1/5 bg-indigo-800 bg-opacity-40 text-white p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Subject List</h3>
                    <ul>
                        <li className="mb-2">Mathematics</li>
                        <li className="mb-2">Science</li>
                        <li className="mb-2">History</li>
                        <li className="mb-2">Geography</li>
                        <li className="mb-2">Language Arts</li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default StudentHome;
