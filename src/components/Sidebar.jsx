import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { courses, programs } from '../data';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [programsOpen, setProgramsOpen] = useState(true);

  const isCourseActive = (id) => location.pathname.startsWith(`/courses/${id}`);
  const isProgramActive = (id) => location.pathname.startsWith(`/programs/${id}`);

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polyline points="3,10 8,15 17,5" fill="none" stroke="#1e2d6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="logo-text">CPTIT TRUE</span>
      </div>

      {/* Dashboard */}
      <div className="nav-section">
        <div
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <i className="ti ti-layout-dashboard" />
          Dashboard
        </div>
      </div>

      <div className="nav-divider" />
      <div className="nav-label">Academic</div>

      {/* Courses */}
      <div
        className={`nav-item ${location.pathname.startsWith('/courses') ? 'active' : ''}`}
        onClick={() => setCoursesOpen(o => !o)}
      >
        <i className="ti ti-book" />
        Courses
        <i className={`ti ti-chevron-down nav-chevron ${coursesOpen ? 'open' : ''}`} />
      </div>
      <div className={`sub-list ${coursesOpen ? 'open' : ''}`}>
        {courses.map(c => (
          <div
            key={c.id}
            className={`sub-item ${isCourseActive(c.id) ? 'active' : ''}`}
            onClick={() => navigate(`/courses/${c.id}`)}
          >
            <div className="ci-dot course-dot" />
            {c.code} – {c.name.split(' ').slice(0, 2).join(' ')}
          </div>
        ))}
      </div>

      {/* Programs */}
      <div
        className={`nav-item ${location.pathname.startsWith('/programs') ? 'active' : ''}`}
        onClick={() => setProgramsOpen(o => !o)}
      >
        <i className="ti ti-award" />
        Programs
        <i className={`ti ti-chevron-down nav-chevron ${programsOpen ? 'open' : ''}`} />
      </div>
      <div className={`sub-list ${programsOpen ? 'open' : ''}`}>
        {programs.map(p => (
          <div
            key={p.id}
            className={`sub-item ${isProgramActive(p.id) ? 'active' : ''}`}
            onClick={() => navigate(`/programs/${p.id}`)}
          >
            <div className="ci-dot program-dot" />
            {p.code} – {p.name}
          </div>
        ))}
      </div>

      <div className="nav-divider" />

      {/* Others */}
      <div className="nav-item">
        <i className="ti ti-clipboard-list" />
        Self Study
        <i className="ti ti-chevron-down nav-chevron" />
      </div>
      <div className="nav-item">
        <i className="ti ti-folders" />
        Document Cycle
        <i className="ti ti-chevron-down nav-chevron" />
      </div>
    </div>
  );
}
