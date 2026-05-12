
// Projects Data
export const projects = [
  {
    id: 'PRJ-001',
    name: 'Institutional accreditation readiness',
    nameAr: 'جاهزية الاعتماد المؤسسي',
    type: 'Academic Accreditation Project',
    typeAr: 'مشروع اعتماد أكاديمي',
    owner: 'Academic Affairs and Quality Deanship',
    ownerAr: 'وكالة الشؤون الأكاديمية وعمادة الجودة',
    entity: 'College of Computer and Information Technology',
    entityAr: 'كلية الحاسب وتقنية المعلومات',
    status: 'In Progress',
    statusAr: 'قيد التنفيذ',
    progress: 72,
    priority: 'High',
    priorityAr: 'عالية',
    startDate: '2026-04-01',
    endDate: '2026-08-30',
    lastUpdate: '2026-05-12 09:30',
    team: [
      { id: 'u1', name: 'Dr. Ahmad', role: 'Project Manager', avatar: 'A' },
      { id: 'u2', name: 'Sara', role: 'Quality Specialist', avatar: 'S' },
      { id: 'u3', name: 'Khalid', role: 'Data Analyst', avatar: 'K' },
    ],
    kpis: {
      delayedTasks: 2,
      requirements: 81,
      evidence: 76
    }
  },
  {
    id: 'PRJ-002',
    name: 'Program specification review',
    nameAr: 'مراجعة توصيف البرنامج',
    type: 'Program Development Project',
    typeAr: 'مشروع تطوير برنامج',
    owner: 'Program Quality Committee',
    ownerAr: 'لجنة جودة البرنامج',
    entity: 'Computer Science',
    entityAr: 'علوم الحاسب',
    status: 'Pending Review',
    statusAr: 'بانتظار المراجعة',
    progress: 48,
    priority: 'Medium',
    priorityAr: 'متوسطة',
    startDate: '2026-05-01',
    endDate: '2026-07-15',
    lastUpdate: '2026-05-10 14:20',
    team: [
      { id: 'u4', name: 'Noura', role: 'Project Manager', avatar: 'N' },
      { id: 'u5', name: 'Omar', role: 'Reviewer', avatar: 'O' },
    ],
    kpis: {
      delayedTasks: 1,
      requirements: 64,
      evidence: 58
    }
  },
  {
    id: 'PRJ-003',
    name: 'Learning outcomes mapping',
    nameAr: 'مصفوفة مخرجات التعلم',
    type: 'Assessment Project',
    typeAr: 'مشروع تقييم',
    owner: 'Assessment Unit',
    ownerAr: 'وحدة التقييم',
    entity: 'Information Technology',
    status: 'Completed',
    progress: 100,
    priority: 'High',
    startDate: '2026-03-01',
    endDate: '2026-05-01',
    lastUpdate: '2026-05-12',
    team: [],
    kpis: { delayedTasks: 0, requirements: 100, evidence: 100 }
  }
];

export const milestones = [
  { id: 'MS-001', projectId: 'PRJ-001', name: 'Preparing self-study', nameAr: 'إعداد الدراسة الذاتية', description: 'Finalize draft report.', startDate: '2026-04-01', endDate: '2026-05-20', status: 'Completed', progress: 100, owner: 'Dr. Ahmad' },
  { id: 'MS-002', projectId: 'PRJ-001', name: 'Evidence collection', nameAr: 'جمع الأدلة', description: 'Verifying all evidence.', startDate: '2026-04-15', endDate: '2026-06-15', status: 'In Progress', progress: 74, owner: 'Sara' },
  { id: 'MS-003', projectId: 'PRJ-001', name: 'Internal Review', nameAr: 'المراجعة الداخلية', description: 'Mock review visit.', startDate: '2026-06-01', endDate: '2026-06-30', status: 'Not Started', progress: 0, owner: 'Khalid' },
  { id: 'MS-004', projectId: 'INIT-002', name: 'Gap Analysis', nameAr: 'تحليل الفجوات', startDate: '2026-07-01', endDate: '2026-08-31', status: 'Planned', progress: 10, owner: 'Deanship of Quality' }
];

