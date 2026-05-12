// Provides the quality, accreditation, and strategic planning module screens requested in docs/codex_prompt_v2.md.
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';

const todayStamp = '2026-05-12 09:30';

const ar = {
  'Academic Accreditation Management': 'إدارة الاعتماد الأكاديمي',
  'Integrated program accreditation tracking, requirements, immutable actions, and post-accreditation follow-up.': 'متابعة متكاملة لاعتماد البرامج والمتطلبات وسجل الإجراءات وما بعد الاعتماد.',
  'Strategic Planning': 'التخطيط الاستراتيجي',
  'Strategic projects, objectives, reports, ownership, milestones, and institutional progress.': 'إدارة المشاريع والأهداف والتقارير والملكية والمراحل والتقدم المؤسسي.',
  'Quality & Accreditation Projects': 'مشاريع الجودة والاعتماد',
  'Institutional accreditation, program review, learning outcomes, and gap analysis project portfolio.': 'محفظة مشاريع الاعتماد المؤسسي ومراجعة البرامج ومخرجات التعلم وتحليل الثغرات.',
  'Quality & Accreditation': 'الجودة والاعتماد',
  'Dashboard': 'لوحة التحكم',
  'Academic Programs': 'البرامج الأكاديمية',
  'Requirements': 'متطلبات الاعتماد',
  'Action Log': 'سجل الإجراءات',
  'Post Accreditation': 'ما بعد الاعتماد',
  'Strategic Projects': 'المشاريع الاستراتيجية',
  'Objectives': 'الأهداف',
  'Reports': 'التقارير',
  'Institutional': 'الاعتماد المؤسسي',
  'Program Review': 'مراجعة البرامج',
  'Learning Outcomes': 'مخرجات التعلم',
  'Gap Analysis': 'تحليل الثغرات',
  'Views': 'العروض',
  'Records': 'السجلات',
  'Alert': 'تنبيه',
  'Total Records': 'إجمالي السجلات',
  'Approved / Complete': 'معتمد / مكتمل',
  'Positive status': 'حالة إيجابية',
  'In Progress': 'قيد التنفيذ',
  'Active work': 'عمل نشط',
  'Needs Follow-up': 'تحتاج متابعة',
  'Requires action': 'يتطلب إجراء',
  'Updated': 'آخر تحديث',
  'Search, sort, and pagination are available for this table.': 'البحث والترتيب وترقيم الصفحات متاحة لهذا الجدول.',
  'Search': 'بحث',
  'Page': 'صفحة',
  'of': 'من',
  'Previous': 'السابق',
  'Next': 'التالي',
  'Academic Programs Master Data': 'البيانات الرئيسية للبرامج الأكاديمية',
  'Accreditation Requirements': 'متطلبات الاعتماد',
  'Immutable Accreditation Action Log': 'سجل إجراءات الاعتماد غير القابل للتعديل',
  'Latest Accreditation Updates': 'آخر تحديثات الاعتماد',
  'Strategic Projects': 'المشاريع الاستراتيجية',
  'Quality & Accreditation Project Portfolio': 'محفظة مشاريع الجودة والاعتماد',
  'Program': 'البرنامج',
  'College': 'الكلية',
  'Degree': 'الدرجة',
  'Body': 'جهة الاعتماد',
  'Status': 'الحالة',
  'Start': 'البداية',
  'End': 'النهاية',
  'Updated By': 'آخر محدث',
  'ID': 'المعرف',
  'Document': 'الوثيقة',
  'Uploaded File': 'الملف المرفوع',
  'Uploaded': 'تاريخ الرفع',
  'Due': 'تاريخ الاستحقاق',
  'Reviewer Notes': 'ملاحظات المراجع',
  'Action': 'الإجراء',
  'Actor': 'المنفذ',
  'Timestamp': 'الوقت',
  'Last Update': 'آخر تحديث',
  'Project': 'المشروع',
  'Owner': 'المالك',
  'Objective': 'الهدف',
  'Progress': 'التقدم',
  'Due Date': 'تاريخ الاستحقاق',
  'Area': 'المجال',
  'Next Step': 'الخطوة التالية',
  'Computer Science': 'علوم الحاسب',
  'Information Technology': 'تقنية المعلومات',
  'Software Engineering': 'هندسة البرمجيات',
  'Information Systems': 'نظم المعلومات',
  'College of Computer and Information Technology': 'كلية الحاسب وتقنية المعلومات',
  'Bachelor': 'بكالوريوس',
  'Master': 'ماجستير',
  'Full Accreditation': 'اعتماد كامل',
  'Eligible': 'مؤهل',
  'Conditional Accreditation': 'اعتماد مشروط',
  'Not Eligible': 'غير مؤهل',
  'Complete': 'مكتمل',
  'Incomplete': 'غير مكتمل',
  'Approved': 'معتمد',
  'Pending Submit': 'بانتظار التقديم',
  'Not Started': 'لم يبدأ',
  'Self-study evidence index': 'فهرس شواهد الدراسة الذاتية',
  'Program specification': 'توصيف البرنامج',
  'Field training report': 'تقرير التدريب الميداني',
  'Learning outcomes assessment report': 'تقرير قياس مخرجات التعلم',
  'Reviewed and approved': 'تمت المراجعة والاعتماد',
  'Missing advisory committee minutes': 'محاضر اللجنة الاستشارية غير مكتملة',
  'Ready for visit package': 'جاهز لحزمة الزيارة',
  'Approved by committee': 'معتمد من اللجنة',
  'Accreditation status confirmed': 'تم تأكيد حالة الاعتماد',
  'Requirement review note added': 'تمت إضافة ملاحظة مراجعة المتطلب',
  'Conditional recommendation recorded': 'تم تسجيل توصية مشروطة',
  'Eligibility gap logged': 'تم تسجيل فجوة الأهلية',
  'Quality Manager': 'مدير الجودة',
  'Program Coordinator': 'منسق البرنامج',
  'Dean Office': 'مكتب العمادة',
  'Reviewer': 'المراجع',
  'Digital Quality Dashboard': 'لوحة الجودة الرقمية',
  'Program Review Automation': 'أتمتة مراجعة البرامج',
  'Graduate Attribute Framework': 'إطار خصائص الخريجين',
  'Evidence Repository': 'مستودع الشواهد',
  'Deanship of Quality': 'عمادة الجودة',
  'Academic Affairs': 'الشؤون الأكاديمية',
  'Curriculum Committee': 'لجنة المناهج',
  'IT Services': 'خدمات تقنية المعلومات',
  'Improve reporting transparency': 'تحسين شفافية التقارير',
  'Accelerate program review cycles': 'تسريع دورات مراجعة البرامج',
  'Unify learning outcomes mapping': 'توحيد ربط مخرجات التعلم',
  'Centralize accreditation evidence': 'مركزة شواهد الاعتماد',
  'Institutional accreditation readiness': 'جاهزية الاعتماد المؤسسي',
  'Program specification review': 'مراجعة توصيف البرنامج',
  'Learning outcomes mapping': 'ربط مخرجات التعلم',
  'Accreditation gap analysis': 'تحليل فجوات الاعتماد',
  'Institutional': 'مؤسسي',
  'Program Review': 'مراجعة البرامج',
  'Learning Outcomes': 'مخرجات التعلم',
  'Gap Analysis': 'تحليل الثغرات',
  'Program Committee': 'لجنة البرنامج',
  'Assessment Unit': 'وحدة القياس',
  'External Review Team': 'فريق المراجعة الخارجي',
  'Mock review visit': 'زيارة مراجعة تجريبية',
  'Committee feedback': 'تغذية راجعة من اللجنة',
  'Publish report': 'نشر التقرير',
  'Evidence validation': 'التحقق من الشواهد',
};

