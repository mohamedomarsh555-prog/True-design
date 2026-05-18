export const universityNode = {
  id: 'TRUE',
  name: 'Taif University',
  nameAr: 'جامعة الطائف',
  readiness: 73,
  standardsCompletion: 76,
  evidenceCompletion: 69,
  kpiAchievement: 78,
  status: 'In Progress',
  lastUpdate: '2026-05-15',
};

export const colleges = [
  {
    id: 'ccit',
    code: 'CCIT',
    name: 'College of Computer and Information Technology',
    nameAr: 'كلية الحاسب وتقنية المعلومات',
    dean: 'Dr. Maha Al-Harbi',
    owner: 'Dean Office',
    accreditationStatus: 'In Progress',
    readiness: 78,
    programsCount: 4,
    accreditedPrograms: 2,
    recommendations: 9,
    risks: 3,
    reports: 18,
    evidence: 124,
    lastUpdate: '2026-05-15',
  },
  {
    id: 'cob',
    code: 'COB',
    name: 'College of Business',
    nameAr: 'كلية الأعمال',
    dean: 'Dr. Omar Al-Salem',
    owner: 'College Quality Unit',
    accreditationStatus: 'Conditional',
    readiness: 64,
    programsCount: 3,
    accreditedPrograms: 1,
    recommendations: 13,
    risks: 5,
    reports: 12,
    evidence: 86,
    lastUpdate: '2026-05-12',
  },
  {
    id: 'coe',
    code: 'COE',
    name: 'College of Engineering',
    nameAr: 'كلية الهندسة',
    dean: 'Dr. Faisal Al-Qahtani',
    owner: 'Engineering Accreditation Office',
    accreditationStatus: 'Accredited',
    readiness: 88,
    programsCount: 3,
    accreditedPrograms: 3,
    recommendations: 4,
    risks: 1,
    reports: 15,
    evidence: 101,
    lastUpdate: '2026-05-10',
  },
];

export const departments = [
  { id: 'cs-dept', collegeId: 'ccit', name: 'Computer Science', nameAr: 'علوم الحاسب', head: 'Dr. Nora Al-Fahad', programsCount: 2, accreditationStatus: 'In Progress', readiness: 81, recommendations: 4, openTasks: 7, risks: 1 },
  { id: 'is-dept', collegeId: 'ccit', name: 'Information Systems', nameAr: 'نظم المعلومات', head: 'Dr. Sami Al-Yousef', programsCount: 1, accreditationStatus: 'Accredited', readiness: 84, recommendations: 2, openTasks: 3, risks: 1 },
  { id: 'it-dept', collegeId: 'ccit', name: 'Information Technology', nameAr: 'تقنية المعلومات', head: 'Dr. Reem Al-Anzi', programsCount: 1, accreditationStatus: 'Conditional', readiness: 68, recommendations: 3, openTasks: 6, risks: 1 },
  { id: 'acc-dept', collegeId: 'cob', name: 'Accounting', nameAr: 'المحاسبة', head: 'Dr. Lina Al-Mutairi', programsCount: 1, accreditationStatus: 'Conditional', readiness: 61, recommendations: 5, openTasks: 8, risks: 2 },
  { id: 'fin-dept', collegeId: 'cob', name: 'Finance', nameAr: 'التمويل', head: 'Dr. Yasser Al-Rashid', programsCount: 1, accreditationStatus: 'In Progress', readiness: 67, recommendations: 4, openTasks: 5, risks: 2 },
  { id: 'mgt-dept', collegeId: 'cob', name: 'Management', nameAr: 'الإدارة', head: 'Dr. Abeer Al-Dossari', programsCount: 1, accreditationStatus: 'Expired', readiness: 54, recommendations: 4, openTasks: 10, risks: 1 },
  { id: 'civil-dept', collegeId: 'coe', name: 'Civil Engineering', nameAr: 'الهندسة المدنية', head: 'Dr. Khaled Al-Amri', programsCount: 1, accreditationStatus: 'Accredited', readiness: 91, recommendations: 1, openTasks: 2, risks: 0 },
  { id: 'mech-dept', collegeId: 'coe', name: 'Mechanical Engineering', nameAr: 'الهندسة الميكانيكية', head: 'Dr. Huda Al-Ghamdi', programsCount: 1, accreditationStatus: 'Accredited', readiness: 87, recommendations: 2, openTasks: 3, risks: 1 },
  { id: 'ee-dept', collegeId: 'coe', name: 'Electrical Engineering', nameAr: 'الهندسة الكهربائية', head: 'Dr. Turki Al-Otaibi', programsCount: 1, accreditationStatus: 'Accredited', readiness: 86, recommendations: 1, openTasks: 2, risks: 0 },
];

