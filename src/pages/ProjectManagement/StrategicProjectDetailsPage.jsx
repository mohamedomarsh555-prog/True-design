import { Link, useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useI18n } from '../../i18n';
import {
  strategicActivity,
  strategicBudgets,
  strategicComments,
  strategicDocuments,
  strategicInitiatives,
  strategicKPIs,
  strategicMilestones,
  strategicObjectives,
  strategicPillars,
  strategicRisks,
  strategicResources,
  strategicTasks,
  localizeStrategicField,
  translateStrategicTerm,
} from '../../data/strategicData';

const t = (language, en, ar) => (language === 'ar' ? ar : en);
const label = (item, key, language) => localizeStrategicField(item, key, language);
const money = (value, language = 'en') => `${Number(value || 0).toLocaleString()} ${t(language, 'SAR', 'ريال')}`;

const tabs = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: 'ti-info-circle' },
  { id: 'milestones', label: 'Milestones', labelAr: 'المراحل', icon: 'ti-flag-3' },
  { id: 'tasks', label: 'Tasks', labelAr: 'المهام', icon: 'ti-list-check' },
  { id: 'subtasks', label: 'Subtasks', labelAr: 'المهام الفرعية', icon: 'ti-subtask' },
  { id: 'gantt', label: 'Timeline / Gantt', labelAr: 'الخطة الزمنية', icon: 'ti-timeline' },
  { id: 'team', label: 'Team', labelAr: 'الفريق', icon: 'ti-users-group' },
  { id: 'documents', label: 'Documents', labelAr: 'الوثائق', icon: 'ti-files' },
  { id: 'communication', label: 'Communication', labelAr: 'التواصل', icon: 'ti-messages' },
  { id: 'challenges', label: 'Challenges', labelAr: 'التحديات', icon: 'ti-mood-sad' },
  { id: 'risks', label: 'Risks', labelAr: 'المخاطر', icon: 'ti-alert-triangle' },
  { id: 'kpis', label: 'KPIs', labelAr: 'المؤشرات', icon: 'ti-chart-infographic' },
  { id: 'activity', label: 'Activity Log', labelAr: 'سجل الأنشطة', icon: 'ti-history' },
];

function StatusBadge({ status }) {
  const { language } = useI18n();
  const value = String(status || '').toLowerCase();
  const cls = value.includes('complete') || value.includes('track') || value.includes('مكتمل') || value.includes('المسار') ? 's-approved' : value.includes('risk') || value.includes('late') || value.includes('خطر') || value.includes('متأخر') ? 's-rejected' : value.includes('progress') || value.includes('review') || value.includes('تنفيذ') || value.includes('مراجعة') ? 's-pending' : 's-not-started';
  return <span className={`status-pill ${cls}`}>{translateStrategicTerm(status, language)}</span>;
}

function Progress({ value }) {
  return <div className="sp-progress"><span><i style={{ width: `${Math.max(4, Math.min(100, value || 0))}%` }} /></span><strong>{value || 0}%</strong></div>;
}

function ActionButtons() {
  return <div className="sp-row-actions">{['ti-eye', 'ti-edit', 'ti-trash', 'ti-copy', 'ti-archive', 'ti-send', 'ti-check', 'ti-file-export'].map((icon) => <button key={icon} type="button"><i className={`ti ${icon}`} /></button>)}</div>;
}