function label(value, language) {
  return language === 'ar' ? ar[value] || value : value;
}

const accreditationPrograms = [
  {
    id: 'cs-bsc',
    name: 'Computer Science',
    college: 'College of Computer and Information Technology',
    degree: 'Bachelor',
    body: 'NCAAA',
    status: 'Full Accreditation',
    start: '2024-09-01',
    end: '2028-08-31',
    updated: '2026-05-10',
    updatedBy: 'Quality Manager',
  },
  {
    id: 'it-bsc',
    name: 'Information Technology',
    college: 'College of Computer and Information Technology',
    degree: 'Bachelor',
    body: 'NCAAA',
    status: 'Eligible',
    start: '2025-09-01',
    end: '2029-08-31',
    updated: '2026-05-08',
    updatedBy: 'Program Coordinator',
  },
  {
    id: 'se-bsc',
    name: 'Software Engineering',
    college: 'College of Computer and Information Technology',
    degree: 'Bachelor',
    body: 'ABET',
    status: 'Conditional Accreditation',
    start: '2023-09-01',
    end: '2027-08-31',
    updated: '2026-05-04',
    updatedBy: 'Dean Office',
  },
  {
    id: 'is-msc',
    name: 'Information Systems',
    college: 'College of Computer and Information Technology',
    degree: 'Master',
    body: 'NCAAA',
    status: 'Not Eligible',
    start: '2026-09-01',
    end: '2030-08-31',
    updated: '2026-04-28',
    updatedBy: 'Quality Manager',
  },
];