export const academicPrograms = [
  {
    id: 'cs',
    collegeId: 'ccit',
    departmentId: 'cs-dept',
    code: 'CS',
    name: 'Computer Science',
    nameAr: 'علوم الحاسب',
    degree: 'Bachelor',
    accreditationStatus: 'Accredited',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2024-09-01',
    accreditationEndDate: '2028-08-31',
    coordinator: 'Dr. Ahmed Al-Zahrani',
    readiness: 88,
    evidenceCount: 38,
    standardsCompleted: 7,
    standardsTotal: 8,
    nextVisit: '2026-11-15',
    lastReview: '2026-03-20',
    recommendations: 2,
    risks: 1,
    kpiAchievement: 86,
  },
  {
    id: 'se',
    collegeId: 'ccit',
    departmentId: 'cs-dept',
    code: 'SE',
    name: 'Software Engineering',
    nameAr: 'هندسة البرمجيات',
    degree: 'Bachelor',
    accreditationStatus: 'In Progress',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2025-01-15',
    accreditationEndDate: '2027-12-31',
    coordinator: 'Dr. Sara Al-Qahtani',
    readiness: 74,
    evidenceCount: 29,
    standardsCompleted: 5,
    standardsTotal: 8,
    nextVisit: '2026-10-10',
    lastReview: '2026-02-18',
    recommendations: 4,
    risks: 1,
    kpiAchievement: 77,
  },
  {
    id: 'ai',
    collegeId: 'ccit',
    departmentId: 'cs-dept',
    code: 'AI',
    name: 'Artificial Intelligence',
    nameAr: 'الذكاء الاصطناعي',
    degree: 'Bachelor',
    accreditationStatus: 'Under Review',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2026-02-01',
    accreditationEndDate: '2028-01-31',
    coordinator: 'Dr. Noura Al-Fahad',
    readiness: 69,
    evidenceCount: 24,
    standardsCompleted: 4,
    standardsTotal: 8,
    nextVisit: '2027-01-22',
    lastReview: '2026-04-05',
    recommendations: 5,
    risks: 2,
    kpiAchievement: 71,
  },
  {
    id: 'it',
    collegeId: 'ccit',
    departmentId: 'it-dept',
    code: 'IT',
    name: 'Information Technology',
    nameAr: 'تقنية المعلومات',
    degree: 'Bachelor',
    accreditationStatus: 'Conditional',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2024-10-01',
    accreditationEndDate: '2026-09-30',
    coordinator: 'Dr. Reem Al-Anzi',
    readiness: 68,
    evidenceCount: 27,
    standardsCompleted: 5,
    standardsTotal: 8,
    nextVisit: '2026-12-05',
    lastReview: '2026-01-30',
    recommendations: 3,
    risks: 1,
    kpiAchievement: 70,
  },
  {
    id: 'is',
    collegeId: 'ccit',
    departmentId: 'is-dept',
    code: 'IS',
    name: 'Information Systems',
    nameAr: 'نظم المعلومات',
    degree: 'Bachelor',
    accreditationStatus: 'Accredited',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2024-09-01',
    accreditationEndDate: '2028-08-31',
    coordinator: 'Dr. Sami Al-Yousef',
    readiness: 84,
    evidenceCount: 31,
    standardsCompleted: 7,
    standardsTotal: 8,
    nextVisit: '2027-02-12',
    lastReview: '2026-03-11',
    recommendations: 2,
    risks: 1,
    kpiAchievement: 82,
  },
  {
    id: 'acc',
    collegeId: 'cob',
    departmentId: 'acc-dept',
    code: 'ACC',
    name: 'Accounting',
    nameAr: 'المحاسبة',
    degree: 'Bachelor',
    accreditationStatus: 'Conditional',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2024-03-01',
    accreditationEndDate: '2026-02-28',
    coordinator: 'Dr. Lina Al-Mutairi',
    readiness: 61,
    evidenceCount: 22,
    standardsCompleted: 4,
    standardsTotal: 8,
    nextVisit: '2026-09-18',
    lastReview: '2026-02-01',
    recommendations: 5,
    risks: 2,
    kpiAchievement: 64,
  },
  {
    id: 'fin',
    collegeId: 'cob',
    departmentId: 'fin-dept',
    code: 'FIN',
    name: 'Finance',
    nameAr: 'التمويل',
    degree: 'Bachelor',
    accreditationStatus: 'In Progress',
    accreditationBody: 'AACSB',
    accreditationStartDate: '2025-09-01',
    accreditationEndDate: '2028-08-31',
    coordinator: 'Dr. Yasser Al-Rashid',
    readiness: 67,
    evidenceCount: 25,
    standardsCompleted: 5,
    standardsTotal: 9,
    nextVisit: '2027-03-09',
    lastReview: '2026-04-01',
    recommendations: 4,
    risks: 2,
    kpiAchievement: 69,
  },
  {
    id: 'mgt',
    collegeId: 'cob',
    departmentId: 'mgt-dept',
    code: 'MGT',
    name: 'Management',
    nameAr: 'الإدارة',
    degree: 'Bachelor',
    accreditationStatus: 'Expired',
    accreditationBody: 'NCAAA',
    accreditationStartDate: '2022-09-01',
    accreditationEndDate: '2025-08-31',
    coordinator: 'Dr. Abeer Al-Dossari',
    readiness: 54,
    evidenceCount: 18,
    standardsCompleted: 3,
    standardsTotal: 8,
    nextVisit: '2026-08-30',
    lastReview: '2025-11-20',
    recommendations: 4,
    risks: 3,
    kpiAchievement: 58,
  },
  {
    id: 'civil',
    collegeId: 'coe',
    departmentId: 'civil-dept',
    code: 'CIV',
    name: 'Civil Engineering',
    nameAr: 'الهندسة المدنية',
    degree: 'Bachelor',
    accreditationStatus: 'Accredited',
    accreditationBody: 'ABET',
    accreditationStartDate: '2024-09-01',
    accreditationEndDate: '2029-08-31',
    coordinator: 'Dr. Khaled Al-Amri',
    readiness: 91,
    evidenceCount: 36,
    standardsCompleted: 8,
    standardsTotal: 8,
    nextVisit: '2027-04-20',
    lastReview: '2026-03-25',
    recommendations: 1,
    risks: 0,
    kpiAchievement: 90,
  },
  {
    id: 'mech',
    collegeId: 'coe',
    departmentId: 'mech-dept',
    code: 'MEC',
    name: 'Mechanical Engineering',
    nameAr: 'الهندسة الميكانيكية',
    degree: 'Bachelor',
    accreditationStatus: 'Accredited',
    accreditationBody: 'ABET',
    accreditationStartDate: '2024-09-01',
    accreditationEndDate: '2029-08-31',
    coordinator: 'Dr. Huda Al-Ghamdi',
    readiness: 87,
    evidenceCount: 33,
    standardsCompleted: 7,
    standardsTotal: 8,
    nextVisit: '2027-05-10',
    lastReview: '2026-03-01',
    recommendations: 2,
    risks: 1,
    kpiAchievement: 85,
  },
  {
    id: 'ee',
    collegeId: 'coe',
    departmentId: 'ee-dept',
    code: 'EE',
    name: 'Electrical Engineering',
    nameAr: 'الهندسة الكهربائية',
    degree: 'Bachelor',
    accreditationStatus: 'Accredited',
    accreditationBody: 'ABET',
    accreditationStartDate: '2024-09-01',
    accreditationEndDate: '2029-08-31',
    coordinator: 'Dr. Turki Al-Otaibi',
    readiness: 86,
    evidenceCount: 32,
    standardsCompleted: 7,
    standardsTotal: 8,
    nextVisit: '2027-05-25',
    lastReview: '2026-02-28',
    recommendations: 1,
    risks: 0,
    kpiAchievement: 84,
  },
];

