import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
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
      labelAr: 'إدارة الاعتماد الأكاديمي',
      open: accreditationOpen,
      setOpen: setAccreditationOpen,
      items: [
        ['Dashboard', 'لوحة التحكم', '/accreditation/dashboard'],
        ['Master Data', 'البيانات الأساسية', '/accreditation/master-data'],
        ['Academic Programs', 'البرامج الأكاديمية', '/accreditation/programs'],
        ['Accreditation Projects', 'مشاريع الاعتماد', '/accreditation/projects'],
        ['Requirements', 'متطلبات الاعتماد', '/accreditation/requirements'],
        ['Self Study & Gaps', 'الدراسة الذاتية والثغرات', '/accreditation/self-study'],
        ['Evidence Repository', 'مستودع الشواهد', '/accreditation/evidence'],
        ['Reviews & Visits', 'المراجعات والزيارات', '/accreditation/reviews'],
        ['Submission & Decision', 'الرفع والقرار', '/accreditation/submission'],
        ['Action Log', 'سجل الإجراءات', '/accreditation/actions'],
        ['Post Accreditation', 'ما بعد الاعتماد', '/accreditation/post-accreditation'],
        ['Governance', 'الحوكمة والصلاحيات', '/accreditation/governance'],
      ],
    },
    {
      base: '/strategic-planning',
      icon: 'ti-chart-arrows-vertical',
      label: 'Strategic Planning',
      labelAr: 'التخطيط الاستراتيجي',
      open: strategicOpen,
      setOpen: setStrategicOpen,
      items: [
        ['Dashboard', 'لوحة التحكم', '/strategic-planning/dashboard'],
        ['Strategic Projects', 'المشاريع الاستراتيجية', '/strategic-planning/projects'],
        ['Objectives', 'الأهداف', '/strategic-planning/objectives'],
        ['Reports', 'التقارير', '/strategic-planning/reports'],
      ],
    },
    {
      base: '/quality-projects',
      icon: 'ti-rosette-discount-check',
      label: 'Quality Projects',
      labelAr: 'مشاريع الجودة',
      open: qualityProjectsOpen,
      setOpen: setQualityProjectsOpen,
      items: [
        ['Dashboard', 'لوحة التحكم', '/quality-projects/dashboard'],
        ['Institutional', 'الاعتماد المؤسسي', '/quality-projects/institutional'],
        ['Program Review', 'مراجعة البرامج', '/quality-projects/program-review'],
        ['Learning Outcomes', 'مخرجات التعلم', '/quality-projects/learning-outcomes'],
        ['Gap Analysis', 'تحليل الثغرات', '/quality-projects/gap-analysis'],
        ['Reports', 'التقارير', '/quality-projects/reports'],
      ],
    },
  ];

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
    <div className="mobile-shellbar">
      <button
        className="mobile-menu-btn"
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label={language === 'ar' ? 'فتح القائمة' : 'Open menu'}
      >
        <i className="ti ti-menu-2" />
      </button>
      <div className="mobile-brand" onClick={() => goTo('/')}>
        <div className="logo-icon">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polyline points="3,10 8,15 17,5" fill="none" stroke="#1e2d6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="logo-text">CPTIT TRUE</span>
      </div>
    </div>
    {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
    <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-mobile-head">
        <span>{language === 'ar' ? 'القائمة' : 'Menu'}</span>
        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
        >
          <i className="ti ti-x" />
        </button>
      </div>
      <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => goTo('/')}>
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
          onClick={() => goTo('/')}
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
          goTo('/courses');
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
          onClick={() => goTo('/courses')}
        >
          <div className="ci-dot course-dot" />
          {t('allCourses')}
        </div>
      </div>

      <div
        className={`nav-item ${location.pathname.startsWith('/programs') ? 'active' : ''}`}
        onClick={() => {
          setProgramsOpen(true);
          goTo('/programs');
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
          onClick={() => goTo('/programs')}
        >
          <div className="ci-dot program-dot" />
          {t('allPrograms')}
        </div>
      </div>

      <div className="nav-divider" />

      <div className="nav-label">{language === 'ar' ? 'الجودة والاعتماد' : 'Quality & Accreditation'}</div>
      {qualityNav.map((group) => (
        <div key={group.base}>
          <div
            className={`nav-item ${location.pathname.startsWith(group.base) ? 'active' : ''}`}
            onClick={() => {
              group.setOpen(true);
              goTo(`${group.base}/dashboard`);
            }}
          >
            <i className={`ti ${group.icon}`} />
            {language === 'ar' ? group.labelAr : group.label}
            <i
              className={`ti ti-chevron-down nav-chevron ${group.open ? 'open' : ''}`}
              onClick={(event) => {
                event.stopPropagation();
                group.setOpen(open => !open);
              }}
            />
          </div>
          <div className={`sub-list ${group.open ? 'open' : ''}`}>
            {group.items.map(([label, labelAr, path]) => (
              <div
                key={path}
                className={`sub-item ${location.pathname === path ? 'active' : ''}`}
                onClick={() => goTo(path)}
              >
                <div className="ci-dot program-dot" />
                {language === 'ar' ? labelAr : label}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="nav-divider" />

      <div
        className={`nav-item ${location.pathname.startsWith('/clo-plo-management') ? 'active' : ''}`}
        onClick={() => goTo('/clo-plo-management')}
      >
        <i className="ti ti-sitemap" />
        {t('cloPloManagement')}
      </div>
      <div
        className={`nav-item ${location.pathname.startsWith('/institutional-accreditation') ? 'active' : ''}`}
        onClick={() => goTo('/institutional-accreditation')}
      >
        <i className="ti ti-certificate" />
        {t('institutionalAccreditation')}
      </div>
    </div>
    </>
  );
}
