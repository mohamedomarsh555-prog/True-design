import { Link, useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useI18n } from '../../i18n';
import {
  alignmentLinks,
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
  strategicPillars,
  strategicPlans,
  strategicReports,
  strategicResources,
  strategicRisks,
  strategicTasks,
  strategicObjectives,
} from '../../data/strategicData';

const t = (language, en, ar) => (language === 'ar' ? ar : en);
const text = (item, key, language) => (language === 'ar' ? item?.[`${key}Ar`] || item?.[key] : item?.[key]);
const money = (value) => `${Number(value || 0).toLocaleString()} SAR`;

const tabs = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: 'ti-info-circle' },
  { id: 'analysis', label: 'Analysis', labelAr: 'التحليل', icon: 'ti-adjustments-search' },
  { id: 'objectives', label: 'Pillars & Objectives', labelAr: 'المحاور والأهداف', icon: 'ti-hierarchy' },
  { id: 'initiatives', label: 'Initiatives & Projects', labelAr: 'المبادرات والمشاريع', icon: 'ti-briefcase' },
  { id: 'kpis', label: 'KPIs', labelAr: 'المؤشرات', icon: 'ti-chart-infographic' },
  { id: 'risks', label: 'Risks', labelAr: 'المخاطر', icon: 'ti-alert-triangle' },
  { id: 'budgets', label: 'Resources & Budgets', labelAr: 'الموارد والميزانيات', icon: 'ti-wallet' },
  { id: 'timeline', label: 'Timeline', labelAr: 'الخطة الزمنية', icon: 'ti-timeline' },
  { id: 'documents', label: 'Documents', labelAr: 'الوثائق', icon: 'ti-files' },
  { id: 'approvals', label: 'Approvals', labelAr: 'الموافقات', icon: 'ti-rosette-discount-check' },
  { id: 'reports', label: 'Reports', labelAr: 'التقارير', icon: 'ti-report-analytics' },
  { id: 'activity', label: 'Activity Log', labelAr: 'سجل الأنشطة', icon: 'ti-history' },
];

const statusClass = (status = '') => {
  const value = status.toLowerCase();
  if (['approved', 'active', 'completed', 'published', 'on track'].some((key) => value.includes(key))) return 's-approved';
  if (['risk', 'critical', 'returned', 'rejected', 'delayed'].some((key) => value.includes(key))) return 's-rejected';
  if (['review', 'submitted', 'progress', 'mitigating'].some((key) => value.includes(key))) return 's-pending';
  return 's-not-started';
};

function Badge({ status }) {
  return <span className={`status-pill ${statusClass(status)}`}>{status}</span>;
}

function Progress({ value }) {
  return (
    <div className="sp-progress">
      <span><i style={{ width: `${Math.max(4, Math.min(100, value))}%` }} /></span>
      <strong>{value}%</strong>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="sp-row-actions">
      {['ti-eye', 'ti-edit', 'ti-trash', 'ti-copy', 'ti-archive', 'ti-send', 'ti-check', 'ti-file-export'].map((icon) => (
        <button key={icon} type="button"><i className={`ti ${icon}`} /></button>
      ))}
    </div>
  );
}

