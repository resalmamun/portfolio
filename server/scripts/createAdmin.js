import mongoose from 'mongoose';
import { Admin } from '../models/admin.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    
    const adminData = {
      email: 'admin@example.com',
      password: 'admin123'
    };

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new Admin(adminData);
    await admin.save();
    
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();