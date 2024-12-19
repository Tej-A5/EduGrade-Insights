require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const userRoutes = require('./routes/users');
const csvRoutes = require('./routes/teacherRoutes')
const marksRoutes = require('./routes/marksRoutes'); // Import your new route
const classRoutes = require('./routes/classes');
const resultRoutes = require('./routes/resultRoutes');
const lowScoresRoute = require('./routes/lowScoresRoute');
const addclass = require('./routes/addclass');
const scores = require('./routes/scores');
const grades = require('./routes/gradeRoute');
const sgpa = require('./routes/sgpa');
const credits = require('./routes/credits');
const radar = require('./routes/radarroute');

const app = express();
const PORT = process.env.PORT || 5000;  // Use port from .env or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/users', userRoutes);
app.use('/api/results', csvRoutes);
app.use('/api', marksRoutes);
app.use('/api', classRoutes);
app.use('/api', resultRoutes);
app.use('/api', lowScoresRoute);
app.use('/api/teachersclass', addclass);
app.use('/api/results', scores);
app.use('/api/results', grades);
app.use('/api', sgpa);
app.use('/api', credits);
app.use('/api', radar);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
