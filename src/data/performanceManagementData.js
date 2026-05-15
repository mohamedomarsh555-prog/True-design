export const pmActors = [
  { id: 'department-head', name: 'Department Head', nameAr: 'رئيس القسم', icon: 'ti-user-shield' },
  { id: 'deputy', name: 'Deputy', nameAr: 'الوكيل', icon: 'ti-users-group' },
  { id: 'general-director', name: 'General Director', nameAr: 'المدير العام', icon: 'ti-building-bank' },
  { id: 'admin', name: 'Admin', nameAr: 'مدير النظام', icon: 'ti-settings' },
];

export const pmUseCases = [
  ['create-sub-goal', 'Create Sub-goal', 'إنشاء هدف فرعي', ['department-head', 'admin'], 'Goals'],
  ['delete-sub-goal', 'Delete Sub-goal', 'حذف هدف فرعي', ['department-head', 'admin'], 'Goals'],
  ['edit-sub-goal', 'Edit Sub-goal', 'تعديل هدف فرعي', ['department-head', 'admin'], 'Goals'],
  ['view-sub-goals', 'View Sub-goals', 'عرض الأهداف الفرعية', ['department-head', 'deputy', 'general-director', 'admin'], 'Goals'],
  ['create-kpi-data', 'Create KPI Data', 'إنشاء بيانات مؤشر', ['department-head', 'admin'], 'KPI Data'],
  ['update-kpi-data', 'Update KPI Data', 'تحديث بيانات مؤشر', ['department-head', 'admin'], 'KPI Data'],
  ['delete-kpi-data', 'Delete KPI Data', 'حذف بيانات مؤشر', ['department-head', 'admin'], 'KPI Data'],
  ['view-kpi-data', 'View KPI Data', 'عرض بيانات المؤشرات', ['department-head', 'deputy', 'general-director', 'admin'], 'KPI Data'],
  ['attach-evidence', 'Attach Evidence', 'إرفاق شاهد', ['department-head', 'admin'], 'Evidence'],
  ['view-evidence', 'View Evidence', 'عرض الشواهد', ['department-head', 'deputy', 'general-director', 'admin'], 'Evidence'],
  ['view-department-dashboard', 'View Department Dashboard', 'عرض لوحة القسم', ['department-head', 'deputy', 'general-director', 'admin'], 'Dashboards'],
  ['create-deputy-goal', 'Create Deputy-Level Strategic Goal', 'إنشاء هدف على مستوى الوكالة', ['deputy', 'admin'], 'Goals'],
  ['edit-deputy-goal', 'Edit Deputy-Level Strategic Goal', 'تعديل هدف على مستوى الوكالة', ['deputy', 'admin'], 'Goals'],
  ['delete-deputy-goal', 'Delete Deputy-Level Strategic Goal', 'حذف هدف على مستوى الوكالة', ['deputy', 'admin'], 'Goals'],
  ['view-deputy-goal', 'View Deputy-Level Strategic Goal', 'عرض أهداف الوكالة', ['deputy', 'general-director', 'admin'], 'Goals'],
  ['assign-sub-goals', 'Assign Sub Goals to Deputy Goals', 'ربط الأهداف الفرعية بأهداف الوكالة', ['department-head', 'admin'], 'Alignment'],
  ['view-deputy-dashboard', 'View Deputy Dashboard', 'عرض لوحة الوكالة', ['deputy', 'general-director', 'admin'], 'Dashboards'],
  ['create-top-goal', 'Create Top-level Strategic Goal', 'إنشاء هدف استراتيجي أعلى', ['general-director', 'admin'], 'Goals'],
  ['delete-top-goal', 'Delete Top-level Strategic Goal', 'حذف هدف استراتيجي أعلى', ['general-director', 'admin'], 'Goals'],
  ['view-top-goal', 'View Top-level Strategic Goal', 'عرض الأهداف الاستراتيجية العليا', ['deputy', 'general-director', 'admin'], 'Goals'],
  ['edit-top-goal', 'Edit Top-Level Strategic Goal', 'تعديل هدف استراتيجي أعلى', ['general-director', 'admin'], 'Goals'],
  ['assign-deputy-goals', 'Assign Deputy Goals to Top-level Goals', 'ربط أهداف الوكالة بالأهداف العليا', ['deputy', 'admin'], 'Alignment'],
  ['view-directorate-dashboard', 'View Directorate Dashboard', 'عرض لوحة المديرية العامة', ['general-director', 'admin'], 'Dashboards'],
  ['view-goals-map', 'View Goals Map', 'عرض خريطة الأهداف', ['department-head', 'deputy', 'general-director', 'admin'], 'Alignment'],
  ['view-vision-mission', 'View Vision and Mission', 'عرض الرؤية والرسالة', ['general-director', 'deputy', 'admin'], 'Governance'],
  ['edit-vision-mission', 'Edit Vision and Mission', 'تعديل الرؤية والرسالة', ['general-director', 'deputy', 'admin'], 'Governance'],
  ['generate-report', 'Generate Performance Report', 'توليد تقرير الأداء', ['department-head', 'deputy', 'general-director', 'admin'], 'Reports'],
  ['create-user', 'Create User Account', 'إنشاء حساب مستخدم', ['admin'], 'Administration'],
  ['view-user', 'View User Account', 'عرض حساب مستخدم', ['admin'], 'Administration'],
  ['update-user', 'Update User Account', 'تحديث حساب مستخدم', ['admin'], 'Administration'],
  ['delete-user', 'Delete User Account', 'حذف حساب مستخدم', ['admin'], 'Administration'],
  ['assign-role', 'Assign Role', 'تعيين صلاحية', ['admin'], 'Administration'],
  ['add-department', 'Add new department', 'إضافة قسم جديد', ['admin'], 'Administration'],
  ['delete-department', 'Delete Department', 'حذف قسم', ['admin'], 'Administration'],
].map(([id, name, nameAr, actors, module]) => ({
  id,
  name,
  nameAr,
  actors,
  module,
  status: 'Applied',
}));

