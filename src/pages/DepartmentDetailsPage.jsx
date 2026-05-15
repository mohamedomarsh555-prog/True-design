import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import {
  AcademicBreadcrumbs,
  AcademicTree,
  FloatingDetailsPanel,
  HierProgress,
  HierarchyMetricGrid,
  ProgramHierarchyCard,
  ProgressRing,
  StatusChip,
  localName,
} from '../components/AcademicHierarchy';
import {
  accreditationOperationalItems,
  colleges,
  departments,
  getDepartmentPrograms,
  getProgramStandards,
} from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

const tabs = ['Overview', 'Programs', 'Accreditation Progress', 'Evidence', 'Risks', 'Recommendations', 'Tasks', 'Visits', 'Activity Log'];

function filterByDepartment(collection, departmentId) {
  return collection.filter((item) => item.departmentId === departmentId);
}

export default function DepartmentDetailsPage() {
  const { collegeId, departmentId } = useParams();
  const navigate = useNavigate();
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState('Overview');
  const [panelItem, setPanelItem] = useState(null);
  const college = colleges.find((item) => item.id === collegeId);
  const department = departments.find((item) => item.id === departmentId);
  const programs = useMemo(() => getDepartmentPrograms(departmentId), [departmentId]);

  if (!college || !department) {
    return (
      <>
        <Topbar breadcrumbs={[language === 'ar' ? 'الأقسام' : 'Departments', language === 'ar' ? 'غير موجود' : 'Not found']} />
        <div className="page-content"><p>{language === 'ar' ? 'القسم غير موجود.' : 'Department not found.'}</p></div>
      </>
    );
  }

  const evidence = filterByDepartment(accreditationOperationalItems.evidence, department.id);
  const risks = filterByDepartment(accreditationOperationalItems.risks, department.id);
  const recommendations = filterByDepartment(accreditationOperationalItems.recommendations, department.id);
  const tasks = filterByDepartment(accreditationOperationalItems.tasks, department.id);
  const visits = filterByDepartment(accreditationOperationalItems.visits, department.id);

  const metrics = [
    { icon: 'ti-award', value: programs.length, label: language === 'ar' ? 'البرامج' : 'Programs' },
    { icon: 'ti-folder-check', value: programs.reduce((sum, program) => sum + program.evidenceCount, 0), label: language === 'ar' ? 'الأدلة' : 'Evidence' },
    { icon: 'ti-checklist', value: programs.reduce((sum, program) => sum + program.standardsCompleted, 0), label: language === 'ar' ? 'معايير مكتملة' : 'Standards Done' },
    { icon: 'ti-alert-triangle', value: risks.length || department.risks, label: language === 'ar' ? 'المخاطر' : 'Risks' },
    { icon: 'ti-list-check', value: department.openTasks, label: language === 'ar' ? 'مهام مفتوحة' : 'Open Tasks' },
  ];

  const renderList = (items, type) => (
    <div className="hier-list">
      {items.map((item) => (
        <button key={item.id} type="button" className="hier-list-row" onClick={() => setPanelItem({ ...item, type, title: item.title || item.name })}>
          <i className="ti ti-point" />
          <div>
            <strong>{item.title || item.name}</strong>
            <span>{item.owner || item.updated || item.due || item.date}</span>
          </div>
          <StatusChip status={item.status || item.level || 'In Progress'} />
        </button>
      ))}
      {!items.length && <div className="empty-state compact">{language === 'ar' ? 'لا توجد عناصر مرتبطة بالقسم.' : 'No department-linked items.'}</div>}
    </div>
  );

  const renderTab = () => {
    if (activeTab === 'Programs') return <div className="program-h-grid">{programs.map((program) => <ProgramHierarchyCard key={program.id} program={program} />)}</div>;
    if (activeTab === 'Evidence') return renderList(evidence, 'Evidence');
    if (activeTab === 'Risks') return renderList(risks, 'Risk');
    if (activeTab === 'Recommendations') return renderList(recommendations, 'Recommendation');
    if (activeTab === 'Tasks') return renderList(tasks, 'Task');
    if (activeTab === 'Visits') return renderList(visits, 'Visit');
    if (activeTab === 'Activity Log') {
      return renderList([
        { id: 'd-act-1', title: 'Department progress recalculated from program readiness', status: 'Updated', owner: department.head, due: '2026-05-15' },
        ...tasks,
      ], 'Activity');
    }
    if (activeTab === 'Accreditation Progress') {
      return (
        <div className="standards-grid">
          {programs.flatMap((program) => getProgramStandards(program.id).map((standard) => (
            <article className="standard-card" key={`${program.id}-${standard.id}`}>
              <span>{program.code} · {standard.code}</span>
              <h3>{standard.title}</h3>
              <HierProgress value={standard.completion} label={language === 'ar' ? 'الاكتمال' : 'Completion'} />
              <button type="button" onClick={() => navigate(`/academic-accreditation/programs/${program.id}`)}>
                {language === 'ar' ? 'فتح البرنامج' : 'Open Program'}
                <i className="ti ti-arrow-right" />
              </button>
            </article>
          )))}
        </div>
      );
    }

    return (
      <div className="overview-grid">
        <div className="overview-main-panel">
          <AcademicBreadcrumbs items={[language === 'ar' ? 'الجامعة' : 'University', localName(college, 'name', language), localName(department, 'name', language)]} />
          <p>{language === 'ar' ? 'يعرض هذا المستوى البرامج والمعايير والأدلة والمهام المتراكمة داخل القسم.' : 'This level shows programs, standards, evidence, and operational workload inside the department.'}</p>
          <div className="drill-card-grid">
            {programs.map((program) => (
              <button type="button" className="drill-card" key={program.id} onClick={() => navigate(`/academic-accreditation/programs/${program.id}`)}>
                <span>{localName(program, 'name', language)}</span>
                <strong>{program.readiness}%</strong>
                <em>{program.accreditationStatus}</em>
              </button>
            ))}
          </div>
        </div>
        <div className="status-visual-panel">
          <ProgressRing value={department.readiness} label={language === 'ar' ? 'جاهزية القسم' : 'Department Readiness'} />
          <StatusChip status={department.accreditationStatus} />
          <HierProgress value={Math.round(programs.reduce((sum, program) => sum + program.kpiAchievement, 0) / Math.max(programs.length, 1))} label={language === 'ar' ? 'تحقق المؤشرات' : 'KPI Achievement'} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Topbar breadcrumbs={[language === 'ar' ? 'إدارة الاعتماد الأكاديمي' : 'Academic Accreditation Management', college.code, localName(department, 'name', language)]} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType="department"
            activeId={department.id}
            onSelect={(type, id) => {
              if (type === 'college') navigate(`/academic-accreditation/colleges/${id}`);
              if (type === 'department') navigate(`/academic-accreditation/colleges/${college.id}/departments/${id}`);
              if (type === 'program') navigate(`/academic-accreditation/programs/${id}`);
            }}
          />
          <main className="hierarchy-main">
            <section className="detail-header">
              <div>
                <AcademicBreadcrumbs items={[language === 'ar' ? 'الجامعة' : 'University', localName(college, 'name', language), localName(department, 'name', language)]} />
                <h1>{localName(department, 'name', language)}</h1>
                <p>{department.head}</p>
              </div>
              <div className="detail-header-side">
                <StatusChip status={department.accreditationStatus} />
                <ProgressRing value={department.readiness} label={language === 'ar' ? 'الجاهزية' : 'Readiness'} />
              </div>
            </section>

            <HierarchyMetricGrid metrics={metrics} />

            <section className="hier-panel sticky-tabs-panel">
              <div className="nested-tabs">
                {tabs.map((tab) => (
                  <button key={tab} type="button" className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="tab-body">{renderTab()}</div>
            </section>
          </main>
        </div>
        <FloatingDetailsPanel item={panelItem} onClose={() => setPanelItem(null)} />
      </div>
    </>
  );
}
