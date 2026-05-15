import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import {
  AcademicBreadcrumbs,
  AcademicTree,
  FloatingDetailsPanel,
  HierProgress,
  HierarchyMetricGrid,
  ProgressRing,
  StatusChip,
  localName,
} from '../components/AcademicHierarchy';
import {
  academicPrograms,
  accreditationOperationalItems,
  colleges,
  departments,
  getProgramAccreditationItems,
} from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

const tabs = [
  'Overview',
  'Accreditation Requirements',
  'Self Study',
  'Standards & Criteria',
  'Evidence Repository',
  'Evaluations & Readiness',
  'Reviews & Visits',
  'Recommendations',
  'Conditions',
  'Annual Reports',
  'KPIs',
  'Risks',
  'Tasks',
  'Improvement Plans',
  'Documents',
  'Activity Log',
];

function DetailList({ items, type, onOpen, emptyLabel }) {
  if (!items.length) {
    return <div className="empty-state compact">{emptyLabel}</div>;
  }

  return (
    <div className="hier-list">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="hier-list-row"
          onClick={() => onOpen({ ...item, type, title: item.title || item.name })}
        >
          <i className="ti ti-point" />
          <div>
            <strong>{item.title || item.name}</strong>
            <span>{item.owner || item.ownerId || item.status || item.dueDate || item.due || item.date || item.updated}</span>
          </div>
          <StatusChip status={item.status || item.level || 'In Progress'} />
        </button>
      ))}
    </div>
  );
}

