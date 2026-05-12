import { useMemo, useState } from 'react';
import Topbar from '../components/Topbar';
import { courses, programs } from '../data';
import { useI18n } from '../i18n';

const statusMeta = {
  notStarted: { label: 'Not Start', className: 'not-started' },
  inProgress: { label: 'In Progress', className: 'in-progress' },
  submitted: { label: 'Submitted', className: 'submitted' },
  approved: { label: 'Approved', className: 'approved' },
  rejected: { label: 'Rejected', className: 'rejected' },
};

const statusOrder = ['notStarted', 'inProgress', 'submitted', 'approved', 'rejected'];

const tabData = [
  {
    id: 'course-specifications',
    label: 'Course Specifications',
    icon: 'ti-file-description',
    type: 'Course Quality',
    rows: [
      { label: 'Computer Science Fundamentals', code: 'CS12', status: 'approved' },
      { label: 'Information Technology Fundamentals', code: 'IT1231', status: 'notStarted' },
      { label: 'Programming Basic', code: 'C180', status: 'notStarted' },
    ],
  },
  {
    id: 'course-report',
    label: 'Course Report',
    icon: 'ti-chart-bar',
    type: 'Course Quality',
    rows: [
      { label: 'Computer Science Fundamentals', code: 'CS12', status: 'approved' },
      { label: 'Information Technology Fundamentals', code: 'IT1231', status: 'notStarted' },
      { label: 'Programming Basic', code: 'C180', status: 'notStarted' },
    ],
  },
  {
    id: 'crn-report',
    label: 'CRN Report',
    icon: 'ti-list-numbers',
    type: 'Operations',
    rows: [
      { label: 'Section 1', code: 'CRN-001', status: 'approved' },
      { label: 'Section 2', code: 'CRN-002', status: 'notStarted' },
      { label: 'DS CLO', code: 'CLO', status: 'approved' },
      { label: 'CR100', code: 'CR100', status: 'notStarted' },
    ],
  },
  {
    id: 'self-study',
    label: 'Self Study',
    icon: 'ti-microscope',
    type: 'Programs',
    rows: [
      { label: 'Computer Science', code: 'CS', status: 'notStarted' },
      { label: 'Computer Science Evidence', code: 'CS-EV', status: 'approved' },
      { label: 'Information System', code: 'IS', status: 'submitted' },
      { label: 'Computer Science KPI', code: 'CS-KPI', status: 'approved' },
      { label: 'Information Technology', code: 'IT', status: 'inProgress' },
      { label: 'Computer Science Review', code: 'CS-RV', status: 'approved' },
    ],
  },
  {
    id: 'attachments',
    label: 'Attachments',
    icon: 'ti-paperclip',
    type: 'Evidence',
    rows: [
      { label: 'Course evidence package', code: 'DOC-01', status: 'inProgress' },
      { label: 'Survey files', code: 'DOC-02', status: 'submitted' },
      { label: 'Committee minutes', code: 'DOC-03', status: 'notStarted' },
      { label: 'Accreditation evidence', code: 'DOC-04', status: 'rejected' },
    ],
  },
];

function getTabSummary(tab) {
  const total = tab.rows.length;
  const approved = tab.rows.filter((row) => row.status === 'approved').length;
  const notApproved = Math.max(total - approved, 0);
  const approvedPercent = total ? Math.round((approved / total) * 10000) / 100 : 0;
  const notApprovedPercent = total ? Math.round((notApproved / total) * 10000) / 100 : 0;
  const counts = statusOrder.reduce((acc, status) => {
    acc[status] = tab.rows.filter((row) => row.status === status).length;
    return acc;
  }, {});

  return { total, approved, notApproved, approvedPercent, notApprovedPercent, counts };
}