export const accreditationBodyStatusOptions = [
  'Accredited',
  'Conditional',
  'Under Review',
  'In Progress',
  'Eligible',
  'Not Started',
  'Not Accredited',
  'Expired',
];

export const programAccreditationBodies = [
  { id: 'cs-ncaaa', programId: 'cs', name: 'NCAAA', nameAr: 'هيئة تقويم التعليم والتدريب', scope: 'National program accreditation', scopeAr: 'الاعتماد البرامجي الوطني', status: 'Accredited', owner: 'Quality Unit', nextReview: '2026-11-15' },
  { id: 'cs-abet', programId: 'cs', name: 'ABET', nameAr: 'ABET', scope: 'Computing accreditation track', scopeAr: 'مسار اعتماد الحوسبة', status: 'Under Review', owner: 'Program Coordinator', nextReview: '2027-02-10' },
  { id: 'se-ncaaa', programId: 'se', name: 'NCAAA', nameAr: 'هيئة تقويم التعليم والتدريب', scope: 'National program accreditation', scopeAr: 'الاعتماد البرامجي الوطني', status: 'In Progress', owner: 'Program Coordinator', nextReview: '2026-10-10' },
  { id: 'se-abet', programId: 'se', name: 'ABET', nameAr: 'ABET', scope: 'Software engineering track', scopeAr: 'مسار هندسة البرمجيات', status: 'Not Started', owner: 'Department Head', nextReview: '2027-03-18' },
  { id: 'ai-ncaaa', programId: 'ai', name: 'NCAAA', nameAr: 'هيئة تقويم التعليم والتدريب', scope: 'Eligibility and readiness review', scopeAr: 'مراجعة الأهلية والجاهزية', status: 'Under Review', owner: 'Quality Officer', nextReview: '2027-01-22' },
  { id: 'it-ncaaa', programId: 'it', name: 'NCAAA', nameAr: 'هيئة تقويم التعليم والتدريب', scope: 'Conditional accreditation follow-up', scopeAr: 'متابعة الاعتماد المشروط', status: 'Conditional', owner: 'IT Department', nextReview: '2026-12-05' },
  { id: 'is-ncaaa', programId: 'is', name: 'NCAAA', nameAr: 'هيئة تقويم التعليم والتدريب', scope: 'National program accreditation', scopeAr: 'الاعتماد البرامجي الوطني', status: 'Accredited', owner: 'Quality Unit', nextReview: '2027-02-12' },
  { id: 'fin-aacsb', programId: 'fin', name: 'AACSB', nameAr: 'AACSB', scope: 'Business accreditation track', scopeAr: 'مسار اعتماد كليات الأعمال', status: 'In Progress', owner: 'College Quality Unit', nextReview: '2027-03-09' },
  { id: 'civil-abet', programId: 'civil', name: 'ABET', nameAr: 'ABET', scope: 'Engineering accreditation', scopeAr: 'الاعتماد الهندسي', status: 'Accredited', owner: 'Engineering Accreditation Office', nextReview: '2027-04-20' },
  { id: 'mech-abet', programId: 'mech', name: 'ABET', nameAr: 'ABET', scope: 'Engineering accreditation', scopeAr: 'الاعتماد الهندسي', status: 'Accredited', owner: 'Engineering Accreditation Office', nextReview: '2027-05-10' },
  { id: 'ee-abet', programId: 'ee', name: 'ABET', nameAr: 'ABET', scope: 'Engineering accreditation', scopeAr: 'الاعتماد الهندسي', status: 'Accredited', owner: 'Engineering Accreditation Office', nextReview: '2027-05-25' },
];

