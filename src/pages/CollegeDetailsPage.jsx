import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import {
  AcademicBreadcrumbs,
  AcademicTree,
  FloatingDetailsPanel,
  HierProgress,
  HierarchyMetricGrid,
  OrganizationMap,
  ProgramHierarchyCard,
  ProgressRing,
  StatusChip,
  localName,
} from '../components/AcademicHierarchy';
import {
  academicPrograms,
  accreditationOperationalItems,
  colleges,
  getCollegeDepartments,
  getCollegePrograms,
  getProgramStandards,
} from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

const tabs = [
  'Overview',
  'Departments',
  'Programs',
  'Accreditation',
  'KPIs',
  'Risks',
  'Reports',
  'Evidence',
  'Improvement Plans',
  'Activity Log',
];

function filterByCollege(collection, collegeId) {
  return collection.filter((item) => item.collegeId === collegeId);
}

export default function CollegeDetailsPage() {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState('Overview');
  const [panelItem, setPanelItem] = useState(null);
  const college = colleges.find((item) => item.id === collegeId);

  const departments = useMemo(() => getCollegeDepartments(collegeId), [collegeId]);
  const programs = useMemo(() => getCollegePrograms(collegeId), [collegeId]);
  const evidence = filterByCollege(accreditationOperationalItems.evidence, collegeId);
  const risks = filterByCollege(accreditationOperationalItems.risks, collegeId);
  const recommendations = filterByCollege(accreditationOperationalItems.recommendations, collegeId);
  const visits = filterByCollege(accreditationOperationalItems.visits, collegeId);
  const tasks = filterByCollege(accreditationOperationalItems.tasks, collegeId);
  const improvementPlans = filterByCollege(accreditationOperationalItems.improvementPlans, collegeId);

  if (!college) {
    return (
      <>
        <Topbar breadcrumbs={[language === 'ar' ? 'الكليات' : 'Colleges', language === 'ar' ? 'غير موجود' : 'Not found']} />
        <div className="page-content"><p>{language === 'ar' ? 'الكلية غير موجودة.' : 'College not found.'}</p></div>
      </>
    );
  }

  const metrics = [
    { icon: 'ti-award', value: programs.length, label: language === 'ar' ? 'البرامج' : 'Programs' },
    { icon: 'ti-file-stack', value: college.reports, label: language === 'ar' ? 'التقارير' : 'Reports' },
    { icon: 'ti-folder-check', value: college.evidence, label: language === 'ar' ? 'الأدلة' : 'Evidence' },
    { icon: 'ti-message-report', value: recommendations.length || college.recommendations, label: language === 'ar' ? 'التوصيات' : 'Recommendations' },
    { icon: 'ti-alert-triangle', value: risks.length || college.risks, label: language === 'ar' ? 'المخاطر' : 'Risks' },
  ];

  const renderOperationalList = (items, type) => (
    <div className="hier-list">
      {items.map((item) => (
        <button
          type="button"
          className="hier-list-row"
          key={item.id}
          onClick={() => setPanelItem({ ...item, type, title: item.title || item.name })}
        >
          <i className="ti ti-point" />
          <div>
            <strong>{item.title || item.name}</strong>
            <span>{item.owner || item.updated || item.due || item.date}</span>
          </div>
          <StatusChip status={item.status || item.level || 'In Progress'} />
        </button>
      ))}
      {!items.length && <div className="empty-state compact">{language === 'ar' ? 'لا توجد عناصر في هذا المستوى.' : 'No items at this level.'}</div>}
    </div>
  );

  const renderTab = () => {
    if (activeTab === 'Departments') {
      return (
        <div className="department-grid">
          {departments.map((department) => (
            <article className="department-card" key={department.id}>
              <div>
                <span>{language === 'ar' ? 'قسم' : 'Department'}</span>
                <h3>{localName(department, 'name', language)}</h3>
                <p>{department.head}</p>
              </div>
              <StatusChip status={department.accreditationStatus} />
              <HierProgress value={department.readiness} label={language === 'ar' ? 'الجاهزية' : 'Readiness'} />
              <div className="department-meta">
                <span>{department.programsCount} {language === 'ar' ? 'برامج' : 'Programs'}</span>
                <span>{department.recommendations} {language === 'ar' ? 'توصيات' : 'Recommendations'}</span>
                <span>{department.openTasks} {language === 'ar' ? 'مهام مفتوحة' : 'Open Tasks'}</span>
              </div>
              <button type="button" onClick={() => navigate(`/colleges/${college.id}/departments/${department.id}`)}>
                {language === 'ar' ? 'فتح القسم' : 'Open Department'}
                <i className="ti ti-arrow-right" />
              </button>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'Programs') {
      return <div className="program-h-grid">{programs.map((program) => <ProgramHierarchyCard key={program.id} program={program} />)}</div>;
    }

    if (activeTab === 'Accreditation') {
      return (
        <div className="standards-grid">
          {programs.map((program) => (
            <article className="standard-card" key={program.id}>
              <div>
                <span>{program.code}</span>
                <h3>{localName(program, 'name', language)}</h3>
              </div>
              <StatusChip status={program.accreditationStatus} />
              {getProgramStandards(program.id).slice(0, 3).map((standard) => (
                <HierProgress key={standard.id} value={standard.completion} label={`${standard.code} ${standard.title}`} />
              ))}
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'KPIs') {
      return (
        <div className="hier-table">
          {programs.map((program) => (
            <div className="hier-table-row" key={program.id}>
              <strong>{localName(program, 'name', language)}</strong>
              <span>{language === 'ar' ? 'تحقق المؤشرات' : 'KPI Achievement'}</span>
              <HierProgress value={program.kpiAchievement} label={program.code} />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'Risks') return renderOperationalList(risks, 'Risk');
    if (activeTab === 'Evidence') return renderOperationalList(evidence, 'Evidence');
    if (activeTab === 'Improvement Plans') return renderOperationalList(improvementPlans, 'Improvement Plan');

    if (activeTab === 'Reports') {
      const reports = programs.map((program) => ({
        id: `rep-${program.id}`,
        title: `${program.code} accreditation readiness report`,
        status: program.accreditationStatus,
        owner: program.accreditationBody,
      }));
      return renderOperationalList(reports, 'Report');
    }

    if (activeTab === 'Activity Log') {
      return renderOperationalList([
        { id: 'act-1', title: 'College readiness recalculated', status: 'Updated', owner: college.owner, due: college.lastUpdate },
        { id: 'act-2', title: 'Evidence packages reviewed', status: 'Under Review', owner: 'Quality Unit', due: '2026-05-14' },
        ...tasks.slice(0, 2),
        ...visits.slice(0, 1),
      ], 'Activity');
    }

    return (
      <div className="overview-grid">
        <div className="overview-main-panel">
          <AcademicBreadcrumbs items={[language === 'ar' ? 'الجامعة' : 'University', localName(college, 'name', language)]} />
          <p>{language === 'ar' ? 'تجميع مباشر لحالة الاعتماد والجاهزية من الأقسام والبرامج والمخاطر والأدلة.' : 'A live rollup of accreditation readiness from departments, programs, risks, and evidence.'}</p>
          <div className="drill-card-grid">
            {departments.map((department) => (
              <button type="button" className="drill-card" key={department.id} onClick={() => navigate(`/colleges/${college.id}/departments/${department.id}`)}>
                <span>{localName(department, 'name', language)}</span>
                <strong>{department.readiness}%</strong>
                <em>{department.programsCount} {language === 'ar' ? 'برامج' : 'Programs'}</em>
              </button>
            ))}
          </div>
        </div>
        <OrganizationMap compact />
      </div>
    );
  };

  return (
    <>
      <Topbar breadcrumbs={[language === 'ar' ? 'الكليات' : 'Colleges', college.code]} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType="college"
            activeId={college.id}
            onSelect={(type, id) => {
              if (type === 'college') navigate(`/colleges/${id}`);
              if (type === 'department') navigate(`/colleges/${academicPrograms.find((program) => program.departmentId === id)?.collegeId || college.id}/departments/${id}`);
              if (type === 'program') navigate(`/programs/${id}`);
            }}
          />
          <main className="hierarchy-main">
            <section className="detail-header">
              <div>
                <AcademicBreadcrumbs items={[language === 'ar' ? 'الجامعة' : 'University', localName(college, 'name', language)]} />
                <h1>{localName(college, 'name', language)}</h1>
                <p>{college.dean} · {college.owner}</p>
              </div>
              <div className="detail-header-side">
                <StatusChip status={college.accreditationStatus} />
                <ProgressRing value={college.readiness} label={language === 'ar' ? 'الجاهزية' : 'Readiness'} />
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
