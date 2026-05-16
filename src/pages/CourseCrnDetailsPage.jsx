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
const gradeQuestionNumbers = Array.from({ length: 30 }, (_, index) => index + 1);

function findSubmission(courseId, crnId) {
  const crnGroup = courseCrnSubmissions[courseId];
  return crnGroup?.submissions.find((submission) => submission.id === crnId);
}

function createQuestionSetup(report) {
  const outcomeCodes = report.outcomes.map((outcome) => outcome.plo);
  return gradeQuestionNumbers.map((number, index) => ({
    id: `question-${number}`,
    assessmentItem: index < 10 ? 'Exit Exam' : '',
    questionNumber: number,
    outcomeCode: outcomeCodes[index % outcomeCodes.length] || '',
    questionScore: '',
    learningOutcome: report.outcomes[index % report.outcomes.length]?.clo || '',
  }));
}

function createStudentGradeRows(count = 5) {
  return Array.from({ length: count }, (_, index) => ({
    id: `student-${Date.now()}-${index}`,
    studentNo: index + 1,
    universityId: '',
    studentName: '',
    grades: Object.fromEntries(gradeQuestionNumbers.map((number) => [number, ''])),
  }));
}

function GradeInput({ value, onChange, ariaLabel }) {
  return (
    <input
      type="number"
      min="0"
      step="0.25"
      value={value}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
    />
  );
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

function OutcomesSection({ report, onAddGrades }) {
  const groups = [...new Set(report.outcomes.map((item) => item.group))];

  return (
    <div>
      <div className="crn-section-tools">
        <button type="button" className="crn-btn soft"><i className="ti ti-file-download" /> Download CLO Excel</button>
        <button type="button" className="crn-btn soft"><i className="ti ti-file-upload" /> Upload CLO Excel</button>
        <button type="button" className="crn-btn primary" onClick={onAddGrades}><i className="ti ti-table-plus" /> Add Grades</button>
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

function GradesModal({
  course,
  submission,
  report,
  questionSetup,
  setQuestionSetup,
  studentRows,
  setStudentRows,
  onClose,
}) {
  const updateQuestion = (rowId, key, value) => {
    setQuestionSetup((rows) => rows.map((row) => row.id === rowId ? { ...row, [key]: value } : row));
  };

  const updateStudent = (rowId, key, value) => {
    setStudentRows((rows) => rows.map((row) => row.id === rowId ? { ...row, [key]: value } : row));
  };

  const updateStudentGrade = (rowId, questionNumber, value) => {
    setStudentRows((rows) => rows.map((row) => (
      row.id === rowId
        ? { ...row, grades: { ...row.grades, [questionNumber]: value } }
        : row
    )));
  };

  const addStudentRow = () => {
    setStudentRows((rows) => [
      ...rows,
      {
        ...createStudentGradeRows(1)[0],
        studentNo: rows.length + 1,
      },
    ]);
  };

  const outcomeOptions = [...new Set(report.outcomes.flatMap((outcome) => [outcome.plo, outcome.clo]))];

  return (
    <div className="crn-modal-backdrop" role="presentation">
      <section className="crn-modal" role="dialog" aria-modal="true" aria-labelledby="grades-modal-title">
        <header className="crn-modal-head">
          <div>
            <h2 id="grades-modal-title">Add Grades</h2>
            <p>Fields follow the attached Excel template: learning outcomes, question setup, and student grade recording.</p>
          </div>
          <button type="button" className="crn-icon-btn" onClick={onClose} aria-label="Close add grades form">
            <i className="ti ti-x" />
          </button>
        </header>

        <div className="crn-modal-body">
          <section className="crn-form-section">
            <h3>Course Information</h3>
            <div className="crn-form-grid">
              <label>Academic Year and Semester<input readOnly value={`${report.academicYear} / ${report.semester}`} /></label>
              <label>Course Code and Name<input readOnly value={`${course.code} - ${course.name}`} /></label>
              <label>CRN Number<input readOnly value={submission.crn} /></label>
              <label>Instructor Name<input readOnly value={submission.instructor} /></label>
            </div>
          </section>

          <section className="crn-form-section">
            <div className="crn-form-section-head">
              <h3>Question Setup</h3>
              <span>Assessment item, question number, CLO/PLO code, question score, and learning outcome.</span>
            </div>
            <div className="crn-grade-scroll">
              <table className="crn-grade-table setup">
                <thead>
                  <tr>
                    <th>Assessment Item</th>
                    <th>Question Number</th>
                    <th>Outcome Code</th>
                    <th>Question Score</th>
                    <th>Learning Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {questionSetup.map((row) => (
                    <tr key={row.id}>
                      <td><input value={row.assessmentItem} onChange={(event) => updateQuestion(row.id, 'assessmentItem', event.target.value)} /></td>
                      <td><input readOnly value={row.questionNumber} /></td>
                      <td>
                        <select value={row.outcomeCode} onChange={(event) => updateQuestion(row.id, 'outcomeCode', event.target.value)}>
                          <option value="">Select</option>
                          {outcomeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </td>
                      <td><GradeInput value={row.questionScore} onChange={(value) => updateQuestion(row.id, 'questionScore', value)} ariaLabel={`Question ${row.questionNumber} score`} /></td>
                      <td><textarea value={row.learningOutcome} onChange={(event) => updateQuestion(row.id, 'learningOutcome', event.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="crn-form-section">
            <div className="crn-form-section-head">
              <h3>Student Grades</h3>
              <button type="button" className="crn-btn soft" onClick={addStudentRow}><i className="ti ti-user-plus" /> Add Student</button>
            </div>
            <div className="crn-grade-scroll">
              <table className="crn-grade-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>University ID</th>
                    <th>Student Name</th>
                    <th>Total</th>
                    {gradeQuestionNumbers.map((number) => <th key={number}>Q{number}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {studentRows.map((row) => {
                    const total = gradeQuestionNumbers.reduce((sum, number) => sum + Number(row.grades[number] || 0), 0);
                    return (
                      <tr key={row.id}>
                        <td>{row.studentNo}</td>
                        <td><input value={row.universityId} onChange={(event) => updateStudent(row.id, 'universityId', event.target.value)} /></td>
                        <td><input value={row.studentName} onChange={(event) => updateStudent(row.id, 'studentName', event.target.value)} /></td>
                        <td><strong>{total || ''}</strong></td>
                        {gradeQuestionNumbers.map((number) => (
                          <td key={number}>
                            <GradeInput
                              value={row.grades[number]}
                              onChange={(value) => updateStudentGrade(row.id, number, value)}
                              ariaLabel={`Student ${row.studentNo} question ${number} grade`}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="crn-modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="button" className="act-btn primary" onClick={onClose}>Save Grades</button>
        </footer>
      </section>
    </div>
  );
}

function SectionContent({ activeSection, course, crnGroup, submission, report, specification, onAddGrades }) {
  if (activeSection === 'delivery') return <DeliverySection report={report} />;
  if (activeSection === 'results') return <ResultsSection report={report} />;
  if (activeSection === 'outcomes') return <OutcomesSection report={report} onAddGrades={onAddGrades} />;
  if (activeSection === 'improvement') return <ImprovementSection report={report} />;
  return <InformationSection course={course} crnGroup={crnGroup} submission={submission} report={report} specification={specification} />;
}

export default function CourseCrnDetailsPage() {
  const { courseId, crnId } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('program');
  const [activeSection, setActiveSection] = useState('information');
  const [isGradesModalOpen, setIsGradesModalOpen] = useState(false);
  const course = courses.find((item) => item.id === courseId);
  const crnGroup = courseCrnSubmissions[courseId];
  const submission = findSubmission(courseId, crnId);
  const report = courseCrnReportDetails[crnId];
  const specification = useMemo(() => getCourseSpecification(course), [course]);
  const [questionSetup, setQuestionSetup] = useState(() => createQuestionSetup(report || { outcomes: [] }));
  const [studentRows, setStudentRows] = useState(() => createStudentGradeRows());
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
                  onAddGrades={() => setIsGradesModalOpen(true)}
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
        {isGradesModalOpen && (
          <GradesModal
            course={course}
            submission={submission}
            report={report}
            questionSetup={questionSetup}
            setQuestionSetup={setQuestionSetup}
            studentRows={studentRows}
            setStudentRows={setStudentRows}
            onClose={() => setIsGradesModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