function Table({ columns, rows }) {
  return (
    <div className="sp-table-scroll">
      <table className="sp-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id}>{columns.map((column) => <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Overview({ project, objective, pillar, milestones, tasks, kpis, risks }) {
  const { language } = useI18n();
  return (
    <div className="sp-stack">
      <div className="sp-metric-grid">
        <div className="sp-metric"><i className="ti ti-flag-3" /><strong>{milestones.length}</strong><span>{t(language, 'Milestones', 'المراحل')}</span></div>
        <div className="sp-metric"><i className="ti ti-list-check" /><strong>{tasks.length}</strong><span>{t(language, 'Tasks', 'المهام')}</span></div>
        <div className="sp-metric"><i className="ti ti-subtask" /><strong>{tasks.reduce((sum, task) => sum + (task.subtasks || []).length, 0)}</strong><span>{t(language, 'Subtasks', 'المهام الفرعية')}</span></div>
        <div className="sp-metric"><i className="ti ti-chart-infographic" /><strong>{kpis.length}</strong><span>{t(language, 'KPIs', 'المؤشرات')}</span></div>
        <div className="sp-metric"><i className="ti ti-alert-triangle" /><strong>{risks.length}</strong><span>{t(language, 'Risks', 'المخاطر')}</span></div>
        <div className="sp-metric"><i className="ti ti-wallet" /><strong>{money(project.budget, language)}</strong><span>{t(language, 'Budget', 'الميزانية')}</span></div>
      </div>
      <div className="sp-two-col">
        <section className="sp-panel">
          <h2>{t(language, 'Project Overview', 'نظرة عامة على المشروع')}</h2>
          <p>{label(project, 'description', language)}</p>
          <div className="sp-chip-list">
            <span>{t(language, 'Pillar', 'المحور')}: {label(pillar, 'name', language)}</span>
            <span>{t(language, 'Objective', 'الهدف')}: {label(objective, 'name', language)}</span>
            <span>{t(language, 'Outputs', 'المخرجات')}: {label(project, 'outputs', language)}</span>
          </div>
        </section>
        <section className="sp-panel">
          <h2>{t(language, 'Current Milestones', 'المراحل الحالية')}</h2>
          <div className="sp-action-list">{milestones.map((milestone) => <div key={milestone.id}><i className="ti ti-flag-3" /><span>{label(milestone, 'name', language)}</span><Progress value={milestone.progress} /></div>)}</div>
        </section>
      </div>
    </div>
  );
}

function Milestones({ milestones, tasks }) {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Milestones', 'المراحل')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add', 'إضافة')}</button></div>
      <div className="sp-stack">
        {milestones.map((milestone) => (
          <article className="sp-milestone-card" key={milestone.id}>
            <div className="sp-card-top"><h3>{label(milestone, 'name', language)}</h3><StatusBadge status={label(milestone, 'status', language)} /></div>
            <p>{label(milestone, 'description', language)}</p>
            <Progress value={milestone.progress} />
            <div className="sp-chip-list"><span>{milestone.startDate} → {milestone.endDate}</span><span>{label(milestone, 'owner', language)}</span><span>{t(language, 'Dependencies', 'الاعتماديات')}: {milestone.dependencies.join(', ') || '-'}</span></div>
            <Table columns={[{ key: 'title', label: t(language, 'Task', 'المهمة') }, { key: 'assignee', label: t(language, 'Assignee', 'المسؤول') }, { key: 'due', label: t(language, 'Due', 'الاستحقاق') }, { key: 'status', label: t(language, 'Status', 'الحالة') }, { key: 'progress', label: t(language, 'Progress', 'التقدم') }]} rows={tasks.filter((task) => task.milestoneId === milestone.id).map((task) => ({ id: task.id, title: label(task, 'title', language), assignee: label(task, 'assignedTo', language), due: task.dueDate, status: <StatusBadge status={label(task, 'status', language)} />, progress: <Progress value={task.progress} /> }))} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Tasks({ tasks }) {
  const { language } = useI18n();
  const columns = ['New', 'In Progress', 'Under Review', 'Completed', 'Delayed', 'Cancelled'];
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Tasks Kanban Board', 'لوحة كانبان للمهام')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Task', 'إضافة مهمة')}</button></div>
      <div className="sp-kanban">
        {columns.map((column) => (
          <div key={column}>
            <h3>{translateStrategicTerm(column, language)}<span>{tasks.filter((task) => task.status === column).length}</span></h3>
            {tasks.filter((task) => task.status === column).map((task) => (
              <article key={task.id}>
                <strong>{label(task, 'title', language)}</strong>
                <span>{label(task, 'assignedTo', language)} • {task.dueDate}</span>
                <div className="sp-chip-list"><span>{translateStrategicTerm(task.priority, language)}</span><span>{task.estimatedEffort}h / {task.actualEffort}h</span></div>
                <Progress value={task.progress} />
              </article>
            ))}
          </div>
        ))}
      </div>
      <div className="sp-view-placeholders">
        <div><i className="ti ti-list" /> {t(language, 'List View', 'عرض القائمة')}</div>
        <div><i className="ti ti-calendar" /> {t(language, 'Calendar View', 'عرض التقويم')}</div>
        <div><i className="ti ti-timeline" /> {t(language, 'Gantt View', 'عرض جانت')}</div>
      </div>
    </section>
  );
}

