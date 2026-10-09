import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function authenticate(req, res, next) {
	const header = req.headers.authorization
	const token = header?.startsWith('Bearer ') ? header.slice(7) : null
	if (!token) return res.status(401).json({ message: 'Authentication required.' })
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(payload.userId).select('-password')
		if (!user) return res.status(401).json({ message: 'Authentication required.' })
		req.user = user
		return next()
	} catch {
		return res.status(401).json({ message: 'Authentication required.' })
	}
}

export function requireStudent(req, res, next) {
	return req.user?.role === 'student' ? next() : res.status(403).json({ message: 'Student access required.' })
}

export function requireAdmin(req, res, next) {
	return req.user?.role === 'admin' ? next() : res.status(403).json({ message: 'Administrator access required.' })
}
