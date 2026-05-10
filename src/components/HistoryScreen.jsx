import { historyItems } from '../data';

export default function HistoryScreen({ entityCode, reportTitle, type, onBack }) {
  const isProgram = type === 'program';
  const newCardClass = isProgram ? 'new-program' : 'new-course';
  const newIconClass = isProgram ? 'hi-amber-new' : 'hi-blue-new';
  const addBtnClass  = isProgram ? 'add-program' : 'add-course';
  const newPillClass = isProgram ? 's-new-amber'  : 's-new';
  const histIconClass = isProgram ? 'hi-amber' : 'hi-blue';
  const histIcon      = isProgram ? 'ti-file-certificate' : 'ti-file-description';

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{reportTitle} — {entityCode}</div>
          <div className="section-sub">History of submissions</div>
        </div>
        <div className="btn-group">
          <button className="btn-outline" onClick={onBack}>
            <i className="ti ti-arrow-left" /> Back to reports
          </button>
          <button className="btn-outline">
            <i className="ti ti-layout-list" /> View all {isProgram ? 'programs' : 'courses'}
          </button>
        </div>
      </div>

      <div className="history-list">
        {/* New item — always first */}
        <div className={`history-card ${newCardClass}`}>
          <div className={`hist-icon ${newIconClass}`}>
            <i className="ti ti-plus" />
          </div>
          <div className="hist-info">
            <div className="hist-title">New Submission — 2025/2026</div>
            <div className="hist-sub">Not started yet · {isProgram ? 'Academic Year 2025/2026' : 'First Semester'}</div>
          </div>
          <div className="hist-meta">
            <span className={`status-pill ${newPillClass}`}>New</span>
            <div className="hist-actions">
              <button className={`act-btn ${addBtnClass}`}>
                <i className="ti ti-plus" /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Past history */}
        {historyItems.map((item, i) => (
          <div key={i} className="history-card">
            <div className={`hist-icon ${item.status === 's-done' ? 'hi-green' : item.status === 's-archived' ? 'hi-gray' : histIconClass}`}>
              <i className={`ti ${item.status === 's-done' ? 'ti-circle-check' : item.status === 's-archived' ? 'ti-archive' : histIcon}`} />
            </div>
            <div className="hist-info">
              <div className="hist-title">{reportTitle} — {item.year}</div>
              <div className="hist-sub">{item.date}</div>
            </div>
            <div className="hist-meta">
              <span className={`status-pill ${item.status}`}>{item.statusLabel}</span>
              <div className="hist-actions">
                <button className={`act-btn ${item.status === 's-pending' ? 'primary' : ''}`}>
                  <i className="ti ti-eye" /> View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