export const accreditationRequirements = [
  { id: 'req-1', programId: 'cs', title: 'Approved program mission and goals', description: 'Mission alignment with university strategy.', status: 'Approved', owner: 'Program Coordinator', dueDate: '2026-06-15', progress: 100, evidence: 2, reviewerNotes: 'Ready for final submission.' },
  { id: 'req-2', programId: 'cs', title: 'PLO assessment cycle evidence', description: 'Annual direct and indirect PLO measurement cycle.', status: 'Under Review', owner: 'Assessment Lead', dueDate: '2026-06-30', progress: 82, evidence: 4, reviewerNotes: 'Add trend explanation.' },
  { id: 'req-3', programId: 'se', title: 'Industry advisory committee package', description: 'Committee membership, minutes, and action tracking.', status: 'In Progress', owner: 'Program Coordinator', dueDate: '2026-07-01', progress: 64, evidence: 1, reviewerNotes: 'Need signed attendance.' },
  { id: 'req-4', programId: 'ai', title: 'Benchmarking data', description: 'Local and international benchmarking evidence.', status: 'Missing', owner: 'Quality Officer', dueDate: '2026-06-20', progress: 32, evidence: 0, reviewerNotes: 'Critical before mock visit.' },
  { id: 'req-5', programId: 'it', title: 'Conditional recommendation closure', description: 'Closure file for previous conditional items.', status: 'In Progress', owner: 'Department Head', dueDate: '2026-05-30', progress: 73, evidence: 3, reviewerNotes: 'Reviewer confirmation pending.' },
  { id: 'req-6', programId: 'mgt', title: 'Faculty workload evidence', description: 'Updated faculty workload and qualification matrix.', status: 'Missing', owner: 'Department Head', dueDate: '2026-06-01', progress: 28, evidence: 0, reviewerNotes: 'High priority evidence gap.' },
];

