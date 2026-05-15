import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { AcademicTree, HierProgress, HierarchyMetricGrid, StatusChip, localName } from '../components/AcademicHierarchy';
import { academicPrograms, colleges, departments, getHierarchySummary } from '../data/academicHierarchyData';
import {
  deputyGoals,
  deputyOffices,
  directorate,
  evidenceItems,
  getDepartmentAchievement,
  getDeputyGoalAchievement,
  getDeputyOfficeAchievement,
  getDirectorateAchievement,
  getKpiAchievement,
  getPerformanceSummary,
  getStatusFromAchievement,
  getSubGoalAchievement,
  getTopGoalAchievement,
  getUseCasesByActor,
  kpiData,
  localPmName,
  performanceReports,
  pmActors,
  pmDepartments,
  pmUseCases,
  roles,
  subGoals,
  topGoals,
  users,
} from '../data/performanceManagementData';
import { useI18n } from '../i18n';

const pmTabs = [
  { id: 'dashboard', icon: 'ti-layout-dashboard', ar: 'لوحات الأداء', en: 'Dashboards' },
  { id: 'goals', icon: 'ti-sitemap', ar: 'الأهداف والربط', en: 'Goals & Alignment' },
  { id: 'kpis', icon: 'ti-target-arrow', ar: 'بيانات المؤشرات', en: 'KPI Data' },
  { id: 'evidence', icon: 'ti-paperclip', ar: 'الشواهد', en: 'Evidence' },
  { id: 'reports', icon: 'ti-report-analytics', ar: 'التقارير', en: 'Reports' },
  { id: 'admin', icon: 'ti-users-cog', ar: 'المستخدمون والأقسام', en: 'Users & Departments' },
  { id: 'coverage', icon: 'ti-shield-check', ar: 'تغطية حالات الاستخدام', en: 'Use Case Coverage' },
];

function txt(language, ar, en) {
  return language === 'ar' ? ar : en;
}

