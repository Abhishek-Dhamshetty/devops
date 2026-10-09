import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function ComplaintCard({ complaint }) {
  return <Link className="complaint-card" to={`/complaints/${complaint._id}`}><div className="card-top"><span className="eyebrow">{complaint.complaintId}</span><StatusBadge status={complaint.status} /></div><h3>{complaint.title}</h3><p>{complaint.description}</p><div className="card-meta"><span>{complaint.category}</span><span>{new Date(complaint.createdAt).toLocaleDateString()}</span></div></Link>
}
