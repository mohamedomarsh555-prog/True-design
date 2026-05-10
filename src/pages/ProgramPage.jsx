import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ReportCard from '../components/ReportCard';
import HistoryScreen from '../components/HistoryScreen';
import { programs, programReportTypes } from '../data';

export default function ProgramPage() {
  const { programId } = useParams();
  const program = programs.find(p => p.id === programId);
  const [activeReport, setActiveReport] = useState(null);

  if (!program) {
    return (
      <>
        <Topbar breadcrumbs={['Programs', 'Not found']} />
        <div className="page-content"><p>Program not found.</p></div>
      </>
    );
  }

  const mainReports       = programReportTypes.filter(r => r.category === 'main');
  const additionalReports = programReportTypes.filter(r => r.category === 'additional');

  const breadcrumbs = activeReport
    ? ['Programs', program.code, activeReport.title]
    : ['Programs', program.code, 'Report Types'];

  return (
    <>
      <Topbar breadcrumbs={breadcrumbs} />
      <div className="page-content">

        {!activeReport ? (
          <>
            {/* Hero */}
            <div className="hero-card program-hero">
              <div>
                <div className="hero-badge">
                  <i className="ti ti-award" /> {program.code}
                </div>
                <div className="hero-title">{program.name}</div>
                <div className="hero-sub">Academic Year {program.year} · Active</div>
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
            entityCode={program.code}
            reportTitle={activeReport.title}
            type="program"
            onBack={() => setActiveReport(null)}
          />
        )}
      </div>
    </>
  );
}