const requirements = [
  { id: 'REQ-001', program: 'Information Technology', document: 'Self-study evidence index', file: 'it-evidence-index-v2.pdf', status: 'Complete', uploaded: '2026-05-01', due: '2026-05-20', notes: 'Reviewed and approved' },
  { id: 'REQ-002', program: 'Information Technology', document: 'Program specification', file: 'program-specification-draft.pdf', status: 'Incomplete', uploaded: '2026-04-26', due: '2026-05-18', notes: 'Missing advisory committee minutes' },
  { id: 'REQ-003', program: 'Software Engineering', document: 'Field training report', file: 'se-field-training.pdf', status: 'Complete', uploaded: '2026-04-22', due: '2026-05-15', notes: 'Ready for visit package' },
  { id: 'REQ-004', program: 'Computer Science', document: 'Learning outcomes assessment report', file: 'cs-plo-report.pdf', status: 'Complete', uploaded: '2026-05-03', due: '2026-05-25', notes: 'Approved by committee' },
];

const actionLogs = [
  { id: 'ACT-001', program: 'Computer Science', action: 'Accreditation status confirmed', actor: 'Quality Manager', status: 'Approved', timestamp: '2026-05-10 11:45' },
  { id: 'ACT-002', program: 'Information Technology', action: 'Requirement review note added', actor: 'Reviewer', status: 'In Progress', timestamp: '2026-05-08 14:20' },
  { id: 'ACT-003', program: 'Software Engineering', action: 'Conditional recommendation recorded', actor: 'Dean Office', status: 'Pending Submit', timestamp: '2026-05-04 10:05' },
  { id: 'ACT-004', program: 'Information Systems', action: 'Eligibility gap logged', actor: 'Quality Manager', status: 'Not Started', timestamp: '2026-04-28 08:30' },
];

const strategicProjects = [
  { id: 'SP-001', name: 'Digital Quality Dashboard', owner: 'Deanship of Quality', objective: 'Improve reporting transparency', status: 'In Progress', progress: '68%', due: '2026-06-30' },
  { id: 'SP-002', name: 'Program Review Automation', owner: 'Academic Affairs', objective: 'Accelerate program review cycles', status: 'Approved', progress: '100%', due: '2026-05-31' },
  { id: 'SP-003', name: 'Graduate Attribute Framework', owner: 'Curriculum Committee', objective: 'Unify learning outcomes mapping', status: 'Pending Submit', progress: '42%', due: '2026-07-15' },
  { id: 'SP-004', name: 'Evidence Repository', owner: 'IT Services', objective: 'Centralize accreditation evidence', status: 'In Progress', progress: '55%', due: '2026-08-20' },
];

const qualityProjects = [
  { id: 'QP-001', name: 'Institutional accreditation readiness', area: 'Institutional', owner: 'Quality Manager', status: 'In Progress', progress: '72%', next: 'Mock review visit' },
  { id: 'QP-002', name: 'Program specification review', area: 'Program Review', owner: 'Program Committee', status: 'Pending Submit', progress: '45%', next: 'Committee feedback' },
  { id: 'QP-003', name: 'Learning outcomes mapping', area: 'Learning Outcomes', owner: 'Assessment Unit', status: 'Approved', progress: '100%', next: 'Publish report' },
  { id: 'QP-004', name: 'Accreditation gap analysis', area: 'Gap Analysis', owner: 'External Review Team', status: 'In Progress', progress: '61%', next: 'Evidence validation' },
];

