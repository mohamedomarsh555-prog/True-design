import { useState } from 'react';
import Topbar from '../components/Topbar';
import ReportCard from '../components/ReportCard';
import { institutionalReportTypes, historyItems } from '../data';
import { useI18n } from '../i18n';

export default function InstitutionalAccreditationPage() {
  const { t, text, statusFromClass } = useI18n();
  const [activeReport, setActiveReport] = useState(null);
  const mainReports = institutionalReportTypes.filter(r => r.category === 'main');
  const additionalReports = institutionalReportTypes.filter(r => r.category === 'additional');

  const breadcrumbs = activeReport
    ? [t('institutionalAccreditation'), text(activeReport, 'title')]
    : [t('institutionalAccreditation')];

  return (
    <>
      <Topbar breadcrumbs={breadcrumbs} />
      <div className="page-content">
        {!activeReport ? (
          <>
            <div className="list-hero institutional-hero">
              <div>
                <div className="hero-badge">
                  <i className="ti ti-certificate" /> {t('institutionalAccreditation')}
                </div>
                <div className="hero-title">{t('institutionalAccreditation')}</div>
                <div className="hero-sub">{t('moduleSubtitles.accreditation')}</div>
              </div>
              <div className="hero-stats">
                <div className="stat-chip"><div className="num">{institutionalReportTypes.length}</div><div className="lbl">{t('reports')}</div></div>
                <div className="stat-chip"><div className="num">1</div><div className="lbl">{t('status.pending')}</div></div>
                <div className="stat-chip"><div className="num">10</div><div className="lbl">{t('status.notStarted')}</div></div>
              </div>
            </div>

            <div className="report-section">
              <div className="sec-label">{t('mainReports')}</div>
              <div className="cards-grid-3">
                {mainReports.map(report => (
                  <ReportCard key={report.id} report={report} onClick={() => setActiveReport(report)} />
                ))}
              </div>
            </div>

            <div className="report-section">
              <div className="sec-label">{t('additionalForms')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {additionalReports.map(report => (
                  <ReportCard key={report.id} report={report} onClick={() => setActiveReport(report)} horizontal />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="section-header">
              <div>
                <div className="section-title">{text(activeReport, 'title')}</div>
                <div className="section-sub">{t('history')}</div>
              </div>
              <button className="btn-outline" onClick={() => setActiveReport(null)}>
                <i className="ti ti-arrow-left" /> {t('backToReports')}
              </button>
            </div>

            <div className="history-list">
              <div className="history-card new-program">
                <div className="hist-icon hi-amber-new">
                  <i className="ti ti-plus" />
                </div>
                <div className="hist-info">
                  <div className="hist-title">{t('newSubmission')} — 2025/2026</div>
                  <div className="hist-sub">{t('notStartedYet')} · {t('academicYear')} 2025/2026</div>
                </div>
                <div className="hist-meta">
                  <span className="status-pill s-new-amber">{t('new')}</span>
                  <button className="act-btn add-program">
                    <i className="ti ti-plus" /> {t('add')}
                  </button>
                </div>
              </div>

              {historyItems.map((item, index) => (
                <div key={index} className="history-card">
                  <div className={`hist-icon ${item.status === 's-done' ? 'hi-green' : item.status === 's-archived' ? 'hi-gray' : 'hi-amber'}`}>
                    <i className={`ti ${item.status === 's-done' ? 'ti-circle-check' : item.status === 's-archived' ? 'ti-archive' : activeReport.icon}`} />
                  </div>
                  <div className="hist-info">
                    <div className="hist-title">{text(activeReport, 'title')} — {item.year}</div>
                    <div className="hist-sub">{item.date}</div>
                  </div>
                  <div className="hist-meta">
                    <span className={`status-pill ${item.status}`}>{statusFromClass(item.status, item.statusLabel)}</span>
                    <button className={`act-btn ${item.status === 's-pending' ? 'primary' : ''}`}>
                      <i className="ti ti-eye" /> {t('view')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