export const directorate = {
  id: 'gd-education',
  name: 'General Directorate of Education',
  nameAr: 'الإدارة العامة للتعليم',
  vision: 'Sustainable excellence in learning outcomes and institutional performance.',
  visionAr: 'تميز مستدام في نواتج التعلم والأداء المؤسسي.',
  mission: 'Enable directorate offices and departments to manage goals, KPIs, evidence, and decisions through trusted performance data.',
  missionAr: 'تمكين الوكالات والأقسام من إدارة الأهداف والمؤشرات والشواهد والقرارات عبر بيانات أداء موثوقة.',
  managerId: 'u-1',
};

export const deputyOffices = [
  { id: 'dep-edu', name: 'Educational Affairs Deputy Office', nameAr: 'وكالة الشؤون التعليمية', managerId: 'u-2' },
  { id: 'dep-support', name: 'Support Services Deputy Office', nameAr: 'وكالة الخدمات المساندة', managerId: 'u-3' },
  { id: 'dep-quality', name: 'Planning and Quality Deputy Office', nameAr: 'وكالة التخطيط والجودة', managerId: 'u-4' },
];

export const pmDepartments = [
  { id: 'dept-curriculum', deputyOfficeId: 'dep-edu', name: 'Curriculum Department', nameAr: 'قسم المناهج', headId: 'u-5' },
  { id: 'dept-schools', deputyOfficeId: 'dep-edu', name: 'School Performance Department', nameAr: 'قسم أداء المدارس', headId: 'u-6' },
  { id: 'dept-hr', deputyOfficeId: 'dep-support', name: 'Human Resources Department', nameAr: 'قسم الموارد البشرية', headId: 'u-7' },
  { id: 'dept-digital', deputyOfficeId: 'dep-support', name: 'Digital Services Department', nameAr: 'قسم الخدمات الرقمية', headId: 'u-8' },
  { id: 'dept-quality', deputyOfficeId: 'dep-quality', name: 'Quality Assurance Department', nameAr: 'قسم ضمان الجودة', headId: 'u-9' },
];

export const topGoals = [
  { id: 'tg-1', number: 'TG-01', title: 'Improve learning outcomes and student readiness', titleAr: 'تحسين نواتج التعلم وجاهزية الطلبة', dueDate: '2026-12-31' },
  { id: 'tg-2', number: 'TG-02', title: 'Raise operational excellence and service quality', titleAr: 'رفع التميز التشغيلي وجودة الخدمات', dueDate: '2026-12-31' },
  { id: 'tg-3', number: 'TG-03', title: 'Strengthen evidence-based planning and governance', titleAr: 'تعزيز التخطيط والحوكمة المبنية على الشواهد', dueDate: '2026-12-31' },
];