const statusClassMap = {
  'Approved': 's-done',
  'Full Accreditation': 's-done',
  'Complete': 's-done',
  'In Progress': 's-inprogress',
  'Eligible': 's-inprogress',
  'Conditional Accreditation': 's-pending',
  'Pending Submit': 's-pending',
  'Incomplete': 's-pending',
  'Not Started': 's-not-started',
  'Not Eligible': 's-not-started',
};

const moduleConfig = {
  accreditation: {
    title: 'Academic Accreditation Management',
    subtitle: 'Integrated program accreditation tracking, requirements, immutable actions, and post-accreditation follow-up.',
    icon: 'ti-certificate',
    base: '/accreditation',
    tabs: [
      { path: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
      { path: 'programs', label: 'Academic Programs', icon: 'ti-school' },
      { path: 'requirements', label: 'Requirements', icon: 'ti-clipboard-check' },
      { path: 'actions', label: 'Action Log', icon: 'ti-history' },
      { path: 'post-accreditation', label: 'Post Accreditation', icon: 'ti-progress-check' },
    ],
  },
  strategic: {
    title: 'Strategic Planning',
    subtitle: 'Strategic projects, objectives, reports, ownership, milestones, and institutional progress.',
    icon: 'ti-chart-arrows-vertical',
    base: '/strategic-planning',
    tabs: [
      { path: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
      { path: 'projects', label: 'Strategic Projects', icon: 'ti-briefcase' },
      { path: 'objectives', label: 'Objectives', icon: 'ti-target' },
      { path: 'reports', label: 'Reports', icon: 'ti-report-analytics' },
    ],
  },
  quality: {
    title: 'Quality & Accreditation Projects',
    subtitle: 'Institutional accreditation, program review, learning outcomes, and gap analysis project portfolio.',
    icon: 'ti-rosette-discount-check',
    base: '/quality-projects',
    tabs: [
      { path: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
      { path: 'institutional', label: 'Institutional', icon: 'ti-building-bank' },
      { path: 'program-review', label: 'Program Review', icon: 'ti-clipboard-list' },
      { path: 'learning-outcomes', label: 'Learning Outcomes', icon: 'ti-route' },
      { path: 'gap-analysis', label: 'Gap Analysis', icon: 'ti-adjustments-check' },
    ],
  },
};

function getStatusClass(status) {
  return statusClassMap[status] || 's-not-started';
}

function SortableTable({ columns, rows, title }) {
  const { language } = useI18n();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState(columns[0].key);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matched = normalized
      ? rows.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(normalized)))
      : rows;

    return [...matched].sort((a, b) => {
      const left = String(a[sortKey] ?? '');
      const right = String(b[sortKey] ?? '');
      return sortDir === 'asc' ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [query, rows, sortDir, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    setSortKey(key);
    setSortDir((current) => (sortKey === key && current === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="quality-table-card">
      <div className="quality-table-toolbar">
        <div>
          <div className="section-title">{label(title, language)}</div>
          <div className="section-sub">{label('Search, sort, and pagination are available for this table.', language)}</div>
        </div>
        <label className="quality-search">
          <i className="ti ti-search" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={label('Search', language)}
          />
        </label>
      </div>
      <div className="quality-table-scroll">
        <table className="quality-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  <button type="button" onClick={() => handleSort(column.key)}>
                    {label(column.label, language)}
                    {sortKey === column.key && <i className={`ti ${sortDir === 'asc' ? 'ti-arrow-up' : 'ti-arrow-down'}`} />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`}>
                    {column.type === 'status' ? (
                      <span className={`status-pill ${getStatusClass(row[column.key])}`}>{label(row[column.key], language)}</span>
                    ) : (
                      label(row[column.key], language)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="quality-pagination">
        <span>{label('Page', language)} {page} {label('of', language)} {totalPages}</span>
        <div className="btn-group">
          <button className="btn-outline" type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>{label('Previous', language)}</button>
          <button className="btn-outline" type="button" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>{label('Next', language)}</button>
        </div>
      </div>
    </div>
  );
}

function SummaryCards({ rows, statusKey = 'status' }) {
  const { language } = useI18n();
  const total = rows.length;
  const approved = rows.filter((row) => ['Approved', 'Full Accreditation', 'Complete'].includes(row[statusKey])).length;
  const inProgress = rows.filter((row) => ['In Progress', 'Eligible'].includes(row[statusKey])).length;
  const pending = rows.filter((row) => ['Pending Submit', 'Conditional Accreditation', 'Incomplete'].includes(row[statusKey])).length;

  return (
    <div className="dashboard-grid">
      <div className="dash-stat-card"><div className="dash-stat-num">{total}</div><div className="dash-stat-lbl">{label('Total Records', language)}</div><div className="dash-stat-change">{label('Updated', language)} {todayStamp}</div></div>
      <div className="dash-stat-card"><div className="dash-stat-num">{approved}</div><div className="dash-stat-lbl">{label('Approved / Complete', language)}</div><div className="dash-stat-change">{label('Positive status', language)}</div></div>
      <div className="dash-stat-card"><div className="dash-stat-num">{inProgress}</div><div className="dash-stat-lbl">{label('In Progress', language)}</div><div className="dash-stat-change">{label('Active work', language)}</div></div>
      <div className="dash-stat-card"><div className="dash-stat-num">{pending}</div><div className="dash-stat-lbl">{label('Needs Follow-up', language)}</div><div className="dash-stat-change">{label('Requires action', language)}</div></div>
    </div>
  );
}

function ModuleTabs({ config, activePath, navigate }) {
  const { language } = useI18n();
  return (
    <div className="quality-module-tabs" role="tablist">
      {config.tabs.map((tab) => (
        <button
          key={tab.path}
          className={`dashboard-tab ${activePath === tab.path ? 'active' : ''}`}
          type="button"
          onClick={() => navigate(`${config.base}/${tab.path}`)}
        >
          <i className={`ti ${tab.icon}`} />
          <span>{label(tab.label, language)}</span>
        </button>
      ))}
    </div>
  );
}

function AccreditationContent({ activePath }) {
  const { language } = useI18n();
  if (activePath === 'programs') {
    return (
      <SortableTable
        title="Academic Programs Master Data"
        rows={accreditationPrograms}
        columns={[
          { key: 'name', label: 'Program' },
          { key: 'college', label: 'College' },
          { key: 'degree', label: 'Degree' },
          { key: 'body', label: 'Body' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'start', label: 'Start' },
          { key: 'end', label: 'End' },
          { key: 'updated', label: 'Updated' },
          { key: 'updatedBy', label: 'Updated By' },
        ]}
      />
    );
  }

  if (activePath === 'requirements') {
    return (
      <SortableTable
        title="Accreditation Requirements"
        rows={requirements}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'program', label: 'Program' },
          { key: 'document', label: 'Document' },
          { key: 'file', label: 'Uploaded File' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'uploaded', label: 'Uploaded' },
          { key: 'due', label: 'Due' },
          { key: 'notes', label: 'Reviewer Notes' },
        ]}
      />
    );
  }

  if (activePath === 'actions') {
    return (
      <SortableTable
        title="Immutable Accreditation Action Log"
        rows={actionLogs}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'program', label: 'Program' },
          { key: 'action', label: 'Action' },
          { key: 'actor', label: 'Actor' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'timestamp', label: 'Timestamp' },
        ]}
      />
    );
  }

  if (activePath === 'post-accreditation') {
    return (
      <div className="quality-card-grid">
        {accreditationPrograms.filter((program) => program.status !== 'Not Eligible').map((program) => (
          <div className="report-card" key={program.id}>
            <div className="rc-icon-wrap ic-green"><i className="ti ti-progress-check" /></div>
            <div className="rc-body">
              <div className="rc-title">{label(program.name, language)}</div>
              <div className="rc-desc">
                {language === 'ar'
                  ? `خطة متابعة ما بعد الاعتماد تنتهي في ${program.end}. آخر تحديث بواسطة ${label(program.updatedBy, language)}.`
                  : `Post-accreditation follow-up plan ends on ${program.end}. Latest update by ${program.updatedBy}.`}
              </div>
            </div>
            <div className="rc-footer"><span className={`status-pill ${getStatusClass(program.status)}`}>{label(program.status, language)}</span></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <SummaryCards rows={accreditationPrograms} />
      <SortableTable
        title="Latest Accreditation Updates"
        rows={accreditationPrograms}
        columns={[
          { key: 'name', label: 'Program' },
          { key: 'college', label: 'College' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'updated', label: 'Last Update' },
          { key: 'updatedBy', label: 'Updated By' },
        ]}
      />
    </>
  );
}

function StrategicContent({ activePath }) {
  const { language } = useI18n();
  if (activePath === 'objectives') {
    return (
      <div className="quality-card-grid">
        {strategicProjects.map((project) => (
          <div className="report-card" key={project.id}>
            <div className="rc-icon-wrap ic-blue"><i className="ti ti-target" /></div>
            <div className="rc-title">{label(project.objective, language)}</div>
            <div className="rc-desc">
              {language === 'ar'
                ? `المشروع المرتبط: ${label(project.name, language)}. المالك: ${label(project.owner, language)}.`
                : `Linked project: ${project.name}. Owner: ${project.owner}.`}
            </div>
            <div className="rc-footer"><span className={`status-pill ${getStatusClass(project.status)}`}>{label(project.status, language)}</span></div>
          </div>
        ))}
      </div>
    );
  }

  if (activePath === 'reports') {
    return <SummaryCards rows={strategicProjects} />;
  }

  return (
    <>
      {activePath === 'dashboard' && <SummaryCards rows={strategicProjects} />}
      <SortableTable
        title="Strategic Projects"
        rows={strategicProjects}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Project' },
          { key: 'owner', label: 'Owner' },
          { key: 'objective', label: 'Objective' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'due', label: 'Due Date' },
        ]}
      />
    </>
  );
}

function QualityProjectsContent({ activePath }) {
  if (activePath !== 'dashboard') {
    const areaMap = {
      institutional: 'Institutional',
      'program-review': 'Program Review',
      'learning-outcomes': 'Learning Outcomes',
      'gap-analysis': 'Gap Analysis',
    };
    const filtered = qualityProjects.filter((project) => project.area === areaMap[activePath]);
    return (
      <SortableTable
        title={areaMap[activePath] || 'Quality Projects'}
        rows={filtered.length ? filtered : qualityProjects}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Project' },
          { key: 'area', label: 'Area' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'next', label: 'Next Step' },
        ]}
      />
    );
  }

  return (
    <>
      <SummaryCards rows={qualityProjects} />
      <SortableTable
        title="Quality & Accreditation Project Portfolio"
        rows={qualityProjects}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Project' },
          { key: 'area', label: 'Area' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'next', label: 'Next Step' },
        ]}
      />
    </>
  );
}

export default function QualityModulesPage({ moduleType }) {
  const { language } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const config = moduleConfig[moduleType];
  const activePath = location.pathname.split('/').filter(Boolean)[1] || 'dashboard';
  const activeTab = config.tabs.find((tab) => tab.path === activePath) || config.tabs[0];

  const renderContent = () => {
    if (moduleType === 'accreditation') return <AccreditationContent activePath={activeTab.path} />;
    if (moduleType === 'strategic') return <StrategicContent activePath={activeTab.path} />;
    return <QualityProjectsContent activePath={activeTab.path} />;
  };

  return (
    <>
      <Topbar breadcrumbs={[label(config.title, language), label(activeTab.label, language)]} />
      <div className="page-content">
        <div className="list-hero institutional-hero quality-module-hero">
          <div>
            <div className="hero-badge"><i className={`ti ${config.icon}`} /> {label('Quality & Accreditation', language)}</div>
            <div className="hero-title">{label(config.title, language)}</div>
            <div className="hero-sub">{label(config.subtitle, language)}</div>
          </div>
          <div className="hero-stats">
            <div className="stat-chip"><div className="num">{config.tabs.length}</div><div className="lbl">{label('Views', language)}</div></div>
            <div className="stat-chip"><div className="num">4</div><div className="lbl">{label('Records', language)}</div></div>
            <div className="stat-chip"><div className="num">1</div><div className="lbl">{label('Alert', language)}</div></div>
          </div>
        </div>

        <ModuleTabs config={config} activePath={activeTab.path} navigate={navigate} />
        {renderContent()}
      </div>
    </>
  );
}
