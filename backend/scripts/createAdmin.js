import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import User from '../models/User.js'

const required = ['ADMIN_NAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'ADMIN_EMPLOYEE_ID']
const missing = required.filter((key) => !process.env[key])
if (missing.length) throw new Error(`Missing admin provisioning variables: ${missing.join(', ')}`)

await connectDB()
const existing = await User.findOne({ $or: [{ email: process.env.ADMIN_EMAIL.toLowerCase() }, { employeeId: process.env.ADMIN_EMPLOYEE_ID }] })
if (existing) throw new Error('An account with this admin email or employee ID already exists.')
await User.create({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL.toLowerCase(), password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), role: 'admin', employeeId: process.env.ADMIN_EMPLOYEE_ID })
console.log('Admin account created.')
await mongoose.disconnect()
