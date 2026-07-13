import { useEffect, useState } from 'react';
import api from '../api.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get('/projects')
      .then((res) => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="eyebrow">// projects</span>
        <h2>Things I've built</h2>

        {loading && <p style={{ color: 'var(--muted)' }}>Loading projects…</p>}
        {error && (
          <p style={{ color: 'var(--muted)' }}>
            Couldn't load projects right now. Check that the backend is running.
          </p>
        )}
        {!loading && !error && projects.length === 0 && (
          <p style={{ color: 'var(--muted)' }}>
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {projects.map((p) => (
            <div key={p._id} className="card">
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>{p.description}</p>
              {p.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}>
                  GitHub →
                </a>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--purple)' }}>
                    Live demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
