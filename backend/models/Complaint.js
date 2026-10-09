import mongoose from 'mongoose'

const categories = ['Maintenance', 'Classroom', 'Electrical', 'Cleanliness', 'Water Supply', 'Canteen', 'Hostel', 'Other']
const statuses = ['Pending', 'In Progress', 'Resolved', 'Rejected']

const complaintSchema = new mongoose.Schema(
	{
		complaintId: { type: String, required: true, unique: true, index: true },
		student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		studentRollNumber: { type: String, required: true, trim: true },
		studentName: { type: String, required: true, trim: true },
		category: { type: String, enum: categories, required: true },
		title: { type: String, required: true, trim: true, maxlength: 120 },
		description: { type: String, required: true, trim: true, maxlength: 2000 },
		location: { type: String, trim: true, maxlength: 160 },
		status: { type: String, enum: statuses, default: 'Pending', index: true },
		adminResponse: { type: String, trim: true, maxlength: 2000 },
		resolvedAt: { type: Date, default: null },
	},
	{ timestamps: true },
)

export { categories, statuses }
export default mongoose.model('Complaint', complaintSchema)
