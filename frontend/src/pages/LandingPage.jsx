import { Link } from 'react-router-dom'

const features = [['01', 'Be heard', 'Send a clear report directly to the people who can act on it.'], ['02', 'Stay informed', 'Follow every update without chasing offices or losing paper trails.'], ['03', 'See progress', 'A transparent status trail keeps the campus moving forward.']]

export default function LandingPage() {
  return <><main className="landing"><div className="landing-copy"><p className="kicker">A better campus starts with a signal</p><h1>Make campus<br /><em>work better.</em></h1><p className="lead">Campus Voice gives every student a clear, accountable way to raise issues and see what happens next.</p><div className="hero-actions"><Link className="button button-dark button-large" to="/register">Submit a complaint <span>↗</span></Link><Link className="text-link" to="/login">Already have an account? Log in</Link></div></div><div className="landing-art"><div className="art-note note-one">Quietly building<br /><strong>better days.</strong></div><div className="art-circle"><span>CV</span></div><div className="art-note note-two">student<br /><strong>voice / action</strong></div></div></main><section className="feature-strip">{features.map(([number, title, text]) => <article key={number}><span className="feature-number">{number}</span><h2>{title}</h2><p>{text}</p></article>)}</section></>
}
