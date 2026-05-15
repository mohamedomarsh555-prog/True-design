import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseReportTypes } from '../data';
import { useI18n } from '../i18n';

const navItems = [
  { base: '/', path: '/', icon: 'ti-layout-dashboard', label: 'Dashboard', labelAr: 'لوحة التحكم', exact: true },
  { base: '/colleges', path: '/colleges', icon: 'ti-building-community', label: 'Colleges', labelAr: 'الكليات' },
  { base: '/programs', path: '/programs', icon: 'ti-award', label: 'Programs', labelAr: 'البرامج' },
  { base: '/accreditation', path: '/accreditation/dashboard', icon: 'ti-certificate', label: 'Academic Accreditation', labelAr: 'الاعتماد الأكاديمي' },
  { base: '/institutional-accreditation', path: '/institutional-accreditation', icon: 'ti-building-bank', label: 'Institutional Accreditation', labelAr: 'الاعتماد المؤسسي' },
  { base: '/strategic-planning', path: '/strategic-planning/dashboard', icon: 'ti-chart-arrows-vertical', label: 'Strategic Planning', labelAr: 'التخطيط الاستراتيجي' },
  { base: '/quality-projects', path: '/quality-projects/dashboard', icon: 'ti-briefcase', label: 'Quality Projects', labelAr: 'مشاريع الجودة' },
  { base: '/kpis', path: '/kpis', icon: 'ti-target-arrow', label: 'KPIs', labelAr: 'المؤشرات' },
  { base: '/reports', path: '/reports', icon: 'ti-report-analytics', label: 'Reports', labelAr: 'التقارير' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t, text } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(() => location.pathname.startsWith('/courses'));

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const goToCourseArea = () => {
    setCoursesOpen((value) => !value);
    navigate('/courses');
    setMobileOpen(false);
  };

  const courseSubItems = [
    {
      id: 'course-list',
      path: '/courses',
      icon: 'ti-list-details',
      label: t('courseList'),
    },
    ...courseReportTypes.map((report) => ({
      id: report.id,
      path: `/courses/reports/${report.id}`,
      icon: report.icon,
      label: text(report, 'title'),
    })),
  ];

  const isCoursesActive = location.pathname.startsWith('/courses');
  const isCoursesOpen = coursesOpen || isCoursesActive;

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
              <polyline points="3,10 8,15 17,5" fill="none" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <polyline points="3,10 8,15 17,5" fill="none" stroke="#006c35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="logo-text">CPTIT TRUE</span>
        </div>

        <div className="nav-section">
          <button
            className={`nav-item ${isCoursesActive ? 'active' : ''}`}
            type="button"
            onClick={goToCourseArea}
          >
            <i className="ti ti-book-2" />
            {t('courses')}
            <i className={`ti ti-chevron-down nav-chevron ${isCoursesOpen ? 'open' : ''}`} />
          </button>
          <div className={`sub-list ${isCoursesOpen ? 'open' : ''}`}>
            {courseSubItems.map((item) => {
              const active = item.path === '/courses'
                ? location.pathname === '/courses'
                : location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  className={`sub-item ${active ? 'active' : ''}`}
                  type="button"
                  onClick={() => goTo(item.path)}
                >
                  <span className="ci-dot course-dot" />
                  <i className={`ti ${item.icon}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {navItems.map((item) => {
            const active = item.exact ? location.pathname === item.base : location.pathname.startsWith(item.base);
            return (
              <button
                key={item.base}
                className={`nav-item ${active ? 'active' : ''}`}
                type="button"
                onClick={() => goTo(item.path)}
              >
                <i className={`ti ${item.icon}`} />
                {language === 'ar' ? item.labelAr : item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
