import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import trueLogo from '../assets/true-logo.svg';
import { useI18n } from '../i18n';

const navItems = [
  { base: '/', path: '/', icon: 'ti-layout-dashboard', label: 'Dashboard', labelAr: 'لوحة التحكم', exact: true },
  { base: '/programs', path: '/programs', icon: 'ti-award', label: 'Programs', labelAr: 'البرامج' },
  { base: '/courses', path: '/courses', icon: 'ti-book-2', label: 'Courses', labelAr: 'المقررات' },
  { base: '/academic-accreditation', path: '/academic-accreditation', icon: 'ti-certificate', label: 'Academic Accreditation Management', labelAr: 'إدارة الاعتماد الأكاديمي' },
  { base: '/institutional-accreditation', path: '/institutional-accreditation', icon: 'ti-building-bank', label: 'Institutional Accreditation', labelAr: 'الاعتماد المؤسسي' },
  { base: '/strategic-planning', path: '/strategic-planning/dashboard', icon: 'ti-chart-arrows-vertical', label: 'Strategic Planning', labelAr: 'التخطيط الاستراتيجي' },
  { base: '/quality-projects', path: '/quality-projects/dashboard', icon: 'ti-briefcase', label: 'Quality Projects', labelAr: 'مشاريع الجودة' },
  { base: '/kpis', path: '/kpis', icon: 'ti-target-arrow', label: 'KPIs', labelAr: 'المؤشرات' },
  { base: '/reports', path: '/reports', icon: 'ti-report-analytics', label: 'Reports', labelAr: 'التقارير' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <img className="brand-logo-img" src={trueLogo} alt="CPTIT TRUE" />
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
          <img className="brand-logo-img" src={trueLogo} alt="CPTIT TRUE" />
        </div>

        <div className="nav-section">
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
