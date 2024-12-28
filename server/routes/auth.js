import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.js';

const router = express.Router();

// Check if admin exists
router.get('/check-admin', async (req, res) => {
  try {
    const adminExists = await Admin.countDocuments() > 0;
    res.json({ exists: adminExists });
  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({ error: 'Failed to check admin status' });
  }
});

// Create admin account
router.post('/create-admin', async (req, res) => {
  try {
    const adminExists = await Admin.countDocuments() > 0;
    if (adminExists) {
      return res.status(400).json({ error: 'Admin account already exists' });
    }

    const { email, password } = req.body;
    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ error: 'Failed to create admin account' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;