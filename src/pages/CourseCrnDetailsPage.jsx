import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { courseCrnReportDetails, courseCrnSubmissions, courses } from '../data';
import { getCourseSpecification } from '../data/courseSpecificationData';
import { useI18n } from '../i18n';

const workflowSteps = [
  { label: 'Instructor', icon: 'ti-check' },
  { label: 'coordinator', icon: 'ti-check' },
  { label: 'Approved', icon: 'ti-check' },
];

const sections = [
  { id: 'information', label: 'Information' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'results', label: 'Results' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'improvement', label: 'Improvement Plan' },
];

const gradeColumns = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
const statusColumns = ['Denied Entry', 'In Progress', 'Incomplete', 'Pass', 'Fail', 'Withdrawn', 'Withdraw'];

function findSubmission(courseId, crnId) {
  const crnGroup = courseCrnSubmissions[courseId];
  return crnGroup?.submissions.find((submission) => submission.id === crnId);
}

function CrnWorkflow() {
  return (
    <div className="spec-workflow panel crn-detail-workflow">
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

function CrnTabs({ activeTab, setActiveTab }) {
  return (
    <div className="spec-tabs" role="tablist" aria-label="CRN report tabs">
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

function CrnSideNav({ activeSection, setActiveSection }) {
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  return (
    <aside className="spec-side-nav" aria-label="CRN report sections">
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        const isDone = index < activeIndex;
        return (
          <button
            type="button"
            key={section.id}
            className={isActive ? 'active' : ''}
            onClick={() => setActiveSection(section.id)}
          >
            <span className={`spec-step-dot ${isDone ? 'done' : ''}`}>
              {isDone ? <i className="ti ti-check" /> : index + 1}
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

function CrnTable({ columns, rows }) {
  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            {columns.map((column) => <th key={column.key}>{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => <td key={column.key}>{row[column.key]}</td>)}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length}>No records to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function InformationSection({ course, crnGroup, submission, report, specification }) {
  return (
    <div>
      <h2 className="spec-section-title">Information</h2>
      <div className="spec-info-grid crn-info-grid">
        <InfoCard icon="ti-notebook" label="Course Title"><p>{course.name}</p></InfoCard>
        <InfoCard icon="ti-code" label="Course Code"><p>{course.code}</p></InfoCard>
        <InfoCard icon="ti-clipboard" label="CRN Code"><p>{submission.crn}</p></InfoCard>
        <InfoCard tone="purple" icon="ti-building-community" label="Departments"><ul><li>{specification.department}</li></ul></InfoCard>
        <InfoCard tone="purple" icon="ti-building-bank" label="College"><p>{specification.college}</p></InfoCard>
        <InfoCard icon="ti-book-2" label="Programs"><ul>{specification.programs.map((program) => <li key={program}>{program}</li>)}</ul></InfoCard>
        <InfoCard icon="ti-home-cog" label="Institution"><p>{specification.institution}</p></InfoCard>
        <InfoCard icon="ti-calendar-stats" label="Date"><div className="spec-readonly-input">{report.submittedAt}</div></InfoCard>
        <InfoCard icon="ti-user-check" label="Course Coordinator"><p>{crnGroup.coordinator}</p></InfoCard>
        <InfoCard icon="ti-calendar" label="Academic Year"><p>{report.academicYear}</p></InfoCard>
        <InfoCard icon="ti-calendar-event" label="Semester"><p>{report.semester}</p></InfoCard>
        <InfoCard icon="ti-user" label="Course Instructor"><p>{submission.instructor}</p></InfoCard>
        <InfoCard icon="ti-map-pin" label="Location"><p>{report.location}</p></InfoCard>
        <InfoCard icon="ti-users" label="No Of Students Starting"><p>{report.noOfStudentsStarting}</p></InfoCard>
        <InfoCard icon="ti-users-group" label="No Of Students Completing"><p>{report.noOfStudentsCompleting}</p></InfoCard>
      </div>
    </div>
  );
}

function DeliverySection({ report }) {
  return (
    <div>
      <h2 className="spec-section-title">Topics Not Covered</h2>
      <SectionShell title="Topics Not Covered">
        <CrnTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'topic', label: 'Topic Not Covered' },
            { key: 'reason', label: 'Reason For Not Covering' },
            { key: 'impact', label: 'Extent Of Their Impact' },
            { key: 'action', label: 'Compensating Action' },
          ]}
          rows={report.topicsNotCovered.map((item, index) => ({ ...item, index: index + 1 }))}
        />
      </SectionShell>
    </div>
  );
}

function ResultsSection({ report }) {
  const resultRows = [
    {
      label: 'Number of Students',
      ...gradeColumns.reduce((acc, grade) => ({ ...acc, [grade]: report.grades[grade] ?? 0 }), {}),
      ...statusColumns.reduce((acc, status) => ({ ...acc, [status]: report.statusDistribution[status] ?? 0 }), {}),
    },
    {
      label: 'Total',
      ...gradeColumns.reduce((acc, grade) => ({ ...acc, [grade]: report.grades[grade] ?? 0 }), {}),
      ...statusColumns.reduce((acc, status) => ({ ...acc, [status]: report.statusDistribution[status] ?? 0 }), {}),
    },
  ];

  return (
    <div>
      <h2 className="spec-section-title">Results</h2>
      <CrnTable
        columns={[
          { key: 'label', label: '' },
          ...gradeColumns.map((grade) => ({ key: grade, label: grade })),
          ...statusColumns.map((status) => ({ key: status, label: status })),
        ]}
        rows={resultRows}
      />
      <SectionShell title="Comment on Student Results">
        <div className="crn-readonly-box">{report.resultsComment}</div>
      </SectionShell>
    </div>
  );
}

function OutcomesSection({ report }) {
  const groups = [...new Set(report.outcomes.map((item) => item.group))];

  return (
    <div>
      <div className="crn-section-tools">
        <button type="button" className="crn-btn soft"><i className="ti ti-file-download" /> Download CLO Excel</button>
        <button type="button" className="crn-btn soft"><i className="ti ti-file-upload" /> Upload CLO Excel</button>
      </div>
      <h2 className="spec-section-title">(CLOs)</h2>
      {groups.map((group) => (
        <SectionShell title={group} key={group}>
          <CrnTable
            columns={[
              { key: 'index', label: '#' },
              { key: 'clo', label: '(CLOs)' },
              { key: 'plo', label: '(PLOs)' },
              { key: 'assessment', label: 'Assessment Methods' },
              { key: 'targetLevel', label: 'Target Level' },
              { key: 'actualLevel', label: 'Actual Level' },
              { key: 'comment', label: 'Comment On Assessment Results' },
            ]}
            rows={report.outcomes
              .filter((item) => item.group === group)
              .map((item, index) => ({ ...item, index: index + 1 }))}
          />
        </SectionShell>
      ))}
      <SectionShell title="CLO Recommendations">
        <div className="crn-readonly-box">{report.cloRecommendation}</div>
      </SectionShell>
    </div>
  );
}

function ImprovementSection({ report }) {
  return (
    <div>
      <h2 className="spec-section-title">Improvement Plans And Actions</h2>
      <SectionShell title="Improvement Plan">
        <CrnTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'recommendation', label: 'Recommendations' },
            { key: 'action', label: 'Action' },
            { key: 'support', label: 'Needed Support' },
          ]}
          rows={report.improvementPlans.map((item, index) => ({ ...item, index: index + 1 }))}
        />
      </SectionShell>
      <SectionShell title="Improvement Action">
        <CrnTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'action', label: 'Action' },
            { key: 'achievement', label: 'Percentage Of Achievement' },
            { key: 'comments', label: 'Comments' },
          ]}
          rows={report.improvementActions.map((item, index) => ({ ...item, index: index + 1, achievement: `${item.achievement}%` }))}
        />
      </SectionShell>
      <SectionShell title="Overall Student Evaluation and Comments">
        <div className="crn-readonly-box">{report.overallComment}</div>
      </SectionShell>
    </div>
  );
}

