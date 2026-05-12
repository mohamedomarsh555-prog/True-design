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
  'Master Data': 'البيانات الأساسية',
  'Accreditation Projects': 'مشاريع الاعتماد',
  'Self Study & Gaps': 'الدراسة الذاتية والثغرات',
  'Reviews & Visits': 'المراجعات والزيارات',
  'Submission & Decision': 'الرفع والقرار',
  'Governance': 'الحوكمة والصلاحيات',
  'Executive Reports': 'التقارير التنفيذية',
  'Accreditation Master Data': 'البيانات الأساسية للاعتماد',
  'Accreditation Standards Library': 'مكتبة معايير الاعتماد',
  'Accreditation Project Lifecycle': 'دورة حياة مشروع الاعتماد',
  'Self Study & Gap Analysis': 'الدراسة الذاتية وتحليل الثغرات',
  'Evidence Repository & Versioning': 'مستودع الشواهد والإصدارات',
  'Reviews, Visits & Responses': 'المراجعات والزيارات والردود',
  'Submission Packages & Decisions': 'حزم الرفع وقرارات الاعتماد',
  'Governance, Roles & Audit': 'الحوكمة والأدوار والتدقيق',
  'Type': 'النوع',
  'Name': 'الاسم',
  'Standard': 'المعيار',
  'Criterion': 'المحك',
  'Response Type': 'نوع الاستجابة',
  'Weight': 'الوزن',
  'Stage': 'المرحلة',
  'Manager': 'المدير',
  'Team': 'الفريق',
  'Risk': 'المخاطر',
  'Score': 'الدرجة',
  'Readiness': 'الجاهزية',
  'Gap': 'الثغرة',
  'Action Plan': 'خطة العمل',
  'Evidence': 'الشاهد',
  'Version': 'الإصدار',
  'Uploaded By': 'رفع بواسطة',
  'Approval': 'الاعتماد',
  'Linked To': 'مرتبط بـ',
  'Visit Type': 'نوع الزيارة',
  'Date': 'التاريخ',
  'Note Status': 'حالة الملاحظات',
  'Response': 'الرد',
  'Package Status': 'حالة الحزمة',
  'Submitted': 'تم الرفع',
  'Visit Report': 'تقرير الزيارة',
  'Decision': 'القرار',
  'Decision Date': 'تاريخ القرار',
  'Next Action': 'الإجراء التالي',
  'Role': 'الدور',
  'Scope': 'النطاق',
  'Permission': 'الصلاحية',
  'Audit': 'التدقيق',
  'Item': 'البند',
  'Workflow': 'مسار العمل',
  'Level': 'المستوى',
  'Outcome': 'المخرج',
  'Matrix': 'المصفوفة',
  'Assessment': 'القياس',
  'Achievement': 'الإنجاز',
  'Report': 'التقرير',
  'Audience': 'الجمهور',
  'Frequency': 'التكرار',
  'Source': 'المصدر',
  'Ready': 'جاهز',
  'Not Ready': 'غير جاهز',
  'Low': 'منخفضة',
  'Medium': 'متوسطة',
  'High': 'عالية',
  'College': 'كلية',
  'Accreditation Body': 'جهة اعتماد',
  'Degree Level': 'مرحلة الدرجة',
  'Mission and Goals': 'الرسالة والأهداف',
  'Program mission alignment': 'مواءمة رسالة البرنامج',
  'Narrative + Evidence': 'سرد + شاهد',
  'Teaching and Learning': 'التعليم والتعلم',
  'PLO assessment cycle': 'دورة قياس مخرجات البرنامج',
  'Indicator + File': 'مؤشر + ملف',
  'Student Outcomes': 'مخرجات الطلاب',
  'Outcome achievement evidence': 'شواهد تحقق المخرجات',
  'Evidence Matrix': 'مصفوفة الشواهد',
  'Continuous Improvement': 'التحسين المستمر',
  'Closed-loop actions': 'إجراءات إغلاق الحلقة',
  'Report + Evidence': 'تقرير + شاهد',
  'Standards Committee': 'لجنة المعايير',
  'Self Study': 'الدراسة الذاتية',
  'Internal Review': 'مراجعة داخلية',
  'External Consultant': 'مستشار خارجي',
  'Eligibility': 'الأهلية',
  'Quality Unit': 'وحدة الجودة',
  'Indirect assessment evidence needs update': 'شواهد القياس غير المباشر تحتاج تحديثاً',
  'Outcome 4 below target': 'المخرج 4 أقل من المستهدف',
  'No critical gaps': 'لا توجد ثغرات حرجة',
  'Update survey evidence by 2026-05-20': 'تحديث شواهد الاستبانة قبل 2026-05-20',
  'Run improvement workshop': 'تنفيذ ورشة تحسين',
  'Maintain monitoring cycle': 'استمرار دورة المتابعة',
  'PLO assessment report': 'تقرير قياس مخرجات البرنامج',
  'Advisory committee minutes': 'محاضر اللجنة الاستشارية',
  'Field training employer survey': 'استبانة جهات التدريب الميداني',
  'Internal Reviewer': 'مراجع داخلي',
  'External Reviewer': 'مراجع خارجي',
  'Mock Visit': 'زيارة تجريبية',
  'Official Visit': 'زيارة رسمية',
  'Follow-up Meeting': 'اجتماع متابعة',
  'Open': 'مفتوحة',
  'Awaiting Review': 'بانتظار المراجعة',
  'Closed': 'مغلقة',
  'Evidence update requested': 'مطلوب تحديث الشواهد',
  'Program response submitted': 'تم رفع رد البرنامج',
  'No additional action': 'لا يوجد إجراء إضافي',
  'Locked': 'مقفلة',
  'Read Only': 'للقراءة فقط',
  'Draft': 'مسودة',
  'Uploaded': 'مرفوع',
  'Annual follow-up': 'متابعة سنوية',
  'Condition action plan': 'خطة معالجة الشروط',
  'Complete pre-submission checklist': 'استكمال قائمة ما قبل الرفع',
  'System Admin': 'مدير النظام',
  'All colleges': 'كل الكليات',
  'All accreditation projects': 'كل مشاريع الاعتماد',
  'Assigned program': 'البرنامج المعين',
  'Assigned review': 'المراجعة المعينة',
  'Users, roles, settings, integrations': 'المستخدمون والأدوار والإعدادات والتكاملات',
  'Standards, reviewers, approvals, dashboards': 'المعايير والمراجعون والاعتمادات واللوحات',
  'Evidence upload, self-study, responses, action plans': 'رفع الشواهد والدراسة الذاتية والردود وخطط العمل',
  'View documents, add notes, review responses': 'عرض الوثائق وإضافة الملاحظات ومراجعة الردود',
  'Required': 'مطلوب',
  'Program Chair': 'رئيس البرنامج',
  'Program vision and mission': 'رؤية ورسالة البرنامج',
  'Course specification CS12': 'توصيف مقرر CS12',
  'Study plan revision': 'مراجعة الخطة الدراسية',
  'Course Coordinator': 'منسق المقرر',
  'Draft -> Department Chair -> Dean -> Final Approval': 'مسودة -> رئيس القسم -> العميد -> اعتماد نهائي',
  'Draft -> Committee Review -> Final Approval': 'مسودة -> مراجعة اللجنة -> اعتماد نهائي',
  'Draft -> Council Review -> Final Approval': 'مسودة -> مراجعة المجلس -> اعتماد نهائي',
  'Institution': 'المؤسسة',
  'Program': 'البرنامج',
  'Course': 'المقرر',
  'Graduate attributes mapped to university outcomes': 'ربط خصائص الخريجين بمخرجات الجامعة',
  'PLO 3 problem solving': 'مخرج البرنامج 3 حل المشكلات',
  'CLO 2 programming basics': 'مخرج المقرر 2 أساسيات البرمجة',
  'PLO 5 teamwork': 'مخرج البرنامج 5 العمل الجماعي',
  'Attributes -> Outcomes': 'الخصائص -> المخرجات',
  'PLO -> Courses -> Assessments': 'مخرجات البرنامج -> المقررات -> أدوات القياس',
  'CLO -> Exam Questions': 'مخرجات المقرر -> أسئلة الاختبار',
  'PLO -> Indirect Survey': 'مخرجات البرنامج -> استبانة غير مباشرة',
  'Survey + Portfolio': 'استبانة + ملف إنجاز',
  'Capstone rubric': 'سلم تقييم مشروع التخرج',
  'Final exam + lab task': 'اختبار نهائي + مهمة معملية',
  'Employer survey': 'استبانة أصحاب العمل',
  'Accreditation status by program': 'حالة الاعتماد حسب البرنامج',
  'Readiness by standard and criterion': 'الجاهزية حسب المعيار والمحك',
  'Open reviewer notes': 'ملاحظات المراجعين المفتوحة',
  'Learning outcomes results': 'نتائج مخرجات التعلم',
  'Senior Management': 'الإدارة العليا',
  'Program Chairs': 'رؤساء البرامج',
  'Monthly': 'شهري',
  'Weekly': 'أسبوعي',
  'Semester': 'فصلي',
  'Programs + Projects': 'البرامج + المشاريع',
  'Self Study + Evidence': 'الدراسة الذاتية + الشواهد',
  'Reviews + Visits': 'المراجعات + الزيارات',
  'Measurement Plans': 'خطط القياس',
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

