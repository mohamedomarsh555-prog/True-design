import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';

export default function Dashboard() {
  const { language, t } = useI18n();
  const stats = [
    { num: '3', lbl: 'Active Courses', lblAr: 'مقررات نشطة', change: `${t('firstSemester')} 2025` },
    { num: '3', lbl: t('programs'), change: `${t('academicYear')} 2025/2026` },
    { num: '1', lbl: t('pendingReports'), change: t('requiresAction') },
    { num: '2', lbl: t('approvedReports'), change: t('thisSemester') },
  ];

  const quickActions = [
    { icon: 'ti-file-description', label: 'Course Specification — CS12', labelAr: 'توصيف المقرر — CS12', status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-file-certificate', label: 'Program Specification — CS', labelAr: 'توصيف البرنامج — CS', status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-target', label: 'KPIs & Indicators — CS', labelAr: 'مؤشرات الأداء — CS', status: t('status.inProgress'), cls: 's-inprogress' },
  ];

  return (
    <>
      <Topbar breadcrumbs={[t('dashboard')]} />
      <div className="page-content">
        <div className="page-title">{t('welcome')}</div>
        <div className="page-subtitle">{t('academicYear')} 2025/2026 · {t('firstSemester')}</div>
        <div className="dashboard-grid">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat-card">
              <div className="dash-stat-num">{s.num}</div>
              <div className="dash-stat-lbl">{s.lblAr && language === 'ar' ? s.lblAr : s.lbl}</div>
              <div className="dash-stat-change">{s.change}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="sec-label" style={{ marginBottom: 16 }}>{t('quickActions')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickActions.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="hist-icon hi-blue" style={{ flexShrink: 0 }}>
                  <i className={`ti ${item.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="hist-title">{language === 'ar' ? item.labelAr : item.label}</div>
                </div>
                <span className={`status-pill ${item.cls}`}>{item.status}</span>
                <button className="act-btn primary"><i className="ti ti-arrow-right" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
