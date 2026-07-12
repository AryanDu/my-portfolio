import Hero3D from './Hero3D.jsx';

export default function Hero() {
  return (
    <header
      id="top"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Hero3D />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, transparent 0%, var(--bg) 75%)',
          zIndex: 1,
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <span className="eyebrow">// full-stack developer</span>
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 76px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Aryan Dubey
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 480, marginBottom: 36 }}>
          Student developer building web apps end-to-end — clean interfaces, solid
          backends, and a habit of shipping things that actually work.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a href="#projects" className="btn btn-primary">View projects</a>
          <a href="#contact" className="btn btn-ghost">Get in touch</a>
        </div>
      </div>
    </header>
  );
}
