import Topbar from '../components/Topbar';

const stats = [
  { num: '3', lbl: 'Active Courses',   change: 'First Semester 2025' },
  { num: '3', lbl: 'Programs',         change: 'Academic Year 2025/2026' },
  { num: '1', lbl: 'Pending Reports',  change: 'Requires action' },
  { num: '2', lbl: 'Approved Reports', change: 'This semester' },
];

export default function Dashboard() {
  return (
    <>
      <Topbar breadcrumbs={['Dashboard']} />
      <div className="page-content">
        <div className="page-title">Welcome back</div>
        <div className="page-subtitle">Academic Year 2025/2026 · First Semester</div>
        <div className="dashboard-grid">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat-card">
              <div className="dash-stat-num">{s.num}</div>
              <div className="dash-stat-lbl">{s.lbl}</div>
              <div className="dash-stat-change">{s.change}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', padding: '20px 24px' }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'ti-file-description', label: 'Course Specification — CS12', status: 'Pending Submit', cls: 's-pending' },
              { icon: 'ti-file-certificate',  label: 'Program Specification — CS',  status: 'Pending Submit', cls: 's-pending' },
              { icon: 'ti-target',            label: 'KPIs & Indicators — CS',      status: 'In Progress',   cls: 's-inprogress' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="hist-icon hi-blue" style={{ flexShrink: 0 }}>
                  <i className={`ti ${item.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="hist-title">{item.label}</div>
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
