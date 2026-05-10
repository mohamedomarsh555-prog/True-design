import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ReportCard from '../components/ReportCard';
import HistoryScreen from '../components/HistoryScreen';
import { courses, courseReportTypes } from '../data';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);
  const [activeReport, setActiveReport] = useState(null);

  if (!course) {
    return (
      <>
        <Topbar breadcrumbs={['Courses', 'Not found']} />
        <div className="page-content"><p>Course not found.</p></div>
      </>
    );
  }

  const mainReports       = courseReportTypes.filter(r => r.category === 'main');
  const additionalReports = courseReportTypes.filter(r => r.category === 'additional');

  const breadcrumbs = activeReport
    ? ['Courses', course.code, activeReport.title]
    : ['Courses', course.code, 'Report Types'];

  return (
    <>
      <Topbar breadcrumbs={breadcrumbs} />
      <div className="page-content">

        {!activeReport ? (
          <>
            {/* Hero */}
            <div className="hero-card course-hero">
              <div>
                <div className="hero-badge">
                  <i className="ti ti-book" /> {course.code}
                </div>
                <div className="hero-title">{course.name}</div>
                <div className="hero-sub">{course.semester} · 2025/2026</div>
              </div>
              <div className="hero-stats">
                <div className="stat-chip"><div className="num">3</div><div className="lbl">Reports</div></div>
                <div className="stat-chip"><div className="num">1</div><div className="lbl">Pending</div></div>
                <div className="stat-chip"><div className="num">2</div><div className="lbl">Not Started</div></div>
              </div>
            </div>

            {/* Main Reports */}
            <div className="report-section">
              <div className="sec-label">Main Reports</div>
              <div className="cards-grid-3">
                {mainReports.map(r => (
                  <ReportCard key={r.id} report={r} onClick={() => setActiveReport(r)} />
                ))}
              </div>
            </div>

            {/* Additional Forms */}
            <div className="report-section">
              <div className="sec-label">Additional Forms</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {additionalReports.map(r => (
                  <ReportCard key={r.id} report={r} onClick={() => setActiveReport(r)} horizontal />
                ))}
              </div>
            </div>
          </>
        ) : (
          <HistoryScreen
            entityCode={course.code}
            reportTitle={activeReport.title}
            type="course"
            onBack={() => setActiveReport(null)}
          />
        )}
      </div>
    </>
  );
}