function MiniTable({ columns, rows }) {
  return (
    <div className="sp-table-scroll">
      <table className="sp-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => <tr key={row.id}>{columns.map((column) => <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>)}</tr>)}
        </tbody>
      </table>
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

function Bars({ items, language }) {
  return (
    <div className="sp-chart-bars">
      {items.map((item) => (
        <div className="sp-chart-row" key={item.id}>
          <span>{text(item, 'name', language) || item.label}</span>
          <div><i style={{ width: `${item.progress || item.value || 0}%` }} /></div>
          <strong>{item.progress || item.value || 0}%</strong>
        </div>
      ))}
    </div>
  );
}

function PlanOverview({ plan, pillars, objectives, projects, kpis, risks }) {
  const { language } = useI18n();
  const mainObjectives = objectives.filter((objective) => !objective.parentObjectiveId);
  const subObjectives = objectives.filter((objective) => objective.parentObjectiveId);
  const projectStatusItems = ['In Progress', 'Planned', 'Completed'].map((status) => ({
    id: status,
    label: status,
    progress: Math.round((projects.filter((project) => project.status === status).length / Math.max(1, projects.length)) * 100),
  }));
  const kpiStatusItems = ['On Track', 'At Risk'].map((status) => ({
    id: status,
    label: status,
    progress: Math.round((kpis.filter((kpi) => kpi.status === status).length / Math.max(1, kpis.length)) * 100),
  }));

  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-layout-grid', value: pillars.length, label: t(language, 'Pillars', 'المحاور') },
        { icon: 'ti-target', value: mainObjectives.length, label: t(language, 'Main Objectives', 'الأهداف الرئيسية') },
        { icon: 'ti-subtask', value: subObjectives.length, label: t(language, 'Sub Objectives', 'الأهداف الفرعية') },
        { icon: 'ti-briefcase', value: projects.length, label: t(language, 'Initiatives / Projects', 'المبادرات / المشاريع') },
        { icon: 'ti-chart-infographic', value: kpis.length, label: t(language, 'KPIs', 'المؤشرات') },
        { icon: 'ti-alert-triangle', value: risks.length, label: t(language, 'Risks', 'المخاطر') },
        { icon: 'ti-progress-check', value: `${plan.progress}%`, label: t(language, 'Overall Progress', 'الإنجاز العام') },
        { icon: 'ti-player-play', value: text(plan, 'status', language), label: t(language, 'Execution Status', 'حالة التنفيذ') },
      ]} />

      <div className="sp-two-col">
        <section className="sp-panel"><h2>{t(language, 'Plan Description', 'وصف الخطة')}</h2><p>{text(plan, 'description', language)}</p></section>
        <section className="sp-panel"><h2>{t(language, 'General Objectives', 'الأهداف العامة')}</h2><div className="sp-chip-list">{mainObjectives.map((objective) => <span key={objective.id}>{text(objective, 'name', language)}</span>)}</div></section>
      </div>

      <div className="sp-three-col">
        <section className="sp-panel"><h2>Progress by Pillar</h2><Bars items={pillars} language={language} /></section>
        <section className="sp-panel"><h2>Objectives Completion</h2><Bars items={objectives} language={language} /></section>
        <section className="sp-panel"><h2>Projects Status</h2><Bars items={projectStatusItems} language={language} /></section>
        <section className="sp-panel"><h2>KPI Status</h2><Bars items={kpiStatusItems} language={language} /></section>
        <section className="sp-panel"><h2>Risk Level Summary</h2><RiskMatrix risks={risks} /></section>
      </div>
    </div>
  );
}

