import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { courses } from '../data';
import { getCourseSpecification } from '../data/courseSpecificationData';
import { useI18n } from '../i18n';

const workflowSteps = [
  { label: 'Coordinator', icon: 'ti-user-check' },
  { label: 'Quality', icon: 'ti-shield-check' },
  { label: 'Supervisor', icon: 'ti-user-star' },
  { label: 'Approved', icon: 'ti-rosette-discount-check' },
];

const sections = [
  { id: 'information', label: 'Information', icon: 'ti-info-circle' },
  { id: 'identification', label: 'Identification', icon: 'ti-id' },
  { id: 'outcomes', label: 'Outcomes', icon: 'ti-target-arrow' },
  { id: 'contents', label: 'Contents', icon: 'ti-list-details' },
  { id: 'assessment', label: 'Assessment', icon: 'ti-clipboard-check' },
  { id: 'resources', label: 'Resources', icon: 'ti-books' },
  { id: 'evaluation', label: 'Evaluation', icon: 'ti-chart-dots' },
];

function sumBy(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function SpecWorkflow() {
  return (
    <div className="spec-workflow panel">
      {workflowSteps.map((step, index) => (
        <div className="spec-workflow-step" key={step.label}>
          <div className="spec-workflow-icon">
            <i className={`ti ${step.icon}`} />
          </div>
          <span>{step.label}</span>
          {index < workflowSteps.length - 1 && <i className="spec-workflow-line" />}
        </div>
      ))}
    </div>
  );
}

function SpecTabs({ activeTab, setActiveTab }) {
  return (
    <div className="spec-tabs" role="tablist" aria-label="Course specification tabs">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'program'}
        className={activeTab === 'program' ? 'active' : ''}
        onClick={() => setActiveTab('program')}
      >
        Program Information
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'approvals'}
        className={activeTab === 'approvals' ? 'active' : ''}
        onClick={() => setActiveTab('approvals')}
      >
        Approvals History
      </button>
    </div>
  );
}

function SpecSideNav({ activeSection, setActiveSection }) {
  return (
    <aside className="spec-side-nav" aria-label="Course specification sections">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <button
            type="button"
            key={section.id}
            className={isActive ? 'active' : ''}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="spec-step-dot">
              {isActive ? index + 1 : <i className="ti ti-check" />}
            </span>
            <span>{section.label}</span>
          </button>
        );
      })}
    </aside>
  );
}

function InfoCard({ tone = 'green', icon, label, children }) {
  return (
    <article className={`spec-info-card ${tone}`}>
      <div className="spec-info-icon">
        <i className={`ti ${icon}`} />
      </div>
      <h3>{label}</h3>
      <div>{children}</div>
    </article>
  );
}

function SectionShell({ title, children }) {
  return (
    <section className="spec-section-card">
      <div className="spec-section-head">
        <h3>{title}</h3>
        <i className="ti ti-chevron-up" />
      </div>
      <div className="spec-section-body">{children}</div>
    </section>
  );
}

