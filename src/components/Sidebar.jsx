import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [programsOpen, setProgramsOpen] = useState(true);
  const [accreditationOpen, setAccreditationOpen] = useState(true);
  const [strategicOpen, setStrategicOpen] = useState(false);
  const [qualityProjectsOpen, setQualityProjectsOpen] = useState(false);

  const isCoursesListActive = location.pathname === '/courses';
  const isProgramsListActive = location.pathname === '/programs';
  const qualityNav = [
    {
      base: '/accreditation',
      icon: 'ti-certificate',
      label: 'Academic Accreditation',
      open: accreditationOpen,
      setOpen: setAccreditationOpen,
      items: [
        ['Dashboard', '/accreditation/dashboard'],
        ['Academic Programs', '/accreditation/programs'],
        ['Requirements', '/accreditation/requirements'],
        ['Action Log', '/accreditation/actions'],
        ['Post Accreditation', '/accreditation/post-accreditation'],
      ],
    },
    {
      base: '/strategic-planning',
      icon: 'ti-chart-arrows-vertical',
      label: 'Strategic Planning',
      open: strategicOpen,
      setOpen: setStrategicOpen,
      items: [
        ['Dashboard', '/strategic-planning/dashboard'],
        ['Strategic Projects', '/strategic-planning/projects'],
        ['Objectives', '/strategic-planning/objectives'],
        ['Reports', '/strategic-planning/reports'],
      ],
    },
    {
      base: '/quality-projects',
      icon: 'ti-rosette-discount-check',
      label: 'Quality Projects',
      open: qualityProjectsOpen,
      setOpen: setQualityProjectsOpen,
      items: [
        ['Dashboard', '/quality-projects/dashboard'],
        ['Institutional', '/quality-projects/institutional'],
        ['Program Review', '/quality-projects/program-review'],
        ['Learning Outcomes', '/quality-projects/learning-outcomes'],
        ['Gap Analysis', '/quality-projects/gap-analysis'],
      ],
    },
  ];

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

      <div className="nav-label">Quality & Accreditation</div>
      {qualityNav.map((group) => (
        <div key={group.base}>
          <div
            className={`nav-item ${location.pathname.startsWith(group.base) ? 'active' : ''}`}
            onClick={() => {
              group.setOpen(true);
              navigate(`${group.base}/dashboard`);
            }}
          >
            <i className={`ti ${group.icon}`} />
            {group.label}
            <i
              className={`ti ti-chevron-down nav-chevron ${group.open ? 'open' : ''}`}
              onClick={(event) => {
                event.stopPropagation();
                group.setOpen(open => !open);
              }}
            />
          </div>
          <div className={`sub-list ${group.open ? 'open' : ''}`}>
            {group.items.map(([label, path]) => (
              <div
                key={path}
                className={`sub-item ${location.pathname === path ? 'active' : ''}`}
                onClick={() => navigate(path)}
              >
                <div className="ci-dot program-dot" />
                {label}
              </div>
            ))}
          </div>
        </div>
      ))}

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
