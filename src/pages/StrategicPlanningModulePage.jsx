import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';
import {
  alignmentLinks,
  planStatuses,
  planTypes,
  progressCalculationMethods,
  strategicActivity,
  strategicAnalysisItems,
  strategicApprovals,
  strategicBudgets,
  strategicComments,
  strategicDocuments,
  strategicInitiatives,
  strategicKPIs,
  strategicMilestones,
  strategicNews,
  strategicNotifications,
  strategicPermissions,
  strategicPillars,
  strategicPlans,
  strategicReports,
  strategicResources,
  strategicRisks,
  strategicTasks,
  strategicObjectives,
} from '../data/strategicData';

const t = (language, en, ar) => (language === 'ar' ? ar : en);
const localName = (item, key, language) => (language === 'ar' ? item?.[`${key}Ar`] || item?.[key] : item?.[key]);

const strategicSections = [
  { path: 'dashboard', label: 'Dashboard', labelAr: 'لوحة التحكم', icon: 'ti-layout-dashboard' },
  { path: 'plans', label: 'Strategic Plans', labelAr: 'الخطط الاستراتيجية', icon: 'ti-files' },
  { path: 'analysis', label: 'Analysis', labelAr: 'التحليل', icon: 'ti-adjustments-search' },
  { path: 'objectives', label: 'Pillars & Objectives', labelAr: 'المحاور والأهداف', icon: 'ti-hierarchy' },
  { path: 'alignment', label: 'Alignment', labelAr: 'المواءمة', icon: 'ti-route' },
  { path: 'projects', label: 'Initiatives & Projects', labelAr: 'المبادرات والمشاريع', icon: 'ti-briefcase' },
  { path: 'timeline', label: 'Timeline', labelAr: 'الخطة الزمنية', icon: 'ti-timeline' },
  { path: 'kpis', label: 'KPIs', labelAr: 'المؤشرات', icon: 'ti-chart-infographic' },
  { path: 'risks', label: 'Risks', labelAr: 'المخاطر', icon: 'ti-alert-triangle' },
  { path: 'budgets', label: 'Resources & Budgets', labelAr: 'الموارد والميزانيات', icon: 'ti-wallet' },
  { path: 'governance', label: 'Governance', labelAr: 'الحوكمة والصلاحيات', icon: 'ti-shield-lock' },
  { path: 'approvals', label: 'Approvals', labelAr: 'الموافقات', icon: 'ti-rosette-discount-check' },
  { path: 'notifications', label: 'Notifications', labelAr: 'التنبيهات', icon: 'ti-bell-ringing' },
  { path: 'reports', label: 'Reports', labelAr: 'التقارير', icon: 'ti-report-analytics' },
  { path: 'news', label: 'News Ticker', labelAr: 'شريط الأخبار', icon: 'ti-news' },
];

const statusClass = (status = '') => {
  const value = status.toLowerCase();
  if (['approved', 'active', 'completed', 'published', 'on track'].some((key) => value.includes(key))) return 's-approved';
  if (['risk', 'critical', 'returned', 'rejected', 'delayed'].some((key) => value.includes(key))) return 's-rejected';
  if (['review', 'submitted', 'progress', 'mitigating'].some((key) => value.includes(key))) return 's-pending';
  return 's-not-started';
};

const formatMoney = (value) => `${Number(value || 0).toLocaleString()} SAR`;

function ProgressLine({ value }) {
  return (
    <div className="sp-progress">
      <span><i style={{ width: `${Math.max(4, Math.min(100, value))}%` }} /></span>
      <strong>{value}%</strong>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`status-pill ${statusClass(status)}`}>{status}</span>;
}

function ActionBar({ compact = false }) {
  const actions = compact
    ? [['ti-eye', 'View'], ['ti-edit', 'Edit'], ['ti-copy', 'Duplicate']]
    : [['ti-eye', 'View'], ['ti-edit', 'Edit'], ['ti-trash', 'Delete'], ['ti-copy', 'Duplicate'], ['ti-archive', 'Archive'], ['ti-send', 'Submit'], ['ti-check', 'Approve'], ['ti-file-export', 'Export']];
  return (
    <div className="sp-row-actions">
      {actions.map(([icon, label]) => (
        <button key={label} type="button" title={label} aria-label={label}>
          <i className={`ti ${icon}`} />
        </button>
      ))}
    </div>
  );
}

