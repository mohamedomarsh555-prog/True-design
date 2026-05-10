import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ReportCard from '../components/ReportCard';
import HistoryScreen from '../components/HistoryScreen';
import { programs, programReportTypes } from '../data';
import { useI18n } from '../i18n';

export default function ProgramPage() {
  const { programId, reportId } = useParams();
  const navigate = useNavigate();
  const { t, text } = useI18n();
  const program = programs.find(p => p.id === programId);
  const activeReport = reportId
    ? programReportTypes.find(r => r.id === reportId)
    : null;

  if (!program) {
    return (
      <>
        <Topbar breadcrumbs={[t('programs'), t('notFound')]} />
        <div className="page-content"><p>{t('notFound')}</p></div>
      </>
    );
  }

  if (reportId && !activeReport) {
    return (
      <>
        <Topbar breadcrumbs={[t('programs'), program.code, t('notFound')]} />
        <div className="page-content"><p>{t('reportNotFound')}</p></div>
      </>
    );
  }

  const mainReports = programReportTypes.filter(r => r.category === 'main');
  const additionalReports = programReportTypes.filter(r => r.category === 'additional');

  const breadcrumbs = activeReport
    ? [t('programs'), program.code, text(activeReport, 'title')]
    : [t('programs'), program.code, t('reportTypes')];

  return (
    <>
      <Topbar breadcrumbs={breadcrumbs} />
      <div className="page-content">
        {!activeReport ? (
          <>
            <div className="hero-card program-hero">
              <div>
                <div className="hero-badge">
                  <i className="ti ti-award" /> {program.code}
                </div>
                <div className="hero-title">{text(program, 'name')}</div>
                <div className="hero-sub">{t('academicYear')} {program.year} · {t('active')}</div>
              </div>
              <div className="hero-stats">
                <div className="stat-chip"><div className="num">3</div><div className="lbl">{t('reports')}</div></div>
                <div className="stat-chip"><div className="num">1</div><div className="lbl">{t('status.pending')}</div></div>
                <div className="stat-chip"><div className="num">2</div><div className="lbl">{t('status.notStarted')}</div></div>
              </div>
            </div>

            <div className="report-section">
              <div className="sec-label">{t('mainReports')}</div>
              <div className="cards-grid-3">
                {mainReports.map(r => (
                  <ReportCard key={r.id} report={r} onClick={() => navigate(`/programs/${program.id}/reports/${r.id}`)} />
                ))}
              </div>
            </div>

            <div className="report-section">
              <div className="sec-label">{t('additionalForms')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {additionalReports.map(r => (
                  <ReportCard key={r.id} report={r} onClick={() => navigate(`/programs/${program.id}/reports/${r.id}`)} horizontal />
                ))}
              </div>
            </div>
          </>
        ) : (
          <HistoryScreen
            entityCode={program.code}
            reportId={activeReport.id}
            reportTitle={text(activeReport, 'title')}
            type="program"
            onBack={() => navigate(`/programs/${program.id}`)}
          />
        )}
      </div>
    </>
  );
}
