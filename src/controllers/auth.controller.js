const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const db = require ('../config/db');
const User = require('../models/user.model');
require ('dotenv').config ();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.getUserByName(name);
        if (existingUser) {
            return res.status(400).json({ message: 'User sudah terdaftar' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.createUser({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        // Check if user exists
        const user = await User.getUserByName(name);
        if (!user) {
            return res.status(400).json({ message: 'User belum terdaftar' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Salah' });
        }

        const accessToken = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Store refresh token in database (optional)
        await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id]);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

exports.logout = (req, res) => {
    // Invalidate the token on the client side by removing it from local storage or cookies
    res.status(200).json({ message: 'Logout successful' });
}
