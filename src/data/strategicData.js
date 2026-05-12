
export const strategicPlans = [
  {
    id: 'PLAN-2025-2030',
    name: 'TRUE University Vision 2030',
    nameAr: 'رؤية جامعة TRUE 2030',
    duration: '5 Years',
    startDate: '2025-01-01',
    endDate: '2030-12-31',
    status: 'Active',
    statusAr: 'نشطة',
    progress: 34,
    owner: 'University Board',
    ownerAr: 'مجلس الجامعة',
    stats: {
      objectives: 4,
      projects: 12,
      kpis: 24
    },
    lastUpdate: '2026-05-12 10:00'
  }
];

export const strategicObjectives = [
  {
    id: 'OBJ-001',
    planId: 'PLAN-2025-2030',
    code: 'OBJ1',
    name: 'Excellence in Academic Quality',
    nameAr: 'التميز في الجودة الأكاديمية',
    description: 'Ensure all academic programs meet national and international accreditation standards.',
    descriptionAr: 'ضمان تلبية جميع البرامج الأكاديمية لمعايير الاعتماد الوطنية والدولية.',
    owner: 'Deanship of Quality',
    ownerAr: 'عمادة الجودة',
    weight: 30,
    status: 'On Track',
    statusAr: 'في المسار الصحيح',
    progress: 45,
    startDate: '2025-01-01',
    endDate: '2030-12-31'
  },
  {
    id: 'OBJ-002',
    planId: 'PLAN-2025-2030',
    code: 'OBJ2',
    name: 'Digital Transformation',
    nameAr: 'التحول الرقمي',
    description: 'Modernize university infrastructure and automate all administrative processes.',
    descriptionAr: 'تحديث البنية التحتية للجامعة وأتمتة جميع العمليات الإدارية.',
    owner: 'IT Services',
    ownerAr: 'خدمات تقنية المعلومات',
    weight: 25,
    status: 'At Risk',
    statusAr: 'في خطر',
    progress: 22,
    startDate: '2025-06-01',
    endDate: '2029-12-31'
  }
];

export const strategicInitiatives = [
  {
    id: 'INIT-001',
    objectiveId: 'OBJ-001',
    code: 'INIT1.1',
    name: 'Academic Program Review Automation',
    nameAr: 'أتمتة مراجعة البرامج الأكاديمية',
    owner: 'Quality Automation Team',
    status: 'In Progress',
    priority: 'High',
    progress: 68,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    budget: '500,000 SAR'
  },
  {
    id: 'INIT-002',
    objectiveId: 'OBJ-001',
    code: 'INIT1.2',
    name: 'Accreditation Readiness Dashboard',
    nameAr: 'لوحة جاهزية الاعتماد',
    owner: 'Deanship of Quality',
    status: 'Planned',
    priority: 'Medium',
    progress: 10,
    startDate: '2026-07-01',
    endDate: '2027-06-30',
    budget: '200,000 SAR'
  }
];

export const strategicKPIs = [
  {
    id: 'KPI-001',
    objectiveId: 'OBJ-001',
    name: 'Percentage of Accredited Programs',
    nameAr: 'نسبة البرامج المعتمدة',
    measurement: 'Number of accredited programs / Total programs',
    baseline: 40,
    target: 90,
    actual: 55,
    frequency: 'Annual',
    trend: 'Up',
    status: 'On Track',
    owner: 'Deanship of Quality'
  },
  {
    id: 'KPI-002',
    objectiveId: 'OBJ-002',
    name: 'Automation of Administrative Processes',
    nameAr: 'أتمتة العمليات الإدارية',
    measurement: 'Number of automated processes',
    baseline: 20,
    target: 100,
    actual: 35,
    frequency: 'Quarterly',
    trend: 'Steady',
    status: 'At Risk',
    owner: 'IT Services'
  }
];
