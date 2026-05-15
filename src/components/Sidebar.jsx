import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const qualityNav = [
    {
      base: '/accreditation',
      path: '/accreditation/dashboard',
      icon: 'ti-certificate',
      label: 'Academic Accreditation',
      labelAr: 'إدارة الاعتماد الأكاديمي',
    },
    {
      base: '/strategic-planning',
      path: '/strategic-planning/dashboard',
      icon: 'ti-chart-arrows-vertical',
      label: 'Strategic Planning',
      labelAr: 'التخطيط الاستراتيجي',
    },
    {
      base: '/quality-projects',
      path: '/quality-projects/dashboard',
      icon: 'ti-rosette-discount-check',
      label: 'Quality Projects',
      labelAr: 'مشاريع الجودة',
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
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            type="button"
            onClick={() => goTo('/')}
          >
            <i className="ti ti-layout-dashboard" />
            {t('dashboard')}
          </button>
        </div>

        <div className="nav-divider" />
        <div className="nav-label">{t('academic')}</div>

        <button
          className={`nav-item ${location.pathname.startsWith('/courses') ? 'active' : ''}`}
          type="button"
          onClick={() => goTo('/courses')}
        >
          <i className="ti ti-book" />
          {t('courses')}
        </button>

        <button
          className={`nav-item ${location.pathname.startsWith('/programs') ? 'active' : ''}`}
          type="button"
          onClick={() => goTo('/programs')}
        >
          <i className="ti ti-award" />
          {t('programs')}
        </button>

        <div className="nav-divider" />
        <div className="nav-label">{language === 'ar' ? 'الجودة والاعتماد' : 'Quality & Accreditation'}</div>

        {qualityNav.map((group) => (
          <button
            key={group.base}
            className={`nav-item ${location.pathname.startsWith(group.base) ? 'active' : ''}`}
            type="button"
            onClick={() => goTo(group.path)}
          >
            <i className={`ti ${group.icon}`} />
            {language === 'ar' ? group.labelAr : group.label}
          </button>
        ))}

        <div className="nav-divider" />

        <button
          className={`nav-item ${location.pathname.startsWith('/clo-plo-management') ? 'active' : ''}`}
          type="button"
          onClick={() => goTo('/clo-plo-management')}
        >
          <i className="ti ti-sitemap" />
          {t('cloPloManagement')}
        </button>

        <button
          className={`nav-item ${location.pathname.startsWith('/institutional-accreditation') ? 'active' : ''}`}
          type="button"
          onClick={() => goTo('/institutional-accreditation')}
        >
          <i className="ti ti-certificate" />
          {t('institutionalAccreditation')}
        </button>
      </div>
    </>
  );
}
