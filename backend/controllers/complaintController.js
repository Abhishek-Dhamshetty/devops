import Complaint, { categories, statuses } from '../models/Complaint.js'

function makeComplaintId() {
	return `CMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export async function createComplaint(req, res, next) {
	try {
		const { title, description, category, location } = req.body
		if (!title?.trim() || title.trim().length > 120) return res.status(400).json({ message: 'Title is required and must be under 120 characters.' })
		if (!description?.trim() || description.trim().length > 2000) return res.status(400).json({ message: 'Description is required and must be under 2000 characters.' })
		if (!categories.includes(category)) return res.status(400).json({ message: 'Choose a valid complaint category.' })
		const complaint = await Complaint.create({ complaintId: makeComplaintId(), student: req.user._id, studentRollNumber: req.user.rollNumber, studentName: req.user.name, title: title.trim(), description: description.trim(), category, location: location?.trim() })
		return res.status(201).json({ complaint })
	} catch (error) { return next(error) }
}

export async function listMyComplaints(req, res, next) {
	try { return res.json({ complaints: await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 }) }) } catch (error) { return next(error) }
}

export async function getComplaint(req, res, next) {
	try {
		const query = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, student: req.user._id }
		const complaint = await Complaint.findOne(query)
		if (!complaint) return res.status(404).json({ message: 'Complaint not found.' })
		return res.json({ complaint })
	} catch (error) { return next(error) }
}

export async function listAllComplaints(req, res, next) {
	try {
		const { search = '', category, status, page = 1, limit = 10 } = req.query
		const filter = {}
		if (category && categories.includes(category)) filter.category = category
		if (status && statuses.includes(status)) filter.status = status
		if (search.trim()) filter.$or = [{ complaintId: new RegExp(search.trim(), 'i') }, { studentRollNumber: new RegExp(search.trim(), 'i') }]
		const pageNumber = Math.max(Number(page) || 1, 1)
		const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50)
		const [complaints, total] = await Promise.all([Complaint.find(filter).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize), Complaint.countDocuments(filter)])
		return res.json({ complaints, page: pageNumber, pages: Math.ceil(total / pageSize), total })
	} catch (error) { return next(error) }
}

export async function updateComplaint(req, res, next) {
	try {
		const { status, adminResponse } = req.body
		if (!statuses.includes(status)) return res.status(400).json({ message: 'Choose a valid complaint status.' })
		if (adminResponse !== undefined && adminResponse.length > 2000) return res.status(400).json({ message: 'Response must be under 2000 characters.' })
		const complaint = await Complaint.findById(req.params.id)
		if (!complaint) return res.status(404).json({ message: 'Complaint not found.' })
		complaint.status = status
		if (adminResponse !== undefined) complaint.adminResponse = adminResponse.trim()
		complaint.resolvedAt = status === 'Resolved' ? complaint.resolvedAt || new Date() : null
		await complaint.save()
		return res.json({ complaint })
	} catch (error) { return next(error) }
}
