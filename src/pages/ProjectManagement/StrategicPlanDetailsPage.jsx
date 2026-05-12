
import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useI18n } from '../../i18n';
import { strategicPlans, strategicObjectives, strategicInitiatives, strategicKPIs } from '../../data/strategicData';

const tabs = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: 'ti-info-circle' },
  { id: 'objectives', label: 'Strategic Objectives', labelAr: 'الأهداف الاستراتيجية', icon: 'ti-target' },
  { id: 'initiatives', label: 'Initiatives / Projects', labelAr: 'المبادرات والمشاريع', icon: 'ti-briefcase' },
  { id: 'kpis', label: 'KPIs', labelAr: 'مؤشرات الأداء', icon: 'ti-chart-infographic' },
  { id: 'timeline', label: 'Timeline / Roadmap', labelAr: 'الخارطة الزمنية', icon: 'ti-timeline' },
  { id: 'risks', label: 'Risks & Issues', labelAr: 'المخاطر والقضايا', icon: 'ti-alert-triangle' },
  { id: 'documents', label: 'Documents', labelAr: 'الوثائق', icon: 'ti-files' },
  { id: 'meetings', label: 'Meetings', labelAr: 'الاجتماعات', icon: 'ti-messages' },
  { id: 'reports', label: 'Reports', labelAr: 'التقارير', icon: 'ti-report-analytics' },
  { id: 'activity', label: 'Activity Log', labelAr: 'سجل الأنشطة', icon: 'ti-history' },
];

