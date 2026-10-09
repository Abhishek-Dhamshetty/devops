import { Router } from 'express'
import { createComplaint, getComplaint, listAllComplaints, listMyComplaints, updateComplaint } from '../controllers/complaintController.js'
import { authenticate, requireAdmin, requireStudent } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(authenticate)
router.post('/', requireStudent, createComplaint)
router.get('/my', requireStudent, listMyComplaints)
router.get('/', requireAdmin, listAllComplaints)
router.get('/:id', getComplaint)
router.patch('/:id/status', requireAdmin, updateComplaint)
export default router
