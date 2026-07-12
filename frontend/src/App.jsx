import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Hobbies from './components/Hobbies.jsx';
import Contact from './components/Contact.jsx';
import Feedback from './components/Feedback.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Hobbies />
      <Contact />
      <Feedback />
      <footer style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, borderTop: '1px solid var(--border)' }}>
        © 2026 Aryan Dubey · Built with React, Node & MongoDB
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
