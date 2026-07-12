export default function Nav() {
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
    { label: 'Feedback', href: '#feedback' },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5, 7, 13, 0.75)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
      >
        <a href="#top" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>
          Aryan<span style={{ color: 'var(--blue)' }}>.</span>Dubey
        </a>
        <div style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
