import { useEffect, useState } from 'react'
import api from '../services/api'
import ComplaintCard from '../components/ComplaintCard'

export default function MyComplaints() { const [complaints, setComplaints] = useState(null); useEffect(() => { api.get('/complaints/my').then(({ data }) => setComplaints(data.complaints)).catch(() => setComplaints([])) }, []); return <main className="app-page"><div className="page-heading compact"><div><p className="kicker">Your record</p><h1>All complaints</h1><p className="lead">A complete, chronological view of what you have raised.</p></div></div>{complaints === null ? <div className="page-state">Loading complaints...</div> : complaints.length ? <div className="complaint-grid">{complaints.map((complaint) => <ComplaintCard key={complaint._id} complaint={complaint} />)}</div> : <div className="empty"><h3>Nothing here yet.</h3><p>Your next report will appear in this record.</p></div>}</main> }