function formatPercent(value) {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2)}%`;
}

function DashboardDetails() {
  const [activeTabId, setActiveTabId] = useState(tabData[0].id);
  const activeTab = tabData.find((tab) => tab.id === activeTabId) || tabData[0];
  const summary = useMemo(() => getTabSummary(activeTab), [activeTab]);
  const chartFill = summary.total ? summary.approvedPercent : 50;
  const pendingRows = activeTab.rows.filter((row) => row.status !== 'approved');

  return (
    <section className="dashboard-details panel">
      <div className="dashboard-details-head">
        <div>
          <h2>Dashboard Details</h2>
          <span className="heading-rule" />
        </div>
        <div className="dashboard-period">
          <i className="ti ti-calendar-stats" />
          2025/2026
        </div>
      </div>

      <div className="dashboard-tabs" role="tablist" aria-label="Dashboard report views">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab.id}
            className={`dashboard-tab ${tab.id === activeTab.id ? 'active' : ''}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <i className={`ti ${tab.icon}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-detail-grid">
        <div className="approval-card">
          <div className="chart-eyebrow">{activeTab.type}</div>
          <div className="donut-wrap">
            <div className="donut-label donut-label-left">
              <span>Not Approved: {formatPercent(summary.notApprovedPercent)}</span>
            </div>
            <div
              className="approval-donut"
              style={{ '--approved': `${chartFill}%` }}
              aria-label={`${activeTab.label} approval ${formatPercent(summary.approvedPercent)}`}
            >
              <div className="donut-core">
                <strong>{summary.approved}</strong>
                <span>of {summary.total}</span>
              </div>
            </div>
            <div className="donut-label donut-label-right">
              <span>Approved: {formatPercent(summary.approvedPercent)}</span>
            </div>
          </div>
          <div className="approval-legend">
            <span><i className="legend-dot approved" />Approved</span>
            <span><i className="legend-dot not-started" />Not Approved</span>
          </div>
        </div>

        <div className="summary-side">
          <div className="summary-mini-card">
            <span>Total Items</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="summary-mini-card">
            <span>Approved</span>
            <strong>{summary.approved}</strong>
          </div>
          <div className="summary-mini-card attention">
            <span>Needs Follow-up</span>
            <strong>{pendingRows.length}</strong>
          </div>
          <div className="distribution-card">
            <div className="chart-card-title">Status Distribution</div>
            <div className="distribution-bar" aria-label="Status distribution">
              {statusOrder.map((status) => {
                const count = summary.counts[status];
                if (!count || !summary.total) return null;
                return (
                  <span
                    key={status}
                    className={`distribution-segment ${statusMeta[status].className}`}
                    style={{ width: `${(count / summary.total) * 100}%` }}
                    title={`${statusMeta[status].label}: ${count}`}
                  />
                );
              })}
            </div>
            <div className="distribution-list">
              {statusOrder.map((status) => (
                <span key={status}>
                  <i className={`legend-dot ${statusMeta[status].className}`} />
                  {statusMeta[status].label}: {summary.counts[status]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="status-chart-card">
        <div className="chart-card-title">Submission Status by Item</div>
        <div className="status-bars">
          {activeTab.rows.map((row) => {
            const meta = statusMeta[row.status];
            return (
              <div className="status-row" key={`${activeTab.id}-${row.code}`}>
                <div className="status-row-label">
                  <strong title={row.label}>{row.label}</strong>
                  <span>{row.code}</span>
                </div>
                <div className="status-track">
                  <span className={`status-fill ${meta.className}`} />
                </div>
                <span className={`status-chip ${meta.className}`}>{meta.label}</span>
              </div>
            );
          })}
        </div>
        <div className="status-legend">
          {statusOrder.map((status) => (
            <span key={status}>
              <i className={`legend-dot ${statusMeta[status].className}`} />
              {statusMeta[status].label}
            </span>
          ))}
        </div>
      </div>

      <div className="review-strip">
        <div>
          <div className="chart-card-title">Review Queue</div>
          <p>
            {pendingRows.length
              ? `${pendingRows.length} items still need coordinator follow-up.`
              : 'Everything in this view is approved.'}
          </p>
        </div>
        <div className="review-list">
          {(pendingRows.length ? pendingRows : activeTab.rows.slice(0, 2)).slice(0, 3).map((row) => {
            const meta = statusMeta[row.status];
            return (
              <span key={`queue-${activeTab.id}-${row.code}`} className="review-pill">
                <i className={`legend-dot ${meta.className}`} />
                {row.code}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const { language, t } = useI18n();
  const totalReports = tabData.reduce((sum, tab) => sum + tab.rows.length, 0);
  const totalApproved = tabData.reduce((sum, tab) => sum + getTabSummary(tab).approved, 0);
  const totalPending = tabData.reduce(
    (sum, tab) => sum + tab.rows.filter((row) => row.status !== 'approved').length,
    0
  );

  const stats = [
    { num: String(courses.length), lbl: 'Active Courses', lblAr: 'Active Courses', change: `${t('firstSemester')} 2025` },
    { num: String(programs.length), lbl: t('programs'), change: `${t('academicYear')} 2025/2026` },
    { num: String(totalPending), lbl: t('pendingReports'), change: t('requiresAction') },
    { num: String(totalApproved), lbl: t('approvedReports'), change: `${totalReports} tracked items` },
  ];

  const quickActions = [
    { icon: 'ti-file-description', label: 'Course Specification - CS12', labelAr: 'Course Specification - CS12', status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-file-certificate', label: 'Program Specification - CS', labelAr: 'Program Specification - CS', status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-target', label: 'KPIs & Indicators - CS', labelAr: 'KPIs & Indicators - CS', status: t('status.inProgress'), cls: 's-inprogress' },
  ];

  return (
    <>
      <Topbar breadcrumbs={[t('dashboard')]} />
      <div className="page-content">
        <div className="page-title">{t('welcome')}</div>
        <div className="page-subtitle">{t('academicYear')} 2025/2026 - {t('firstSemester')}</div>
        <div className="dashboard-grid">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat-card">
              <div className="dash-stat-num">{s.num}</div>
              <div className="dash-stat-lbl">{s.lblAr && language === 'ar' ? s.lblAr : s.lbl}</div>
              <div className="dash-stat-change">{s.change}</div>
            </div>
          ))}
        </div>

        <DashboardDetails />

        <div className="panel quick-actions-panel">
          <div className="sec-label" style={{ marginBottom: 16 }}>{t('quickActions')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickActions.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                <div className="hist-icon hi-blue" style={{ flexShrink: 0 }}>
                  <i className={`ti ${item.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="hist-title">{language === 'ar' ? item.labelAr : item.label}</div>
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
