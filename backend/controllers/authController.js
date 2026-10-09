import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[A-Za-z]{5,})(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

function publicUser(user) {
	return { id: user._id, name: user.name, email: user.email, role: user.role, rollNumber: user.rollNumber, employeeId: user.employeeId }
}

function tokenFor(user) {
	return jwt.sign({ userId: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' })
}

export async function register(req, res, next) {
	try {
		const { name, email, password, confirmPassword, rollNumber } = req.body
		const normalizedEmail = email?.trim().toLowerCase()
		if (!name?.trim() || !emailPattern.test(normalizedEmail || '')) return res.status(400).json({ message: 'Enter a valid name and email address.' })
		if (!passwordPattern.test(password || '')) return res.status(400).json({ message: 'Password needs 6 letters, a number, a special character, and 8 characters overall.' })
		if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' })
		if (!rollNumber?.trim()) return res.status(400).json({ message: 'Roll number is required.' })
		const existing = await User.findOne({ $or: [{ email: normalizedEmail }, { rollNumber: rollNumber.trim() }] })
		if (existing) return res.status(409).json({ message: 'Email or roll number is already registered.' })
		const user = await User.create({ name: name.trim(), email: normalizedEmail, password: await bcrypt.hash(password, 12), role: 'student', rollNumber: rollNumber.trim() })
		return res.status(201).json({ user: publicUser(user), token: tokenFor(user) })
	} catch (error) {
		if (error.code === 11000) return res.status(409).json({ message: 'Email or roll number is already registered.' })
		return next(error)
	}
}

export async function login(req, res, next) {
	try {
		const email = req.body.email?.trim().toLowerCase()
		const user = await User.findOne({ email }).select('+password')
		if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' })
		return res.json({ user: publicUser(user), token: tokenFor(user) })
	} catch (error) {
		return next(error)
	}
}

export function me(req, res) {
	return res.json({ user: publicUser(req.user) })
}
