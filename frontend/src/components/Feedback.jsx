import { useState } from 'react';
import api from '../api.js';

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/feedback', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="feedback" className="section">
      <div className="container">
        <span className="eyebrow">// feedback</span>
        <h2>Leave feedback</h2>
        <div className="card" style={{ maxWidth: 520 }}>
          {status === 'sent' ? (
            <p style={{ color: 'var(--blue)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>
              ✓ Thanks! Your message has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="What did you think?" required />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send feedback'}
              </button>
              {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontSize: 13, marginTop: 10 }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