const masterData = [
  { id: 'MD-001', type: 'College', name: 'College of Computer and Information Technology', owner: 'Dean Office', status: 'Approved', updated: '2026-05-09' },
  { id: 'MD-002', type: 'Accreditation Body', name: 'NCAAA', owner: 'Quality Manager', status: 'Approved', updated: '2026-05-08' },
  { id: 'MD-003', type: 'Accreditation Body', name: 'ABET', owner: 'Quality Manager', status: 'Approved', updated: '2026-05-08' },
  { id: 'MD-004', type: 'Degree Level', name: 'Bachelor', owner: 'Academic Affairs', status: 'Approved', updated: '2026-05-07' },
  { id: 'MD-005', type: 'Degree Level', name: 'Master', owner: 'Academic Affairs', status: 'Approved', updated: '2026-05-07' },
];

const standards = [
  { id: 'STD-001', body: 'NCAAA', standard: 'Mission and Goals', criterion: 'Program mission alignment', responseType: 'Narrative + Evidence', weight: '20%', status: 'Approved' },
  { id: 'STD-002', body: 'NCAAA', standard: 'Teaching and Learning', criterion: 'PLO assessment cycle', responseType: 'Indicator + File', weight: '30%', status: 'In Progress' },
  { id: 'STD-003', body: 'ABET', standard: 'Student Outcomes', criterion: 'Outcome achievement evidence', responseType: 'Evidence Matrix', weight: '35%', status: 'Approved' },
  { id: 'STD-004', body: 'ABET', standard: 'Continuous Improvement', criterion: 'Closed-loop actions', responseType: 'Report + Evidence', weight: '15%', status: 'Pending Submit' },
];

