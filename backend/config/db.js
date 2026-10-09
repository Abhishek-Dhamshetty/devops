import mongoose from 'mongoose'

export default async function connectDB() {
	const mongoUri = process.env.MONGO_URI
	if (!mongoUri) throw new Error('MONGO_URI is missing. Add it to backend/.env before starting the server.')
	if (mongoUri.includes('<') || mongoUri.includes('>')) {
		throw new Error('MONGO_URI still contains <placeholder> values. Copy the connection string from Atlas and replace the username and password with your database user credentials.')
	}
	try {
		await mongoose.connect(mongoUri)
		console.log(`MongoDB connected: ${mongoose.connection.host}`)
	} catch (error) {
		if (error.message?.toLowerCase().includes('bad auth')) {
			throw new Error('MongoDB authentication failed. Check the Atlas database username/password, URL-encode special password characters, and confirm the database user exists.')
		}
		throw new Error(`MongoDB connection failed: ${error.message}`)
	}
}