function SpecTable({ columns, rows, footer }) {
  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
          {footer && (
            <tr className="spec-table-total">
              {footer.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function InformationSection({ specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Information</h2>
      <div className="spec-info-grid">
        <InfoCard icon="ti-notebook" label="Course Title">
          <p>{specification.title}</p>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-code" label="Course Code">
          <p>{specification.code}</p>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-building-bank" label="College">
          <ul><li>{specification.college}</li></ul>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-building-community" label="Department">
          <ul><li>{specification.department}</li></ul>
        </InfoCard>
        <InfoCard icon="ti-home-cog" label="Institution">
          <p>{specification.institution}</p>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-versions" label="Version">
          <div className="spec-readonly-input">{specification.version}</div>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-calendar-stats" label="Last Revision Date">
          <div className="spec-readonly-input">{specification.lastRevisionDate}</div>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-book-2" label="Program">
          <ul>{specification.programs.map((program) => <li key={program}>{program}</li>)}</ul>
        </InfoCard>
      </div>
    </div>
  );
}

function IdentificationSection({ specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Identification</h2>
      <SectionShell title="Course Identification">
        <div className="spec-field-list">
          <div><strong>Credit Hours</strong><span>{specification.creditHours}</span></div>
          <div>
            <strong>Course Type</strong>
            <span>{specification.courseType.scope} / {specification.courseType.delivery}</span>
          </div>
          <div>
            <strong>Level/Year at which this course is offered</strong>
            <ul>{specification.offeredLevels.map((level) => <li key={level}>{level}</li>)}</ul>
          </div>
          <div><strong>Course General Description</strong><textarea readOnly value={specification.description} /></div>
          <div><strong>Course Main Objectives</strong><textarea readOnly value={specification.objectives} /></div>
          <div><strong>Prerequisites for this course</strong><ul>{specification.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><strong>Co-requisites for this course</strong><ul>{specification.coRequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </SectionShell>

      <SectionShell title="Teaching Mode">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'mode', label: 'Teaching Mode' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'percentage', label: 'Percentage %' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.teachingModes.map((item, index) => ({
            ...item,
            index: index + 1,
            percentage: `${item.percentage}%`,
            action: '',
          }))}
          footer={['', 'Total Contact Hours', sumBy(specification.teachingModes, 'contactHours'), '100%', '']}
        />
      </SectionShell>

      <SectionShell title="Contact Hours">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'activity', label: 'Activity' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.contactHours.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          footer={['', 'Total Contact Hours', sumBy(specification.contactHours, 'contactHours'), '']}
        />
      </SectionShell>
    </div>
  );
}

function OutcomesSection({ specification }) {
  const groups = [
    ['Knowledge and Understanding', specification.outcomes.knowledge],
    ['Skills', specification.outcomes.skills],
    ['Values, Autonomy and Responsibility', specification.outcomes.values],
  ];

  return (
    <div>
      <h2 className="spec-section-title">Course Learning Outcomes (CLOs)</h2>
      {groups.map(([title, rows]) => (
        <SectionShell title={title} key={title}>
          <SpecTable
            columns={[
              { key: 'index', label: '#' },
              { key: 'clo', label: 'Course Learning Outcomes (CLOs)' },
              { key: 'plo', label: 'Program Learning Outcomes (PLOs)' },
              { key: 'strategy', label: 'Teaching Strategies' },
              { key: 'assessment', label: 'Assessment Methods' },
              { key: 'action', label: 'Action' },
            ]}
            rows={rows.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          />
        </SectionShell>
      ))}
    </div>
  );
}

function ContentsSection({ specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Course Contents</h2>
      <SectionShell title="Course Contents">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'weeks', label: 'Weeks' },
            { key: 'topic', label: 'Topic' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.contents.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          footer={['', '', 'Total Contact Hours', sumBy(specification.contents, 'contactHours'), '']}
        />
      </SectionShell>
    </div>
  );
}

function AssessmentSection({ specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Students Assessment</h2>
      <SectionShell title="Students Assessment">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'activity', label: 'Assessment Activities' },
            { key: 'timing', label: 'Assessment Timing' },
            { key: 'percentage', label: 'Percentage %' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.assessment.map((item, index) => ({
            ...item,
            index: index + 1,
            percentage: `${item.percentage}%`,
            action: '',
          }))}
          footer={['', 'Total', '', '100%', 'Perfect!']}
        />
      </SectionShell>
    </div>
  );
}

function ResourcesSection({ specification }) {
  const learningRows = [
    ['Essential References', specification.essentialReferences],
    ['Supportive References', specification.supportiveReferences],
    ['Electronic Materials', specification.electronicMaterials],
    ['Other Learning Materials', specification.otherMaterials],
  ];
  const facilityRows = [
    ['Facilities (Classrooms, Laboratories, exhibition rooms, simulation rooms, etc.)', specification.facilities],
    ['Technology equipment (projector, Smart Board, Software)', specification.technologyEquipment],
    ['Other equipment (depending on the nature of the specialty)', specification.otherEquipment],
  ];

  return (
    <div>
      <h2 className="spec-section-title">Learning Resources And Facilities</h2>
      <SectionShell title="Learning Resources And Facilities">
        <div className="spec-textarea-list">
          {learningRows.map(([label, value]) => (
            <label key={label}><span>{label}</span><textarea readOnly value={value} /></label>
          ))}
        </div>
      </SectionShell>
      <SectionShell title="Required Facilities And Equipments">
        <div className="spec-textarea-list">
          {facilityRows.map(([label, value]) => (
            <label key={label}><span>{label}</span><textarea readOnly value={value} /></label>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}

function EvaluationSection({ specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Course Quality Evaluation</h2>
      <SectionShell title="Course Quality Evaluation">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'issue', label: 'Assessment Areas / Issues' },
            { key: 'assessor', label: 'Assessor' },
            { key: 'method', label: 'Assessment Methods' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.evaluation.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
        />
      </SectionShell>
    </div>
  );
}

function ApprovalsHistory({ specification }) {
  return (
    <div className="spec-approvals-view">
      <h2 className="spec-section-title">Approvals History</h2>
      <SectionShell title="Approvals History">
        <SpecTable
          columns={[
            { key: 'username', label: 'Username' },
            { key: 'job', label: 'Job' },
            { key: 'status', label: 'Status' },
            { key: 'reason', label: 'Reason' },
            { key: 'date', label: 'Date' },
          ]}
          rows={specification.approvals}
        />
      </SectionShell>
    </div>
  );
}

function SectionContent({ activeSection, specification }) {
  if (activeSection === 'identification') return <IdentificationSection specification={specification} />;
  if (activeSection === 'outcomes') return <OutcomesSection specification={specification} />;
  if (activeSection === 'contents') return <ContentsSection specification={specification} />;
  if (activeSection === 'assessment') return <AssessmentSection specification={specification} />;
  if (activeSection === 'resources') return <ResourcesSection specification={specification} />;
  if (activeSection === 'evaluation') return <EvaluationSection specification={specification} />;
  return <InformationSection specification={specification} />;
}

export default function CourseSpecificationViewPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('program');
  const [activeSection, setActiveSection] = useState('information');
  const course = courses.find((item) => item.id === courseId);
  const specification = useMemo(() => getCourseSpecification(course), [course]);
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  if (!course) {
    return (
      <>
        <Topbar breadcrumbs={[t('courses'), t('notFound')]} />
        <div className="page-content"><p>{t('notFound')}</p></div>
      </>
    );
  }

  const goToRelativeSection = (offset) => {
    const next = sections[activeIndex + offset];
    if (next) setActiveSection(next.id);
  };

  return (
    <>
      <Topbar breadcrumbs={[t('courses'), course.code, 'Course Specification']} />
      <div className="page-content course-spec-page">
        <SpecWorkflow />
        <div className="course-spec-shell panel">
          <SpecTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'approvals' ? (
            <ApprovalsHistory specification={specification} />
          ) : (
            <div className="course-spec-layout">
              <SpecSideNav activeSection={activeSection} setActiveSection={setActiveSection} />
              <main className="course-spec-content">
                <SectionContent activeSection={activeSection} specification={specification} />
                <div className="spec-actions">
                  <button type="button" className="btn-outline" onClick={() => activeIndex === 0 ? navigate(-1) : goToRelativeSection(-1)}>
                    Back
                  </button>
                  {activeIndex < sections.length - 1 && (
                    <button type="button" className="act-btn primary" onClick={() => goToRelativeSection(1)}>
                      Next
                    </button>
                  )}
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