const accreditationProjects = [
  { id: 'PRJ-001', program: 'Computer Science', body: 'NCAAA', stage: 'Post Accreditation', manager: 'Quality Manager', team: 'Standards Committee', progress: '88%', due: '2026-06-15', risk: 'Low', status: 'In Progress' },
  { id: 'PRJ-002', program: 'Information Technology', body: 'NCAAA', stage: 'Self Study', manager: 'Program Coordinator', team: 'Program Committee', progress: '64%', due: '2026-05-30', risk: 'Medium', status: 'In Progress' },
  { id: 'PRJ-003', program: 'Software Engineering', body: 'ABET', stage: 'Internal Review', manager: 'Dean Office', team: 'External Consultant', progress: '52%', due: '2026-06-10', risk: 'High', status: 'Pending Submit' },
  { id: 'PRJ-004', program: 'Information Systems', body: 'NCAAA', stage: 'Eligibility', manager: 'Quality Manager', team: 'Quality Unit', progress: '35%', due: '2026-07-01', risk: 'High', status: 'Not Started' },
];

const selfStudyGaps = [
  { id: 'SS-001', program: 'Information Technology', standard: 'Teaching and Learning', score: '3.20', readiness: 'Ready', gap: 'Indirect assessment evidence needs update', owner: 'Assessment Unit', actionPlan: 'Update survey evidence by 2026-05-20', status: 'In Progress' },
  { id: 'SS-002', program: 'Software Engineering', standard: 'Student Outcomes', score: '2.65', readiness: 'Not Ready', gap: 'Outcome 4 below target', owner: 'Program Committee', actionPlan: 'Run improvement workshop', status: 'Pending Submit' },
  { id: 'SS-003', program: 'Computer Science', standard: 'Continuous Improvement', score: '3.70', readiness: 'Ready', gap: 'No critical gaps', owner: 'Quality Manager', actionPlan: 'Maintain monitoring cycle', status: 'Approved' },
];

