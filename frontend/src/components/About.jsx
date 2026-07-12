export default function About() {
  const skills = ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Git'];

  return (
    <section id="about" className="section">
      <div className="container">
        <span className="eyebrow">// about</span>
        <h2>A bit about me</h2>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textAlign: 'center',
              padding: 12,
            }}
          >
            {/* Replace this box with an <img src="/your-photo.jpg" /> once you add your photo */}
            your photo here
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 560, marginBottom: 24 }}>
              I'm a student developer who enjoys turning rough ideas into working
              products — from small scripts to full-stack apps like this one. I care
              about clean code, fast feedback loops, and building things people
              actually use. Replace this paragraph with your own story: how you got
              into dev, what you're learning right now, and what kind of work excites you.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
