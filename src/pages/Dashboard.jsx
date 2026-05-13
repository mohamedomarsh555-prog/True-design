import { useMemo, useState } from 'react';
import Topbar from '../components/Topbar';
import { courses, programs } from '../data';
import { useI18n } from '../i18n';

const statusMeta = {
  notStarted: { label: 'Not Start', labelAr: 'لم يبدأ', className: 'not-started' },
  inProgress: { label: 'In Progress', labelAr: 'قيد التنفيذ', className: 'in-progress' },
  submitted: { label: 'Submitted', labelAr: 'تم التقديم', className: 'submitted' },
  approved: { label: 'Approved', labelAr: 'معتمد', className: 'approved' },
  rejected: { label: 'Rejected', labelAr: 'مرفوض', className: 'rejected' },
};

const statusOrder = ['notStarted', 'inProgress', 'submitted', 'approved', 'rejected'];

const tabData = [
  {
    id: 'course-specifications',
    label: 'Course Specifications',
    labelAr: 'توصيفات المقررات',
    icon: 'ti-file-description',
    type: 'Course Quality',
    typeAr: 'جودة المقررات',
    rows: [
      { label: 'Computer Science Fundamentals', labelAr: 'أساسيات علوم الحاسب', code: 'CS12', status: 'approved' },
      { label: 'Information Technology Fundamentals', labelAr: 'أساسيات تقنية المعلومات', code: 'IT1231', status: 'notStarted' },
      { label: 'Programming Basic', labelAr: 'أساسيات البرمجة', code: 'C180', status: 'notStarted' },
    ],
  },
  {
    id: 'course-report',
    label: 'Course Report',
    labelAr: 'تقرير المقرر',
    icon: 'ti-chart-bar',
    type: 'Course Quality',
    typeAr: 'جودة المقررات',
    rows: [
      { label: 'Computer Science Fundamentals', labelAr: 'أساسيات علوم الحاسب', code: 'CS12', status: 'approved' },
      { label: 'Information Technology Fundamentals', labelAr: 'أساسيات تقنية المعلومات', code: 'IT1231', status: 'notStarted' },
      { label: 'Programming Basic', labelAr: 'أساسيات البرمجة', code: 'C180', status: 'notStarted' },
    ],
  },
  {
    id: 'crn-report',
    label: 'CRN Report',
    labelAr: 'تقرير الشعب',
    icon: 'ti-list-numbers',
    type: 'Operations',
    typeAr: 'التشغيل',
    rows: [
      { label: 'Section 1', labelAr: 'الشعبة 1', code: 'CRN-001', status: 'approved' },
      { label: 'Section 2', labelAr: 'الشعبة 2', code: 'CRN-002', status: 'notStarted' },
      { label: 'DS CLO', labelAr: 'مخرجات مقرر DS', code: 'CLO', status: 'approved' },
      { label: 'CR100', code: 'CR100', status: 'notStarted' },
    ],
  },
  {
    id: 'self-study',
    label: 'Self Study',
    labelAr: 'الدراسة الذاتية',
    icon: 'ti-microscope',
    type: 'Programs',
    typeAr: 'البرامج',
    rows: [
      { label: 'Computer Science', labelAr: 'علوم الحاسب', code: 'CS', status: 'notStarted' },
      { label: 'Computer Science Evidence', labelAr: 'شواهد علوم الحاسب', code: 'CS-EV', status: 'approved' },
      { label: 'Information System', labelAr: 'نظم المعلومات', code: 'IS', status: 'submitted' },
      { label: 'Computer Science KPI', labelAr: 'مؤشرات علوم الحاسب', code: 'CS-KPI', status: 'approved' },
      { label: 'Information Technology', labelAr: 'تقنية المعلومات', code: 'IT', status: 'inProgress' },
      { label: 'Computer Science Review', labelAr: 'مراجعة علوم الحاسب', code: 'CS-RV', status: 'approved' },
    ],
  },
  {
    id: 'attachments',
    label: 'Attachments',
    labelAr: 'المرفقات',
    icon: 'ti-paperclip',
    type: 'Evidence',
    typeAr: 'الشواهد',
    rows: [
      { label: 'Course evidence package', labelAr: 'حزمة شواهد المقرر', code: 'DOC-01', status: 'inProgress' },
      { label: 'Survey files', labelAr: 'ملفات الاستبيانات', code: 'DOC-02', status: 'submitted' },
      { label: 'Committee minutes', labelAr: 'محاضر اللجنة', code: 'DOC-03', status: 'notStarted' },
      { label: 'Accreditation evidence', labelAr: 'شواهد الاعتماد', code: 'DOC-04', status: 'rejected' },
    ],
  },
];

