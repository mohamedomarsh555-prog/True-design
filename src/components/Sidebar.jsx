import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [programsOpen, setProgramsOpen] = useState(true);

  const isCoursesListActive = location.pathname === '/courses';
  const isProgramsListActive = location.pathname === '/programs';

  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polyline points="3,10 8,15 17,5" fill="none" stroke="#1e2d6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="logo-text">CPTIT TRUE</span>
      </div>

      <div className="nav-section">
        <div
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <i className="ti ti-layout-dashboard" />
          {t('dashboard')}
        </div>
      </div>

      <div className="nav-divider" />
      <div className="nav-label">{t('academic')}</div>

      <div
        className={`nav-item ${location.pathname.startsWith('/courses') ? 'active' : ''}`}
        onClick={() => {
          setCoursesOpen(true);
          navigate('/courses');
        }}
      >
        <i className="ti ti-book" />
        {t('courses')}
        <i
          className={`ti ti-chevron-down nav-chevron ${coursesOpen ? 'open' : ''}`}
          onClick={(event) => {
            event.stopPropagation();
            setCoursesOpen(o => !o);
          }}
        />
      </div>
      <div className={`sub-list ${coursesOpen ? 'open' : ''}`}>
        <div
          className={`sub-item ${isCoursesListActive ? 'active' : ''}`}
          onClick={() => navigate('/courses')}
        >
          <div className="ci-dot course-dot" />
          {t('allCourses')}
        </div>
      </div>

      <div
        className={`nav-item ${location.pathname.startsWith('/programs') ? 'active' : ''}`}
        onClick={() => {
          setProgramsOpen(true);
          navigate('/programs');
        }}
      >
        <i className="ti ti-award" />
        {t('programs')}
        <i
          className={`ti ti-chevron-down nav-chevron ${programsOpen ? 'open' : ''}`}
          onClick={(event) => {
            event.stopPropagation();
            setProgramsOpen(o => !o);
          }}
        />
      </div>
      <div className={`sub-list ${programsOpen ? 'open' : ''}`}>
        <div
          className={`sub-item ${isProgramsListActive ? 'active' : ''}`}
          onClick={() => navigate('/programs')}
        >
          <div className="ci-dot program-dot" />
          {t('allPrograms')}
        </div>
      </div>

      <div className="nav-divider" />

      <div
        className={`nav-item ${location.pathname.startsWith('/clo-plo-management') ? 'active' : ''}`}
        onClick={() => navigate('/clo-plo-management')}
      >
        <i className="ti ti-sitemap" />
        {t('cloPloManagement')}
      </div>
      <div
        className={`nav-item ${location.pathname.startsWith('/institutional-accreditation') ? 'active' : ''}`}
        onClick={() => navigate('/institutional-accreditation')}
      >
        <i className="ti ti-certificate" />
        {t('institutionalAccreditation')}
      </div>
    </div>
  );
}