function AnalysisTab({ planId }) {
  const { language } = useI18n();
  const items = strategicAnalysisItems.filter((item) => item.planId === planId);
  const swot = ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'];
  const pestel = ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'];
  return (
    <div className="sp-stack">
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'SWOT Analysis', 'تحليل SWOT')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add</button></div>
        <div className="sp-swot-grid">
          {swot.map((category) => (
            <div className="sp-analysis-col" key={category}>
              <h3>{category}</h3>
              {items.filter((item) => item.analysisType === 'SWOT' && item.category === category).map((item) => (
                <article key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <div><Badge status={item.priority} /><span>{item.linkedEntityType}: {item.linkedEntityId}</span></div>
                  <ActionButtons />
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'PESTEL Analysis', 'تحليل PESTEL')}</h2><button className="btn-outline" type="button"><i className="ti ti-adjustments-plus" /> {t(language, 'Other Analysis Type', 'نوع تحليل آخر')}</button></div>
        <div className="sp-pestel-grid">
          {pestel.map((category) => {
            const factor = items.find((item) => item.analysisType === 'PESTEL' && item.category === category);
            return <article key={category} className="sp-factor-card"><span>{category}</span><h3>{factor?.title || '-'}</h3><p>{factor?.recommendation || t(language, 'Ready to add recommendation and links.', 'جاهز لإضافة التوصية والروابط.')}</p><div className="sp-factor-score"><span>Impact: {factor?.impactDegree || '-'}</span><span>Likelihood: {factor?.likelihoodDegree || '-'}</span></div></article>;
          })}
        </div>
      </section>
      <LinkedPanel />
    </div>
  );
}

function ObjectivesTab({ pillars, objectives }) {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Tree View, Table View, Cards View', 'عرض الشجرة والجدول والبطاقات')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Pillar / Objective', 'إضافة محور / هدف')}</button></div>
      <div className="sp-tree">
        {pillars.map((pillar) => (
          <div className="sp-tree-pillar" key={pillar.id}>
            <div className="sp-tree-node pillar"><i className="ti ti-grip-vertical" /><strong>{pillar.code} - {text(pillar, 'name', language)}</strong><Progress value={pillar.progress} /><ActionButtons /></div>
            {objectives.filter((objective) => objective.pillarId === pillar.id && !objective.parentObjectiveId).map((objective) => (
              <div className="sp-tree-branch" key={objective.id}>
                <div className="sp-tree-node objective"><i className="ti ti-target" /><Link className="project-link" to={`/strategic-planning/objectives/${objective.id}`}>{objective.code} - {text(objective, 'name', language)}</Link><Progress value={objective.progress} /><ActionButtons /></div>
                {objectives.filter((sub) => sub.parentObjectiveId === objective.id).map((sub) => (
                  <div className="sp-tree-node sub" key={sub.id}><i className="ti ti-subtask" /><Link className="project-link" to={`/strategic-planning/objectives/${sub.id}`}>{sub.code} - {text(sub, 'name', language)}</Link><Progress value={sub.progress} /><ActionButtons /></div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsTab({ projects, objectives }) {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Initiatives and Projects', 'المبادرات والمشاريع')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add</button></div>
      <div className="sp-card-grid">
        {projects.map((project) => {
          const objective = objectives.find((item) => item.id === project.objectiveId);
          return (
            <article className="sp-project-card" key={project.id}>
              <div className="sp-card-top"><span>{project.code}</span><Badge status={text(project, 'status', language)} /></div>
              <h3><Link to={`/strategic-planning/projects/${project.id}`}>{text(project, 'name', language)}</Link></h3>
              <p>{text(project, 'description', language)}</p>
              <dl>
                <div><dt>{t(language, 'Objective', 'الهدف')}</dt><dd>{text(objective, 'name', language)}</dd></div>
                <div><dt>{t(language, 'Manager', 'مدير المشروع')}</dt><dd>{project.manager}</dd></div>
                <div><dt>{t(language, 'Budget', 'الميزانية')}</dt><dd>{money(project.budget)}</dd></div>
              </dl>
              <Progress value={project.progress} />
              <ActionButtons />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function KpisTab({ kpis }) {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'KPI Dashboard', 'لوحة المؤشرات')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add KPI</button></div>
      <div className="sp-card-grid">
        {kpis.map((kpi) => {
          const achievement = Math.round((kpi.actual / kpi.target) * 100);
          return (
            <article className="sp-kpi-card" key={kpi.id}>
              <div className="sp-card-top"><span>{kpi.code}</span><Badge status={kpi.status} /></div>
              <h3>{text(kpi, 'name', language)}</h3>
              <p>{kpi.measurement}</p>
              <div className="sp-kpi-values"><div><span>Baseline</span><strong>{kpi.baseline}</strong></div><div><span>Target</span><strong>{kpi.target}</strong></div><div><span>Actual</span><strong>{kpi.actual}</strong></div></div>
              <Progress value={Math.min(100, achievement)} />
              <div className="sp-mini-chart">{kpi.measurements.map((point) => <i key={point.period} style={{ height: `${point.actual}%` }} />)}</div>
              <ActionButtons />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RisksTab({ risks }) {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <div className="sp-two-col">
        <section className="sp-panel"><h2>{t(language, 'Risk Matrix', 'مصفوفة المخاطر')}</h2><RiskMatrix risks={risks} /></section>
        <section className="sp-panel"><h2>{t(language, 'Mitigation Action List', 'قائمة إجراءات التخفيف')}</h2><div className="sp-action-list">{risks.flatMap((risk) => risk.mitigationActions.map((action) => <div key={`${risk.id}-${action}`}><i className="ti ti-shield-half" /><span>{action}</span><strong>{risk.dueDate}</strong></div>))}</div></section>
      </div>
      <section className="sp-panel">
        <div className="sp-panel-head"><h2>{t(language, 'Risk Register', 'سجل المخاطر')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add Risk</button></div>
        <MiniTable columns={[
          { key: 'code', label: 'Code' },
          { key: 'title', label: t(language, 'Risk', 'الخطر') },
          { key: 'probability', label: 'Probability' },
          { key: 'impact', label: 'Impact' },
          { key: 'score', label: 'Score = P x I' },
          { key: 'level', label: 'Level' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]} rows={risks.map((risk) => ({ id: risk.id, code: risk.code, title: text(risk, 'title', language), probability: risk.probability, impact: risk.impact, score: risk.probability * risk.impact, level: <Badge status={risk.level} />, status: <Badge status={risk.status} />, actions: <ActionButtons /> }))} />
      </section>
    </div>
  );
}

function RiskMatrix({ risks }) {
  const cells = Array.from({ length: 25 }, (_, index) => {
    const probability = 5 - Math.floor(index / 5);
    const impact = (index % 5) + 1;
    const found = risks.filter((risk) => risk.probability === probability && risk.impact === impact);
    return { probability, impact, score: probability * impact, found };
  });
  return <div className="sp-risk-matrix">{cells.map((cell) => <div key={`${cell.probability}-${cell.impact}`} className={`score-${cell.score}`}><span>{cell.score}</span>{cell.found.map((risk) => <strong key={risk.id}>{risk.code}</strong>)}</div>)}</div>;
}

function BudgetsTab({ budgets, resources }) {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <MetricGrid metrics={[
        { icon: 'ti-wallet', value: money(budgets.reduce((sum, item) => sum + item.approvedAmount, 0)), label: t(language, 'Approved', 'المعتمد') },
        { icon: 'ti-cash', value: money(budgets.reduce((sum, item) => sum + item.actualAmount, 0)), label: t(language, 'Actual', 'الفعلي') },
        { icon: 'ti-pig-money', value: money(budgets.reduce((sum, item) => sum + item.remainingAmount, 0)), label: t(language, 'Remaining', 'المتبقي') },
        { icon: 'ti-users', value: resources.length, label: t(language, 'Resources', 'الموارد') },
      ]} />
      <section className="sp-panel"><h2>{t(language, 'Resources', 'الموارد')}</h2><MiniTable columns={[{ key: 'type', label: 'Type' }, { key: 'name', label: 'Name' }, { key: 'entity', label: 'Entity' }, { key: 'role', label: 'Role' }, { key: 'allocation', label: 'Allocation' }, { key: 'cost', label: 'Cost' }, { key: 'actions', label: 'Actions' }]} rows={resources.map((item) => ({ ...item, cost: money(item.estimatedCost), actions: <ActionButtons /> }))} /></section>
      <section className="sp-panel"><h2>{t(language, 'Budgets', 'الميزانيات')}</h2><MiniTable columns={[{ key: 'id', label: 'ID' }, { key: 'planned', label: 'Planned' }, { key: 'approved', label: 'Approved' }, { key: 'actual', label: 'Actual' }, { key: 'remaining', label: 'Remaining' }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions' }]} rows={budgets.map((item) => ({ id: item.id, planned: money(item.plannedAmount), approved: money(item.approvedAmount), actual: money(item.actualAmount), remaining: money(item.remainingAmount), status: <Badge status={item.status} />, actions: <ActionButtons /> }))} /></section>
    </div>
  );
}

function TimelineTab({ plan, pillars, objectives, projects, milestones, tasks }) {
  const { language } = useI18n();
  const items = [
    { id: plan.id, type: 'Plan', title: text(plan, 'name', language), progress: plan.progress, offset: 0, width: 92 },
    ...pillars.map((item, index) => ({ id: item.id, type: 'Pillar', title: text(item, 'name', language), progress: item.progress, offset: index * 4 + 2, width: 78 })),
    ...objectives.map((item, index) => ({ id: item.id, type: 'Objective', title: text(item, 'name', language), progress: item.progress, offset: index * 5 + 8, width: 54 })),
    ...projects.map((item, index) => ({ id: item.id, type: 'Project', title: text(item, 'name', language), progress: item.progress, offset: index * 10 + 12, width: 30 })),
    ...milestones.map((item, index) => ({ id: item.id, type: 'Milestone', title: text(item, 'name', language), progress: item.progress, offset: index * 8 + 16, width: 22 })),
    ...tasks.map((item, index) => ({ id: item.id, type: 'Task', title: text(item, 'title', language), progress: item.progress, offset: index * 7 + 20, width: 16 })),
  ];
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Plan, Pillars, Objectives, Projects, Milestones, and Tasks Timeline', 'الخطة الزمنية للخطة والمحاور والأهداف والمشاريع والمراحل والمهام')}</h2><span>{t(language, 'Task and milestone changes roll up into timeline and progress.', 'أي تعديل على المهام أو المراحل ينعكس على الخطة الزمنية ونسبة الإنجاز.')}</span></div>
      <div className="sp-gantt">
        <div className="sp-gantt-head"><span>{t(language, 'Item', 'العنصر')}</span><strong>2025</strong><strong>2026</strong><strong>2027</strong><strong>2028</strong><strong>2029</strong><strong>2030</strong></div>
        {items.map((item) => <div className={`sp-gantt-row type-${item.type.toLowerCase()}`} key={`${item.type}-${item.id}`}><div><strong>{item.type}</strong><span>{item.title}</span></div><div className="sp-gantt-track"><i style={{ insetInlineStart: `${Math.min(86, item.offset)}%`, width: `${item.width}%` }}><b>{item.progress}%</b></i></div></div>)}
      </div>
    </section>
  );
}

function SimpleTab({ type, rows }) {
  const { language } = useI18n();
  const titleMap = {
    documents: t(language, 'Documents', 'الوثائق'),
    approvals: t(language, 'Approval Workflow', 'مسار الموافقات'),
    reports: t(language, 'Reports', 'التقارير'),
    activity: t(language, 'Activity Log and Collaboration', 'سجل الأنشطة والتعاون'),
  };
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{titleMap[type]}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> Add</button></div>
      {type === 'approvals' && <div className="sp-workflow">{['Draft', 'Submitted', 'Under Review', 'Returned for Updates', 'Approved', 'Rejected', 'Archived'].map((step, index) => <div key={step} className={index < 5 ? 'done' : ''}><i className="ti ti-circle-check" /><span>{step}</span></div>)}</div>}
      <MiniTable columns={[{ key: 'id', label: 'ID' }, { key: 'title', label: t(language, 'Title', 'العنوان') }, { key: 'type', label: t(language, 'Type', 'النوع') }, { key: 'owner', label: t(language, 'Owner / Actor', 'المالك / المنفذ') }, { key: 'date', label: t(language, 'Date', 'التاريخ') }, { key: 'status', label: 'Status' }, { key: 'actions', label: 'Actions' }]} rows={rows.map((row) => ({ id: row.id, title: row.name || row.report || row.action || row.comment || row.comments, type: row.fileType || row.type || row.entityType, owner: row.uploadedBy || row.owner || row.actor || row.submittedBy || row.user, date: row.uploadedAt || row.date || row.timestamp || row.createdAt, status: row.status ? <Badge status={row.status} /> : '-', actions: <ActionButtons /> }))} />
    </section>
  );
}

function LinkedPanel() {
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>Linked Items Panel</h2><span>Analysis Result → Pillar / Objective / Initiative / Risk</span></div>
      <div className="sp-linked-panel">
        {alignmentLinks.concat(strategicAnalysisItems.slice(0, 4).map((item) => ({ id: item.id, sourceType: 'Analysis Result', sourceId: item.id, targetType: item.linkedEntityType, targetId: item.linkedEntityId, label: item.title }))).map((item) => <div key={item.id}><span>{item.sourceType}</span><strong>{item.sourceId}</strong><i className="ti ti-link" /><span>{item.targetType}</span><strong>{item.targetId}</strong><em>{item.label}</em></div>)}
      </div>
    </section>
  );
}

export default function StrategicPlanDetailsPage() {
  const { planId, tab = 'overview' } = useParams();
  const { language } = useI18n();
  const plan = strategicPlans.find((item) => item.id === planId);

  if (!plan) return <div className="page-content">Strategic Plan not found</div>;

  const pillars = strategicPillars.filter((item) => item.planId === plan.id);
  const objectives = strategicObjectives.filter((item) => item.planId === plan.id);
  const projects = strategicInitiatives.filter((item) => item.planId === plan.id);
  const milestones = strategicMilestones.filter((item) => projects.some((project) => project.id === item.projectId));
  const tasks = strategicTasks.filter((item) => projects.some((project) => project.id === item.projectId));
  const kpis = strategicKPIs.filter((item) => item.planId === plan.id);
  const risks = strategicRisks.filter((item) => item.planId === plan.id);
  const budgets = strategicBudgets.filter((item) => item.planId === plan.id);
  const resources = strategicResources.filter((item) => item.planId === plan.id);
  const documents = strategicDocuments.filter((item) => item.entityId === plan.id || projects.some((project) => project.id === item.entityId) || risks.some((risk) => risk.id === item.entityId));
  const approvals = strategicApprovals.filter((item) => item.entityId === plan.id || budgets.some((budget) => budget.id === item.entityId));
  const reports = strategicReports;
  const activity = strategicActivity.concat(strategicComments).filter((item) => item.entityId === plan.id || projects.some((project) => project.id === item.entityId) || tasks.some((task) => task.id === item.entityId));
  const activeTab = tabs.find((item) => item.id === tab) || tabs[0];

  const renderTab = () => {
    if (activeTab.id === 'overview') return <PlanOverview plan={plan} pillars={pillars} objectives={objectives} projects={projects} kpis={kpis} risks={risks} />;
    if (activeTab.id === 'analysis') return <AnalysisTab planId={plan.id} />;
    if (activeTab.id === 'objectives') return <ObjectivesTab pillars={pillars} objectives={objectives} />;
    if (activeTab.id === 'initiatives') return <ProjectsTab projects={projects} objectives={objectives} />;
    if (activeTab.id === 'kpis') return <KpisTab kpis={kpis} />;
    if (activeTab.id === 'risks') return <RisksTab risks={risks} />;
    if (activeTab.id === 'budgets') return <BudgetsTab budgets={budgets} resources={resources} />;
    if (activeTab.id === 'timeline') return <TimelineTab plan={plan} pillars={pillars} objectives={objectives} projects={projects} milestones={milestones} tasks={tasks} />;
    if (activeTab.id === 'documents') return <SimpleTab type="documents" rows={documents} />;
    if (activeTab.id === 'approvals') return <SimpleTab type="approvals" rows={approvals} />;
    if (activeTab.id === 'reports') return <SimpleTab type="reports" rows={reports} />;
    if (activeTab.id === 'activity') return <SimpleTab type="activity" rows={activity} />;
    return null;
  };

  return (
    <div className="project-details-layout sp-detail">
      <Topbar breadcrumbs={[t(language, 'Strategic Planning', 'التخطيط الاستراتيجي'), text(plan, 'name', language), text(activeTab, 'label', language)]} />
      <div className="project-sticky-header">
        <div className="project-header-top">
          <div className="project-info">
            <div className="project-title-row">
              <h1>{text(plan, 'name', language)}</h1>
              <Badge status={text(plan, 'status', language)} />
              <span className="priority-badge">{plan.priority}</span>
            </div>
            <p className="project-type-subtitle">{text(plan, 'type', language)} • {plan.startDate} - {plan.endDate} • {text(plan, 'owner', language)} • {plan.lastUpdate}</p>
          </div>
          <div className="project-header-actions">
            <button className="btn-primary" type="button"><i className="ti ti-edit" /> {t(language, 'Edit', 'تعديل')}</button>
            <button className="btn-outline" type="button"><i className="ti ti-send" /> {t(language, 'Submit', 'إرسال للاعتماد')}</button>
            <button className="btn-outline" type="button"><i className="ti ti-file-export" /> {t(language, 'Export', 'تصدير')}</button>
            <button className="btn-outline" type="button"><i className="ti ti-archive" /> {t(language, 'Archive', 'أرشفة')}</button>
          </div>
        </div>

        <div className="project-header-stats">
          <div className="header-stat-item"><label>{t(language, 'Progress', 'نسبة الإنجاز')}</label><Progress value={plan.progress} /></div>
          <div className="header-stat-item"><label>{t(language, 'Owner', 'المالك')}</label><span className="last-update-val">{text(plan, 'owner', language)}</span></div>
          <div className="header-stat-item"><label>{t(language, 'Plan Period', 'فترة الخطة')}</label><span className="last-update-val">{plan.startDate} → {plan.endDate}</span></div>
          <div className="header-stat-item"><label>{t(language, 'Calculation Method', 'طريقة الحساب')}</label><span className="last-update-val">{plan.progressMethod}</span></div>
        </div>

        <nav className="project-tabs">
          {tabs.map((item) => (
            <Link key={item.id} to={`/strategic-planning/plans/${plan.id}/${item.id}`} className={`project-tab-link ${activeTab.id === item.id ? 'active' : ''}`}>
              <i className={`ti ${item.icon}`} />
              <span>{text(item, 'label', language)}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="project-content-area">
        {renderTab()}
        {activeTab.id === 'overview' && (
          <section className="sp-panel">
            <div className="sp-panel-head"><h2>{t(language, 'Progress Calculation Methods', 'طرق حساب التقدم')}</h2><span>{t(language, 'Configured in plan settings.', 'تضبط من إعدادات الخطة.')}</span></div>
            <div className="sp-method-grid">{progressCalculationMethods.map((method) => <article key={method.id}><strong>{method.name}</strong><p>{method.formula}</p></article>)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
