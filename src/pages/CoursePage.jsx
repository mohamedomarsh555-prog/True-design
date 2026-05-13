import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ReportCard from '../components/ReportCard';
import HistoryScreen from '../components/HistoryScreen';
import { courses, courseReportTypes } from '../data';
import { useI18n } from '../i18n';

export default function CoursePage() {
  const { courseId, reportId } = useParams();
  const navigate = useNavigate();
  const { t, text } = useI18n();
  const course = courses.find(c => c.id === courseId);
  const activeReport = reportId
    ? courseReportTypes.find(r => r.id === reportId)
    : null;

  if (!course) {
    return (
      <>
        <Topbar breadcrumbs={[t('courses'), t('notFound')]} />
        <div className="page-content"><p>{t('notFound')}</p></div>
      </>
    );
  }

  if (reportId && !activeReport) {
    return (
      <>
        <Topbar breadcrumbs={[t('courses'), course.code, t('notFound')]} />
        <div className="page-content"><p>{t('reportNotFound')}</p></div>
      </>
    );
  }

  const mainReports = courseReportTypes.filter(r => r.category === 'main');
  const additionalReports = courseReportTypes.filter(r => r.category === 'additional');

  const breadcrumbs = activeReport
    ? [t('courses'), course.code, text(activeReport, 'title')]
    : [t('courses'), course.code, t('reportTypes')];

  return (
    <>
      <Topbar breadcrumbs={breadcrumbs} />
      <div className="page-content">
        {!activeReport ? (
          <>
            <div className="hero-card course-hero">
              <div>
                <div className="hero-badge">
                  <i className="ti ti-book" /> {course.code}
                </div>
                <div className="hero-title">{text(course, 'name')}</div>
                <div className="hero-sub">{text(course, 'semester')} · 2025/2026</div>
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
                  <ReportCard key={r.id} report={r} onClick={() => navigate(`/courses/${course.id}/reports/${r.id}`)} />
                ))}
              </div>
            </div>

            <div className="report-section">
              <div className="sec-label">{t('additionalForms')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {additionalReports.map(r => (
                  <ReportCard key={r.id} report={r} onClick={() => navigate(`/courses/${course.id}/reports/${r.id}`)} horizontal />
                ))}
              </div>
            </div>
          </>
        ) : (
          <HistoryScreen
            entityCode={course.code}
            entityId={course.id}
            reportId={activeReport.id}
            reportTitle={text(activeReport, 'title')}
            type="course"
            onBack={() => navigate(`/courses/${course.id}`)}
          />
        )}
      </div>
    </>
  );
}