export default function StrategicPlanDetailsPage() {
  const { planId, tab = 'overview' } = useParams();
  const { language } = useI18n();

  const plan = useMemo(() => strategicPlans.find(p => p.id === planId), [planId]);
  const planObjectives = useMemo(() => strategicObjectives.filter(o => o.planId === planId), [planId]);
  const planInitiatives = useMemo(() => strategicInitiatives.filter(i => {
    const obj = planObjectives.find(o => o.id === i.objectiveId);
    return !!obj;
  }), [planObjectives]);

  if (!plan) return <div className="page-content">Strategic Plan not found</div>;

  const getLabel = (item, key) => (language === 'ar' ? item[`${key}Ar`] || item[key] : item[key]);

  return (
    <div className="project-details-layout">
      <Topbar 
        breadcrumbs={[
          language === 'ar' ? 'التخطيط الاستراتيجي' : 'Strategic Planning',
          getLabel(plan, 'name')
        ]} 
      />
      
      <div className="project-sticky-header">
        <div className="project-header-top">
          <div className="project-info">
            <div className="project-title-row">
              <h1>{getLabel(plan, 'name')}</h1>
              <span className={`status-pill s-active`}>{getLabel(plan, 'status')}</span>
            </div>
            <p className="project-type-subtitle">{plan.duration} • {plan.startDate} - {plan.endDate} • {getLabel(plan, 'owner')}</p>
          </div>
          
          <div className="project-header-actions">
            <button className="btn-primary">
              <i className="ti ti-plus" /> {language === 'ar' ? 'إضافة هدف' : 'Add Objective'}
            </button>
            <button className="btn-outline"><i className="ti ti-share" /></button>
            <button className="btn-outline"><i className="ti ti-settings" /></button>
          </div>
        </div>

        <div className="project-header-stats">
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'نسبة الإنجاز العامة' : 'Overall Progress'}</label>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${plan.progress}%` }}></div>
              <span>{plan.progress}%</span>
            </div>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'عدد الأهداف' : 'Objectives'}</label>
            <span className="last-update-val">{plan.stats.objectives}</span>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'عدد المشاريع' : 'Projects'}</label>
            <span className="last-update-val">{plan.stats.projects}</span>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'آخر تحديث' : 'Last Update'}</label>
            <span className="last-update-val">{plan.lastUpdate}</span>
          </div>
        </div>

        <nav className="project-tabs">
          {tabs.map(t => (
            <Link 
              key={t.id} 
              to={`/strategic-planning/plans/${planId}/${t.id}`}
              className={`project-tab-link ${tab === t.id ? 'active' : ''}`}
            >
              <i className={`ti ${t.icon}`} />
              <span>{language === 'ar' ? t.labelAr : t.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="project-content-area">
        {tab === 'overview' && <PlanOverview plan={plan} objectives={planObjectives} initiatives={planInitiatives} />}
        {tab === 'objectives' && <PlanObjectives objectives={planObjectives} />}
        {tab === 'initiatives' && <PlanInitiatives initiatives={planInitiatives} objectives={planObjectives} />}
        {tab === 'kpis' && <PlanKPIs objectives={planObjectives} />}
        {/* Placeholders for others */}
        {!['overview', 'objectives', 'initiatives', 'kpis'].includes(tab) && (
          <div className="placeholder-content">
            <i className={`ti ${tabs.find(t => t.id === tab).icon}`} />
            <h2>{language === 'ar' ? tabs.find(t => t.id === tab).labelAr : tabs.find(t => t.id === tab).label}</h2>
            <p>Strategic section under development</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanOverview({ plan, objectives, initiatives }) {
  const { language } = useI18n();
  return (
    <div className="overview-grid">
      <div className="overview-main">
        <div className="card info-card">
          <h3>{language === 'ar' ? 'نظرة عامة على الخطة' : 'Plan Overview'}</h3>
          <p>{language === 'ar' ? 'تصف هذه الخطة التوجهات الاستراتيجية للجامعة للسنوات الخمس القادمة، مع التركيز على التحول الرقمي والتميز الأكاديمي.' : 'This plan outlines the strategic directions for the university over the next five years, focusing on digital transformation and academic excellence.'}</p>
        </div>
        
        <div className="card objectives-summary">
          <h3>{language === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}</h3>
          <div className="milestone-track">
            {objectives.map(obj => (
              <div key={obj.id} className="ms-track-item">
                <div className="ms-dot" data-status={obj.status === 'On Track' ? 'Completed' : 'In Progress'}></div>
                <div className="ms-info">
                  <h4>{language === 'ar' ? obj.nameAr : obj.name}</h4>
                  <span>{obj.progress}% الإنجاز • {obj.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overview-side">
        <div className="card kpi-card">
          <h3>{language === 'ar' ? 'ملخص التنفيذ' : 'Execution Summary'}</h3>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'الأهداف المنجزة' : 'Objectives Met'}</span>
            <strong>1 / {plan.stats.objectives}</strong>
          </div>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'المبادرات الجارية' : 'Initiatives'}</span>
            <strong>{plan.stats.projects}</strong>
          </div>
          <div className="kpi-item">
            <span>{language === 'ar' ? 'نسبة المؤشرات المحققة' : 'KPI Achievement'}</span>
            <strong>62%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanObjectives({ objectives }) {
  const { language } = useI18n();
  return (
    <div className="objectives-list-container">
      {objectives.map(obj => (
        <div key={obj.id} className="milestone-block">
          <div className="ms-block-header">
            <div className="ms-title">
              <i className="ti ti-target" />
              <Link to={`/strategic-planning/objectives/${obj.id}`} className="project-link">
                <h3>{obj.code}: {language === 'ar' ? obj.nameAr : obj.name}</h3>
              </Link>
              <span className="ms-status-badge">{language === 'ar' ? obj.statusAr : obj.status}</span>
            </div>
            <div className="ms-meta">
              <span>{obj.startDate} - {obj.endDate}</span>
              <strong>{obj.progress}%</strong>
            </div>
          </div>
          <div className="ms-block-tasks">
            <div className="task-row">
              <p style={{ padding: '0 20px', fontSize: '13px', color: '#64748b' }}>{language === 'ar' ? obj.descriptionAr : obj.description}</p>
            </div>
            <div className="task-row">
              <div className="task-name" style={{ paddingInlineStart: '20px' }}>
                <i className="ti ti-user" style={{ marginInlineEnd: '8px' }} />
                {language === 'ar' ? obj.ownerAr : obj.owner}
              </div>
              <div className="task-priority">Weight: {obj.weight}%</div>
              <div className="task-status-pill"><Link to={`/strategic-planning/objectives/${obj.id}`}>View Details</Link></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanInitiatives({ initiatives, objectives }) {
  const { language } = useI18n();
  return (
    <div className="initiatives-container">
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Objective</th>
            <th>Owner</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {initiatives.map(init => {
            const obj = objectives.find(o => o.id === init.objectiveId);
            return (
              <tr key={init.id}>
                <td>{init.code}</td>
                <td><Link className="project-link" to={`/quality-projects/projects/${init.id}`}>{language === 'ar' ? init.nameAr : init.name}</Link></td>
                <td>{language === 'ar' ? obj?.nameAr : obj?.name}</td>
                <td>{init.owner}</td>
                <td>{init.budget}</td>
                <td><span className="task-status-pill" data-status={init.status}>{init.status}</span></td>
                <td>{init.progress}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PlanKPIs({ objectives }) {
  const { language } = useI18n();
  const kpis = strategicKPIs.filter(kpi => objectives.some(o => o.id === kpi.objectiveId));
  
  return (
    <div className="kpis-container">
      <div className="quality-card-grid">
        {kpis.map(kpi => (
          <div key={kpi.id} className="card kpi-detail-card">
            <div className="kpi-header">
              <h4>{language === 'ar' ? kpi.nameAr : kpi.name}</h4>
              <span className={`status-pill s-${kpi.status.toLowerCase().replace(' ', '-')}`}>{kpi.status}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-stat">
                <label>Actual / Target</label>
                <strong>{kpi.actual}% / {kpi.target}%</strong>
              </div>
              <div className="kpi-progress">
                <div className="progress-bar-fill" style={{ width: `${(kpi.actual / kpi.target) * 100}%` }}></div>
              </div>
              <div className="kpi-meta">
                <span>Freq: {kpi.frequency}</span>
                <span>Trend: <i className={`ti ti-trending-${kpi.trend.toLowerCase()}`} /> {kpi.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