const dashboardText = {
  en: {
    details: 'Dashboard Details',
    reportViews: 'Dashboard report views',
    approved: 'Approved',
    notApproved: 'Not Approved',
    of: 'of',
    totalItems: 'Total Items',
    needsFollowUp: 'Needs Follow-up',
    statusDistribution: 'Status Distribution',
    submissionStatus: 'Submission Status by Item',
    reviewQueue: 'Review Queue',
    queuePending: (count) => `${count} items still need coordinator follow-up.`,
    queueDone: 'Everything in this view is approved.',
    activeCourses: 'Active Courses',
    trackedItems: (count) => `${count} tracked items`,
    courseSpec: 'Course Specification - CS12',
    programSpec: 'Program Specification - CS',
    kpis: 'KPIs & Indicators - CS',
  },
  ar: {
    details: 'تفاصيل لوحة التحكم',
    reportViews: 'عروض تقارير لوحة التحكم',
    approved: 'معتمد',
    notApproved: 'غير معتمد',
    of: 'من',
    totalItems: 'إجمالي العناصر',
    needsFollowUp: 'تحتاج متابعة',
    statusDistribution: 'توزيع الحالات',
    submissionStatus: 'حالة التقديم حسب العنصر',
    reviewQueue: 'قائمة المراجعة',
    queuePending: (count) => `${count} عناصر تحتاج متابعة من المنسق.`,
    queueDone: 'كل العناصر في هذا العرض معتمدة.',
    activeCourses: 'المقررات النشطة',
    trackedItems: (count) => `${count} عنصر متابع`,
    courseSpec: 'توصيف المقرر - CS12',
    programSpec: 'توصيف البرنامج - CS',
    kpis: 'مؤشرات الأداء - CS',
  },
};

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
  const { language } = useI18n();
  const labels = dashboardText[language];
  const [activeTabId, setActiveTabId] = useState(tabData[0].id);
  const activeTab = tabData.find((tab) => tab.id === activeTabId) || tabData[0];
  const summary = useMemo(() => getTabSummary(activeTab), [activeTab]);
  const chartFill = summary.total ? summary.approvedPercent : 50;
  const pendingRows = activeTab.rows.filter((row) => row.status !== 'approved');

  return (
    <section className="dashboard-details panel">
      <div className="dashboard-details-head">
        <div>
          <h2>{labels.details}</h2>
          <span className="heading-rule" />
        </div>
        <div className="dashboard-period">
          <i className="ti ti-calendar-stats" />
          2025/2026
        </div>
      </div>

      <div className="dashboard-tabs" role="tablist" aria-label={labels.reportViews}>
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
            <span>{language === 'ar' ? tab.labelAr : tab.label}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-detail-grid">
        <div className="approval-card">
          <div className="chart-eyebrow">{language === 'ar' ? activeTab.typeAr : activeTab.type}</div>
          <div className="donut-wrap">
            <div className="donut-label donut-label-left">
              <span>{labels.notApproved}: {formatPercent(summary.notApprovedPercent)}</span>
            </div>
            <div
              className="approval-donut"
              style={{ '--approved': `${chartFill}%` }}
              aria-label={`${language === 'ar' ? activeTab.labelAr : activeTab.label} ${labels.approved} ${formatPercent(summary.approvedPercent)}`}
            >
              <div className="donut-core">
                <strong>{summary.approved}</strong>
                <span>{labels.of} {summary.total}</span>
              </div>
            </div>
            <div className="donut-label donut-label-right">
              <span>{labels.approved}: {formatPercent(summary.approvedPercent)}</span>
            </div>
          </div>
          <div className="approval-legend">
            <span><i className="legend-dot approved" />{labels.approved}</span>
            <span><i className="legend-dot not-started" />{labels.notApproved}</span>
          </div>
        </div>

        <div className="summary-side">
          <div className="summary-mini-card">
            <span>{labels.totalItems}</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="summary-mini-card">
            <span>{labels.approved}</span>
            <strong>{summary.approved}</strong>
          </div>
          <div className="summary-mini-card attention">
            <span>{labels.needsFollowUp}</span>
            <strong>{pendingRows.length}</strong>
          </div>
          <div className="distribution-card">
            <div className="chart-card-title">{labels.statusDistribution}</div>
            <div className="distribution-bar" aria-label="Status distribution">
              {statusOrder.map((status) => {
                const count = summary.counts[status];
                if (!count || !summary.total) return null;
                return (
                  <span
                    key={status}
                    className={`distribution-segment ${statusMeta[status].className}`}
                    style={{ width: `${(count / summary.total) * 100}%` }}
                    title={`${language === 'ar' ? statusMeta[status].labelAr : statusMeta[status].label}: ${count}`}
                  />
                );
              })}
            </div>
            <div className="distribution-list">
              {statusOrder.map((status) => (
                <span key={status}>
                  <i className={`legend-dot ${statusMeta[status].className}`} />
                  {language === 'ar' ? statusMeta[status].labelAr : statusMeta[status].label}: {summary.counts[status]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="status-chart-card">
        <div className="chart-card-title">{labels.submissionStatus}</div>
        <div className="status-bars">
          {activeTab.rows.map((row) => {
            const meta = statusMeta[row.status];
            return (
              <div className="status-row" key={`${activeTab.id}-${row.code}`}>
                <div className="status-row-label">
                  <strong title={language === 'ar' ? row.labelAr || row.label : row.label}>{language === 'ar' ? row.labelAr || row.label : row.label}</strong>
                  <span>{row.code}</span>
                </div>
                <div className="status-track">
                  <span className={`status-fill ${meta.className}`} />
                </div>
                <span className={`status-chip ${meta.className}`}>{language === 'ar' ? meta.labelAr : meta.label}</span>
              </div>
            );
          })}
        </div>
        <div className="status-legend">
          {statusOrder.map((status) => (
            <span key={status}>
              <i className={`legend-dot ${statusMeta[status].className}`} />
              {language === 'ar' ? statusMeta[status].labelAr : statusMeta[status].label}
            </span>
          ))}
        </div>
      </div>

      <div className="review-strip">
        <div>
          <div className="chart-card-title">{labels.reviewQueue}</div>
          <p>
            {pendingRows.length
              ? labels.queuePending(pendingRows.length)
              : labels.queueDone}
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
  const labels = dashboardText[language];
  const totalReports = tabData.reduce((sum, tab) => sum + tab.rows.length, 0);
  const totalApproved = tabData.reduce((sum, tab) => sum + getTabSummary(tab).approved, 0);
  const totalPending = tabData.reduce(
    (sum, tab) => sum + tab.rows.filter((row) => row.status !== 'approved').length,
    0
  );

  const stats = [
    { num: String(courses.length), lbl: labels.activeCourses, change: `${t('firstSemester')} 2025` },
    { num: String(programs.length), lbl: t('programs'), change: `${t('academicYear')} 2025/2026` },
    { num: String(totalPending), lbl: t('pendingReports'), change: t('requiresAction') },
    { num: String(totalApproved), lbl: t('approvedReports'), change: labels.trackedItems(totalReports) },
  ];

  const quickActions = [
    { icon: 'ti-file-description', label: labels.courseSpec, status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-file-certificate', label: labels.programSpec, status: t('status.pendingSubmit'), cls: 's-pending' },
    { icon: 'ti-target', label: labels.kpis, status: t('status.inProgress'), cls: 's-inprogress' },
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
              <div className="dash-stat-lbl">{s.lbl}</div>
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
                <div className="hist-icon hi-primary" style={{ flexShrink: 0 }}>
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
