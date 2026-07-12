import { useEffect, useState } from 'react';
import api from '../api.js';

export default function Hobbies() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/blog')
      .then((res) => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="hobbies" className="section">
      <div className="container">
        <span className="eyebrow">// hobbies</span>
        <h2>Outside of code</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32, maxWidth: 560 }}>
          Gym and travel — I write short posts here when I get back from a trip.
          Add new entries any time from the admin panel.
        </p>

        {loading && <p style={{ color: 'var(--muted)' }}>Loading…</p>}
        {!loading && posts.length === 0 && (
          <p style={{ color: 'var(--muted)' }}>
            No posts yet — add your first travel or gym update from{' '}
            <a href="/admin" style={{ color: 'var(--blue)' }}>/admin</a>.
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {posts.map((post) => (
            <div key={post._id} className="card">
              <span className="tag" style={{ marginBottom: 12, display: 'inline-block' }}>
                {post.category}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{post.title}</h3>
              {post.location && (
                <p style={{ color: 'var(--purple)', fontSize: 13, marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
                  📍 {post.location}
                </p>
              )}
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 14 }}>{post.content}</p>
              {post.imageUrls?.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {post.imageUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`${post.title} photo ${i + 1}`}
                      style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
