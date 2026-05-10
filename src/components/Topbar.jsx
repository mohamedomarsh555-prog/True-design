export default function Topbar({ breadcrumbs }) {
  return (
    <div className="topbar">
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span className="sep">›</span>}
            <span className={i === breadcrumbs.length - 1 ? 'current' : ''}>{crumb}</span>
          </span>
        ))}
      </div>
      <div className="topbar-right">
        <span className="role-badge">Coordinator</span>
        <div className="avatar">MH</div>
      </div>
    </div>
  );
}
