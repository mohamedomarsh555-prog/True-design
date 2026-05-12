import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Topbar({ breadcrumbs }) {
  const { language, setLanguage, t, isRtl } = useI18n();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

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

    if (index === 0 && location.pathname !== '/') return '/';
    return null;
  };

  return (
    <div className="topbar">
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
      <div className="topbar-right">
        <div className="language-switch" aria-label="Language switch">
          <button
            className={`language-option ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            type="button"
          >
            EN
          </button>
          <button
            className={`language-option ${language === 'ar' ? 'active' : ''}`}
            onClick={() => setLanguage('ar')}
            type="button"
          >
            عربي
          </button>
        </div>
        <span className="role-badge">{t('role')}</span>
        <button className="signout-btn" type="button" onClick={handleSignOut} title={language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}>
          <i className="ti ti-logout" />
          <span>{language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}</span>
        </button>
        <div className="avatar">MH</div>
      </div>
    </div>
  );
}