const evidenceRepository = [
  { id: 'EV-001', evidence: 'PLO assessment report', program: 'Computer Science', standard: 'Teaching and Learning', version: 'v3', uploadedBy: 'Assessment Unit', uploaded: '2026-05-03', approval: 'Approved', linkedTo: 'STD-002' },
  { id: 'EV-002', evidence: 'Advisory committee minutes', program: 'Information Technology', standard: 'Mission and Goals', version: 'v2', uploadedBy: 'Program Coordinator', uploaded: '2026-04-29', approval: 'Pending Submit', linkedTo: 'STD-001' },
  { id: 'EV-003', evidence: 'Field training employer survey', program: 'Software Engineering', standard: 'Student Outcomes', version: 'v1', uploadedBy: 'Program Committee', uploaded: '2026-04-25', approval: 'In Progress', linkedTo: 'STD-003' },
];

const reviewsVisits = [
  { id: 'RV-001', program: 'Information Technology', reviewer: 'Internal Reviewer', visitType: 'Mock Visit', date: '2026-05-22', noteStatus: 'Open', response: 'Evidence update requested', status: 'In Progress' },
  { id: 'RV-002', program: 'Software Engineering', reviewer: 'External Reviewer', visitType: 'Official Visit', date: '2026-06-05', noteStatus: 'Awaiting Review', response: 'Program response submitted', status: 'Pending Submit' },
  { id: 'RV-003', program: 'Computer Science', reviewer: 'Quality Manager', visitType: 'Follow-up Meeting', date: '2026-05-18', noteStatus: 'Closed', response: 'No additional action', status: 'Approved' },
];

const submissionsDecisions = [
  { id: 'SUB-001', program: 'Computer Science', packageStatus: 'Locked', submitted: '2026-04-30', visitReport: 'Uploaded', decision: 'Full Accreditation', decisionDate: '2026-05-10', nextAction: 'Annual follow-up' },
  { id: 'SUB-002', program: 'Software Engineering', packageStatus: 'Read Only', submitted: '2026-05-01', visitReport: 'Pending Submit', decision: 'Conditional Accreditation', decisionDate: '2026-05-25', nextAction: 'Condition action plan' },
  { id: 'SUB-003', program: 'Information Technology', packageStatus: 'Draft', submitted: 'Not Started', visitReport: 'Not Started', decision: 'Not Started', decisionDate: 'Not Started', nextAction: 'Complete pre-submission checklist' },
];

