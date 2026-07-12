export default function Contact() {
  const links = [
    { label: 'Email', value: 'aryandubeysumit@gmail.com', href: 'mailto:aryandubeysumit@gmail.com', icon: '✉' },
    { label: 'GitHub', value: 'https://github.com/AryanDu', href: 'https://github.com/AryanDu', icon: '💻' },
    { label: 'LinkedIn', value: 'linkedin.com/in/aryan2727', href: 'https://www.linkedin.com/in/aryan2727/', icon: '💼' },
    { label: 'Resume', value: 'Download PDF', href: '#', icon: '📄' },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="eyebrow">// contact</span>
        <h2>Get in touch</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
          Replace the placeholder links below with your real email, GitHub, LinkedIn, and resume link.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 24 }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 22px' }}>
              <span>{l.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{l.label}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{l.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