function StatusPill({ value }) {
  const status = getStatusFromAchievement(value);
  return <span className={`pm-status ${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span>;
}

function ActionButton({ icon, children, onClick, tone = 'light' }) {
  return (
    <button type="button" className={`pm-action ${tone}`} onClick={onClick}>
      <i className={`ti ${icon}`} />
      {children}
    </button>
  );
}

function PerformanceKpiCenter() {
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDeputy, setSelectedDeputy] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [notice, setNotice] = useState('');
  const summary = getPerformanceSummary();

  const filteredDepartments = useMemo(() => pmDepartments.filter((department) => (
    selectedDeputy === 'all' || department.deputyOfficeId === selectedDeputy
  )), [selectedDeputy]);

  const visibleSubGoals = useMemo(() => subGoals.filter((goal) => {
    const department = pmDepartments.find((item) => item.id === goal.departmentId);
    const matchesDeputy = selectedDeputy === 'all' || department?.deputyOfficeId === selectedDeputy;
    const matchesDepartment = selectedDepartment === 'all' || goal.departmentId === selectedDepartment;
    return matchesDeputy && matchesDepartment;
  }), [selectedDepartment, selectedDeputy]);

  const visibleKpis = useMemo(() => kpiData.filter((kpi) => (
    visibleSubGoals.some((goal) => goal.id === kpi.subGoalId)
  )), [visibleSubGoals]);

  const runAction = (label) => {
    setNotice(txt(
      language,
      `تم تنفيذ "${label}" على بيانات الواجهة مع تحديث اللوحات والمؤشرات المرتبطة.`,
      `"${label}" applied to the front-end workspace and reflected in linked dashboards.`
    ));
  };

  return (
    <>
      <Topbar breadcrumbs={['KPIs']} />
      <div className="page-content pm-page">
        {notice && (
          <div className="pm-toast">
            <i className="ti ti-circle-check" />
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')}><i className="ti ti-x" /></button>
          </div>
        )}

        <section className="pm-hero">
          <div className="pm-hero-copy">
            <span className="pm-eyebrow"><i className="ti ti-target-arrow" /> {txt(language, 'نظام إدارة الأداء', 'Performance Management System')}</span>
            <h1>{txt(language, 'مركز المؤشرات والأداء المؤسسي', 'KPI & Institutional Performance Center')}</h1>
            <p>{txt(
              language,
              'تطبيق كامل لحالات الاستخدام في ملف KPI RCJY: من الرؤية والأهداف العليا حتى أهداف الوكالات والأقسام وبيانات المؤشرات والشواهد والتقارير والصلاحيات.',
              'All KPI RCJY use cases are represented: vision, top goals, deputy goals, department sub-goals, KPI data, evidence, reports, and RBAC.'
            )}</p>
            <div className="pm-hero-actions">
              <ActionButton icon="ti-plus" tone="primary" onClick={() => runAction(txt(language, 'إنشاء بيانات مؤشر', 'Create KPI Data'))}>{txt(language, 'إضافة مؤشر', 'Add KPI')}</ActionButton>
              <ActionButton icon="ti-paperclip" onClick={() => runAction(txt(language, 'إرفاق شاهد', 'Attach Evidence'))}>{txt(language, 'إرفاق شاهد', 'Attach Evidence')}</ActionButton>
              <ActionButton icon="ti-report-analytics" onClick={() => setActiveTab('reports')}>{txt(language, 'توليد تقرير', 'Generate Report')}</ActionButton>
            </div>
          </div>
          <div className="pm-hero-score">
            <strong>{summary.directorateAchievement}%</strong>
            <span>{txt(language, 'إنجاز المديرية', 'Directorate Achievement')}</span>
            <div className="pm-progress"><span style={{ width: `${summary.directorateAchievement}%` }} /></div>
            <small>{summary.useCaseCoverage}/{pmUseCases.length} {txt(language, 'حالة استخدام مطبقة', 'use cases applied')}</small>
          </div>
        </section>

        <section className="pm-layout">
          <aside className="pm-tree-panel">
            <div className="pm-tree-search">
              <i className="ti ti-search" />
              <input placeholder={txt(language, 'بحث في المديرية أو الوكالة أو القسم', 'Search directorate, deputy office, or department')} />
            </div>
            <button type="button" className={`pm-tree-node top ${selectedDeputy === 'all' ? 'active' : ''}`} onClick={() => { setSelectedDeputy('all'); setSelectedDepartment('all'); }}>
              <i className="ti ti-building-bank" />
              <span>{localPmName(directorate, 'name', language)}</span>
              <b>{getDirectorateAchievement()}%</b>
            </button>
            {deputyOffices.map((office) => {
              const officeDepartments = pmDepartments.filter((department) => department.deputyOfficeId === office.id);
              return (
                <div className="pm-tree-group" key={office.id}>
                  <button type="button" className={`pm-tree-node ${selectedDeputy === office.id ? 'active' : ''}`} onClick={() => { setSelectedDeputy(office.id); setSelectedDepartment('all'); }}>
                    <i className="ti ti-users-group" />
                    <span>{localPmName(office, 'name', language)}</span>
                    <b>{getDeputyOfficeAchievement(office.id)}%</b>
                  </button>
                  {officeDepartments.map((department) => (
                    <button type="button" className={`pm-tree-node child ${selectedDepartment === department.id ? 'active' : ''}`} key={department.id} onClick={() => { setSelectedDeputy(office.id); setSelectedDepartment(department.id); }}>
                      <i className="ti ti-building" />
                      <span>{localPmName(department, 'name', language)}</span>
                      <b>{getDepartmentAchievement(department.id)}%</b>
                    </button>
                  ))}
                </div>
              );
            })}
          </aside>

          <main className="pm-main">
            <div className="pm-metrics">
              {[
                ['ti-flag-3', summary.topGoals, txt(language, 'الأهداف العليا', 'Top Goals')],
                ['ti-sitemap', summary.deputyGoals, txt(language, 'أهداف الوكالات', 'Deputy Goals')],
                ['ti-git-branch', summary.subGoals, txt(language, 'الأهداف الفرعية', 'Sub-goals')],
                ['ti-target-arrow', summary.kpis, txt(language, 'المؤشرات', 'KPIs')],
                ['ti-paperclip', summary.evidences, txt(language, 'الشواهد', 'Evidence')],
                ['ti-alert-triangle', summary.missingLinks, txt(language, 'روابط ناقصة', 'Missing Links')],
              ].map(([icon, value, label]) => (
                <article className="pm-metric-card" key={label}>
                  <i className={`ti ${icon}`} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>

            <nav className="pm-tabs" aria-label="KPI workspace">
              {pmTabs.map((tab) => (
                <button type="button" className={activeTab === tab.id ? 'active' : ''} key={tab.id} onClick={() => setActiveTab(tab.id)}>
                  <i className={`ti ${tab.icon}`} />
                  {txt(language, tab.ar, tab.en)}
                </button>
              ))}
            </nav>

            {activeTab === 'dashboard' && (
              <section className="pm-section-grid">
                <article className="pm-panel wide">
                  <div className="pm-panel-head">
                    <div>
                      <span>{txt(language, 'لوحة المديرية العامة', 'Directorate Dashboard')}</span>
                      <h2>{localPmName(directorate, 'name', language)}</h2>
                    </div>
                    <StatusPill value={summary.directorateAchievement} />
                  </div>
                  <div className="pm-vision-grid">
                    <div><b>{txt(language, 'الرؤية', 'Vision')}</b><p>{localPmName(directorate, 'vision', language)}</p></div>
                    <div><b>{txt(language, 'الرسالة', 'Mission')}</b><p>{localPmName(directorate, 'mission', language)}</p></div>
                  </div>
                  <div className="pm-bar-list">
                    {topGoals.map((goal) => (
                      <div className="pm-bar-row" key={goal.id}>
                        <span>{goal.number} - {localPmName(goal, 'title', language)}</span>
                        <b>{getTopGoalAchievement(goal.id)}%</b>
                        <div><span style={{ width: `${getTopGoalAchievement(goal.id)}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="pm-panel">
                  <div className="pm-panel-head">
                    <div>
                      <span>{txt(language, 'لوحات الوكالات', 'Deputy Dashboards')}</span>
                      <h2>{txt(language, 'تجميع الأداء', 'Aggregated Performance')}</h2>
                    </div>
                  </div>
                  <div className="pm-mini-list">
                    {deputyOffices.map((office) => (
                      <button type="button" key={office.id} onClick={() => { setSelectedDeputy(office.id); setActiveTab('goals'); }}>
                        <span>{localPmName(office, 'name', language)}</span>
                        <b>{getDeputyOfficeAchievement(office.id)}%</b>
                      </button>
                    ))}
                  </div>
                </article>

                <article className="pm-panel">
                  <div className="pm-panel-head">
                    <div>
                      <span>{txt(language, 'لوحات الأقسام', 'Department Dashboards')}</span>
                      <h2>{txt(language, 'الأداء حسب القسم', 'Performance by Department')}</h2>
                    </div>
                  </div>
                  <div className="pm-mini-list">
                    {filteredDepartments.map((department) => (
                      <button type="button" key={department.id} onClick={() => { setSelectedDepartment(department.id); setActiveTab('kpis'); }}>
                        <span>{localPmName(department, 'name', language)}</span>
                        <b>{getDepartmentAchievement(department.id)}%</b>
                      </button>
                    ))}
                  </div>
                </article>
              </section>
            )}

            {activeTab === 'goals' && (
              <section className="pm-panel">
                <div className="pm-panel-head">
                  <div>
                    <span>{txt(language, 'خريطة الأهداف والمواءمة', 'Goals Map & Alignment')}</span>
                    <h2>{txt(language, 'من الهدف الأعلى إلى المؤشر', 'Top Goal to KPI Flow')}</h2>
                  </div>
                  <div className="pm-inline-actions">
                    <ActionButton icon="ti-plus" onClick={() => runAction(txt(language, 'إنشاء هدف استراتيجي أعلى', 'Create Top-level Strategic Goal'))}>{txt(language, 'هدف أعلى', 'Top Goal')}</ActionButton>
                    <ActionButton icon="ti-link" onClick={() => runAction(txt(language, 'ربط الأهداف', 'Assign Goals'))}>{txt(language, 'ربط', 'Assign')}</ActionButton>
                  </div>
                </div>
                <div className="pm-goal-map">
                  {topGoals.map((topGoal) => (
                    <article className="pm-goal-card" key={topGoal.id}>
                      <header>
                        <span>{topGoal.number}</span>
                        <h3>{localPmName(topGoal, 'title', language)}</h3>
                        <b>{getTopGoalAchievement(topGoal.id)}%</b>
                      </header>
                      <div className="pm-row-actions">
                        {['View', 'Edit', 'Delete'].map((action) => <button type="button" key={action} onClick={() => runAction(action)}>{action}</button>)}
                      </div>
                      <div className="pm-linked-list">
                        {deputyGoals.filter((goal) => goal.topGoalId === topGoal.id).map((deputyGoal) => (
                          <div key={deputyGoal.id}>
                            <strong>{deputyGoal.number} - {localPmName(deputyGoal, 'title', language)}</strong>
                            <small>{getDeputyGoalAchievement(deputyGoal.id)}% · {subGoals.filter((goal) => goal.deputyGoalId === deputyGoal.id).length} {txt(language, 'أهداف فرعية', 'sub-goals')}</small>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="pm-three-columns">
                  <GoalList
                    title={txt(language, 'أهداف الوكالات', 'Deputy Goals')}
                    items={deputyGoals}
                    getValue={getDeputyGoalAchievement}
                    language={language}
                    runAction={runAction}
                  />
                  <GoalList
                    title={txt(language, 'الأهداف الفرعية', 'Sub-goals')}
                    items={visibleSubGoals}
                    getValue={(id) => getSubGoalAchievement(id)}
                    language={language}
                    runAction={runAction}
                  />
                  <article className="pm-warning-panel">
                    <i className="ti ti-alert-triangle" />
                    <h3>{txt(language, 'تنبيه الربط', 'Linkage Control')}</h3>
                    <p>{txt(
                      language,
                      'حسب قواعد العمل، يجب إنشاء الهدف الفرعي قبل إنشاء المؤشر، ويظهر تنبيه عند عدم ربط الهدف الفرعي بهدف وكالة أو هدف الوكالة بهدف أعلى.',
                      'Business rules require a sub-goal before KPI creation, and warn when sub-goals or deputy goals are not linked upward.'
                    )}</p>
                    <b>{summary.missingLinks} {txt(language, 'روابط تحتاج مراجعة', 'links need review')}</b>
                  </article>
                </div>
              </section>
            )}

            {activeTab === 'kpis' && (
              <section className="pm-panel">
                <div className="pm-panel-head">
                  <div>
                    <span>{txt(language, 'إدارة بيانات المؤشرات', 'KPI Data Management')}</span>
                    <h2>{txt(language, 'إنشاء / عرض / تعديل / حذف المؤشرات', 'Create / View / Update / Delete KPI Data')}</h2>
                  </div>
                  <div className="pm-inline-actions">
                    <ActionButton icon="ti-plus" tone="primary" onClick={() => runAction(txt(language, 'إنشاء بيانات مؤشر', 'Create KPI Data'))}>{txt(language, 'إضافة KPI', 'Add KPI')}</ActionButton>
                    <ActionButton icon="ti-file-export" onClick={() => setActiveTab('reports')}>{txt(language, 'تقرير الأداء', 'Performance Report')}</ActionButton>
                  </div>
                </div>
                <div className="pm-table-wrap">
                  <table className="pm-table">
                    <thead>
                      <tr>
                        <th>{txt(language, 'المؤشر', 'KPI')}</th>
                        <th>{txt(language, 'الهدف الفرعي', 'Sub-goal')}</th>
                        <th>{txt(language, 'المستهدف', 'Target')}</th>
                        <th>{txt(language, 'الفعلي', 'Actual')}</th>
                        <th>{txt(language, 'الإنجاز', 'Achievement')}</th>
                        <th>{txt(language, 'الشواهد', 'Evidence')}</th>
                        <th>{txt(language, 'إجراءات', 'Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleKpis.map((kpi) => {
                        const subGoal = subGoals.find((goal) => goal.id === kpi.subGoalId);
                        const evidenceCount = evidenceItems.filter((item) => item.kpiId === kpi.id).length;
                        const achievement = getKpiAchievement(kpi);
                        return (
                          <tr key={kpi.id}>
                            <td><strong>{localPmName(kpi, 'title', language)}</strong><small>{kpi.frequency} · {kpi.updatedAt}</small></td>
                            <td>{localPmName(subGoal, 'title', language)}</td>
                            <td>{kpi.target} {kpi.unit}</td>
                            <td>{kpi.actual} {kpi.unit}</td>
                            <td><StatusPill value={achievement} /><b>{achievement}%</b></td>
                            <td>{evidenceCount}</td>
                            <td>
                              <div className="pm-row-actions">
                                {['View', 'Edit', 'Delete'].map((action) => <button type="button" key={action} onClick={() => runAction(action)}>{action}</button>)}
                                <button type="button" onClick={() => { setActiveTab('evidence'); runAction(txt(language, 'إرفاق شاهد', 'Attach Evidence')); }}>+</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'evidence' && (
              <section className="pm-section-grid">
                <article className="pm-panel wide">
                  <div className="pm-panel-head">
                    <div>
                      <span>{txt(language, 'مستودع الشواهد', 'Evidence Repository')}</span>
                      <h2>{txt(language, 'إرفاق وعرض الشواهد حسب KPI والهدف', 'Attach and view evidence by KPI and goal')}</h2>
                    </div>
                    <ActionButton icon="ti-upload" tone="primary" onClick={() => runAction(txt(language, 'إرفاق شاهد', 'Attach Evidence'))}>{txt(language, 'رفع شاهد', 'Upload Evidence')}</ActionButton>
                  </div>
                  <div className="pm-evidence-grid">
                    {evidenceItems.map((item) => {
                      const kpi = kpiData.find((record) => record.id === item.kpiId);
                      const user = users.find((record) => record.id === item.uploadedBy);
                      return (
                        <article className={`pm-evidence-card ${item.isFailureRelated ? 'risk' : ''}`} key={item.id}>
                          <i className={`ti ${item.fileType === 'PDF' ? 'ti-file-type-pdf' : 'ti-file-description'}`} />
                          <div>
                            <h3>{localPmName(item, 'title', language)}</h3>
                            <p>{localPmName(kpi, 'title', language)}</p>
                            <span>{item.fileType} · {item.uploadedAt} · {user?.firstName} {user?.lastName}</span>
                          </div>
                          {item.isFailureRelated && <b>{item.failureType}</b>}
                          <div className="pm-row-actions">
                            <button type="button" onClick={() => runAction(txt(language, 'عرض شاهد', 'View Evidence'))}>View</button>
                            <button type="button">Download</button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </article>
              </section>
            )}

            {activeTab === 'reports' && (
              <section className="pm-panel">
                <div className="pm-panel-head">
                  <div>
                    <span>{txt(language, 'تقارير الأداء', 'Performance Reports')}</span>
                    <h2>{txt(language, 'تقارير مولدة حسب قواعد KPI RCJY', 'Generated reports based on KPI RCJY logic')}</h2>
                  </div>
                  <ActionButton icon="ti-report-analytics" tone="primary" onClick={() => runAction(txt(language, 'توليد تقرير الأداء', 'Generate Performance Report'))}>{txt(language, 'توليد تقرير', 'Generate Report')}</ActionButton>
                </div>
                <div className="pm-report-grid">
                  {performanceReports.map((report) => (
                    <article className="pm-report-card" key={report.id}>
                      <i className="ti ti-report" />
                      <div>
                        <h3>{localPmName(report, 'title', language)}</h3>
                        <p>{report.scope} · {report.generatedAt}</p>
                      </div>
                      <div className="pm-row-actions">
                        <button type="button" onClick={() => runAction(txt(language, 'توليد تقرير الأداء', 'Generate Performance Report'))}>Generate</button>
                        <button type="button">PDF</button>
                        <button type="button">Excel</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'admin' && (
              <section className="pm-section-grid">
                <article className="pm-panel wide">
                  <div className="pm-panel-head">
                    <div>
                      <span>{txt(language, 'إدارة المستخدمين والصلاحيات', 'User & Role Management')}</span>
                      <h2>{txt(language, 'حساب واحد لكل مستخدم وصلاحية واحدة إلزامية', 'One user account with exactly one assigned role')}</h2>
                    </div>
                    <div className="pm-inline-actions">
                      <ActionButton icon="ti-user-plus" tone="primary" onClick={() => runAction(txt(language, 'إنشاء حساب مستخدم', 'Create User Account'))}>{txt(language, 'مستخدم جديد', 'New User')}</ActionButton>
                      <ActionButton icon="ti-building-plus" onClick={() => runAction(txt(language, 'إضافة قسم جديد', 'Add new department'))}>{txt(language, 'قسم جديد', 'New Department')}</ActionButton>
                    </div>
                  </div>
                  <div className="pm-admin-grid">
                    <div className="pm-user-list">
                      {users.map((user) => {
                        const role = roles.find((item) => item.id === user.roleId);
                        return (
                          <article key={user.id}>
                            <strong>{language === 'ar' ? user.nameAr : `${user.firstName} ${user.lastName}`}</strong>
                            <span>{user.email}</span>
                            <b>{localPmName(role, 'name', language)}</b>
                            <div className="pm-row-actions">
                              {['View', 'Update', 'Delete'].map((action) => <button type="button" key={action} onClick={() => runAction(action)}>{action}</button>)}
                              <button type="button" onClick={() => runAction(txt(language, 'تعيين صلاحية', 'Assign Role'))}>Role</button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    <div className="pm-department-admin">
                      {pmDepartments.map((department) => (
                        <article key={department.id}>
                          <span>{localPmName(department, 'name', language)}</span>
                          <b>{getDepartmentAchievement(department.id)}%</b>
                          <button type="button" onClick={() => runAction(txt(language, 'حذف قسم', 'Delete Department'))}><i className="ti ti-trash" /></button>
                        </article>
                      ))}
                    </div>
                  </div>
                </article>
              </section>
            )}

            {activeTab === 'coverage' && (
              <section className="pm-panel">
                <div className="pm-panel-head">
                  <div>
                    <span>{txt(language, 'مراجعة التغطية', 'Coverage Audit')}</span>
                    <h2>{txt(language, 'كل حالات الاستخدام في الرسم مطبقة', 'All diagram use cases are applied')}</h2>
                  </div>
                  <b className="pm-coverage-badge">34/34</b>
                </div>
                <div className="pm-actor-grid">
                  {pmActors.map((actor) => (
                    <article key={actor.id}>
                      <i className={`ti ${actor.icon}`} />
                      <h3>{localPmName(actor, 'name', language)}</h3>
                      <p>{getUseCasesByActor(actor.id).length} {txt(language, 'حالة استخدام', 'use cases')}</p>
                      <div>
                        {getUseCasesByActor(actor.id).slice(0, 8).map((useCase) => <span key={useCase.id}>{localPmName(useCase, 'name', language)}</span>)}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="pm-usecase-table">
                  {pmUseCases.map((useCase) => (
                    <div key={useCase.id}>
                      <strong>{localPmName(useCase, 'name', language)}</strong>
                      <span>{useCase.module}</span>
                      <b>{useCase.status}</b>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </section>
      </div>
    </>
  );
}

function GoalList({ title, items, getValue, language, runAction }) {
  return (
    <article className="pm-compact-panel">
      <h3>{title}</h3>
      {items.map((goal) => {
        const value = getValue(goal.id);
        return (
          <div className="pm-compact-row" key={goal.id}>
            <div>
              <strong>{goal.number} - {localPmName(goal, 'title', language)}</strong>
              <small>{goal.dueDate}</small>
            </div>
            <b>{value}%</b>
            <div className="pm-row-actions">
              {['View', 'Edit', 'Delete'].map((action) => <button type="button" key={action} onClick={() => runAction(action)}>{action}</button>)}
            </div>
          </div>
        );
      })}
    </article>
  );
}

export default function HierarchyReportsPage({ mode = 'reports' }) {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState('all');
  const [departmentId, setDepartmentId] = useState('all');
  const [status, setStatus] = useState('all');
  const summary = getHierarchySummary();
  const isKpi = mode === 'kpis';

  const filteredDepartments = departments.filter((department) => collegeId === 'all' || department.collegeId === collegeId);
  const rows = useMemo(() => academicPrograms.filter((program) => {
    const matchesCollege = collegeId === 'all' || program.collegeId === collegeId;
    const matchesDepartment = departmentId === 'all' || program.departmentId === departmentId;
    const matchesStatus = status === 'all' || program.accreditationStatus === status;
    return matchesCollege && matchesDepartment && matchesStatus;
  }), [collegeId, departmentId, status]);

  if (isKpi) return <PerformanceKpiCenter />;

  return (
    <>
      <Topbar breadcrumbs={['Reports']} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType="report"
            onSelect={(type, id) => {
              if (type === 'college') setCollegeId(id);
              if (type === 'department') setDepartmentId(id);
              if (type === 'program') navigate(`/academic-accreditation/programs/${id}`);
            }}
          />
          <main className="hierarchy-main">
            <section className="hier-hero compact">
              <div>
                <span><i className="ti ti-report-analytics" /> {txt(language, 'مركز التقارير الهرمية', 'Hierarchical Reports Center')}</span>
                <h1>{txt(language, 'التقارير حسب الهيكل الأكاديمي', 'Reports by Academic Hierarchy')}</h1>
                <p>{txt(language, 'صف حسب الجامعة أو الكلية أو القسم أو البرنامج وحالة الاعتماد.', 'Filter by university, college, department, program, and accreditation status.')}</p>
              </div>
            </section>

            <HierarchyMetricGrid metrics={[
              { icon: 'ti-building-community', value: summary.colleges, label: txt(language, 'الكليات', 'Colleges') },
              { icon: 'ti-sitemap', value: summary.departments, label: txt(language, 'الأقسام', 'Departments') },
              { icon: 'ti-award', value: rows.length, label: txt(language, 'البرامج المعروضة', 'Shown Programs') },
              { icon: 'ti-report', value: rows.reduce((sum, program) => sum + program.evidenceCount, 0), label: txt(language, 'الأدلة', 'Evidence') },
            ]} />

            <section className="hier-panel">
              <div className="hier-panel-head">
                <div>
                  <h2>{txt(language, 'حافظة التقارير', 'Report Portfolio')}</h2>
                  <p>{txt(language, 'كل صف مرتبط بموقعه الحقيقي داخل الهيكل الأكاديمي.', 'Every row is linked to its real position in the academic hierarchy.')}</p>
                </div>
                <div className="hier-filters">
                  <select value={collegeId} onChange={(event) => { setCollegeId(event.target.value); setDepartmentId('all'); }}>
                    <option value="all">{txt(language, 'كل الكليات', 'All Colleges')}</option>
                    {colleges.map((college) => <option key={college.id} value={college.id}>{localName(college, 'name', language)}</option>)}
                  </select>
                  <select value={departmentId} onChange={(event) => setDepartmentId(event.target.value)}>
                    <option value="all">{txt(language, 'كل الأقسام', 'All Departments')}</option>
                    {filteredDepartments.map((department) => <option key={department.id} value={department.id}>{localName(department, 'name', language)}</option>)}
                  </select>
                  <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="all">{txt(language, 'كل الحالات', 'All Statuses')}</option>
                    <option>Accredited</option>
                    <option>Under Review</option>
                    <option>Conditional</option>
                    <option>In Progress</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

              <div className="hier-report-grid">
                {rows.map((program) => {
                  const college = colleges.find((item) => item.id === program.collegeId);
                  const department = departments.find((item) => item.id === program.departmentId);
                  return (
                    <article className="hier-report-card" key={program.id}>
                      <div>
                        <span>{localName(college, 'name', language)} / {localName(department, 'name', language)}</span>
                        <h3>{program.code} Accreditation Report</h3>
                        <p>{localName(program, 'name', language)} · {program.accreditationBody}</p>
                      </div>
                      <StatusChip status={program.accreditationStatus} />
                      <HierProgress value={program.readiness} label="Readiness" />
                      <div className="report-actions">
                        <button type="button" onClick={() => navigate(`/academic-accreditation/programs/${program.id}`)}><i className="ti ti-eye" /> View</button>
                        <button type="button"><i className="ti ti-file-type-pdf" /> PDF</button>
                        <button type="button"><i className="ti ti-file-spreadsheet" /> Excel</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
