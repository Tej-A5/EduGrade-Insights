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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
