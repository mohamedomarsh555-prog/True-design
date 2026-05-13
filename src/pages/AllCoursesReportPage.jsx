import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { courses, courseReportTypes } from '../data';
import { useI18n } from '../i18n';

export default function AllCoursesReportPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { t, text, statusFromClass } = useI18n();
  const report = courseReportTypes.find(r => r.id === reportId);


  // Gouda
  if (!report) {
    return (
      <>
        <Topbar breadcrumbs={[t('courses'), t('notFound')]} />
        <div className="page-content"><p>{t('reportNotFound')}</p></div>
      </>
    );
  }

  const reportTitle = text(report, 'title');

  return (
    <>
      <Topbar breadcrumbs={[t('courses'), reportTitle, t('allCourses')]} />
      <div className="page-content">
        <div className="list-hero">
          <div>
            <div className="hero-badge">
              <i className={`ti ${report.icon}`} /> {reportTitle}
            </div>
            <div className="hero-title">{reportTitle} — {t('allCourses')}</div>
            <div className="hero-sub">{t('reviewCoursesReport')}</div>
          </div>
          <div className="hero-stats">
            <div className="stat-chip"><div className="num">{courses.length}</div><div className="lbl">{t('courses')}</div></div>
            <div className="stat-chip"><div className="num">1</div><div className="lbl">{t('status.pending')}</div></div>
            <div className="stat-chip"><div className="num">2</div><div className="lbl">{t('status.notStarted')}</div></div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <div className="section-title">{reportTitle}</div>
            <div className="section-sub">{t('submissionsByCourse')}</div>
          </div>
          <button className="btn-outline" onClick={() => navigate('/courses')}>
            <i className="ti ti-arrow-left" /> {t('backToCourses')}
          </button>
        </div>

        <div className="history-list">
          {courses.map((course, index) => {
            const isPending = index === 0;
            const statusClass = isPending ? 's-pending' : report.defaultStatus;

            return (
              <div key={course.id} className="history-card">
                <div className={`hist-icon ${report.iconClass.replace('ic-', 'hi-')}`}>
                  <i className={`ti ${report.icon}`} />
                </div>
                <div className="hist-info">
                  <div className="hist-title">{course.code} — {text(course, 'name')}</div>
                  <div className="hist-sub">{text(course, 'semester')} · 2025/2026</div>
                </div>
                <div className="hist-meta">
                  <span className={`status-pill ${statusClass}`}>{statusFromClass(statusClass, report.defaultStatusLabel)}</span>
                  <div className="hist-actions">
                    <button
                      className={`act-btn ${isPending ? 'primary' : ''}`}
                      onClick={() => {
                        if (report.id === 'course-specification') {
                          navigate(`/courses/${course.id}/reports/course-specification/view`);
                          return;
                        }
                        navigate(`/courses/${course.id}/reports/${report.id}`);
                      }}
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
