
import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useI18n } from '../../i18n';
import { projects, milestones, tasks, risks } from '../../data/projectData';

const tabs = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: 'ti-info-circle' },
  { id: 'milestones', label: 'Milestones', labelAr: 'المراحل', icon: 'ti-flag-3' },
  { id: 'tasks', label: 'Tasks', labelAr: 'المهام', icon: 'ti-list-check' },
  { id: 'gantt', label: 'Timeline / Gantt', labelAr: 'الخطة الزمنية', icon: 'ti-timeline' },
  { id: 'team', label: 'Team & Resources', labelAr: 'الفريق والموارد', icon: 'ti-users-group' },
  { id: 'risks', label: 'Risks & Issues', labelAr: 'المخاطر والقضايا', icon: 'ti-alert-triangle' },
  { id: 'files', label: 'Files', labelAr: 'الملفات', icon: 'ti-folders' },
  { id: 'meetings', label: 'Meetings', labelAr: 'الاجتماعات', icon: 'ti-messages' },
  { id: 'activity', label: 'Activity Log', labelAr: 'سجل الأنشطة', icon: 'ti-history' },
  { id: 'reports', label: 'Reports', labelAr: 'التقارير', icon: 'ti-report-analytics' },
];

export default function ProjectDetailsPage() {
  const { projectId, tab = 'overview' } = useParams();
  const navigate = useNavigate();
  const { language } = useI18n();
  const [selectedTask, setSelectedTask] = useState(null);

  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId]);
  const projectMilestones = useMemo(() => milestones.filter(m => m.projectId === projectId), [projectId]);
  const projectTasks = useMemo(() => tasks.filter(t => t.projectId === projectId), [projectId]);

  if (!project) {
    return <div className="page-content">Project not found</div>;
  }

  const getLabel = (item, key) => (language === 'ar' ? item[`${key}Ar`] || item[key] : item[key]);

  return (
    <div className={`project-details-layout ${selectedTask ? 'panel-open' : ''}`}>
      <Topbar 
        breadcrumbs={[
          language === 'ar' ? 'مشاريع الجودة والاعتماد' : 'Quality & Accreditation Projects',
          getLabel(project, 'name')
        ]} 
      />
      
      <div className="project-sticky-header">
        <div className="project-header-top">
          <div className="project-info">
            <div className="project-title-row">
              <h1>{getLabel(project, 'name')}</h1>
              <span className={`status-pill s-${project.status.toLowerCase().replace(' ', '-')}`}>
                {getLabel(project, 'status')}
              </span>
              <span className="priority-badge">{getLabel(project, 'priority')}</span>
            </div>
            <p className="project-type-subtitle">{getLabel(project, 'type')} • {getLabel(project, 'entity')}</p>
          </div>
          
          <div className="project-header-actions">
            <button className="btn-primary">
              <i className="ti ti-plus" /> {language === 'ar' ? 'إضافة مهمة' : 'Add Task'}
            </button>
            <button className="btn-outline">
              <i className="ti ti-share" />
            </button>
            <button className="btn-outline">
              <i className="ti ti-settings" />
            </button>
          </div>
        </div>

        <div className="project-header-stats">
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'نسبة الإنجاز' : 'Progress'}</label>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${project.progress}%` }}></div>
              <span>{project.progress}%</span>
            </div>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'التاريخ' : 'Timeline'}</label>
            <div className="date-range">
              <i className="ti ti-calendar-event" />
              <span>{project.startDate} - {project.endDate}</span>
            </div>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'الفريق' : 'Team'}</label>
            <div className="avatar-group">
              {project.team.map(m => (
                <div key={m.id} className="avatar-sm" title={`${m.name} (${m.role})`}>{m.avatar}</div>
              ))}
              <div className="avatar-sm add-member">+</div>
            </div>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'آخر تحديث' : 'Last Update'}</label>
            <span className="last-update-val">{project.lastUpdate}</span>
          </div>
        </div>

        <nav className="project-tabs">
          {tabs.map(t => (
            <Link 
              key={t.id} 
              to={`/quality-projects/projects/${projectId}/${t.id}`}
              className={`project-tab-link ${tab === t.id ? 'active' : ''}`}
            >
              <i className={`ti ${t.icon}`} />
              <span>{language === 'ar' ? t.labelAr : t.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="project-content-area">
        {tab === 'overview' && <ProjectOverview project={project} milestones={projectMilestones} />}
        {tab === 'milestones' && <ProjectMilestones milestones={projectMilestones} tasks={projectTasks} onTaskClick={setSelectedTask} />}
        {tab === 'tasks' && <ProjectTasks tasks={projectTasks} onTaskClick={setSelectedTask} />}
        {tab === 'gantt' && <ProjectGantt project={project} milestones={projectMilestones} tasks={projectTasks} />}
        {/* Other tabs placeholders */}
        {['team', 'risks', 'files', 'meetings', 'activity', 'reports'].includes(tab) && (
          <div className="placeholder-content">
            <i className={`ti ${tabs.find(t => t.id === tab).icon}`} />
            <h2>{language === 'ar' ? tabs.find(t => t.id === tab).labelAr : tabs.find(t => t.id === tab).label}</h2>
            <p>Section is under construction for {project.name}</p>
          </div>
        )}
      </div>

      {selectedTask && (
        <TaskDetailsPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}

function TaskDetailsPanel({ task, onClose }) {
  const { language } = useI18n();
  const getLabel = (item, key) => (language === 'ar' ? item[`${key}Ar`] || item[key] : item[key]);

  return (
    <div className="task-details-panel">
      <div className="panel-header">
        <div className="panel-nav">
          <span className="task-id">{task.id}</span>
          <button className="close-btn" onClick={onClose}><i className="ti ti-x" /></button>
        </div>
        <h2>{getLabel(task, 'title')}</h2>
      </div>
      
      <div className="panel-body">
        <div className="panel-section">
          <label>{language === 'ar' ? 'الحالة' : 'Status'}</label>
          <div className="status-selector">
            <span className="status-pill s-inprogress">{task.status}</span>
          </div>
        </div>

        <div className="panel-section">
          <label>{language === 'ar' ? 'المسؤول' : 'Assignee'}</label>
          <div className="assignee-box">
            <div className="avatar-sm">{task.assignedTo[0]}</div>
            <span>{task.assignedTo}</span>
          </div>
        </div>

        <div className="panel-section">
          <label>{language === 'ar' ? 'الوصف' : 'Description'}</label>
          <p>{getLabel(task, 'description')}</p>
        </div>

        <div className="panel-section">
          <label>{language === 'ar' ? 'المهام الفرعية' : 'Subtasks'}</label>
          <div className="subtasks-list">
            {task.subtasks.map(st => (
              <div key={st.id} className="subtask-item">
                <input type="checkbox" checked={st.status === 'Completed'} readOnly />
                <span>{st.title}</span>
              </div>
            ))}
            <button className="add-subtask">+ Add subtask</button>
          </div>
        </div>

        <div className="panel-section">
          <label>{language === 'ar' ? 'المرفقات' : 'Attachments'}</label>
          <div className="attachments-list">
            {task.attachments.map(at => (
              <div key={at} className="attachment-item">
                <i className="ti ti-file" />
                <span>{at}</span>
              </div>
            ))}
            <button className="upload-btn"><i className="ti ti-upload" /> Upload</button>
          </div>
        </div>

        <div className="panel-section">
          <label>{language === 'ar' ? 'التعليقات' : 'Comments'}</label>
          <div className="comments-list">
            {task.comments.map((c, i) => (
              <div key={i} className="comment-item">
                <div className="comment-meta">
                  <strong>{c.user}</strong>
                  <span>{c.date}</span>
                </div>
                <p>{c.text}</p>
              </div>
            ))}
            <textarea placeholder="Add a comment..." className="comment-input" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectOverview({ project, milestones }) {
  const { language } = useI18n();
  return (
    <div className="overview-grid">
      <div className="overview-main">
        <div className="card info-card">
          <h3>{language === 'ar' ? 'عن المشروع' : 'Project Description'}</h3>
          <p>
            {language === 'ar' 
              ? 'هذا المشروع يهدف إلى ضمان جاهزية المؤسسة للاعتماد الأكاديمي من خلال استيفاء كافة المتطلبات والمعايير الوطنية.'
              : 'This project aims to ensure the institutional readiness for academic accreditation by fulfilling all national requirements and standards.'}
          </p>
        </div>
        
        <div className="card milestones-summary">
          <h3>{language === 'ar' ? 'المراحل الحالية' : 'Current Milestones'}</h3>
          <div className="milestone-track">
            {milestones.map(ms => (
              <div key={ms.id} className="ms-track-item">
                <div className="ms-dot" data-status={ms.status}></div>
                <div className="ms-info">
                  <h4>{language === 'ar' ? ms.nameAr : ms.name}</h4>
                  <span>{ms.endDate} • {ms.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overview-side">
        <div className="card kpi-card">
          <h3>{language === 'ar' ? 'مؤشرات الأداء' : 'Key Performance Indicators'}</h3>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'المهام المتأخرة' : 'Delayed Tasks'}</span>
            <strong className="text-danger">{project.kpis.delayedTasks}</strong>
          </div>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'استيفاء المتطلبات' : 'Requirements'}</span>
            <strong>{project.kpis.requirements}%</strong>
          </div>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'اكتمال الأدلة' : 'Evidence'}</span>
            <strong>{project.kpis.evidence}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectMilestones({ milestones, tasks, onTaskClick }) {
  const { language } = useI18n();
  return (
    <div className="milestones-container">
      {milestones.map(ms => (
        <div key={ms.id} className="milestone-block">
          <div className="ms-block-header">
            <div className="ms-title">
              <i className="ti ti-flag-3" />
              <h3>{language === 'ar' ? ms.nameAr : ms.name}</h3>
              <span className="ms-status-badge">{language === 'ar' ? ms.statusAr : ms.status}</span>
            </div>
            <div className="ms-meta">
              <span>{ms.startDate} - {ms.endDate}</span>
              <strong>{ms.progress}%</strong>
            </div>
          </div>
          <div className="ms-block-tasks">
            {tasks.filter(t => t.milestoneId === ms.id).map(task => (
              <div key={task.id} className="task-row" onClick={() => onTaskClick(task)}>
                <div className="task-check"><i className={`ti ${task.status === 'Completed' ? 'ti-circle-check-filled' : 'ti-circle'}`} /></div>
                <div className="task-name">{language === 'ar' ? task.titleAr : task.title}</div>
                <div className="task-user"><div className="avatar-xs">{task.assignedTo[0]}</div></div>
                <div className="task-date">{task.dueDate}</div>
                <div className="task-priority" data-priority={task.priority}>{task.priority}</div>
                <div className="task-status-pill" data-status={task.status}>{task.status}</div>
              </div>
            ))}
            {tasks.filter(t => t.milestoneId === ms.id).length === 0 && (
              <div className="no-tasks">{language === 'ar' ? 'لا توجد مهام في هذه المرحلة' : 'No tasks in this milestone'}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectTasks({ tasks, onTaskClick }) {
  const [view, setView] = useState('kanban');
  const { language } = useI18n();
  
  return (
    <div className="tasks-view-container">
      <div className="view-header">
        <div className="view-switcher">
          <button onClick={() => setView('kanban')} className={view === 'kanban' ? 'active' : ''}><i className="ti ti-layout-kanban" /> Kanban</button>
          <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}><i className="ti ti-list" /> List</button>
          <button onClick={() => setView('calendar')} className={view === 'calendar' ? 'active' : ''}><i className="ti ti-calendar" /> Calendar</button>
        </div>
      </div>
      
      {view === 'kanban' && (
        <div className="kanban-board">
          {['To Do', 'In Progress', 'Completed'].map(col => (
            <div key={col} className="kanban-col">
              <div className="col-header">
                <h3>{col}</h3>
                <span>{tasks.filter(t => t.status === col).length}</span>
              </div>
              <div className="col-cards">
                {tasks.filter(t => t.status === col).map(task => (
                  <div key={task.id} className="task-card" onClick={() => onTaskClick(task)}>
                    <div className="card-priority" data-priority={task.priority}></div>
                    <h4>{language === 'ar' ? task.titleAr : task.title}</h4>
                    <div className="card-footer">
                      <div className="avatar-xs">{task.assignedTo[0]}</div>
                      <span className="due-date"><i className="ti ti-calendar" /> {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {view === 'list' && (
        <div className="list-view">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Assigned</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} onClick={() => onTaskClick(task)}>
                  <td>{language === 'ar' ? task.titleAr : task.title}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'calendar' && <div className="placeholder-calendar">Calendar View Placeholder</div>}
    </div>
  );
}

function ProjectGantt({ milestones, tasks }) {
  const { language } = useI18n();
  return (
    <div className="gantt-container">
      <div className="gantt-header">
        <div className="gantt-sidebar-head">{language === 'ar' ? 'المهام' : 'Tasks'}</div>
        <div className="gantt-timeline-head">
          <div className="month">April 2026</div>
          <div className="month">May 2026</div>
          <div className="month">June 2026</div>
        </div>
      </div>
      <div className="gantt-body">
        {milestones.map(ms => (
          <div key={ms.id} className="gantt-row milestone">
            <div className="gantt-sidebar-cell">
              <strong>{language === 'ar' ? ms.nameAr : ms.name}</strong>
            </div>
            <div className="gantt-timeline-cell">
              <div className="gantt-bar milestone-bar" style={{ insetInlineStart: '10%', width: '30%' }}>
                {ms.progress}%
              </div>
            </div>
          </div>
        ))}
        {tasks.map(t => (
          <div key={t.id} className="gantt-row task">
            <div className="gantt-sidebar-cell">
              <span>{language === 'ar' ? t.titleAr : t.title}</span>
            </div>
            <div className="gantt-timeline-cell">
              <div className="gantt-bar task-bar" style={{ insetInlineStart: '15%', width: '20%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