function Subtasks({ tasks }) {
  const { language } = useI18n();
  const rows = tasks.flatMap((task) => (task.subtasks || []).map((subtask) => ({
    id: subtask.id,
    parent: label(task, 'title', language),
    title: label(subtask, 'title', language),
    status: <StatusBadge status={label(subtask, 'status', language)} />,
    progress: <Progress value={subtask.progress} />,
    actions: <ActionButtons />,
  })));
  return <section className="sp-panel"><div className="sp-panel-head"><h2>{t(language, 'Subtasks', 'المهام الفرعية')}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Subtask', 'إضافة مهمة فرعية')}</button></div><Table columns={[{ key: 'parent', label: t(language, 'Parent Task', 'المهمة الرئيسية') }, { key: 'title', label: t(language, 'Subtask', 'المهمة الفرعية') }, { key: 'status', label: t(language, 'Status', 'الحالة') }, { key: 'progress', label: t(language, 'Progress', 'التقدم') }, { key: 'actions', label: t(language, 'Actions', 'الإجراءات') }]} rows={rows} /></section>;
}

function Gantt({ project, milestones, tasks }) {
  const { language } = useI18n();
  const items = [
    { id: project.id, type: translateStrategicTerm('Project', language), title: label(project, 'name', language), progress: project.progress, offset: 6, width: 70 },
    ...milestones.map((item, index) => ({ id: item.id, type: translateStrategicTerm('Milestone', language), title: label(item, 'name', language), progress: item.progress, offset: index * 20 + 10, width: 24 })),
    ...tasks.map((item, index) => ({ id: item.id, type: translateStrategicTerm('Task', language), title: label(item, 'title', language), progress: item.progress, offset: index * 16 + 18, width: 18 })),
  ];
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{t(language, 'Timeline / Gantt', 'الخطة الزمنية / جانت')}</h2><span>{t(language, 'Planned, actual, dependencies, delays, progress, and critical items.', 'المخطط والفعلي والاعتماديات والتأخير والتقدم والعناصر الحرجة.')}</span></div>
      <div className="sp-gantt">
        <div className="sp-gantt-head"><span>{t(language, 'Item', 'العنصر')}</span><strong>Q1</strong><strong>Q2</strong><strong>Q3</strong><strong>Q4</strong></div>
        {items.map((item) => <div className={`sp-gantt-row type-${item.type.toLowerCase()}`} key={`${item.type}-${item.id}`}><div><strong>{item.type}</strong><span>{item.title}</span></div><div className="sp-gantt-track"><i style={{ insetInlineStart: `${item.offset}%`, width: `${item.width}%` }}><b>{item.progress}%</b></i></div></div>)}
      </div>
    </section>
  );
}

function SimpleTab({ title, rows }) {
  const { language } = useI18n();
  return (
    <section className="sp-panel">
      <div className="sp-panel-head"><h2>{title}</h2><button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add', 'إضافة')}</button></div>
      <Table columns={[{ key: 'title', label: t(language, 'Title', 'العنوان') }, { key: 'owner', label: t(language, 'Owner / Actor', 'المالك / المنفذ') }, { key: 'date', label: t(language, 'Date', 'التاريخ') }, { key: 'status', label: t(language, 'Status', 'الحالة') }, { key: 'actions', label: t(language, 'Actions', 'الإجراءات') }]} rows={rows.map((row) => ({ id: row.id, title: label(row, 'name', language) || label(row, 'title', language) || label(row, 'action', language) || label(row, 'comment', language) || row.code, owner: label(row, 'owner', language) || label(row, 'uploadedBy', language) || label(row, 'actor', language) || translateStrategicTerm(row.user || row.assignee || row.fundingSource, language), date: row.uploadedAt || row.timestamp || row.createdAt || row.dueDate || row.period || row.status, status: row.status ? <StatusBadge status={label(row, 'status', language)} /> : '-', actions: <ActionButtons /> }))} />
    </section>
  );
}