export const deputyGoals = [
  { id: 'dg-1', topGoalId: 'tg-1', deputyOfficeId: 'dep-edu', number: 'DG-01', title: 'Improve curriculum implementation quality', titleAr: 'تحسين جودة تطبيق المناهج', dueDate: '2026-10-30' },
  { id: 'dg-2', topGoalId: 'tg-1', deputyOfficeId: 'dep-edu', number: 'DG-02', title: 'Increase school performance review coverage', titleAr: 'زيادة تغطية مراجعات أداء المدارس', dueDate: '2026-11-15' },
  { id: 'dg-3', topGoalId: 'tg-2', deputyOfficeId: 'dep-support', number: 'DG-03', title: 'Digitize priority administrative services', titleAr: 'رقمنة الخدمات الإدارية ذات الأولوية', dueDate: '2026-09-30' },
  { id: 'dg-4', topGoalId: 'tg-3', deputyOfficeId: 'dep-quality', number: 'DG-04', title: 'Improve KPI governance and evidence reliability', titleAr: 'تحسين حوكمة المؤشرات وموثوقية الشواهد', dueDate: '2026-08-31' },
  { id: 'dg-5', topGoalId: null, deputyOfficeId: 'dep-quality', number: 'DG-05', title: 'Build institutional reporting maturity', titleAr: 'بناء نضج التقارير المؤسسية', dueDate: '2026-12-10' },
];

export const subGoals = [
  { id: 'sg-1', deputyGoalId: 'dg-1', departmentId: 'dept-curriculum', number: 'SG-01', title: 'Publish updated curriculum implementation guides', titleAr: 'نشر أدلة تطبيق المناهج المحدثة', dueDate: '2026-06-30' },
  { id: 'sg-2', deputyGoalId: 'dg-2', departmentId: 'dept-schools', number: 'SG-02', title: 'Complete quarterly school performance reviews', titleAr: 'إكمال مراجعات أداء المدارس ربع السنوية', dueDate: '2026-07-15' },
  { id: 'sg-3', deputyGoalId: 'dg-3', departmentId: 'dept-digital', number: 'SG-03', title: 'Launch digital request tracking for schools', titleAr: 'إطلاق تتبع رقمي لطلبات المدارس', dueDate: '2026-09-01' },
  { id: 'sg-4', deputyGoalId: 'dg-4', departmentId: 'dept-quality', number: 'SG-04', title: 'Verify KPI evidence completeness each quarter', titleAr: 'التحقق من اكتمال شواهد المؤشرات ربع سنويا', dueDate: '2026-08-15' },
  { id: 'sg-5', deputyGoalId: null, departmentId: 'dept-hr', number: 'SG-05', title: 'Improve staff training completion tracking', titleAr: 'تحسين متابعة إنجاز تدريب الموظفين', dueDate: '2026-10-10' },
];

export const kpiData = [
  { id: 'kpi-1', subGoalId: 'sg-1', title: 'Curriculum guide adoption rate', titleAr: 'نسبة تبني أدلة المناهج', target: 95, actual: 88, unit: '%', ownerId: 'u-5', frequency: 'Quarterly', updatedAt: '2026-05-12' },
  { id: 'kpi-2', subGoalId: 'sg-1', title: 'Training sessions delivered', titleAr: 'عدد جلسات التدريب المنفذة', target: 24, actual: 21, unit: 'sessions', ownerId: 'u-5', frequency: 'Monthly', updatedAt: '2026-05-11' },
  { id: 'kpi-3', subGoalId: 'sg-2', title: 'Schools reviewed on schedule', titleAr: 'المدارس التي تمت مراجعتها في موعدها', target: 120, actual: 104, unit: 'schools', ownerId: 'u-6', frequency: 'Quarterly', updatedAt: '2026-05-10' },
  { id: 'kpi-4', subGoalId: 'sg-3', title: 'Digital service requests closed within SLA', titleAr: 'طلبات الخدمات الرقمية المغلقة ضمن الاتفاقية', target: 90, actual: 76, unit: '%', ownerId: 'u-8', frequency: 'Monthly', updatedAt: '2026-05-13' },
  { id: 'kpi-5', subGoalId: 'sg-4', title: 'KPI records with approved evidence', titleAr: 'سجلات المؤشرات ذات الشواهد المعتمدة', target: 100, actual: 82, unit: '%', ownerId: 'u-9', frequency: 'Quarterly', updatedAt: '2026-05-14' },
  { id: 'kpi-6', subGoalId: 'sg-5', title: 'Training completion records verified', titleAr: 'سجلات إكمال التدريب التي تم التحقق منها', target: 100, actual: 62, unit: '%', ownerId: 'u-7', frequency: 'Monthly', updatedAt: '2026-05-09' },
];