const governanceRoles = [
  { id: 'ROLE-001', role: 'System Admin', scope: 'All colleges', permission: 'Users, roles, settings, integrations', audit: 'Required', status: 'Approved' },
  { id: 'ROLE-002', role: 'Deanship of Quality', scope: 'All accreditation projects', permission: 'Standards, reviewers, approvals, dashboards', audit: 'Required', status: 'Approved' },
  { id: 'ROLE-003', role: 'Program Chair', scope: 'Assigned program', permission: 'Evidence upload, self-study, responses, action plans', audit: 'Required', status: 'In Progress' },
  { id: 'ROLE-004', role: 'External Reviewer', scope: 'Assigned review', permission: 'View documents, add notes, review responses', audit: 'Required', status: 'Pending Submit' },
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

const programReviewItems = [
  { id: 'PR-001', item: 'Program vision and mission', owner: 'Program Committee', workflow: 'Draft -> Department Chair -> Dean -> Final Approval', version: 'v4', status: 'In Progress', updated: '2026-05-08' },
  { id: 'PR-002', item: 'Course specification CS12', owner: 'Course Coordinator', workflow: 'Draft -> Committee Review -> Final Approval', version: 'v2', status: 'Pending Submit', updated: '2026-05-06' },
  { id: 'PR-003', item: 'Study plan revision', owner: 'Curriculum Committee', workflow: 'Draft -> Council Review -> Final Approval', version: 'v5', status: 'Approved', updated: '2026-05-03' },
];

const learningOutcomeItems = [
  { id: 'LO-001', level: 'Institution', outcome: 'Graduate attributes mapped to university outcomes', matrix: 'Attributes -> Outcomes', assessment: 'Survey + Portfolio', achievement: '86%', status: 'Approved' },
  { id: 'LO-002', level: 'Program', outcome: 'PLO 3 problem solving', matrix: 'PLO -> Courses -> Assessments', assessment: 'Capstone rubric', achievement: '78%', status: 'In Progress' },
  { id: 'LO-003', level: 'Course', outcome: 'CLO 2 programming basics', matrix: 'CLO -> Exam Questions', assessment: 'Final exam + lab task', achievement: '81%', status: 'Approved' },
  { id: 'LO-004', level: 'Program', outcome: 'PLO 5 teamwork', matrix: 'PLO -> Indirect Survey', assessment: 'Employer survey', achievement: '69%', status: 'Pending Submit' },
];

const executiveReports = [
  { id: 'REP-001', report: 'Accreditation status by program', audience: 'Senior Management', frequency: 'Monthly', source: 'Programs + Projects', status: 'Approved' },
  { id: 'REP-002', report: 'Readiness by standard and criterion', audience: 'Deanship of Quality', frequency: 'Weekly', source: 'Self Study + Evidence', status: 'In Progress' },
  { id: 'REP-003', report: 'Open reviewer notes', audience: 'Program Chairs', frequency: 'Weekly', source: 'Reviews + Visits', status: 'Pending Submit' },
  { id: 'REP-004', report: 'Learning outcomes results', audience: 'Assessment Unit', frequency: 'Semester', source: 'Measurement Plans', status: 'Approved' },
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
      { path: 'master-data', label: 'Master Data', icon: 'ti-database' },
      { path: 'projects', label: 'Accreditation Projects', icon: 'ti-stairs-up' },
      { path: 'programs', label: 'Academic Programs', icon: 'ti-school' },
      { path: 'requirements', label: 'Requirements', icon: 'ti-clipboard-check' },
      { path: 'self-study', label: 'Self Study & Gaps', icon: 'ti-report-search' },
      { path: 'evidence', label: 'Evidence Repository', icon: 'ti-archive' },
      { path: 'reviews', label: 'Reviews & Visits', icon: 'ti-users' },
      { path: 'submission', label: 'Submission & Decision', icon: 'ti-send' },
      { path: 'actions', label: 'Action Log', icon: 'ti-history' },
      { path: 'post-accreditation', label: 'Post Accreditation', icon: 'ti-progress-check' },
      { path: 'governance', label: 'Governance', icon: 'ti-shield-lock' },
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
      { path: 'reports', label: 'Executive Reports', icon: 'ti-report-analytics' },
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
  if (activePath === 'master-data') {
    return (
      <>
        <SortableTable
          title="Accreditation Master Data"
          rows={masterData}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'type', label: 'Type' },
            { key: 'name', label: 'Name' },
            { key: 'owner', label: 'Owner' },
            { key: 'status', label: 'Status', type: 'status' },
            { key: 'updated', label: 'Updated' },
          ]}
        />
        <SortableTable
          title="Accreditation Standards Library"
          rows={standards}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'body', label: 'Body' },
            { key: 'standard', label: 'Standard' },
            { key: 'criterion', label: 'Criterion' },
            { key: 'responseType', label: 'Response Type' },
            { key: 'weight', label: 'Weight' },
            { key: 'status', label: 'Status', type: 'status' },
          ]}
        />
      </>
    );
  }

  if (activePath === 'projects') {
    return (
      <>
        <SummaryCards rows={accreditationProjects} />
        <SortableTable
          title="Accreditation Project Lifecycle"
          rows={accreditationProjects}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'program', label: 'Program' },
            { key: 'body', label: 'Body' },
            { key: 'stage', label: 'Stage' },
            { key: 'manager', label: 'Manager' },
            { key: 'team', label: 'Team' },
            { key: 'progress', label: 'Progress' },
            { key: 'due', label: 'Due' },
            { key: 'risk', label: 'Risk' },
            { key: 'status', label: 'Status', type: 'status' },
          ]}
        />
      </>
    );
  }

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

  if (activePath === 'self-study') {
    return (
      <SortableTable
        title="Self Study & Gap Analysis"
        rows={selfStudyGaps}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'program', label: 'Program' },
          { key: 'standard', label: 'Standard' },
          { key: 'score', label: 'Score' },
          { key: 'readiness', label: 'Readiness' },
          { key: 'gap', label: 'Gap' },
          { key: 'owner', label: 'Owner' },
          { key: 'actionPlan', label: 'Action Plan' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'evidence') {
    return (
      <SortableTable
        title="Evidence Repository & Versioning"
        rows={evidenceRepository}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'evidence', label: 'Evidence' },
          { key: 'program', label: 'Program' },
          { key: 'standard', label: 'Standard' },
          { key: 'version', label: 'Version' },
          { key: 'uploadedBy', label: 'Uploaded By' },
          { key: 'uploaded', label: 'Uploaded' },
          { key: 'approval', label: 'Approval', type: 'status' },
          { key: 'linkedTo', label: 'Linked To' },
        ]}
      />
    );
  }

  if (activePath === 'reviews') {
    return (
      <SortableTable
        title="Reviews, Visits & Responses"
        rows={reviewsVisits}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'program', label: 'Program' },
          { key: 'reviewer', label: 'Reviewer' },
          { key: 'visitType', label: 'Visit Type' },
          { key: 'date', label: 'Date' },
          { key: 'noteStatus', label: 'Note Status' },
          { key: 'response', label: 'Response' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'submission') {
    return (
      <SortableTable
        title="Submission Packages & Decisions"
        rows={submissionsDecisions}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'program', label: 'Program' },
          { key: 'packageStatus', label: 'Package Status' },
          { key: 'submitted', label: 'Submitted' },
          { key: 'visitReport', label: 'Visit Report' },
          { key: 'decision', label: 'Decision', type: 'status' },
          { key: 'decisionDate', label: 'Decision Date' },
          { key: 'nextAction', label: 'Next Action' },
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

  if (activePath === 'governance') {
    return (
      <SortableTable
        title="Governance, Roles & Audit"
        rows={governanceRoles}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'role', label: 'Role' },
          { key: 'scope', label: 'Scope' },
          { key: 'permission', label: 'Permission' },
          { key: 'audit', label: 'Audit' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
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
  if (activePath === 'program-review') {
    return (
      <SortableTable
        title="Program Review"
        rows={programReviewItems}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'item', label: 'Item' },
          { key: 'owner', label: 'Owner' },
          { key: 'workflow', label: 'Workflow' },
          { key: 'version', label: 'Version' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'updated', label: 'Updated' },
        ]}
      />
    );
  }

  if (activePath === 'learning-outcomes') {
    return (
      <SortableTable
        title="Learning Outcomes"
        rows={learningOutcomeItems}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'level', label: 'Level' },
          { key: 'outcome', label: 'Outcome' },
          { key: 'matrix', label: 'Matrix' },
          { key: 'assessment', label: 'Assessment' },
          { key: 'achievement', label: 'Achievement' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'reports') {
    return (
      <>
        <SummaryCards rows={executiveReports} />
        <SortableTable
          title="Executive Reports"
          rows={executiveReports}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'report', label: 'Report' },
            { key: 'audience', label: 'Audience' },
            { key: 'frequency', label: 'Frequency' },
            { key: 'source', label: 'Source' },
            { key: 'status', label: 'Status', type: 'status' },
          ]}
        />
      </>
    );
  }

  if (activePath !== 'dashboard') {
    const areaMap = {
      institutional: 'Institutional',
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