export default function StrategicProjectDetailsPage() {
  const { projectId, tab = 'overview' } = useParams();
  const { language } = useI18n();
  const project = strategicInitiatives.find((item) => item.id === projectId);

  if (!project) return <div className="page-content">{t(language, 'Strategic project not found', 'لم يتم العثور على المشروع الاستراتيجي')}</div>;

  const objective = strategicObjectives.find((item) => item.id === project.objectiveId);
  const pillar = strategicPillars.find((item) => item.id === project.pillarId);
  const milestones = strategicMilestones.filter((item) => item.projectId === project.id);
  const tasks = strategicTasks.filter((item) => item.projectId === project.id);
  const resources = strategicResources.filter((item) => item.projectId === project.id);
  const documents = strategicDocuments.filter((item) => item.entityId === project.id);
  const risks = strategicRisks.filter((item) => item.projectId === project.id);
  const kpis = strategicKPIs.filter((item) => item.projectId === project.id);
  const budget = strategicBudgets.filter((item) => item.projectId === project.id);
  const communication = strategicComments.filter((item) => item.entityId === project.id || tasks.some((task) => task.id === item.entityId));
  const activity = strategicActivity.filter((item) => item.entityId === project.id).concat(communication);
  const activeTab = tabs.find((item) => item.id === tab) || tabs[0];

  const renderTab = () => {
    if (activeTab.id === 'overview') return <Overview project={project} objective={objective} pillar={pillar} milestones={milestones} tasks={tasks} kpis={kpis} risks={risks} />;
    if (activeTab.id === 'milestones') return <Milestones milestones={milestones} tasks={tasks} />;
    if (activeTab.id === 'tasks') return <Tasks tasks={tasks} />;
    if (activeTab.id === 'subtasks') return <Subtasks tasks={tasks} />;
    if (activeTab.id === 'gantt') return <Gantt project={project} milestones={milestones} tasks={tasks} />;
    if (activeTab.id === 'team') return <SimpleTab title={t(language, 'Team and Resources', 'الفريق والموارد')} rows={resources.concat(budget)} />;
    if (activeTab.id === 'documents') return <SimpleTab title={t(language, 'Documents', 'الوثائق')} rows={documents} />;
    if (activeTab.id === 'communication') return <SimpleTab title={t(language, 'Communication and Comments', 'التواصل والتعليقات')} rows={communication} />;
    if (activeTab.id === 'challenges') return <section className="sp-panel"><h2>{t(language, 'Challenges', 'التحديات')}</h2><p>{label(project, 'challenges', language)}</p><div className="sp-chip-list"><span>{label(project, 'outputs', language)}</span><span>{label(project, 'resourcesRequired', language)}</span></div></section>;
    if (activeTab.id === 'risks') return <SimpleTab title={t(language, 'Project Risks', 'مخاطر المشروع')} rows={risks} />;
    if (activeTab.id === 'kpis') return <SimpleTab title={t(language, 'Project KPIs', 'مؤشرات المشروع')} rows={kpis} />;
    if (activeTab.id === 'activity') return <SimpleTab title={t(language, 'Activity Log', 'سجل الأنشطة')} rows={activity} />;
    return null;
  };

  return (
    <div className="project-details-layout sp-detail">
      <Topbar breadcrumbs={[t(language, 'Strategic Planning', 'التخطيط الاستراتيجي'), label(project, 'name', language), label(activeTab, 'label', language)]} />
      <div className="project-sticky-header">
        <div className="project-header-top">
          <div className="project-info">
            <div className="project-title-row">
              <h1>{label(project, 'name', language)}</h1>
              <StatusBadge status={label(project, 'status', language)} />
              <span className="priority-badge">{project.priority}</span>
            </div>
            <p className="project-type-subtitle">{label(project, 'type', language)} • {project.startDate} - {project.endDate} • {label(project, 'manager', language)} • {money(project.budget, language)}</p>
          </div>
          <div className="project-header-actions">
            <button className="btn-primary" type="button"><i className="ti ti-plus" /> {t(language, 'Add Task', 'إضافة مهمة')}</button>
            <button className="btn-outline" type="button"><i className="ti ti-send" /> {t(language, 'Submit', 'إرسال')}</button>
            <button className="btn-outline" type="button"><i className="ti ti-file-export" /> {t(language, 'Export', 'تصدير')}</button>
          </div>
        </div>
        <div className="project-header-stats">
          <div className="header-stat-item"><label>{t(language, 'Progress', 'الإنجاز')}</label><Progress value={project.progress} /></div>
          <div className="header-stat-item"><label>{t(language, 'Objective', 'الهدف')}</label><span className="last-update-val">{label(objective, 'name', language)}</span></div>
          <div className="header-stat-item"><label>{t(language, 'Milestones', 'المراحل')}</label><span className="last-update-val">{milestones.length}</span></div>
          <div className="header-stat-item"><label>{t(language, 'Tasks', 'المهام')}</label><span className="last-update-val">{tasks.length}</span></div>
        </div>
        <nav className="project-tabs">
          {tabs.map((item) => (
            <Link key={item.id} to={`/strategic-planning/projects/${project.id}/${item.id}`} className={`project-tab-link ${activeTab.id === item.id ? 'active' : ''}`}>
              <i className={`ti ${item.icon}`} />
              <span>{label(item, 'label', language)}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="project-content-area">{renderTab()}</div>
    </div>
  );
}