export const accreditationStandards = [
  { id: 'std-1', programId: 'cs', code: 'S1', title: 'Mission and Goals', completion: 100, criteria: [{ id: 'c1-1', code: '1.1', title: 'Mission alignment', evidence: ['Strategic alignment matrix', 'Program mission approval'] }] },
  { id: 'std-2', programId: 'cs', code: 'S2', title: 'Program Management', completion: 92, criteria: [{ id: 'c2-1', code: '2.1', title: 'Governance roles', evidence: ['Committee minutes', 'Role matrix'] }] },
  { id: 'std-3', programId: 'cs', code: 'S3', title: 'Teaching and Learning', completion: 84, criteria: [{ id: 'c3-2', code: '3.2', title: 'Learning outcomes assessment', evidence: ['PLO report', 'Course assessment samples'] }] },
  { id: 'std-4', programId: 'se', code: 'S3', title: 'Teaching and Learning', completion: 71, criteria: [{ id: 'c4-1', code: '3.1', title: 'Curriculum mapping', evidence: ['Curriculum map', 'Advisory committee notes'] }] },
  { id: 'std-5', programId: 'it', code: 'S4', title: 'Students', completion: 66, criteria: [{ id: 'c5-1', code: '4.1', title: 'Student support', evidence: ['Student handbook', 'Advising records'] }] },
  { id: 'std-6', programId: 'mgt', code: 'S5', title: 'Faculty', completion: 48, criteria: [{ id: 'c6-1', code: '5.1', title: 'Faculty workload', evidence: ['Faculty CVs', 'Workload report'] }] },
];

export const accreditationCriteria = [
  { id: 'crit-1', standardId: 'std-1', title: 'Mission alignment', description: 'Program mission is aligned with Taif University mission.', evaluationScore: 92, status: 'Approved' },
  { id: 'crit-2', standardId: 'std-2', title: 'Governance roles', description: 'Program committees and responsibilities are documented.', evaluationScore: 86, status: 'Under Review' },
  { id: 'crit-3', standardId: 'std-3', title: 'Learning outcomes assessment', description: 'Assessment cycle and improvement actions are complete.', evaluationScore: 78, status: 'In Progress' },
  { id: 'crit-4', standardId: 'std-4', title: 'Curriculum mapping', description: 'Course to PLO mapping is verified.', evaluationScore: 69, status: 'In Progress' },
  { id: 'crit-5', standardId: 'std-5', title: 'Student support', description: 'Advising, appeal, and support services are evidenced.', evaluationScore: 66, status: 'Conditional' },
  { id: 'crit-6', standardId: 'std-6', title: 'Faculty workload', description: 'Faculty workload and staffing levels are sufficient.', evaluationScore: 48, status: 'Missing' },
];

