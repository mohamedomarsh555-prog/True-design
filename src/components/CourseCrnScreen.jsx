import { useNavigate } from 'react-router-dom';
import { courseCrnSubmissions } from '../data';
import { useI18n } from '../i18n';

function localValue(item, key, language) {
  if (!item) return '';
  return language === 'ar' ? item[`${key}Ar`] || item[key] : item[key];
}

export default function CourseCrnScreen({ course, onBack }) {
  const navigate = useNavigate();
  const { language } = useI18n();
  const crnRecord = courseCrnSubmissions[course.id] || {
    courseCode: course.code,
    courseTitle: course.name,
    courseTitleAr: course.nameAr,
    term: course.semester,
    termAr: course.semesterAr,
    coordinator: 'Mohamed Ali Mohamed Helal',
    submissions: [],
  };

  const pageTitle = language === 'ar'
    ? `الشعب / ${localValue(crnRecord, 'courseTitle', language)} - ${crnRecord.courseCode}`
    : `CRNs/ ${crnRecord.courseTitle.toLowerCase()} — ${crnRecord.courseCode}`;

  return (
    <div className="crn-screen">
      <div className="crn-page-head">
        <div>
          <h1>{pageTitle}</h1>
          <p>{language === 'ar' ? 'سجل الإرسالات' : 'History of submissions'}</p>
        </div>
        <div className="crn-head-actions">
          <button type="button" className="crn-btn outline" onClick={onBack}>
            <i className="ti ti-arrow-left" />
            {language === 'ar' ? 'العودة للتقارير' : 'Back to reports'}
          </button>
          <button type="button" className="crn-btn soft" onClick={() => navigate('/courses/reports/crns')}>
            <i className="ti ti-list-details" />
            {language === 'ar' ? 'عرض كل الشعب' : 'View all CRNs'}
          </button>
        </div>
      </div>

      <section className="crn-course-panel">
        <header className="crn-course-header">
          <div className="crn-course-title">
            <span className="crn-doc-icon"><i className="ti ti-file-description" /></span>
            <div>
              <h2>{crnRecord.courseCode}</h2>
              <p>{localValue(crnRecord, 'term', language)}</p>
            </div>
          </div>
          <button type="button" className="crn-collapse" aria-label="Collapse section">
            <i className="ti ti-chevron-down" />
          </button>
        </header>

        <div className="crn-submission-list">
          {crnRecord.submissions.map((submission) => (
            <article className="crn-submission-card" key={submission.id}>
              <div className="crn-status-icon">
                <i className="ti ti-check" />
              </div>

              <div className="crn-submission-copy">
                <h3>{submission.crn}</h3>
                <strong>{localValue(submission, 'title', language)}</strong>
                <span>{submission.instructor}</span>
              </div>

              <div className="crn-submission-actions">
                <span className="crn-approved">{localValue(submission, 'status', language)}</span>
                <button type="button" className="crn-btn soft">
                  <i className="ti ti-file-export" />
                  {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
                </button>
                <button
                  type="button"
                  className="crn-btn soft"
                  onClick={() => navigate(`/courses/${course.id}/reports/crns/${submission.id}`)}
                >
                  <i className="ti ti-eye" />
                  {language === 'ar' ? 'عرض' : 'View'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
