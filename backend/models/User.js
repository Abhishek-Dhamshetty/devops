import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
		password: { type: String, required: true, select: false },
		role: { type: String, enum: ['student', 'admin'], default: 'student' },
		rollNumber: { type: String, trim: true, sparse: true, unique: true },
		employeeId: { type: String, trim: true, sparse: true, unique: true },
	},
	{ timestamps: true },
)

export default mongoose.model('User', userSchema)
