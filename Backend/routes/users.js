// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const router = express.Router();

// // User Signup
// router.post('/login', async (req, res) => {
//     const { email, password, role } = req.body;

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             role,
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error signing up user:', error);
//         res.status(500).json({ error: 'Failed to register user' });
//     }
// });

// module.exports = router;

// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student'); // Import the Student model
const Teacher = require('../models/Teacher'); // Import the Teacher model
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Choose the model based on the role
        const UserModel = role === 'student' ? Student : Teacher;

        // Find user based on the selected model
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // Successful login
        // res.status(200).json({ message: 'Login successful' });
        res.status(200).json({
            success: true,
            user: { _id: user._id, name: user.name }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login'  });
    }
});

module.exports = router;
