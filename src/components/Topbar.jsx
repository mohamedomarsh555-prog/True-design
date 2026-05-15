import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import trueLogo from '../assets/true-logo.svg';
import taifLogo from '../assets/taif-university-logo.svg';
import { useI18n } from '../i18n';

const user = {
  name: 'Mohammed Hassan',
  initials: 'MH',
  email: 'm.hassan@taif.edu.sa',
};

const roles = [
  { en: 'Coordinator', ar: 'منسق' },
  { en: 'Strategy Office', ar: 'مكتب الاستراتيجية' },
  { en: 'Quality Reviewer', ar: 'مراجع جودة' },
  { en: 'Program Coordinator', ar: 'منسق برنامج' },
  { en: 'Approver', ar: 'معتمد' },
];

export default function Topbar({ breadcrumbs = [] }) {
  const { language, setLanguage, isRtl } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const segments = location.pathname.split('/').filter(Boolean);
  const [role, setRole] = useState(roles[0].en);
  const [userOpen, setUserOpen] = useState(false);
  const showBreadcrumbs = breadcrumbs.length > 1;

  const roleLabel = roles.find((item) => item.en === role)?.[language] || role;

  const handleSignOut = () => {
    sessionStorage.removeItem('true-authenticated');
    window.location.href = '/';
  };

  const getBreadcrumbHref = (index) => {
    const isLast = index === breadcrumbs.length - 1;
    if (isLast) return null;

    if (segments[0] === 'courses') {
      if (index === 0) return '/courses';
      if (index === 1 && segments[1] && segments[1] !== 'reports') return `/courses/${segments[1]}`;
    }

    if (segments[0] === 'programs') {
      if (index === 0) return '/programs';
      if (index === 1 && segments[1] && segments[1] !== 'reports') return `/programs/${segments[1]}`;
    }

    if (segments[0] === 'quality-projects') {
      if (index === 0) return '/quality-projects';
    }

    if (segments[0] === 'strategic-planning') {
      if (index === 0) return '/strategic-planning/dashboard';
    }

    if (segments[0] === 'academic-accreditation') {
      if (index === 0) return '/academic-accreditation';
    }

    if (index === 0 && location.pathname !== '/') return '/';
    return null;
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-brand-strip" aria-label={language === 'ar' ? 'شعارات المنصة' : 'Platform logos'}>
          <img className="platform-logo" src={trueLogo} alt="CPTIT TRUE" />
          <span className="topbar-logo-divider" />
          <img className="taif-logo" src={taifLogo} alt={language === 'ar' ? 'شعار جامعة الطائف' : 'Taif University'} />
        </div>

        <div className="topbar-right">
          <div className="language-switch" role="group" aria-label={language === 'ar' ? 'تبديل اللغة' : 'Language switch'}>
            <span className="language-switch-icon" aria-hidden="true">
              <i className="ti ti-language" />
            </span>
            <button
              className={`language-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              type="button"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              className={`language-option ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
              type="button"
              aria-pressed={language === 'ar'}
            >
              عربي
            </button>
          </div>

          <label className="role-select" title={language === 'ar' ? 'الصلاحية' : 'Role'}>
            <i className="ti ti-user-shield" />
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              {roles.map((item) => (
                <option key={item.en} value={item.en}>
                  {item[language]}
                </option>
              ))}
            </select>
          </label>

          <div className="user-menu">
            <button
              className="user-trigger"
              type="button"
              onClick={() => setUserOpen((value) => !value)}
              aria-expanded={userOpen}
              aria-haspopup="menu"
            >
              <div className="avatar">{user.initials}</div>
              <div className="user-trigger-copy">
                <strong>{user.name}</strong>
                <span>{roleLabel}</span>
              </div>
              <i className={`ti ti-chevron-down ${userOpen ? 'open' : ''}`} />
            </button>

            {userOpen && (
              <div className="user-dropdown" role="menu">
                <div className="user-dropdown-head">
                  <div className="avatar">{user.initials}</div>
                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <em>{roleLabel}</em>
                  </div>
                </div>
                <button type="button" onClick={() => { setUserOpen(false); navigate('/profile'); }}>
                  <i className="ti ti-user-circle" />
                  {language === 'ar' ? 'الملف الشخصي' : 'User Profile'}
                </button>
                <button type="button" className="danger" onClick={handleSignOut}>
                  <i className="ti ti-logout" />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showBreadcrumbs && (
        <div className="page-breadcrumb-strip">
          <div className="breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={`${crumb}-${i}`}>
                {i > 0 && <span className="sep">{isRtl ? '‹' : '›'}</span>}
                {getBreadcrumbHref(i) ? (
                  <Link className="breadcrumb-link" to={getBreadcrumbHref(i)}>
                    {crumb}
                  </Link>
                ) : (
                  <span className={i === breadcrumbs.length - 1 ? 'current' : ''}>{crumb}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