function ApprovalsHistory({ report }) {
  return (
    <div className="spec-approvals-view">
      <h2 className="spec-section-title">Approvals History</h2>
      <SectionShell title="Approvals History">
        <CrnTable
          columns={[
            { key: 'username', label: 'Username' },
            { key: 'job', label: 'Job' },
            { key: 'status', label: 'Status' },
            { key: 'reason', label: 'Reason' },
            { key: 'date', label: 'Date' },
          ]}
          rows={report.approvals}
        />
      </SectionShell>
    </div>
  );
}

function SectionContent({ activeSection, course, crnGroup, submission, report, specification }) {
  if (activeSection === 'delivery') return <DeliverySection report={report} />;
  if (activeSection === 'results') return <ResultsSection report={report} />;
  if (activeSection === 'outcomes') return <OutcomesSection report={report} />;
  if (activeSection === 'improvement') return <ImprovementSection report={report} />;
  return <InformationSection course={course} crnGroup={crnGroup} submission={submission} report={report} specification={specification} />;
}

export default function CourseCrnDetailsPage() {
  const { courseId, crnId } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('program');
  const [activeSection, setActiveSection] = useState('information');
  const course = courses.find((item) => item.id === courseId);
  const crnGroup = courseCrnSubmissions[courseId];
  const submission = findSubmission(courseId, crnId);
  const report = courseCrnReportDetails[crnId];
  const specification = useMemo(() => getCourseSpecification(course), [course]);
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  if (!course || !crnGroup || !submission || !report) {
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
      <Topbar breadcrumbs={[t('courses'), course.code, 'CRNs', submission.crn]} />
      <div className="page-content course-spec-page crn-detail-page">
        <CrnWorkflow />
        <div className="course-spec-shell panel">
          <CrnTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'approvals' ? (
            <ApprovalsHistory report={report} />
          ) : (
            <div className="course-spec-layout">
              <CrnSideNav activeSection={activeSection} setActiveSection={setActiveSection} />
              <main className="course-spec-content">
                <SectionContent
                  activeSection={activeSection}
                  course={course}
                  crnGroup={crnGroup}
                  submission={submission}
                  report={report}
                  specification={specification}
                />
                <div className="spec-actions">
                  <button type="button" className="btn-outline" onClick={() => activeIndex === 0 ? navigate(`/courses/${course.id}/reports/crns`) : goToRelativeSection(-1)}>
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
