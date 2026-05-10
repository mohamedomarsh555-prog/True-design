import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { programs, programReportTypes } from '../data';
import { useI18n } from '../i18n';

export default function AllProgramsReportPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { t, text, statusFromClass } = useI18n();
  const report = programReportTypes.find(r => r.id === reportId);

  if (!report) {
    return (
      <>
        <Topbar breadcrumbs={[t('programs'), t('notFound')]} />
        <div className="page-content"><p>{t('reportNotFound')}</p></div>
      </>
    );
  }

  const reportTitle = text(report, 'title');

  return (
    <>
      <Topbar breadcrumbs={[t('programs'), reportTitle, t('allPrograms')]} />
      <div className="page-content">
        <div className="list-hero program-list-hero">
          <div>
            <div className="hero-badge">
              <i className={`ti ${report.icon}`} /> {reportTitle}
            </div>
            <div className="hero-title">{reportTitle} — {t('allPrograms')}</div>
            <div className="hero-sub">{t('reviewProgramsReport')}</div>
          </div>
          <div className="hero-stats">
            <div className="stat-chip"><div className="num">{programs.length}</div><div className="lbl">{t('programs')}</div></div>
            <div className="stat-chip"><div className="num">1</div><div className="lbl">{t('status.pending')}</div></div>
            <div className="stat-chip"><div className="num">2</div><div className="lbl">{t('status.notStarted')}</div></div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <div className="section-title">{reportTitle}</div>
            <div className="section-sub">{t('submissionsByProgram')}</div>
          </div>
          <button className="btn-outline" onClick={() => navigate('/programs')}>
            <i className="ti ti-arrow-left" /> {t('backToPrograms')}
          </button>
        </div>

        <div className="history-list">
          {programs.map((program, index) => {
            const isPending = index === 0;
            const statusClass = isPending ? 's-pending' : report.defaultStatus;

            return (
              <div key={program.id} className="history-card">
                <div className={`hist-icon ${report.iconClass.replace('ic-', 'hi-')}`}>
                  <i className={`ti ${report.icon}`} />
                </div>
                <div className="hist-info">
                  <div className="hist-title">{program.code} — {text(program, 'name')}</div>
                  <div className="hist-sub">{t('academicYear')} {program.year}</div>
                </div>
                <div className="hist-meta">
                  <span className={`status-pill ${statusClass}`}>{statusFromClass(statusClass, report.defaultStatusLabel)}</span>
                  <div className="hist-actions">
                    <button
                      className={`act-btn ${isPending ? 'primary' : ''}`}
                      onClick={() => navigate(`/programs/${program.id}/reports/${report.id}`)}
                    >
                      <i className="ti ti-eye" /> {t('view')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