export default function ProgramAccreditationDetailsPage() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState('Overview');
  const [panelItem, setPanelItem] = useState(null);

  const program = academicPrograms.find((item) => item.id === programId);
  const college = program ? colleges.find((item) => item.id === program.collegeId) : null;
  const department = program ? departments.find((item) => item.id === program.departmentId) : null;
  const items = program ? getProgramAccreditationItems(program.id) : null;

  if (!program || !college || !department || !items) {
    return (
      <>
        <Topbar breadcrumbs={[language === 'ar' ? 'إدارة الاعتماد الأكاديمي' : 'Academic Accreditation Management', language === 'ar' ? 'غير موجود' : 'Not found']} />
        <div className="page-content"><p>{language === 'ar' ? 'البرنامج غير موجود.' : 'Program not found.'}</p></div>
      </>
    );
  }

  const missingEvidence = items.requirements.filter((item) => item.status === 'Missing').length
    + accreditationOperationalItems.evidence.filter((item) => item.programId === program.id && item.status === 'Missing').length;

  const metrics = [
    { icon: 'ti-checklist', value: items.requirements.length, label: language === 'ar' ? 'متطلبات الاعتماد' : 'Requirements' },
    { icon: 'ti-file-certificate', value: items.standards.length, label: language === 'ar' ? 'المعايير' : 'Standards' },
    { icon: 'ti-folder-check', value: program.evidenceCount, label: language === 'ar' ? 'الشواهد' : 'Evidence' },
    { icon: 'ti-calendar-event', value: items.visits.length, label: language === 'ar' ? 'الزيارات' : 'Visits' },
    { icon: 'ti-message-report', value: items.recommendations.length, label: language === 'ar' ? 'التوصيات' : 'Recommendations' },
    { icon: 'ti-alert-triangle', value: items.risks.length, label: language === 'ar' ? 'المخاطر' : 'Risks' },
    { icon: 'ti-list-check', value: items.tasks.length, label: language === 'ar' ? 'المهام' : 'Tasks' },
    { icon: 'ti-folder-question', value: missingEvidence, label: language === 'ar' ? 'أدلة ناقصة' : 'Missing Evidence' },
  ];

  const renderOperations = () => (
    <div className="program-accreditation-actions">
      {['Add', 'View', 'Edit', 'Delete', 'Upload Evidence', 'Submit for Review'].map((action) => (
        <button key={action} type="button"><i className="ti ti-plus" /> {action}</button>
      ))}
    </div>
  );

  const renderTab = () => {
    const emptyLabel = language === 'ar' ? 'لا توجد عناصر مرتبطة بهذا البرنامج.' : 'No linked items for this program.';

    if (activeTab === 'Accreditation Requirements') {
      return (
        <>
          {renderOperations()}
          <div className="standards-grid">
            {items.requirements.map((requirement) => (
              <article className="standard-card" key={requirement.id}>
                <span>{requirement.owner} · {requirement.dueDate}</span>
                <h3>{requirement.title}</h3>
                <p>{requirement.description}</p>
                <StatusChip status={requirement.status} />
                <HierProgress value={requirement.progress} label={language === 'ar' ? 'الإنجاز' : 'Progress'} />
                <button type="button" onClick={() => setPanelItem({ ...requirement, type: 'Requirement' })}>
                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  <i className="ti ti-arrow-right" />
                </button>
              </article>
            ))}
          </div>
        </>
      );
    }

    if (activeTab === 'Self Study') {
      return (
        <div className="overview-grid">
          <div className="overview-main-panel">
            <AcademicBreadcrumbs items={[localName(college, 'name', language), localName(department, 'name', language), localName(program, 'name', language), 'Self Study']} />
            <p>{language === 'ar' ? 'هيكل الدراسة الذاتية مبني على المعيار والمحك والسرد والشواهد وتقييم المراجع.' : 'Self-study structure by standard, criterion, narrative, evidence, evaluation, and reviewer notes.'}</p>
            <div className="standards-grid compact">
              {items.criteria.map((criterion) => (
                <article className="standard-card" key={criterion.id}>
                  <span>{criterion.status}</span>
                  <h3>{criterion.title}</h3>
                  <p>{criterion.description}</p>
                  <HierProgress value={criterion.evaluationScore} label={language === 'ar' ? 'تقييم الجاهزية' : 'Readiness Evaluation'} />
                </article>
              ))}
            </div>
          </div>
          <div className="status-visual-panel">
            <ProgressRing value={program.readiness} label={language === 'ar' ? 'جاهزية البرنامج' : 'Program Readiness'} />
            <StatusChip status={program.accreditationStatus} />
          </div>
        </div>
      );
    }

    if (activeTab === 'Standards & Criteria') {
      return (
        <div className="standards-grid">
          {items.standards.map((standard) => (
            <article className="standard-card" key={standard.id}>
              <span>{standard.code}</span>
              <h3>{standard.title}</h3>
              <HierProgress value={standard.completion} label={language === 'ar' ? 'اكتمال المعيار' : 'Standard Completion'} />
              {standard.criteria?.map((criterion) => <p key={criterion.id}>{criterion.code} · {criterion.title}</p>)}
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === 'Evidence Repository' || activeTab === 'Documents') {
      return <DetailList items={items.evidence} type="Evidence" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'Reviews & Visits') {
      return <DetailList items={items.visits} type="Visit" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'Recommendations' || activeTab === 'Conditions') {
      return <DetailList items={items.recommendations} type={activeTab} onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'Risks') {
      return <DetailList items={items.risks} type="Risk" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'Tasks') {
      return (
        <>
          <div className="program-accreditation-actions">
            {['List', 'Kanban', 'Timeline', 'Gantt'].map((view) => <button key={view} type="button"><i className="ti ti-layout-board" /> {view}</button>)}
          </div>
          <DetailList items={[...items.milestones, ...items.tasks]} type="Task" onOpen={setPanelItem} emptyLabel={emptyLabel} />
        </>
      );
    }

    if (activeTab === 'Improvement Plans') {
      return <DetailList items={items.improvementPlans} type="Improvement Plan" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'Annual Reports') {
      return <DetailList items={[{ id: 'annual-1', title: `${program.code} Annual Accreditation Report`, status: 'Draft', owner: program.coordinator, dueDate: '2026-09-30' }]} type="Annual Report" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    if (activeTab === 'KPIs' || activeTab === 'Evaluations & Readiness') {
      return (
        <div className="hier-table">
          <div className="hier-table-row">
            <strong>{language === 'ar' ? 'جاهزية الاعتماد' : 'Accreditation Readiness'}</strong>
            <span>{program.accreditationStatus}</span>
            <HierProgress value={program.readiness} label={program.code} />
          </div>
          <div className="hier-table-row">
            <strong>{language === 'ar' ? 'تحقق المؤشرات' : 'KPI Achievement'}</strong>
            <span>{program.accreditationBody}</span>
            <HierProgress value={program.kpiAchievement} label="KPI" />
          </div>
        </div>
      );
    }

    if (activeTab === 'Activity Log') {
      return <DetailList items={[
        { id: 'log-1', title: 'Readiness recalculated from requirements and evidence', status: 'Updated', owner: 'System', dueDate: '2026-05-15' },
        { id: 'log-2', title: 'Reviewer notes synchronized with self-study', status: 'Under Review', owner: 'Quality Reviewer', dueDate: '2026-05-14' },
        ...items.tasks,
      ]} type="Activity" onOpen={setPanelItem} emptyLabel={emptyLabel} />;
    }

    return (
      <div className="overview-grid">
        <div className="overview-main-panel">
          <AcademicBreadcrumbs items={[
            language === 'ar' ? 'جامعة الطائف' : 'Taif University',
            localName(college, 'name', language),
            localName(department, 'name', language),
            localName(program, 'name', language),
          ]} />
          <p>{language === 'ar' ? 'تعرض هذه الصفحة دورة اعتماد البرنامج كاملة من المتطلبات والدراسة الذاتية إلى الشواهد والزيارات والتوصيات وخطط التحسين.' : 'This page manages the full program accreditation cycle from requirements and self-study to evidence, visits, recommendations, and improvement plans.'}</p>
          <div className="drill-card-grid">
            {items.requirements.slice(0, 3).map((requirement) => (
              <button type="button" className="drill-card" key={requirement.id} onClick={() => setPanelItem({ ...requirement, type: 'Requirement' })}>
                <span>{requirement.title}</span>
                <strong>{requirement.progress}%</strong>
                <em>{requirement.status}</em>
              </button>
            ))}
          </div>
        </div>
        <div className="status-visual-panel">
          <ProgressRing value={program.readiness} label={language === 'ar' ? 'جاهزية الاعتماد' : 'Accreditation Readiness'} />
          <StatusChip status={program.accreditationStatus} />
          <HierProgress value={program.kpiAchievement} label={language === 'ar' ? 'تحقق المؤشرات' : 'KPI Achievement'} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Topbar breadcrumbs={[language === 'ar' ? 'إدارة الاعتماد الأكاديمي' : 'Academic Accreditation Management', program.code]} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType="program"
            activeId={program.id}
            onSelect={(type, id) => {
              if (type === 'college') navigate(`/academic-accreditation/colleges/${id}`);
              if (type === 'department') navigate(`/academic-accreditation/colleges/${college.id}/departments/${id}`);
              if (type === 'program') navigate(`/academic-accreditation/programs/${id}`);
            }}
          />
          <main className="hierarchy-main">
            <section className="detail-header">
              <div>
                <AcademicBreadcrumbs items={[localName(college, 'name', language), localName(department, 'name', language)]} />
                <h1>{localName(program, 'name', language)}</h1>
                <p>{program.code} · {program.degree} · {program.accreditationBody} · {program.coordinator}</p>
                <p>{program.accreditationStartDate} - {program.accreditationEndDate} · {language === 'ar' ? 'الزيارة القادمة' : 'Next visit'} {program.nextVisit}</p>
              </div>
              <div className="detail-header-side">
                <StatusChip status={program.accreditationStatus} />
                <ProgressRing value={program.readiness} label={language === 'ar' ? 'الجاهزية' : 'Readiness'} />
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