function MetricGrid({ metrics }) {
  return (
    <div className="sp-metric-grid">
      {metrics.map((metric) => (
        <div className="sp-metric" key={metric.label}>
          <i className={`ti ${metric.icon}`} />
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

function SmartTable({ columns, rows, emptyText }) {
  const [query, setQuery] = useState('');
  const visibleRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) => Object.values(row).some((value) => String(value?.props?.children ?? value ?? '').toLowerCase().includes(normalized)));
  }, [query, rows]);

  return (
    <div className="sp-table-shell">
      <div className="sp-table-tools">
        <label className="sp-search">
          <i className="ti ti-search" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" />
        </label>
        <button type="button" className="btn-outline"><i className="ti ti-file-export" /> PDF</button>
        <button type="button" className="btn-outline"><i className="ti ti-table-export" /> Excel</button>
      </div>
      <div className="sp-table-scroll">
        <table className="sp-table">
          <thead>
            <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {visibleRows.length === 0 && <div className="sp-empty">{emptyText}</div>}
      </div>
    </div>
  );
}

function ChartBars({ items, labelKey = 'name', valueKey = 'progress', language }) {
  return (
    <div className="sp-chart-bars">
      {items.map((item) => (
        <div className="sp-chart-row" key={item.id || item[labelKey]}>
          <span>{localName(item, labelKey, language) || item[labelKey]}</span>
          <div><i style={{ width: `${Math.min(100, item[valueKey])}%` }} /></div>
          <strong>{item[valueKey]}%</strong>
        </div>
      ))}
    </div>
  );
}

function PlanFormModal({ plan, onClose, onSave }) {
  const { language } = useI18n();
  const [form, setForm] = useState(plan || {
    code: `SP-${new Date().getFullYear()}-${Math.floor(Math.random() * 90 + 10)}`,
    name: '',
    nameAr: '',
    type: planTypes[0],
    owner: '',
    owningEntity: '',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Draft',
    progress: 0,
    priority: 'Medium',
    confidentiality: 'Internal',
    description: '',
    descriptionAr: '',
    colleges: [],
    programs: [],
    partners: [],
    scope: '',
    planManager: '',
    workTeam: [],
    updateOwners: [],
    viewPermissions: ['Viewer'],
    editPermissions: ['Plan Owner'],
    approvePermissions: ['Approver'],
  });

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = (status) => {
    onSave({
      ...form,
      id: form.id || form.code || `PLAN-${Date.now()}`,
      status,
      statusAr: status,
      duration: 'Custom',
      lastUpdate: '2026-05-15 12:00',
      ownerId: form.ownerId || 'USR-NEW',
    });
  };

  return (
    <div className="sp-modal-backdrop">
      <div className="sp-modal">
        <div className="sp-modal-head">
          <div>
            <span>{t(language, 'Strategic Plan Form', 'نموذج الخطة')}</span>
            <h2>{plan ? t(language, 'Edit Plan', 'تعديل الخطة') : t(language, 'Add New Plan', 'إضافة خطة جديدة')}</h2>
          </div>
          <button type="button" onClick={onClose} className="sp-icon-btn"><i className="ti ti-x" /></button>
        </div>
        <div className="sp-form-grid">
          <section>
            <h3>{t(language, 'Basic Information', 'البيانات الأساسية')}</h3>
            <label>{t(language, 'Plan Name', 'اسم الخطة')}<input value={form.name} onChange={(event) => set('name', event.target.value)} /></label>
            <label>{t(language, 'Arabic Name', 'اسم الخطة بالعربية')}<input value={form.nameAr} onChange={(event) => set('nameAr', event.target.value)} /></label>
            <label>{t(language, 'Plan Code', 'كود الخطة')}<input value={form.code} onChange={(event) => set('code', event.target.value)} /></label>
            <label>{t(language, 'Plan Type', 'نوع الخطة')}<select value={form.type} onChange={(event) => set('type', event.target.value)}>{planTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
            <label>{t(language, 'Owner', 'المالك')}<input value={form.owner} onChange={(event) => set('owner', event.target.value)} /></label>
            <label>{t(language, 'Owning Entity', 'الجهة المالكة')}<input value={form.owningEntity} onChange={(event) => set('owningEntity', event.target.value)} /></label>
            <label>{t(language, 'Start Date', 'تاريخ البداية')}<input type="date" value={form.startDate} onChange={(event) => set('startDate', event.target.value)} /></label>
            <label>{t(language, 'End Date', 'تاريخ النهاية')}<input type="date" value={form.endDate} onChange={(event) => set('endDate', event.target.value)} /></label>
            <label>{t(language, 'Status', 'الحالة')}<select value={form.status} onChange={(event) => set('status', event.target.value)}>{planStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <label>{t(language, 'Confidentiality', 'مستوى السرية')}<select value={form.confidentiality} onChange={(event) => set('confidentiality', event.target.value)}><option>Public</option><option>Internal</option><option>Restricted</option></select></label>
            <label>{t(language, 'Priority', 'الأولوية')}<select value={form.priority} onChange={(event) => set('priority', event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label className="wide">{t(language, 'Description', 'وصف الخطة')}<textarea value={form.description} onChange={(event) => set('description', event.target.value)} /></label>
          </section>
          <section>
            <h3>{t(language, 'Plan Scope', 'نطاق الخطة')}</h3>
            <label>{t(language, 'Colleges / Departments', 'الكليات / الإدارات')}<input value={(form.colleges || []).join(', ')} onChange={(event) => set('colleges', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'Linked Programs', 'البرامج المرتبطة')}<input value={(form.programs || []).join(', ')} onChange={(event) => set('programs', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'Participating Entities', 'الجهات المشاركة')}<input value={(form.partners || []).join(', ')} onChange={(event) => set('partners', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label className="wide">{t(language, 'Application Scope', 'نطاق التطبيق')}<textarea value={form.scope} onChange={(event) => set('scope', event.target.value)} /></label>
          </section>
          <section>
            <h3>{t(language, 'Governance', 'الحوكمة')}</h3>
            <label>{t(language, 'Plan Manager', 'مدير الخطة')}<input value={form.planManager} onChange={(event) => set('planManager', event.target.value)} /></label>
            <label>{t(language, 'Work Team', 'فريق العمل')}<input value={(form.workTeam || []).join(', ')} onChange={(event) => set('workTeam', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'Update Owners', 'مسؤولو التحديث')}<input value={(form.updateOwners || []).join(', ')} onChange={(event) => set('updateOwners', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'View Permissions', 'صلاحيات العرض')}<input value={(form.viewPermissions || []).join(', ')} onChange={(event) => set('viewPermissions', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'Edit Permissions', 'صلاحيات التعديل')}<input value={(form.editPermissions || []).join(', ')} onChange={(event) => set('editPermissions', event.target.value.split(',').map((item) => item.trim()))} /></label>
            <label>{t(language, 'Approve Permissions', 'صلاحيات الاعتماد')}<input value={(form.approvePermissions || []).join(', ')} onChange={(event) => set('approvePermissions', event.target.value.split(',').map((item) => item.trim()))} /></label>
          </section>
        </div>
        <div className="sp-modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>{t(language, 'Cancel', 'إلغاء')}</button>
          <button type="button" className="btn-outline" onClick={() => save('Draft')}>{t(language, 'Save Draft', 'حفظ كمسودة')}</button>
          <button type="button" className="btn-outline" onClick={() => save('Under Review')}>{t(language, 'Submit for Review', 'إرسال للمراجعة')}</button>
          <button type="button" className="btn-primary" onClick={() => save('Submitted')}>{t(language, 'Submit for Approval', 'إرسال للاعتماد')}</button>
        </div>
      </div>
    </div>
  );
}

function StrategicDashboard() {
  const { language } = useI18n();
  const delayedTasks = strategicTasks.filter((task) => ['Delayed', 'Under Review'].includes(task.status)).length;
  const offTrackKpis = strategicKPIs.filter((kpi) => kpi.status !== 'On Track').length;
  const highRisks = strategicRisks.filter((risk) => ['High', 'Critical'].includes(risk.level)).length;
  const avgProgress = Math.round(strategicPlans.reduce((sum, plan) => sum + plan.progress, 0) / strategicPlans.length);

  return (
    <div className="sp-stack">
      <NewsTicker />
      <MetricGrid metrics={[
        { icon: 'ti-files', value: strategicPlans.length, label: t(language, 'Plans', 'الخطط') },
        { icon: 'ti-player-play', value: strategicPlans.filter((plan) => plan.status === 'Active').length, label: t(language, 'Active Plans', 'الخطط النشطة') },
        { icon: 'ti-target', value: strategicObjectives.length, label: t(language, 'Objectives', 'الأهداف') },
        { icon: 'ti-briefcase', value: strategicInitiatives.length, label: t(language, 'Initiatives / Projects', 'المبادرات / المشاريع') },
        { icon: 'ti-chart-infographic', value: strategicKPIs.length, label: t(language, 'KPIs', 'المؤشرات') },
        { icon: 'ti-alert-triangle', value: strategicRisks.length, label: t(language, 'Risks', 'المخاطر') },
        { icon: 'ti-progress', value: `${avgProgress}%`, label: t(language, 'Overall Progress', 'نسبة الإنجاز العامة') },
        { icon: 'ti-clock-exclamation', value: delayedTasks, label: t(language, 'Late Tasks', 'المهام المتأخرة') },
        { icon: 'ti-chart-dots', value: offTrackKpis, label: t(language, 'KPIs Off Track', 'مؤشرات خارج المسار') },
        { icon: 'ti-alert-octagon', value: highRisks, label: t(language, 'High Risks', 'المخاطر العالية') },
      ]} />

      <div className="sp-two-col">
        <section className="sp-panel">
          <div className="sp-panel-head"><h2>{t(language, 'Progress by Plan', 'التقدم حسب الخطة')}</h2><Link to="/strategic-planning/plans">{t(language, 'Open plans', 'فتح الخطط')}</Link></div>
          <ChartBars items={strategicPlans} language={language} />
        </section>
        <section className="sp-panel">
          <div className="sp-panel-head"><h2>{t(language, 'Risk Matrix', 'مصفوفة المخاطر')}</h2><Link to="/strategic-planning/risks">{t(language, 'Risk register', 'سجل المخاطر')}</Link></div>
          <RiskMatrix />
        </section>
      </div>

      <div className="sp-three-col">
        <section className="sp-panel">
          <h2>{t(language, 'KPI Status', 'حالة المؤشرات')}</h2>
          <DonutLike items={[['On Track', strategicKPIs.filter((kpi) => kpi.status === 'On Track').length], ['At Risk', offTrackKpis]]} />
        </section>
        <section className="sp-panel">
          <h2>{t(language, 'Project Status', 'حالة المشاريع')}</h2>
          <DonutLike items={[['In Progress', 2], ['Planned', 1], ['Completed', 0]]} />
        </section>
        <section className="sp-panel">
          <h2>{t(language, 'Budget Planned vs Actual', 'الميزانية المخططة مقابل الفعلية')}</h2>
          <ChartBars items={strategicBudgets.map((budget) => ({ ...budget, name: budget.id, progress: Math.round((budget.actualAmount / budget.approvedAmount) * 100) }))} language={language} />
        </section>
      </div>

      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Tasks by Status', 'المهام حسب الحالة')}</h2><Link to="/strategic-planning/timeline">{t(language, 'Timeline', 'الخطة الزمنية')}</Link></div>
        <KanbanPreview tasks={strategicTasks} />
      </section>
    </div>
  );
}

function DonutLike({ items }) {
  const total = items.reduce((sum, item) => sum + item[1], 0) || 1;
  return (
    <div className="sp-donut-list">
      {items.map(([label, value], index) => (
        <div key={label}>
          <span><i className={`tone-${index}`} style={{ width: `${(value / total) * 100}%` }} /></span>
          <strong>{value}</strong>
          <em>{label}</em>
        </div>
      ))}
    </div>
  );
}

function NewsTicker() {
  const { language } = useI18n();
  return (
    <div className="sp-news-ticker">
      <div><i className="ti ti-news" /> {t(language, 'Strategic Planning News', 'أخبار التخطيط الاستراتيجي')}</div>
      <marquee>{strategicNews.map((news) => `${localName(news, 'title', language)} - ${news.publishDate}`).join('   |   ')}</marquee>
    </div>
  );
}

function PlansPage() {
  const { language } = useI18n();
  const [plans, setPlans] = useState(strategicPlans);
  const [filters, setFilters] = useState({ query: '', type: 'All', status: 'All', owner: 'All', period: 'All' });
  const [editingPlan, setEditingPlan] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const owners = ['All', ...new Set(plans.map((plan) => plan.owner))];
  const filteredPlans = plans.filter((plan) => {
    const query = filters.query.trim().toLowerCase();
    const matchesQuery = !query || [plan.code, plan.name, plan.nameAr, plan.owner].some((value) => String(value || '').toLowerCase().includes(query));
    const matchesType = filters.type === 'All' || plan.type === filters.type;
    const matchesStatus = filters.status === 'All' || plan.status === filters.status;
    const matchesOwner = filters.owner === 'All' || plan.owner === filters.owner;
    const matchesPeriod = filters.period === 'All' || plan.startDate.startsWith(filters.period) || plan.endDate.startsWith(filters.period);
    return matchesQuery && matchesType && matchesStatus && matchesOwner && matchesPeriod;
  });

  const upsertPlan = (plan) => {
    setPlans((current) => current.some((item) => item.id === plan.id) ? current.map((item) => (item.id === plan.id ? plan : item)) : [plan, ...current]);
    setEditingPlan(null);
    setFormOpen(false);
  };

  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-files', value: plans.length, label: t(language, 'All Plans', 'كل الخطط') },
        { icon: 'ti-player-play', value: plans.filter((plan) => plan.status === 'Active').length, label: t(language, 'Active', 'نشطة') },
        { icon: 'ti-clock-hour-4', value: plans.filter((plan) => plan.status === 'Under Review').length, label: t(language, 'Under Review', 'قيد المراجعة') },
        { icon: 'ti-progress-check', value: `${Math.round(plans.reduce((sum, plan) => sum + plan.progress, 0) / plans.length)}%`, label: t(language, 'Average Progress', 'متوسط الإنجاز') },
      ]} />

      <section className="sp-panel">
        <div className="sp-panel-head">
          <div>
            <h2>{t(language, 'Strategic Plans Management', 'إدارة الخطط الاستراتيجية')}</h2>
            <p>{t(language, 'Search, filter, add, edit, duplicate, archive, and submit plans for approval.', 'بحث وفلترة وإضافة وتعديل ونسخ وأرشفة وإرسال الخطط للاعتماد.')}</p>
          </div>
          <button type="button" className="btn-primary" onClick={() => { setEditingPlan(null); setFormOpen(true); }}><i className="ti ti-plus" /> {t(language, 'Add New Plan', 'إضافة خطة جديدة')}</button>
        </div>

        <div className="sp-filters">
          <label><i className="ti ti-search" /><input value={filters.query} onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))} placeholder={t(language, 'Search plans', 'بحث في الخطط')} /></label>
          <select value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}><option>All</option>{planTypes.map((type) => <option key={type}>{type}</option>)}</select>
          <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}><option>All</option>{planStatuses.map((status) => <option key={status}>{status}</option>)}</select>
          <select value={filters.owner} onChange={(event) => setFilters((current) => ({ ...current, owner: event.target.value }))}>{owners.map((owner) => <option key={owner}>{owner}</option>)}</select>
          <select value={filters.period} onChange={(event) => setFilters((current) => ({ ...current, period: event.target.value }))}><option>All</option><option>2025</option><option>2026</option><option>2030</option></select>
        </div>

        <SmartTable
          emptyText={t(language, 'No plans match current filters.', 'لا توجد خطط مطابقة للفلاتر الحالية.')}
          columns={[
            { key: 'code', label: t(language, 'Code', 'كود الخطة') },
            { key: 'name', label: t(language, 'Plan Name', 'اسم الخطة') },
            { key: 'type', label: t(language, 'Type', 'نوع الخطة') },
            { key: 'owner', label: t(language, 'Owner', 'المالك') },
            { key: 'startDate', label: t(language, 'Start', 'البداية') },
            { key: 'endDate', label: t(language, 'End', 'النهاية') },
            { key: 'progress', label: t(language, 'Progress', 'نسبة الإنجاز') },
            { key: 'status', label: t(language, 'Status', 'الحالة') },
            { key: 'lastUpdate', label: t(language, 'Last Update', 'آخر تحديث') },
            { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
          ]}
          rows={filteredPlans.map((plan) => ({
            id: plan.id,
            code: plan.code,
            name: <Link className="project-link" to={`/strategic-planning/plans/${plan.id}`}>{localName(plan, 'name', language)}</Link>,
            type: localName(plan, 'type', language),
            owner: localName(plan, 'owner', language),
            startDate: plan.startDate,
            endDate: plan.endDate,
            progress: <ProgressLine value={plan.progress} />,
            status: <StatusBadge status={localName(plan, 'status', language)} />,
            lastUpdate: plan.lastUpdate,
            actions: (
              <div className="sp-row-actions">
                <Link to={`/strategic-planning/plans/${plan.id}`} title="View"><i className="ti ti-eye" /></Link>
                <button type="button" title="Edit" onClick={() => { setEditingPlan(plan); setFormOpen(true); }}><i className="ti ti-edit" /></button>
                <button type="button" title="Delete" onClick={() => setPlans((current) => current.filter((item) => item.id !== plan.id))}><i className="ti ti-trash" /></button>
                <button type="button" title="Duplicate" onClick={() => setPlans((current) => [{ ...plan, id: `${plan.id}-COPY`, code: `${plan.code}-COPY`, name: `${plan.name} Copy`, status: 'Draft' }, ...current])}><i className="ti ti-copy" /></button>
                <button type="button" title="Submit" onClick={() => setPlans((current) => current.map((item) => item.id === plan.id ? { ...item, status: 'Submitted' } : item))}><i className="ti ti-send" /></button>
              </div>
            ),
          }))}
        />
      </section>

      {formOpen && <PlanFormModal plan={editingPlan} onClose={() => setFormOpen(false)} onSave={upsertPlan} />}
    </div>
  );
}

