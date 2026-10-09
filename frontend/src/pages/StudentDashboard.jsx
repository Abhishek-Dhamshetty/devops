import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import api from '../services/api'
import ComplaintCard from '../components/ComplaintCard'

export default function StudentDashboard() {
  const { user } = useAuth(); const [complaints, setComplaints] = useState([]); const [error, setError] = useState('')
  useEffect(() => { api.get('/complaints/my').then(({ data }) => setComplaints(data.complaints)).catch((err) => setError(err.response?.data?.message || 'Could not load complaints.')) }, [])
  const counts = { Total: complaints.length, Pending: complaints.filter((item) => item.status === 'Pending').length, 'In progress': complaints.filter((item) => item.status === 'In Progress').length, Resolved: complaints.filter((item) => item.status === 'Resolved').length }
  return <main className="app-page"><div className="page-heading"><div><p className="kicker">Student workspace</p><h1>Good to see you, <em>{user.name.split(' ')[0]}.</em></h1><p className="lead">Your voice is on the record. Here is what is moving.</p></div><Link className="button button-dark" to="/submit">New complaint <span>↗</span></Link></div><div className="stats">{Object.entries(counts).map(([label, value]) => <div className="stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="section-heading"><div><p className="eyebrow">Latest activity</p><h2>Your complaints</h2></div><Link className="text-link" to="/complaints">View all →</Link></div>{error && <div className="alert">{error}</div>}{complaints.length ? <div className="complaint-grid">{complaints.slice(0, 3).map((complaint) => <ComplaintCard key={complaint._id} complaint={complaint} />)}</div> : <div className="empty"><h3>No complaints yet.</h3><p>When something needs attention, this is where your updates will live.</p><Link className="button button-dark" to="/submit">Make the first report</Link></div>}</main>
}
