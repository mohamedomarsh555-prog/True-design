export default function ReportCard({ report, onClick, horizontal = false }) {
  return (
    <div
      className={`report-card ${report.highlight || ''} ${horizontal ? 'horizontal' : ''}`}
      onClick={onClick}
    >
      {report.badge && (
        <span className={`rc-badge-abs ${report.badge.cls}`}>{report.badge.label}</span>
      )}
      <div className={`rc-icon-wrap ${report.iconClass}`}>
        <i className={`ti ${report.icon}`} />
      </div>
      <div className="rc-body">
        <div className="rc-title">{report.title}</div>
        <div className="rc-desc">{report.desc}</div>
      </div>
      <div className="rc-footer">
        <span className={`status-pill ${report.defaultStatus}`}>{report.defaultStatusLabel}</span>
        <i className="ti ti-arrow-right rc-arrow" />
      </div>
    </div>
  );
}