export const accreditationOperationalItems = {
  evidence: [
    { id: 'ev-1', programId: 'cs', collegeId: 'ccit', departmentId: 'cs-dept', name: 'Program self-study evidence index', status: 'Approved', type: 'PDF', updated: '2026-05-11' },
    { id: 'ev-2', programId: 'se', collegeId: 'ccit', departmentId: 'cs-dept', name: 'PLO assessment samples', status: 'Under Review', type: 'Folder', updated: '2026-05-12' },
    { id: 'ev-3', programId: 'mgt', collegeId: 'cob', departmentId: 'mgt-dept', name: 'Faculty workload evidence', status: 'Missing', type: 'XLSX', updated: '2026-05-09' },
  ],
  risks: [
    { id: 'ar-1', programId: 'mgt', collegeId: 'cob', departmentId: 'mgt-dept', title: 'Expired accreditation evidence gaps', level: 'Critical', owner: 'Management Department', due: '2026-06-01' },
    { id: 'ar-2', programId: 'ai', collegeId: 'ccit', departmentId: 'cs-dept', title: 'New program benchmark data incomplete', level: 'High', owner: 'Computer Science Department', due: '2026-06-15' },
    { id: 'ar-3', programId: 'it', collegeId: 'ccit', departmentId: 'it-dept', title: 'Conditional recommendation pending closure', level: 'Medium', owner: 'IT Department', due: '2026-05-30' },
  ],
  recommendations: [
    { id: 'rec-1', programId: 'se', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Strengthen industry advisory committee evidence', status: 'Open', due: '2026-07-01' },
    { id: 'rec-2', programId: 'acc', collegeId: 'cob', departmentId: 'acc-dept', title: 'Document course-level indirect assessment cycle', status: 'Open', due: '2026-06-20' },
    { id: 'rec-3', programId: 'cs', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Improve graduate attribute trend reporting', status: 'In Progress', due: '2026-08-15' },
  ],
  visits: [
    { id: 'visit-1', programId: 'se', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Mock review visit', date: '2026-10-10', status: 'Scheduled' },
    { id: 'visit-2', programId: 'mgt', collegeId: 'cob', departmentId: 'mgt-dept', title: 'Eligibility recovery visit', date: '2026-08-30', status: 'Critical' },
    { id: 'visit-3', programId: 'civil', collegeId: 'coe', departmentId: 'civil-dept', title: 'ABET follow-up visit', date: '2027-04-20', status: 'Scheduled' },
  ],
  tasks: [
    { id: 'task-1', programId: 'se', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Upload advisory committee minutes', status: 'In Progress', owner: 'Program Coordinator', due: '2026-05-28' },
    { id: 'task-2', programId: 'mgt', collegeId: 'cob', departmentId: 'mgt-dept', title: 'Close expired accreditation evidence gaps', status: 'Delayed', owner: 'Department Head', due: '2026-05-20' },
    { id: 'task-3', programId: 'cs', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Publish KPI annual trend report', status: 'Under Review', owner: 'KPI Owner', due: '2026-06-05' },
  ],
  improvementPlans: [
    { id: 'imp-1', programId: 'mgt', collegeId: 'cob', departmentId: 'mgt-dept', title: 'Accreditation recovery plan', progress: 42, status: 'In Progress' },
    { id: 'imp-2', programId: 'se', collegeId: 'ccit', departmentId: 'cs-dept', title: 'Industry engagement improvement plan', progress: 67, status: 'In Progress' },
    { id: 'imp-3', programId: 'it', collegeId: 'ccit', departmentId: 'it-dept', title: 'Conditional recommendation closure plan', progress: 73, status: 'Under Review' },
  ],
};

export const accreditationMilestones = [
  { id: 'ms-1', programId: 'cs', title: 'Self-study finalization', status: 'Under Review', progress: 88, due: '2026-06-20' },
  { id: 'ms-2', programId: 'se', title: 'Evidence collection', status: 'In Progress', progress: 67, due: '2026-07-10' },
  { id: 'ms-3', programId: 'it', title: 'Recommendation closure', status: 'In Progress', progress: 73, due: '2026-05-30' },
  { id: 'ms-4', programId: 'mgt', title: 'Eligibility recovery', status: 'Delayed', progress: 42, due: '2026-06-01' },
];

export function getCollegeDepartments(collegeId) {
  return departments.filter((department) => department.collegeId === collegeId);
}

export function getDepartmentPrograms(departmentId) {
  return academicPrograms.filter((program) => program.departmentId === departmentId);
}

export function getCollegePrograms(collegeId) {
  return academicPrograms.filter((program) => program.collegeId === collegeId);
}

export function getProgramStandards(programId) {
  const specific = accreditationStandards.filter((standard) => standard.programId === programId);
  if (specific.length) return specific;
  return accreditationStandards.slice(0, 3).map((standard, index) => ({
    ...standard,
    id: `${programId}-${standard.id}`,
    programId,
    completion: Math.max(35, standard.completion - index * 7),
  }));
}

export function getProgramCriteria(programId) {
  const standards = getProgramStandards(programId);
  return standards.flatMap((standard) => {
    const linked = accreditationCriteria.filter((criterion) => criterion.standardId === standard.id);
    if (linked.length) return linked;
    return [{
      id: `${standard.id}-criterion`,
      standardId: standard.id,
      title: `${standard.code} readiness criterion`,
      description: `Criterion evidence for ${standard.title}.`,
      evaluationScore: standard.completion,
      status: standard.completion > 80 ? 'Approved' : standard.completion > 60 ? 'In Progress' : 'Missing',
    }];
  });
}

export function getProgramAccreditationItems(programId) {
  return {
    requirements: accreditationRequirements.filter((item) => item.programId === programId),
    standards: getProgramStandards(programId),
    criteria: getProgramCriteria(programId),
    evidence: accreditationOperationalItems.evidence.filter((item) => item.programId === programId),
    risks: accreditationOperationalItems.risks.filter((item) => item.programId === programId),
    recommendations: accreditationOperationalItems.recommendations.filter((item) => item.programId === programId),
    visits: accreditationOperationalItems.visits.filter((item) => item.programId === programId),
    tasks: accreditationOperationalItems.tasks.filter((item) => item.programId === programId),
    improvementPlans: accreditationOperationalItems.improvementPlans.filter((item) => item.programId === programId),
    milestones: accreditationMilestones.filter((item) => item.programId === programId),
  };
}

export function getProgramAccreditationBodies(program) {
  const linked = programAccreditationBodies.filter((item) => item.programId === program.id);
  if (linked.length) return linked;

  return [{
    id: `${program.id}-${program.accreditationBody.toLowerCase()}`,
    programId: program.id,
    name: program.accreditationBody,
    nameAr: program.accreditationBody,
    scope: 'Program accreditation',
    scopeAr: 'اعتماد البرنامج',
    status: program.accreditationStatus,
    owner: program.coordinator,
    nextReview: program.nextVisit,
  }];
}

export function getAccreditationSummary() {
  const base = getHierarchySummary();
  const conditional = academicPrograms.filter((program) => program.accreditationStatus === 'Conditional').length;
  const unaccredited = academicPrograms.filter((program) => ['Expired'].includes(program.accreditationStatus)).length;
  const openRecommendations = accreditationOperationalItems.recommendations.filter((item) => item.status !== 'Closed').length;
  const upcomingVisits = accreditationOperationalItems.visits.filter((item) => ['Scheduled', 'Critical'].includes(item.status)).length;
  const missingEvidence = accreditationOperationalItems.evidence.filter((item) => ['Missing'].includes(item.status)).length
    + accreditationRequirements.filter((item) => item.status === 'Missing').length;
  return {
    ...base,
    conditional,
    unaccredited,
    averageReadiness: base.universityProgress,
    openRecommendations,
    upcomingVisits,
    missingEvidence,
  };
}

export function getHierarchySummary() {
  const accredited = academicPrograms.filter((program) => program.accreditationStatus === 'Accredited').length;
  const underAccreditation = academicPrograms.filter((program) => ['Under Review', 'In Progress', 'Conditional'].includes(program.accreditationStatus)).length;
  const critical = academicPrograms.filter((program) => ['Expired'].includes(program.accreditationStatus) || program.readiness < 60).length;
  return {
    colleges: colleges.length,
    departments: departments.length,
    programs: academicPrograms.length,
    accredited,
    underAccreditation,
    critical,
    universityProgress: Math.round(academicPrograms.reduce((sum, program) => sum + program.readiness, 0) / academicPrograms.length),
  };
}