export const evidenceItems = [
  { id: 'ev-1', kpiId: 'kpi-1', title: 'Signed adoption summary', titleAr: 'ملخص اعتماد الأدلة الموقع', fileType: 'PDF', uploadedBy: 'u-5', uploadedAt: '2026-05-12', isFailureRelated: false, failureType: '', comment: 'Approved by curriculum committee.' },
  { id: 'ev-2', kpiId: 'kpi-3', title: 'Quarterly review workbook', titleAr: 'ملف مراجعات الربع', fileType: 'XLSX', uploadedBy: 'u-6', uploadedAt: '2026-05-10', isFailureRelated: false, failureType: '', comment: 'Validated by deputy office.' },
  { id: 'ev-3', kpiId: 'kpi-4', title: 'Delayed requests evidence', titleAr: 'شاهد الطلبات المتأخرة', fileType: 'PDF', uploadedBy: 'u-8', uploadedAt: '2026-05-13', isFailureRelated: true, failureType: 'Vendor delay', comment: 'Provider outage affected SLA.' },
  { id: 'ev-4', kpiId: 'kpi-6', title: 'Incomplete training records', titleAr: 'سجلات التدريب غير المكتملة', fileType: 'DOCX', uploadedBy: 'u-7', uploadedAt: '2026-05-09', isFailureRelated: true, failureType: 'Missing data', comment: 'Pending department confirmations.' },
];

export const roles = [
  { id: 'role-admin', name: 'Admin', nameAr: 'مدير النظام', permissions: ['all'] },
  { id: 'role-general-director', name: 'General Director', nameAr: 'المدير العام', permissions: ['view-all', 'manage-top-goals', 'edit-vision', 'generate-reports'] },
  { id: 'role-deputy', name: 'Deputy', nameAr: 'الوكيل', permissions: ['view-deputy', 'manage-deputy-goals', 'assign-top-goals', 'generate-reports'] },
  { id: 'role-department-head', name: 'Department Head', nameAr: 'رئيس القسم', permissions: ['view-department', 'manage-sub-goals', 'manage-kpis', 'attach-evidence'] },
];

export const users = [
  { id: 'u-1', firstName: 'Dana', lastName: 'Alshammari', nameAr: 'دانه الشمري', email: 'director@edu.gov.sa', phone: '013-000-1001', roleId: 'role-general-director' },
  { id: 'u-2', firstName: 'Sarah', lastName: 'Alshehri', nameAr: 'سارة الشهري', email: 'deputy.education@edu.gov.sa', phone: '013-000-1002', roleId: 'role-deputy' },
  { id: 'u-3', firstName: 'Fahad', lastName: 'Alqahtani', nameAr: 'فهد القحطاني', email: 'deputy.support@edu.gov.sa', phone: '013-000-1003', roleId: 'role-deputy' },
  { id: 'u-4', firstName: 'Maha', lastName: 'Alharbi', nameAr: 'مها الحربي', email: 'deputy.quality@edu.gov.sa', phone: '013-000-1004', roleId: 'role-deputy' },
  { id: 'u-5', firstName: 'Ghaliah', lastName: 'Fahhad', nameAr: 'غالية فهد', email: 'curriculum.head@edu.gov.sa', phone: '013-000-1005', roleId: 'role-department-head' },
  { id: 'u-6', firstName: 'Omar', lastName: 'Alotaibi', nameAr: 'عمر العتيبي', email: 'schools.head@edu.gov.sa', phone: '013-000-1006', roleId: 'role-department-head' },
  { id: 'u-7', firstName: 'Noura', lastName: 'Aldosari', nameAr: 'نورة الدوسري', email: 'hr.head@edu.gov.sa', phone: '013-000-1007', roleId: 'role-department-head' },
  { id: 'u-8', firstName: 'Ahmed', lastName: 'Alzahrani', nameAr: 'أحمد الزهراني', email: 'digital.head@edu.gov.sa', phone: '013-000-1008', roleId: 'role-department-head' },
  { id: 'u-9', firstName: 'Aljouri', lastName: 'Alotaibi', nameAr: 'الجوري العتيبي', email: 'quality.head@edu.gov.sa', phone: '013-000-1009', roleId: 'role-admin' },
];

