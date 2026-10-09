import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import complaintRoutes from './routes/complaintRoutes.js'

const app = express()
const port = process.env.PORT || 5001

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('replace-with')) throw new Error('JWT_SECRET is missing or still uses the template value. Set a long random secret in backend/.env.')

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/complaints', complaintRoutes)
app.use((error, _req, res, _next) => {
	console.error(error)
	if (error.name === 'ValidationError') return res.status(400).json({ message: 'Submitted data is invalid.' })
	return res.status(500).json({ message: 'Something went wrong on the server.' })
})

connectDB()
	.then(() => app.listen(port, () => console.log(`API listening on http://localhost:${port}`)))
	.catch((error) => { console.error(error.message); process.exit(1) })
