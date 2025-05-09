const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve static files from the public directory
// This is where your HTML files are located
const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(publicPath, 'register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(publicPath, 'dashboard.html'));
});