export const tasks = [
  { id: 'TSK-001', milestoneId: 'MS-002', projectId: 'PRJ-001', title: 'Update evidence matrix', titleAr: 'تحديث مصفوفة الأدلة', assignedTo: 'Sara', priority: 'High', status: 'In Progress', dueDate: '2026-05-22', subtasks: [{ id: 'SUB-1', title: 'Verify PLO', status: 'Completed' }], comments: [], attachments: ['matrix.xlsx'], description: 'Mapping files to standards.' },
  { id: 'TSK-002', milestoneId: 'MS-002', projectId: 'PRJ-001', title: 'Collect committee approvals', titleAr: 'جمع اعتمادات اللجان', assignedTo: 'Khalid', priority: 'Medium', status: 'To Do', dueDate: '2026-05-28', subtasks: [], comments: [], attachments: [], description: 'Signatures for spec.' },
  { id: 'TSK-003', milestoneId: 'MS-001', projectId: 'PRJ-001', title: 'Finalize Chapter 1', titleAr: 'الانتهاء من الفصل الأول', assignedTo: 'Dr. Ahmad', priority: 'High', status: 'Completed', dueDate: '2026-04-30', subtasks: [], comments: [], attachments: ['ch1.docx'], description: 'Introduction draft.' },
  { id: 'TSK-004', projectId: 'INIT-002', title: 'Identify missing evidence', titleAr: 'تحديد الأدلة المفقودة', assignedTo: 'Sara', priority: 'High', status: 'In Progress', dueDate: '2026-07-15', subtasks: [], comments: [], attachments: [], description: 'Review NCAAA list.' }
];

export const risks = [
  { id: 'RI-001', projectId: 'PRJ-001', title: 'Late evidence uploads', titleAr: 'تأخر رفع الأدلة', category: 'Operational', impact: 'High', owner: 'Quality Manager', treatment: 'Reassign tasks', status: 'Active' }
];

export const projectTeams = [
  { id: 'TM-001', projectId: 'PRJ-001', manager: 'Dr. Ahmad', members: 'Sara, Khalid, Noura', role: 'Full Team', status: 'Approved' },
  { id: 'TM-002', projectId: 'INIT-002', manager: 'Deanship of Quality', members: '8 Specialists', role: 'Strategic Committee', status: 'Approved' }
];

export const projectFiles = [
  { id: 'FL-001', projectId: 'PRJ-001', name: 'Self-study draft.pdf', size: '2.4 MB', uploadedBy: 'Dr. Ahmad', date: '2026-05-10', version: 'v2.1' },
  { id: 'FL-002', projectId: 'PRJ-001', name: 'Evidence matrix.xlsx', size: '1.1 MB', uploadedBy: 'Sara', date: '2026-05-11', version: 'v4.0' }
];

export const projectMeetings = [
  { id: 'MT-001', projectId: 'PRJ-001', title: 'Weekly Progress Review', date: '2026-05-12', time: '10:00 AM', attendees: 'Dr. Ahmad, Sara, Khalid', status: 'Completed' },
  { id: 'MT-002', projectId: 'PRJ-001', title: 'Standard 4 Verification', date: '2026-05-15', time: '01:00 PM', attendees: 'Sara, Noura', status: 'Scheduled' }
];

export const projectActivity = [
  { id: 'ACT-001', projectId: 'PRJ-001', user: 'Sara', action: 'Uploaded Evidence Matrix', date: '2026-05-11 02:30 PM' },
  { id: 'ACT-002', projectId: 'PRJ-001', user: 'Dr. Ahmad', action: 'Approved Milestone: Preparing self-study', date: '2026-05-10 11:15 AM' }
];

// Accreditation Master Data
export const accreditationMasterData = [
  { id: 'MD-001', type: 'College', name: 'College of Computer and Information Technology', owner: 'Dean Office', status: 'Approved', updated: '2026-05-09' },
  { id: 'MD-002', type: 'Accreditation Body', name: 'NCAAA', owner: 'Quality Manager', status: 'Approved', updated: '2026-05-08' },
  { id: 'MD-003', type: 'Accreditation Body', name: 'ABET', owner: 'Quality Manager', status: 'Approved', updated: '2026-05-08' }
];

export const accreditationPrograms = [
  { id: 'cs-bsc', name: 'Computer Science', college: 'CCIT', degree: 'Bachelor', body: 'NCAAA', status: 'Full Accreditation', updated: '2026-05-10' },
  { id: 'it-bsc', name: 'Information Technology', college: 'CCIT', degree: 'Bachelor', body: 'NCAAA', status: 'Eligible', updated: '2026-05-12' }
];