function AnalysisPage() {
  const { language } = useI18n();
  const swotCategories = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
  const pestelCategories = ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'];
  return (
    <div className="sp-stack">
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'SWOT Analysis', 'تحليل SWOT')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Analysis Item', 'إضافة عنصر تحليل')}</button></div>
        <div className="sp-swot-grid">
          {swotCategories.map((category) => (
            <div key={category} className="sp-analysis-col">
              <h3>{category}</h3>
              {strategicAnalysisItems.filter((item) => item.analysisType === 'SWOT' && item.category === category).map((item) => (
                <article key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <div><StatusBadge status={item.priority} /><span>{item.linkedEntityType}: {item.linkedEntityId}</span></div>
                  <ActionBar compact />
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'PESTEL Analysis', 'تحليل PESTEL')}</h2><button className="btn-outline" type="button"><i className="ti ti-adjustments-plus" /> {t(language, 'Add Other Analysis Type', 'إضافة نوع تحليل آخر')}</button></div>
        <div className="sp-pestel-grid">
          {pestelCategories.map((category) => {
            const factor = strategicAnalysisItems.find((item) => item.analysisType === 'PESTEL' && item.category === category);
            return (
              <article key={category} className="sp-factor-card">
                <span>{category}</span>
                <h3>{factor?.title || t(language, 'Ready for input', 'جاهز للإدخال')}</h3>
                <p>{factor?.description || t(language, 'Add factor title, impact, likelihood, priority, recommendation, and link it to a plan component.', 'أضف العامل والتأثير والاحتمالية والأولوية والتوصية واربطه بمكون من الخطة.')}</p>
                <div className="sp-factor-score">
                  <span>{t(language, 'Impact', 'التأثير')}: {factor?.impactDegree || '-'}</span>
                  <span>{t(language, 'Likelihood', 'الاحتمالية')}: {factor?.likelihoodDegree || '-'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <LinkedItemsPanel />
    </div>
  );
}

function ObjectivesPage() {
  const { language } = useI18n();
  const [view, setView] = useState('tree');
  return (
    <section className="sp-panel">
      <div className="sp-panel-head">
        <div>
          <h2>{t(language, 'Pillars, Main Objectives, and Sub Objectives', 'المحاور والأهداف الرئيسية والفرعية')}</h2>
          <p>{t(language, 'Supports add, edit, delete, drag reorder, linked objectives, tree view, table view, and cards view.', 'يدعم الإضافة والتعديل والحذف وإعادة الترتيب والربط وعروض الشجرة والجدول والبطاقات.')}</p>
        </div>
        <div className="sp-segment">
          {['tree', 'table', 'cards'].map((item) => <button key={item} className={view === item ? 'active' : ''} type="button" onClick={() => setView(item)}>{item}</button>)}
        </div>
      </div>
      {view === 'tree' && <ObjectiveTree />}
      {view === 'table' && <SmartTable emptyText="No objectives" columns={[
        { key: 'code', label: t(language, 'Code', 'الكود') },
        { key: 'name', label: t(language, 'Name', 'الاسم') },
        { key: 'pillar', label: t(language, 'Pillar', 'المحور') },
        { key: 'owner', label: t(language, 'Owner', 'المالك') },
        { key: 'weight', label: t(language, 'Weight', 'الوزن') },
        { key: 'progress', label: t(language, 'Progress', 'الإنجاز') },
        { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
      ]} rows={strategicObjectives.map((objective) => {
        const pillar = strategicPillars.find((item) => item.id === objective.pillarId);
        return {
          id: objective.id,
          code: objective.code,
          name: <Link className="project-link" to={`/strategic-planning/objectives/${objective.id}`}>{localName(objective, 'name', language)}</Link>,
          pillar: localName(pillar, 'name', language),
          owner: localName(objective, 'owner', language),
          weight: `${objective.weight}%`,
          progress: <ProgressLine value={objective.progress} />,
          actions: <ActionBar compact />,
        };
      })} />}
      {view === 'cards' && (
        <div className="sp-card-grid">
          {strategicObjectives.map((objective) => <EntityCard key={objective.id} entity={objective} icon="ti-target" to={`/strategic-planning/objectives/${objective.id}`} />)}
        </div>
      )}
    </section>
  );
}

function ObjectiveTree() {
  const { language } = useI18n();
  return (
    <div className="sp-tree">
      {strategicPillars.map((pillar) => (
        <div className="sp-tree-pillar" key={pillar.id}>
          <div className="sp-tree-node pillar">
            <i className="ti ti-layout-grid" />
            <strong>{pillar.code} - {localName(pillar, 'name', language)}</strong>
            <ProgressLine value={pillar.progress} />
            <ActionBar compact />
          </div>
          {strategicObjectives.filter((objective) => objective.pillarId === pillar.id && !objective.parentObjectiveId).map((objective) => (
            <div className="sp-tree-branch" key={objective.id}>
              <div className="sp-tree-node objective">
                <i className="ti ti-target" />
                <Link className="project-link" to={`/strategic-planning/objectives/${objective.id}`}>{objective.code} - {localName(objective, 'name', language)}</Link>
                <ProgressLine value={objective.progress} />
                <ActionBar compact />
              </div>
              {strategicObjectives.filter((sub) => sub.parentObjectiveId === objective.id).map((sub) => (
                <div className="sp-tree-node sub" key={sub.id}>
                  <i className="ti ti-subtask" />
                  <Link className="project-link" to={`/strategic-planning/objectives/${sub.id}`}>{sub.code} - {localName(sub, 'name', language)}</Link>
                  <ProgressLine value={sub.progress} />
                  <ActionBar compact />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function EntityCard({ entity, icon, to }) {
  const { language } = useI18n();
  return (
    <article className="sp-entity-card">
      <div><i className={`ti ${icon}`} /><StatusBadge status={entity.status} /></div>
      <h3>{to ? <Link to={to}>{localName(entity, 'name', language) || entity.title}</Link> : localName(entity, 'name', language) || entity.title}</h3>
      <p>{localName(entity, 'description', language)}</p>
      <ProgressLine value={entity.progress || Math.min(100, entity.score * 5) || 0} />
      <ActionBar compact />
    </article>
  );
}

function AlignmentPage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Alignment Matrix', 'مصفوفة المواءمة')}</h2><button className="btn-primary" type="button"><i className="ti ti-link-plus" /> {t(language, 'Link Item', 'ربط عنصر')}</button></div>
        <div className="sp-matrix">
          <div />
          {strategicInitiatives.map((initiative) => <strong key={initiative.id}>{initiative.code}</strong>)}
          {strategicObjectives.filter((objective) => !objective.parentObjectiveId).map((objective) => (
            <>
              <strong key={`${objective.id}-label`}>{objective.code}</strong>
              {strategicInitiatives.map((initiative) => <span key={`${objective.id}-${initiative.id}`} className={initiative.objectiveId?.startsWith(objective.id) ? 'linked' : ''}>{initiative.objectiveId?.startsWith(objective.id) ? '✓' : '-'}</span>)}
            </>
          ))}
        </div>
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Relationship Map', 'خريطة العلاقات')}</h2><span>{t(language, 'Plan → Pillar → Objective → Initiative → KPI / Risk', 'الخطة → المحور → الهدف → المبادرة → المؤشر / الخطر')}</span></div>
        <div className="sp-relationship-map">
          {alignmentLinks.map((link) => <div key={link.id}><span>{link.sourceType}</span><i className="ti ti-arrow-left-right" /><strong>{link.targetType}</strong><em>{link.label}</em></div>)}
        </div>
      </section>
      <LinkedItemsPanel />
    </div>
  );
}

function ProjectsPage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-briefcase', value: strategicInitiatives.length, label: t(language, 'Total Projects', 'إجمالي المشاريع') },
        { icon: 'ti-flag-3', value: strategicMilestones.length, label: t(language, 'Milestones', 'المراحل') },
        { icon: 'ti-list-check', value: strategicTasks.length, label: t(language, 'Tasks', 'المهام') },
        { icon: 'ti-wallet', value: formatMoney(strategicInitiatives.reduce((sum, item) => sum + item.budget, 0)), label: t(language, 'Budget', 'الميزانية') },
      ]} />
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Initiatives and Projects', 'المبادرات والمشاريع')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Project', 'إضافة مشروع')}</button></div>
        <div className="sp-card-grid">
          {strategicInitiatives.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }) {
  const { language } = useI18n();
  const objective = strategicObjectives.find((item) => item.id === project.objectiveId);
  return (
    <article className="sp-project-card">
      <div className="sp-card-top"><span>{project.code}</span><StatusBadge status={localName(project, 'status', language)} /></div>
      <h3><Link to={`/strategic-planning/projects/${project.id}`}>{localName(project, 'name', language)}</Link></h3>
      <p>{localName(project, 'description', language)}</p>
      <dl>
        <div><dt>{t(language, 'Objective', 'الهدف')}</dt><dd>{localName(objective, 'name', language)}</dd></div>
        <div><dt>{t(language, 'Manager', 'مدير المشروع')}</dt><dd>{project.manager}</dd></div>
        <div><dt>{t(language, 'Budget', 'الميزانية')}</dt><dd>{formatMoney(project.budget)}</dd></div>
      </dl>
      <ProgressLine value={project.progress} />
      <ActionBar />
    </article>
  );
}

function TimelinePage() {
  const { language } = useI18n();
  const items = [
    ...strategicPlans.map((item) => ({ id: item.id, type: 'Plan', title: localName(item, 'name', language), progress: item.progress, start: item.startDate, end: item.endDate, offset: 0, width: 92 })),
    ...strategicPillars.map((item, index) => ({ id: item.id, type: 'Pillar', title: localName(item, 'name', language), progress: item.progress, start: '2025-01-01', end: '2030-12-31', offset: index * 4 + 2, width: 78 })),
    ...strategicObjectives.map((item, index) => ({ id: item.id, type: 'Objective', title: localName(item, 'name', language), progress: item.progress, start: item.startDate, end: item.endDate, offset: index * 5 + 8, width: 54 })),
    ...strategicInitiatives.map((item, index) => ({ id: item.id, type: 'Project', title: localName(item, 'name', language), progress: item.progress, start: item.startDate, end: item.endDate, offset: index * 10 + 12, width: 30 })),
    ...strategicMilestones.map((item, index) => ({ id: item.id, type: 'Milestone', title: localName(item, 'name', language), progress: item.progress, start: item.startDate, end: item.endDate, offset: index * 8 + 16, width: 22 })),
    ...strategicTasks.map((item, index) => ({ id: item.id, type: 'Task', title: localName(item, 'title', language), progress: item.progress, start: item.startDate, end: item.dueDate, offset: index * 7 + 20, width: 16 })),
  ];
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Integrated Gantt Timeline', 'مخطط جانت المتكامل')}</h2><span>{t(language, 'Planned / actual dates, dependencies, delays, progress, and critical items.', 'المخطط والفعلي والاعتماديات والتأخير والتقدم والعناصر الحرجة.')}</span></div>
      <div className="sp-gantt">
        <div className="sp-gantt-head"><span>{t(language, 'Item', 'العنصر')}</span><strong>2025</strong><strong>2026</strong><strong>2027</strong><strong>2028</strong><strong>2029</strong><strong>2030</strong></div>
        {items.slice(0, 18).map((item) => (
          <div className={`sp-gantt-row type-${item.type.toLowerCase()}`} key={`${item.type}-${item.id}`}>
            <div><strong>{item.type}</strong><span>{item.title}</span></div>
            <div className="sp-gantt-track">
              <i style={{ insetInlineStart: `${Math.min(86, item.offset)}%`, width: `${item.width}%` }}><b>{item.progress}%</b></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function KpisPage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-chart-infographic', value: strategicKPIs.length, label: t(language, 'All KPIs', 'كل المؤشرات') },
        { icon: 'ti-trending-up', value: strategicKPIs.filter((kpi) => kpi.trend === 'Up').length, label: t(language, 'Improving', 'في تحسن') },
        { icon: 'ti-alert-triangle', value: strategicKPIs.filter((kpi) => kpi.status !== 'On Track').length, label: t(language, 'Off Track', 'خارج المسار') },
        { icon: 'ti-percentage', value: `${Math.round(strategicKPIs.reduce((sum, kpi) => sum + (kpi.actual / kpi.target) * 100, 0) / strategicKPIs.length)}%`, label: t(language, 'Achievement', 'التحقق') },
      ]} />
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'KPI Portfolio Dashboard', 'لوحة المؤشرات المجمعة')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add KPI', 'إضافة مؤشر')}</button></div>
        <div className="sp-card-grid">
          {strategicKPIs.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
        </div>
      </section>
    </div>
  );
}

function KpiCard({ kpi }) {
  const { language } = useI18n();
  const achievement = Math.round((kpi.actual / kpi.target) * 100);
  return (
    <article className="sp-kpi-card">
      <div className="sp-card-top"><span>{kpi.code}</span><StatusBadge status={kpi.status} /></div>
      <h3>{localName(kpi, 'name', language)}</h3>
      <p>{kpi.description}</p>
      <div className="sp-kpi-values">
        <div><span>Baseline</span><strong>{kpi.baseline}{kpi.unit}</strong></div>
        <div><span>Target</span><strong>{kpi.target}{kpi.unit}</strong></div>
        <div><span>Actual</span><strong>{kpi.actual}{kpi.unit}</strong></div>
      </div>
      <ProgressLine value={Math.min(100, achievement)} />
      <div className="sp-mini-chart">{kpi.measurements.map((point) => <i key={point.period} style={{ height: `${Math.max(12, point.actual)}%` }} title={`${point.period}: ${point.actual}`} />)}</div>
      <ActionBar />
    </article>
  );
}

function RisksPage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-alert-triangle', value: strategicRisks.length, label: t(language, 'All Risks', 'كل المخاطر') },
        { icon: 'ti-alert-octagon', value: strategicRisks.filter((risk) => risk.level === 'Critical').length, label: t(language, 'Critical', 'حرجة') },
        { icon: 'ti-shield-check', value: strategicRisks.filter((risk) => risk.status === 'Mitigating').length, label: t(language, 'Mitigating', 'قيد التخفيف') },
        { icon: 'ti-calculator', value: 'P x I', label: t(language, 'Risk Score Formula', 'معادلة درجة الخطر') },
      ]} />
      <div className="sp-two-col">
        <section className="sp-panel"><div className="sp-panel-head"><h2>{t(language, 'Risk Matrix', 'مصفوفة المخاطر')}</h2></div><RiskMatrix /></section>
        <section className="sp-panel"><div className="sp-panel-head"><h2>{t(language, 'Mitigation Actions', 'خطط التخفيف')}</h2></div><MitigationList /></section>
      </div>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Risk Register', 'سجل المخاطر')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Risk', 'إضافة خطر')}</button></div>
        <SmartTable emptyText="No risks" columns={[
          { key: 'code', label: t(language, 'Code', 'الكود') },
          { key: 'title', label: t(language, 'Risk', 'الخطر') },
          { key: 'probability', label: 'Probability' },
          { key: 'impact', label: 'Impact' },
          { key: 'score', label: t(language, 'Score', 'الدرجة') },
          { key: 'level', label: t(language, 'Level', 'المستوى') },
          { key: 'owner', label: t(language, 'Owner', 'المالك') },
          { key: 'status', label: t(language, 'Status', 'الحالة') },
          { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
        ]} rows={strategicRisks.map((risk) => ({
          id: risk.id,
          code: risk.code,
          title: localName(risk, 'title', language),
          probability: risk.probability,
          impact: risk.impact,
          score: <strong>{risk.probability * risk.impact}</strong>,
          level: <StatusBadge status={risk.level} />,
          owner: risk.owner,
          status: <StatusBadge status={risk.status} />,
          actions: <ActionBar />,
        }))} />
      </section>
    </div>
  );
}

function RiskMatrix() {
  const cells = Array.from({ length: 25 }, (_, index) => {
    const probability = 5 - Math.floor(index / 5);
    const impact = (index % 5) + 1;
    const risks = strategicRisks.filter((risk) => risk.probability === probability && risk.impact === impact);
    return { probability, impact, score: probability * impact, risks };
  });
  return (
    <div className="sp-risk-matrix">
      {cells.map((cell) => <div key={`${cell.probability}-${cell.impact}`} className={`score-${cell.score}`}><span>{cell.score}</span>{cell.risks.map((risk) => <strong key={risk.id}>{risk.code}</strong>)}</div>)}
    </div>
  );
}

function MitigationList() {
  return (
    <div className="sp-action-list">
      {strategicRisks.flatMap((risk) => risk.mitigationActions.map((action) => ({ risk, action }))).map((item) => (
        <div key={`${item.risk.id}-${item.action}`}>
          <i className="ti ti-shield-half" />
          <span>{item.action}</span>
          <strong>{item.risk.dueDate}</strong>
        </div>
      ))}
    </div>
  );
}

function BudgetsPage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-wallet', value: formatMoney(strategicBudgets.reduce((sum, item) => sum + item.approvedAmount, 0)), label: t(language, 'Approved Budget', 'الميزانية المعتمدة') },
        { icon: 'ti-cash', value: formatMoney(strategicBudgets.reduce((sum, item) => sum + item.actualAmount, 0)), label: t(language, 'Actual Spend', 'المصروف الفعلي') },
        { icon: 'ti-pig-money', value: formatMoney(strategicBudgets.reduce((sum, item) => sum + item.remainingAmount, 0)), label: t(language, 'Remaining', 'المتبقي') },
        { icon: 'ti-users', value: strategicResources.length, label: t(language, 'Resources', 'الموارد') },
      ]} />
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Resources', 'الموارد')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Resource', 'إضافة مورد')}</button></div>
        <SmartTable emptyText="No resources" columns={[
          { key: 'type', label: t(language, 'Type', 'النوع') },
          { key: 'name', label: t(language, 'Name', 'الاسم') },
          { key: 'entity', label: t(language, 'Entity', 'الجهة') },
          { key: 'role', label: t(language, 'Role', 'الدور') },
          { key: 'allocation', label: t(language, 'Allocation', 'النسبة المخصصة') },
          { key: 'period', label: t(language, 'Period', 'الفترة') },
          { key: 'cost', label: t(language, 'Estimated Cost', 'التكلفة التقديرية') },
          { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
        ]} rows={strategicResources.map((resource) => ({ ...resource, cost: formatMoney(resource.estimatedCost), actions: <ActionBar compact /> }))} />
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Budgets Planned vs Actual', 'الميزانيات المخططة مقابل الفعلية')}</h2><button className="btn-outline" type="button"><i className="ti ti-rosette-discount-check" /> {t(language, 'Review / Approve', 'مراجعة / اعتماد')}</button></div>
        <SmartTable emptyText="No budget items" columns={[
          { key: 'id', label: 'ID' },
          { key: 'planned', label: t(language, 'Planned', 'المخطط') },
          { key: 'approved', label: t(language, 'Approved', 'المعتمد') },
          { key: 'actual', label: t(language, 'Actual', 'الفعلي') },
          { key: 'remaining', label: t(language, 'Remaining', 'المتبقي') },
          { key: 'source', label: t(language, 'Funding Source', 'مصدر التمويل') },
          { key: 'status', label: t(language, 'Status', 'الحالة') },
          { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
        ]} rows={strategicBudgets.map((budget) => ({
          id: budget.id,
          planned: formatMoney(budget.plannedAmount),
          approved: formatMoney(budget.approvedAmount),
          actual: formatMoney(budget.actualAmount),
          remaining: formatMoney(budget.remainingAmount),
          source: budget.fundingSource,
          status: <StatusBadge status={budget.status} />,
          actions: <ActionBar />,
        }))} />
      </section>
    </div>
  );
}

function GovernancePage() {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Responsibilities and Permissions', 'المسؤوليات والصلاحيات')}</h2><button className="btn-primary" type="button"><i className="ti ti-user-shield" /> {t(language, 'Assign Responsibility', 'تعيين مسؤولية')}</button></div>
        <SmartTable emptyText="No roles" columns={[
          { key: 'role', label: t(language, 'Role', 'الدور') },
          { key: 'scope', label: t(language, 'Scope', 'النطاق') },
          { key: 'permissions', label: t(language, 'Permissions', 'الصلاحيات') },
          { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
        ]} rows={strategicPermissions.map((role) => ({ ...role, permissions: role.permissions.join(', '), actions: <ActionBar compact /> }))} />
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Progress Calculation Settings', 'إعدادات حساب التقدم')}</h2><span>{t(language, 'Shown in plan settings and applied across task, milestone, project, objective, pillar, and plan levels.', 'تظهر في إعدادات الخطة وتطبق على مستوى المهمة والمرحلة والمشروع والهدف والمحور والخطة.')}</span></div>
        <div className="sp-method-grid">
          {progressCalculationMethods.map((method) => <article key={method.id}><strong>{method.name}</strong><p>{method.formula}</p></article>)}
        </div>
      </section>
    </div>
  );
}

function SimpleRegisterPage({ type }) {
  const { language } = useI18n();
  const maps = {
    approvals: { title: t(language, 'Approval Workflow', 'مسار الموافقات'), rows: strategicApprovals, icon: 'ti-rosette-discount-check' },
    notifications: { title: t(language, 'Notifications', 'التنبيهات'), rows: strategicNotifications, icon: 'ti-bell-ringing' },
    reports: { title: t(language, 'Reports and Analytics', 'التقارير والتحليلات'), rows: strategicReports, icon: 'ti-report-analytics' },
    news: { title: t(language, 'News Ticker Management', 'إدارة شريط الأخبار'), rows: strategicNews, icon: 'ti-news' },
  };
  const current = maps[type];
  const rows = current.rows.map((row) => ({
    id: row.id,
    title: row.report || localName(row, 'title', language) || row.type || row.entityType,
    type: row.type || row.entityType || row.priority,
    owner: row.owner || row.submittedBy || row.status,
    date: row.date || row.createdAt || row.publishDate || row.dueDate,
    status: <StatusBadge status={row.status} />,
    actions: <ActionBar />,
  }));
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2><i className={`ti ${current.icon}`} /> {current.title}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add</button></div>
      {type === 'approvals' && <ApprovalWorkflow />}
      <SmartTable emptyText="No records" columns={[
        { key: 'id', label: 'ID' },
        { key: 'title', label: t(language, 'Title', 'العنوان') },
        { key: 'type', label: t(language, 'Type', 'النوع') },
        { key: 'owner', label: t(language, 'Owner / Actor', 'المالك / المنفذ') },
        { key: 'date', label: t(language, 'Date', 'التاريخ') },
        { key: 'status', label: t(language, 'Status', 'الحالة') },
        { key: 'actions', label: t(language, 'Actions', 'الإجراءات') },
      ]} rows={rows} />
    </section>
  );
}

function ApprovalWorkflow() {
  return (
    <div className="sp-workflow">
      {['Draft', 'Submitted', 'Under Review', 'Returned for Updates', 'Approved', 'Rejected', 'Archived'].map((step, index) => (
        <div key={step} className={index < 5 ? 'done' : ''}><i className="ti ti-circle-check" /><span>{step}</span></div>
      ))}
    </div>
  );
}

function LinkedItemsPanel() {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Linked Items Panel', 'لوحة العناصر المرتبطة')}</h2><span>{t(language, 'Analysis Result → Pillar / Objective / Initiative / Risk', 'نتيجة التحليل → محور / هدف / مبادرة / خطر')}</span></div>
      <div className="sp-linked-panel">
        {alignmentLinks.concat(strategicAnalysisItems.slice(0, 4).map((item) => ({ id: item.id, sourceType: 'Analysis Result', sourceId: item.id, targetType: item.linkedEntityType, targetId: item.linkedEntityId, label: item.title }))).map((item) => (
          <div key={item.id}><span>{item.sourceType}</span><strong>{item.sourceId}</strong><i className="ti ti-link" /><span>{item.targetType}</span><strong>{item.targetId}</strong><em>{item.label}</em></div>
        ))}
      </div>
    </section>
  );
}

function KanbanPreview({ tasks }) {
  const columns = ['New', 'In Progress', 'Under Review', 'Completed', 'Delayed', 'Cancelled'];
  return (
    <div className="sp-kanban">
      {columns.map((column) => (
        <div key={column}>
          <h3>{column}<span>{tasks.filter((task) => task.status === column).length}</span></h3>
          {tasks.filter((task) => task.status === column).map((task) => (
            <article key={task.id}><strong>{task.title}</strong><span>{task.assignedTo}</span><ProgressLine value={task.progress} /></article>
          ))}
        </div>
      ))}
    </div>
  );
}

function ActivityAndDocuments() {
  const { language } = useI18n();
  return (
    <div className="sp-two-col">
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Documents', 'الوثائق')}</h2></div>
        <div className="sp-action-list">{strategicDocuments.map((doc) => <div key={doc.id}><i className="ti ti-file-description" /><span>{doc.name}</span><strong>{doc.entityType}</strong></div>)}</div>
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Activity Timeline', 'سجل الأنشطة')}</h2></div>
        <div className="sp-action-list">{strategicActivity.concat(strategicComments).map((item) => <div key={item.id}><i className="ti ti-history" /><span>{item.action || item.comment}</span><strong>{item.timestamp || item.createdAt}</strong></div>)}</div>
      </section>
    </div>
  );
}

export default function StrategicPlanningModulePage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.split('/').filter(Boolean)[1] || 'dashboard';
  const activeSection = strategicSections.find((section) => section.path === activePath) || strategicSections[0];

  const renderSection = () => {
    if (activeSection.path === 'dashboard') return <StrategicDashboard />;
    if (activeSection.path === 'plans') return <PlansPage />;
    if (activeSection.path === 'analysis') return <AnalysisPage />;
    if (activeSection.path === 'objectives') return <ObjectivesPage />;
    if (activeSection.path === 'alignment') return <AlignmentPage />;
    if (activeSection.path === 'projects') return <ProjectsPage />;
    if (activeSection.path === 'timeline') return <TimelinePage />;
    if (activeSection.path === 'kpis') return <KpisPage />;
    if (activeSection.path === 'risks') return <RisksPage />;
    if (activeSection.path === 'budgets') return <BudgetsPage />;
    if (activeSection.path === 'governance') return <GovernancePage />;
    if (['approvals', 'notifications', 'reports', 'news'].includes(activeSection.path)) return <SimpleRegisterPage type={activeSection.path} />;
    return <StrategicDashboard />;
  };

  return (
    <>
      <Topbar breadcrumbs={[t(language, 'Strategic Planning', 'التخطيط الاستراتيجي'), localName(activeSection, 'label', language)]} />
      <main className="page-content sp-shell">
        <header className="sp-hero">
          <div>
            <span><i className="ti ti-chart-arrows-vertical" /> CPTIT TRUE</span>
            <h1>{t(language, 'Strategic Planning Command Center', 'مركز قيادة التخطيط الاستراتيجي')}</h1>
            <p>{t(language, 'Connected planning from plan creation to analysis, objectives, initiatives, tasks, KPIs, risks, budgets, approvals, follow-up, and reports.', 'تخطيط مترابط من إنشاء الخطة إلى التحليل والأهداف والمبادرات والمهام والمؤشرات والمخاطر والميزانيات والموافقات والمتابعة والتقارير.')}</p>
          </div>
          <div className="sp-hero-actions">
            <button type="button" className="btn-primary" onClick={() => navigate('/strategic-planning/plans')}><i className="ti ti-plus" /> {t(language, 'Create Plan', 'إنشاء خطة')}</button>
            <button type="button" className="btn-outline"><i className="ti ti-file-export" /> {t(language, 'Executive Export', 'تصدير تنفيذي')}</button>
          </div>
        </header>

        <nav className="sp-tabs" aria-label="Strategic planning navigation">
          {strategicSections.map((section) => (
            <button key={section.path} className={activeSection.path === section.path ? 'active' : ''} type="button" onClick={() => navigate(`/strategic-planning/${section.path}`)}>
              <i className={`ti ${section.icon}`} />
              <span>{localName(section, 'label', language)}</span>
            </button>
          ))}
        </nav>

        {renderSection()}
        {['dashboard', 'reports'].includes(activeSection.path) && <ActivityAndDocuments />}
      </main>
    </>
  );
}