export const performanceReports = [
  { id: 'rep-1', title: 'KPI Achievement Rates Report', titleAr: 'تقرير نسب إنجاز المؤشرات', scope: 'KPI', generatedAt: '2026-05-15' },
  { id: 'rep-2', title: 'Sub-goals Achievement Rates Report', titleAr: 'تقرير نسب إنجاز الأهداف الفرعية', scope: 'Sub-goals', generatedAt: '2026-05-15' },
  { id: 'rep-3', title: 'Deputy Goals Achievement Rates Report', titleAr: 'تقرير نسب إنجاز أهداف الوكالة', scope: 'Deputy Goals', generatedAt: '2026-05-15' },
  { id: 'rep-4', title: 'Top Goals Achievement Rates Report', titleAr: 'تقرير نسب إنجاز الأهداف العليا', scope: 'Top Goals', generatedAt: '2026-05-15' },
  { id: 'rep-5', title: 'Departments Achievement Rates Report', titleAr: 'تقرير نسب إنجاز الأقسام', scope: 'Departments', generatedAt: '2026-05-15' },
  { id: 'rep-6', title: 'Deputy Offices Achievement Rates Report', titleAr: 'تقرير نسب إنجاز الوكالات', scope: 'Deputy Offices', generatedAt: '2026-05-15' },
  { id: 'rep-7', title: 'KPI Evidence Report', titleAr: 'تقرير شواهد المؤشرات', scope: 'Evidence', generatedAt: '2026-05-15' },
];

export function localPmName(item, key, language) {
  if (!item) return '';
  return language === 'ar' ? item[`${key}Ar`] || item[key] : item[key];
}

export function getKpiAchievement(kpi) {
  if (!kpi || !Number(kpi.target)) return 0;
  return Math.round((Number(kpi.actual) / Number(kpi.target)) * 100);
}

export function getStatusFromAchievement(value) {
  if (value >= 90) return 'Excellent';
  if (value >= 75) return 'On Track';
  if (value >= 60) return 'Watch';
  return 'At Risk';
}

function average(values) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function getSubGoalAchievement(subGoalId) {
  const linked = kpiData.filter((kpi) => kpi.subGoalId === subGoalId);
  return average(linked.map(getKpiAchievement));
}

export function getDeputyGoalAchievement(deputyGoalId) {
  const linked = subGoals.filter((goal) => goal.deputyGoalId === deputyGoalId);
  return average(linked.map((goal) => getSubGoalAchievement(goal.id)));
}

export function getTopGoalAchievement(topGoalId) {
  const linked = deputyGoals.filter((goal) => goal.topGoalId === topGoalId);
  return average(linked.map((goal) => getDeputyGoalAchievement(goal.id)));
}

export function getDepartmentAchievement(departmentId) {
  const linked = subGoals.filter((goal) => goal.departmentId === departmentId);
  return average(linked.map((goal) => getSubGoalAchievement(goal.id)));
}

export function getDeputyOfficeAchievement(deputyOfficeId) {
  const linked = deputyGoals.filter((goal) => goal.deputyOfficeId === deputyOfficeId);
  return average(linked.map((goal) => getDeputyGoalAchievement(goal.id)));
}

export function getDirectorateAchievement() {
  return average(topGoals.map((goal) => getTopGoalAchievement(goal.id)));
}

export function getPerformanceSummary() {
  const averageKpi = average(kpiData.map(getKpiAchievement));
  const missingLinks = subGoals.filter((goal) => !goal.deputyGoalId).length + deputyGoals.filter((goal) => !goal.topGoalId).length;
  return {
    topGoals: topGoals.length,
    deputyGoals: deputyGoals.length,
    subGoals: subGoals.length,
    kpis: kpiData.length,
    evidences: evidenceItems.length,
    users: users.length,
    departments: pmDepartments.length,
    directorateAchievement: getDirectorateAchievement(),
    averageKpi,
    missingLinks,
    failedEvidence: evidenceItems.filter((item) => item.isFailureRelated).length,
    useCaseCoverage: pmUseCases.length,
  };
}

export function getUseCasesByActor(actorId) {
  return pmUseCases.filter((useCase) => useCase.actors.includes(actorId));
}
