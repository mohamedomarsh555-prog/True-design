
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
  }
];

export const milestones = [
  {
    id: 'MS-001',
    projectId: 'PRJ-001',
    name: 'Preparing self-study',
    nameAr: 'إعداد الدراسة الذاتية',
    description: 'Finalize the draft of the institutional self-study report.',
    descriptionAr: 'الانتهاء من مسودة تقرير الدراسة الذاتية المؤسسية.',
    startDate: '2026-04-01',
    endDate: '2026-05-20',
    status: 'Completed',
    statusAr: 'مكتمل',
    progress: 100,
    owner: 'Dr. Ahmad'
  },
  {
    id: 'MS-002',
    projectId: 'PRJ-001',
    name: 'Evidence collection',
    nameAr: 'جمع الأدلة',
    description: 'Collecting and verifying all supporting evidence for standards.',
    descriptionAr: 'جمع والتحقق من جميع الأدلة الداعمة للمعايير.',
    startDate: '2026-04-15',
    endDate: '2026-06-15',
    status: 'In Progress',
    statusAr: 'قيد التنفيذ',
    progress: 74,
    owner: 'Sara'
  },
  {
    id: 'MS-003',
    projectId: 'PRJ-001',
    name: 'Internal Review',
    nameAr: 'المراجعة الداخلية',
    description: 'Conducting a mock review by the internal committee.',
    descriptionAr: 'إجراء مراجعة تجريبية من قبل اللجنة الداخلية.',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    status: 'Not Started',
    statusAr: 'لم يبدأ',
    progress: 0,
    owner: 'Khalid'
  }
];

export const tasks = [
  {
    id: 'TSK-001',
    milestoneId: 'MS-002',
    projectId: 'PRJ-001',
    title: 'Update evidence matrix',
    titleAr: 'تحديث مصفوفة الأدلة',
    description: 'Map all collected files to the specific NCAAA standards.',
    descriptionAr: 'ربط جميع الملفات المجمعة بمعايير هيئة التقويم والاعتماد.',
    assignedTo: 'Sara',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-05-22',
    dependencies: [],
    subtasks: [
      { id: 'SUB-001', title: 'Verify PLO reports', status: 'Completed' },
      { id: 'SUB-002', title: 'Upload advisory minutes', status: 'In Progress' }
    ],
    comments: [
      { user: 'Dr. Ahmad', text: 'Please ensure version control is followed.', date: '2026-05-10' }
    ],
    attachments: ['matrix_v2.xlsx']
  },
  {
    id: 'TSK-002',
    milestoneId: 'MS-002',
    projectId: 'PRJ-001',
    title: 'Collect committee approvals',
    titleAr: 'جمع اعتمادات اللجان',
    description: 'Obtain signatures for the updated program specifications.',
    descriptionAr: 'الحصول على التواقيع لتوصيفات البرامج المحدثة.',
    assignedTo: 'Khalid',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-05-28',
    dependencies: ['TSK-001'],
    subtasks: [],
    comments: [],
    attachments: []
  },
  {
    id: 'TSK-003',
    milestoneId: 'MS-001',
    projectId: 'PRJ-001',
    title: 'Finalize Chapter 1',
    titleAr: 'الانتهاء من الفصل الأول',
    assignedTo: 'Dr. Ahmad',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-04-30',
    dependencies: [],
    subtasks: [],
    comments: [],
    attachments: ['chapter1_draft.docx']
  }
];

export const risks = [
  {
    id: 'RSK-001',
    projectId: 'PRJ-001',
    title: 'Late evidence uploads',
    titleAr: 'تأخر رفع الأدلة',
    category: 'Operational',
    impact: 'High',
    status: 'Active',
    treatment: 'Reassign evidence tasks and escalate to owner'
  }
];
