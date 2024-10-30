import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
// import Login from './components/Login'
// import Signup from './components/Signup';
import StudentRegistration from './components/StudentRegistration';
import Teacher from './components/TeacherRegistration';
import StudentHome from './components/studenthome';
import TeacherHome from './components/TeacherHome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route path="/student-registration" element={<StudentRegistration />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/studenthome" element={<StudentHome />} />
                <Route path="/teacherhome" element={<TeacherHome />} />
            </Routes>
        </Router>
    );
}

export default App;