
import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useI18n } from '../../i18n';
import { strategicPlans, strategicObjectives, strategicInitiatives, strategicKPIs } from '../../data/strategicData';

const tabs = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: 'ti-info-circle' },
  { id: 'initiatives', label: 'Initiatives / Projects', labelAr: 'المبادرات والمشاريع', icon: 'ti-briefcase' },
  { id: 'kpis', label: 'KPIs', labelAr: 'مؤشرات الأداء', icon: 'ti-chart-infographic' },
  { id: 'risks', label: 'Risks & Issues', labelAr: 'المخاطر والقضايا', icon: 'ti-alert-triangle' },
  { id: 'documents', label: 'Documents', labelAr: 'الوثائق', icon: 'ti-files' },
  { id: 'activity', label: 'Activity Log', labelAr: 'سجل الأنشطة', icon: 'ti-history' },
];

export default function StrategicObjectiveDetailsPage() {
  const { objectiveId, tab = 'overview' } = useParams();
  const { language } = useI18n();

  const objective = useMemo(() => strategicObjectives.find(o => o.id === objectiveId), [objectiveId]);
  const plan = useMemo(() => strategicPlans.find(p => p.id === objective?.planId), [objective]);
  const initiatives = useMemo(() => strategicInitiatives.filter(i => i.objectiveId === objectiveId), [objectiveId]);
  const kpis = useMemo(() => strategicKPIs.filter(k => k.objectiveId === objectiveId), [objectiveId]);

  if (!objective) return <div className="page-content">Strategic Objective not found</div>;

  const getLabel = (item, key) => (language === 'ar' ? item[`${key}Ar`] || item[key] : item[key]);

  return (
    <div className="project-details-layout">
      <Topbar 
        breadcrumbs={[
          language === 'ar' ? 'التخطيط الاستراتيجي' : 'Strategic Planning',
          getLabel(plan, 'name'),
          getLabel(objective, 'name')
        ]} 
      />
      
      <div className="project-sticky-header">
        <div className="project-header-top">
          <div className="project-info">
            <div className="project-title-row">
              <span className="objective-code-badge">{objective.code}</span>
              <h1>{getLabel(objective, 'name')}</h1>
              <span className={`status-pill s-${objective.status.toLowerCase().replace(' ', '-')}`}>{getLabel(objective, 'status')}</span>
            </div>
            <p className="project-type-subtitle">{getLabel(plan, 'name')} • {objective.startDate} - {objective.endDate}</p>
          </div>
          
          <div className="project-header-actions">
            <button className="btn-primary">
              <i className="ti ti-plus" /> {language === 'ar' ? 'إضافة مبادرة' : 'Add Initiative'}
            </button>
            <button className="btn-outline"><i className="ti ti-share" /></button>
          </div>
        </div>

        <div className="project-header-stats">
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'نسبة الإنجاز' : 'Progress'}</label>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${objective.progress}%` }}></div>
              <span>{objective.progress}%</span>
            </div>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'الوزن النسبي' : 'Relative Weight'}</label>
            <span className="last-update-val">{objective.weight}%</span>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'المسؤول' : 'Owner'}</label>
            <span className="last-update-val">{getLabel(objective, 'owner')}</span>
          </div>
          <div className="header-stat-item">
            <label>{language === 'ar' ? 'المبادرات' : 'Initiatives'}</label>
            <span className="last-update-val">{initiatives.length}</span>
          </div>
        </div>

        <nav className="project-tabs">
          {tabs.map(t => (
            <Link 
              key={t.id} 
              to={`/strategic-planning/objectives/${objectiveId}/${t.id}`}
              className={`project-tab-link ${tab === t.id ? 'active' : ''}`}
            >
              <i className={`ti ${t.icon}`} />
              <span>{language === 'ar' ? t.labelAr : t.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="project-content-area">
        {tab === 'overview' && (
          <div className="overview-grid">
            <div className="overview-main">
              <div className="card info-card">
                <h3>{language === 'ar' ? 'وصف الهدف' : 'Objective Description'}</h3>
                <p>{getLabel(objective, 'description')}</p>
              </div>
              <div className="card initiatives-summary">
                <h3>{language === 'ar' ? 'المبادرات والمشاريع المرتبطة' : 'Linked Initiatives'}</h3>
                <div className="milestone-track">
                  {initiatives.map(init => (
                    <div key={init.id} className="ms-track-item">
                      <div className="ms-dot" data-status={init.status === 'Completed' ? 'Completed' : 'In Progress'}></div>
                      <div className="ms-info">
                        <h4>{language === 'ar' ? init.nameAr : init.name}</h4>
                        <span>{init.progress}% • {language === 'ar' ? init.statusAr || init.status : init.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overview-side">
              <div className="card kpi-card">
                <h3>{language === 'ar' ? 'مؤشرات الأداء' : 'KPIs'}</h3>
                {kpis.map(kpi => (
                  <div key={kpi.id} className="kpi-item">
                    <span>{getLabel(kpi, 'name')}</span>
                    <strong>{kpi.actual}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'initiatives' && (
           <div className="initiatives-container">
           <table className="tasks-table">
             <thead>
               <tr>
                 <th>{language === 'ar' ? '\u0627\u0644\u0631\u0645\u0632' : 'Code'}</th>
                 <th>{language === 'ar' ? '\u0627\u0644\u0627\u0633\u0645' : 'Name'}</th>
                 <th>{language === 'ar' ? '\u0627\u0644\u0645\u0627\u0644\u0643' : 'Owner'}</th>
                 <th>{language === 'ar' ? '\u0627\u0644\u062d\u0627\u0644\u0629' : 'Status'}</th>
                 <th>{language === 'ar' ? '\u0627\u0644\u062a\u0642\u062f\u0645' : 'Progress'}</th>
                 <th>{language === 'ar' ? '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0646\u0647\u0627\u064a\u0629' : 'End Date'}</th>
               </tr>
             </thead>
             <tbody>
               {initiatives.map(init => (
                 <tr key={init.id}>
                   <td>{init.code}</td>
                   <td><Link className="project-link" to={`/quality-projects/projects/${init.id}`}>{language === 'ar' ? init.nameAr : init.name}</Link></td>
                   <td>{language === 'ar' ? init.ownerAr || init.owner : init.owner}</td>
                   <td><span className="task-status-pill" data-status={init.status}>{language === 'ar' ? init.statusAr || init.status : init.status}</span></td>
                   <td>{init.progress}%</td>
                   <td>{init.endDate}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
        )}

        {tab === 'kpis' && (
          <div className="quality-card-grid">
            {kpis.map(kpi => (
              <div key={kpi.id} className="card kpi-detail-card">
                <div className="kpi-header">
                  <h4>{getLabel(kpi, 'name')}</h4>
                  <span className={`status-pill s-${kpi.status.toLowerCase().replace(' ', '-')}`}>{kpi.status}</span>
                </div>
                <div className="kpi-body">
                   <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>{language === 'ar' ? kpi.measurementAr || kpi.measurement : kpi.measurement}</p>
                  <div className="kpi-stat">
                    <label>{language === 'ar' ? '\u0627\u0644\u0641\u0639\u0644\u064a / \u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641' : 'Actual / Target'}</label>
                    <strong>{kpi.actual}% / {kpi.target}%</strong>
                  </div>
                  <div className="kpi-progress">
                    <div className="progress-bar-fill" style={{ width: `${(kpi.actual / kpi.target) * 100}%` }}></div>
                  </div>
                  <div className="kpi-meta">
                    <span>{language === 'ar' ? '\u062e\u0637 \u0627\u0644\u0623\u0633\u0627\u0633' : 'Baseline'}: {kpi.baseline}%</span>
                    <span>{language === 'ar' ? '\u0627\u0644\u062a\u0643\u0631\u0627\u0631' : 'Freq'}: {language === 'ar' ? kpi.frequencyAr || kpi.frequency : kpi.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!['overview', 'initiatives', 'kpis'].includes(tab) && (
          <div className="placeholder-content">
            <i className={`ti ${tabs.find(t => t.id === tab).icon}`} />
            <h2>{language === 'ar' ? tabs.find(t => t.id === tab).labelAr : tabs.find(t => t.id === tab).label}</h2>
            <p>{language === 'ar' ? '\u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u0642\u064a\u062f \u0627\u0644\u062a\u0637\u0648\u064a\u0631' : 'Objective section under development'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