export const accreditationRequirements = [
  { id: 'REQ-001', program: 'Information Technology', document: 'Self-study evidence index', status: 'Complete', uploaded: '2026-05-01', due: '2026-05-20' },
  { id: 'REQ-002', program: 'Information Technology', document: 'Program specification', status: 'Incomplete', uploaded: '2026-04-26', due: '2026-05-18' }
];

export const selfStudyGaps = [
  { id: 'SS-001', program: 'Information Technology', standard: 'Teaching and Learning', score: '3.20', readiness: 'Ready', gap: 'Indirect assessment evidence update needed', owner: 'Assessment Unit', status: 'In Progress' }
];

export const evidenceRepository = [
  { id: 'EV-001', evidence: 'PLO assessment report', program: 'Computer Science', standard: 'Teaching and Learning', version: 'v3', uploaded: '2026-05-03', approval: 'Approved' }
];

export const reviewsVisits = [
  { id: 'RV-001', program: 'Information Technology', reviewer: 'Internal Reviewer', visitType: 'Mock Visit', date: '2026-05-22', status: 'In Progress' }
];

export const submissionDecisions = [
  { id: 'SUB-001', program: 'Computer Science', packageStatus: 'Locked', submitted: '2026-04-30', decision: 'Full Accreditation', decisionDate: '2026-05-10' }
];

export const governanceRoles = [
  { id: 'ROLE-001', role: 'System Admin', scope: 'All colleges', permission: 'Users, roles, settings', status: 'Approved' },
  { id: 'ROLE-002', role: 'Deanship of Quality', scope: 'All accreditation projects', permission: 'Full access', status: 'Approved' }
];

export const accreditationActionLogs = [
  { id: 'ACT-001', program: 'Computer Science', action: 'Accreditation status confirmed', actor: 'Quality Manager', timestamp: '2026-05-10 11:45', status: 'Approved' }
];

export const postAccreditationFollowUp = [
  { id: 'PA-001', program: 'Computer Science', item: 'Annual report submission', due: '2027-05-10', status: 'Planned' }
];

export const projectTimePlan = [
  { id: 'TP-001', projectName: 'Institutional accreditation readiness', plannedStart: '2026-04-01', plannedEnd: '2026-08-30', actualStart: '2026-04-03', actualEnd: '2026-09-06', delay: '7 days', status: 'In Progress', plannedOffset: 3, plannedWidth: 54, actualOffset: 5, actualWidth: 58 },
  { id: 'TP-002', projectName: 'Program specification review', plannedStart: '2026-05-01', plannedEnd: '2026-07-15', actualStart: '2026-05-05', actualEnd: '2026-07-28', delay: '13 days', status: 'Pending Review', plannedOffset: 22, plannedWidth: 31, actualOffset: 25, actualWidth: 35 }
];

export const projectRisksIssues = [
  { id: 'RI-001', projectName: 'Institutional accreditation readiness', item: 'Late evidence uploads', category: 'Risk', impact: 'High', owner: 'Quality Manager', treatmentPlan: 'Reassign tasks', escalation: 'Escalated', status: 'In Progress' }
];

export const projectNotifications = [
  { id: 'NT-001', trigger: 'Overdue task reminder', projectName: 'Institutional readiness', channel: 'Email', recipients: 'Team', deadline: '2026-05-22', status: 'Active' }
];

export const projectCollaboration = [
  { id: 'CO-001', projectName: 'Institutional readiness', comment: 'Review standard 1', file: 'std1.pdf', meeting: 'Weekly', minutes: 'shared', activity: 'Updated', status: 'Active' }
];

export const programReviewItems = [
  { id: 'PR-001', item: 'Vision & Mission', owner: 'Committee', workflow: 'Draft -> Review -> Approve', version: 'v4', status: 'In Progress', updated: '2026-05-08' }
];

export const learningOutcomeItems = [
  { id: 'LO-001', level: 'Institution', outcome: 'Graduate attributes', matrix: 'Mapped', assessment: 'Survey', achievement: '86%', status: 'Approved' }
];

export const projectExecutiveReports = [
  { id: 'PER-001', report: 'Status Report', audience: 'Management', frequency: 'Weekly', source: 'System', status: 'Approved' }
];

export const qualityProjects = [
  { id: 'QP-001', name: 'Institutional readiness', area: 'Institutional', owner: 'Quality Manager', status: 'In Progress', progress: '72%', next: 'Mock visit' },
  { id: 'QP-002', name: 'Program review', area: 'Program Review', owner: 'Committee', status: 'Pending', progress: '45%', next: 'Feedback' }
];
