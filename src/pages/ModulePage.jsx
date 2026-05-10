import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';

export default function ModulePage({ titleKey, subtitleKey, icon, tone = 'course' }) {
  const { t } = useI18n();
  const heroClass = tone === 'program' ? 'program-list-hero' : '';
  const title = t(titleKey);
  const subtitle = t(subtitleKey);

  return (
    <>
      <Topbar breadcrumbs={[title]} />
      <div className="page-content">
        <div className={`list-hero ${heroClass}`}>
          <div>
            <div className="hero-badge">
              <i className={`ti ${icon}`} /> {t('module')}
            </div>
            <div className="hero-title">{title}</div>
            <div className="hero-sub">{subtitle}</div>
          </div>
        </div>

        <div className="history-card">
          <div className="hist-icon hi-blue">
            <i className={`ti ${icon}`} />
          </div>
          <div className="hist-info">
            <div className="hist-title">{title}</div>
            <div className="hist-sub">{t('moduleWorkspace')}</div>
          </div>
          <span className="status-pill s-not-started">{t('status.notStarted')}</span>
        </div>
      </div>
    </>
  );
}
