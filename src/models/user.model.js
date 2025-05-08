const db = require('../config/db');

const User = {
    getAllUsers: async () => {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    },

    getUserById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    createUser: async (user) => {
        const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
        return { id: result.insertId, ...user };
    },

    updateUser: async (id, user) => {
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id]);
        return { id, ...user };
    },

    deleteUser: async (id) => {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return { message: 'User deleted successfully' };
    },
}

module.exports = User;