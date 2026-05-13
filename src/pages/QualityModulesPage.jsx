import { useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';
import { 
  projects as managedProjectsData, 
  risks, 
  milestones as projectMilestonesData, 
  tasks as projectTasksData,
  accreditationMasterData,
  accreditationPrograms,
  accreditationRequirements,
  selfStudyGaps,
  evidenceRepository,
  reviewsVisits,
  submissionDecisions,
  accreditationActionLogs,
  postAccreditationFollowUp,
  governanceRoles,
  projectTeams,
  projectActivity,
  projectMeetings,
  projectFiles,
  projectTimePlan,
  projectRisksIssues,
  projectNotifications,
  projectCollaboration,
  programReviewItems,
  learningOutcomeItems,
  projectExecutiveReports,
  qualityProjects,
  accreditationStandards,
  accreditationProjects
} from '../data/projectData';
import { strategicPlans, strategicObjectives, strategicInitiatives, strategicKPIs, strategicReports } from '../data/strategicData';

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
  'Projects Management': 'إدارة المشاريع',
  'Milestones': 'المراحل',
  'Tasks Management': 'إدارة المهام',
  'Time Plan': 'الخطة الزمنية',
  'Teams & Resources': 'الموارد والفرق',
  'Risks & Issues': 'المخاطر والقضايا',
  'Notifications': 'التنبيهات والإشعارات',
  'Collaboration': 'التعاون والتواصل',
  'Strategic & Quality Projects Management': 'إدارة المشاريع الاستراتيجية والجودة',
  'Project dashboard with execution plans, milestones, tasks, teams, performance indicators, and schedule follow-up.': 'لوحة مشاريع تحتوي على الخطط التنفيذية والمراحل والمهام والفرق ومؤشرات الأداء والمتابعة الزمنية.',
  'Project Name': 'اسم المشروع',
  'Project Type': 'نوع المشروع',
  'Owning Entity': 'الجهة المالكة',
  'Program / College': 'البرنامج / الكلية',
  'Priority': 'الأولوية',
  'Planned Start': 'البداية المخططة',
  'Planned End': 'النهاية المخططة',
  'Actual Start': 'البداية الفعلية',
  'Actual End': 'النهاية الفعلية',
  'Completion': 'نسبة الإنجاز',
  'Delayed Tasks': 'المهام المتأخرة',
  'Requirements Completion': 'استيفاء المتطلبات',
  'Evidence Completion': 'اكتمال الأدلة',
  'Project Manager': 'مدير المشروع',
  'Members': 'أعضاء الفريق',
  'Reviewers': 'المراجعون',
  'Consultants': 'المستشارون',
  'Assignment Basis': 'أساس التوزيع',
  'Responsible': 'المسؤول',
  'Deadline': 'الموعد النهائي',
  'Dependencies': 'الاعتماديات',
  'Sub Tasks': 'المهام الفرعية',
  'Planned vs Actual Timeline': 'الجدول المخطط مقابل الفعلي',
  'Planned': 'المخطط',
  'Actual': 'الفعلي',
  'Delay': 'التأخير',
  'Critical Alerts': 'التنبيهات الحرجة',
  'Risk / Issue': 'المخاطر / القضية',
  'Category': 'التصنيف',
  'Impact': 'الأثر',
  'Treatment Plan': 'خطة المعالجة',
  'Escalation': 'التصعيد',
  'Trigger': 'المحفز',
  'Channel': 'القناة',
  'Recipients': 'المستلمون',
  'Comment': 'التعليق',
  'Meeting': 'الاجتماع',
  'Minutes': 'محضر الاجتماع',
  'Activity Timeline': 'سجل النشاط',
  'Project Status Report': 'تقرير حالة المشروع',
  'Progress Report': 'تقرير الإنجاز',
  'Delay Report': 'تقرير التأخير',
  'Risk Report': 'تقرير المخاطر',
  'Time Consumption Report': 'تقرير استهلاك الوقت',
  'Executive Dashboard': 'لوحة تنفيذية',
  'Academic Accreditation Project': 'مشروع اعتماد أكاديمي',
  'Program Accreditation Project': 'مشروع اعتماد برامجي',
  'Quality Improvement Project': 'مشروع تحسين جودة',
  'Condition Fulfillment Project': 'مشروع استيفاء شروط',
  'Self Study Project': 'مشروع دراسة ذاتية',
  'Program Development Project': 'مشروع تطوير برنامج',
  'Learning Outcomes Measurement Project': 'مشروع قياس مخرجات تعلم',
  'Operational Plan Project': 'مشروع خطة تشغيلية',
  'Preparing self-study': 'إعداد الدراسة الذاتية',
  'Evidence collection': 'جمع الأدلة',
  'Internal review': 'المراجعة الداخلية',
  'Mock visit': 'الزيارة التجريبية',
  'Submission to accreditation body': 'الرفع لجهة الاعتماد',
  'Remarks remediation': 'معالجة الملاحظات',
  'Final closure': 'الإغلاق النهائي',
  'New': 'جديد',
  'Pending Review': 'بانتظار المراجعة',
  'Completed': 'مكتمل',
  'Delayed': 'متأخر',
  'Cancelled': 'ملغي',
  'Critical': 'حرج',
  'Escalated': 'مصعد',
  'High Priority': 'أولوية عالية',
  'Medium Priority': 'أولوية متوسطة',
  'Low Priority': 'أولوية منخفضة',
  'Late evidence uploads': 'تأخر رفع الأدلة',
  'Reviewer availability conflict': 'تعارض توفر المراجعين',
  'Low PLO achievement': 'انخفاض تحقق مخرجات التعلم',
  'Weekly steering meeting': 'اجتماع التوجيه الأسبوعي',
  'Requirement owners': 'ملاك المتطلبات',
  'Accreditation committee': 'لجنة الاعتماد',
  'Project team': 'فريق المشروع',
  'Quality reviewers': 'مراجعو الجودة',
  'Email / In-System': 'البريد الإلكتروني / داخل النظام',
  'SMS / In-System': 'رسائل SMS / داخل النظام',
  'Task comments and evidence discussion': 'تعليقات المهام ونقاش الأدلة',
  'Meeting minutes shared with committee': 'مشاركة محضر الاجتماع مع اللجنة',
  'File shared for reviewer response': 'مشاركة ملف لرد المراجع',
  'Execution plan approved': 'تم اعتماد الخطة التنفيذية',
  'Self-study draft submitted': 'تم رفع مسودة الدراسة الذاتية',
  'Evidence matrix updated': 'تم تحديث مصفوفة الأدلة',
  'Overdue task reminder': 'تذكير بمهمة متأخرة',
  'Upcoming deadline alert': 'تنبيه قرب الموعد',
  'Task approval notification': 'إشعار اعتماد مهمة',
  'New reviewer note': 'ملاحظة مراجع جديدة',
  'Academic Affairs and Quality Deanship': 'الشؤون الأكاديمية وعمادة الجودة',
  'College Quality Unit': 'وحدة الجودة بالكلية',
  'Program Quality Committee': 'لجنة جودة البرنامج',
  'Institutional Improvement Office': 'مكتب التحسين المؤسسي',
  'Evidence owners not responding before deadline': 'ملاك الأدلة لا يستجيبون قبل الموعد النهائي',
  'External reviewers have overlapping visits': 'المراجعون الخارجيون لديهم زيارات متداخلة',
  'PLO results below target for two cycles': 'نتائج مخرجات البرنامج أقل من المستهدف لدورتين',
  'Reassign evidence tasks and escalate to owner': 'إعادة توزيع مهام الأدلة والتصعيد للمالك',
  'Confirm backup reviewers and update schedule': 'تأكيد مراجعين بدلاء وتحديث الجدول',
  'Launch improvement action and monitor next cycle': 'إطلاق إجراء تحسين ومتابعة الدورة القادمة',
  'Update evidence matrix': 'تحديث مصفوفة الأدلة',
  'Collect committee approvals': 'جمع اعتمادات اللجنة',
  'Close reviewer observations': 'إغلاق ملاحظات المراجع',
  'Publish achievement dashboard': 'نشر لوحة تحقق الإنجاز',
  'Create project charter': 'إنشاء ميثاق المشروع',
  'Operational quality plan': 'الخطة التشغيلية للجودة',
  'permissions, expertise, committees': 'الصلاحيات والخبرات واللجان',
  'program committee and curriculum expertise': 'لجنة البرنامج وخبرات المناهج',
  'quality reviewers and external consultant': 'مراجعو الجودة والمستشار الخارجي',
  'operational owners and permissions': 'ملاك التشغيل والصلاحيات',
  'Project Manager': 'مدير المشروع',
  '0 days': '0 يوم',
  '7 days': '7 أيام',
  '13 days': '13 يوم',
  '19 days': '19 يوم',
};

function label(value, language) {
  return language === 'ar' ? ar[value] || value : value;
}



const statusClassMap = {
  'Approved': 's-done',
  'Full Accreditation': 's-done',
  'Complete': 's-done',
  'Completed': 's-done',
  'In Progress': 's-inprogress',
  'Eligible': 's-inprogress',
  'New': 's-inprogress',
  'Conditional Accreditation': 's-pending',
  'Pending Submit': 's-pending',
  'Pending Review': 's-pending',
  'Incomplete': 's-pending',
  'Delayed': 's-rejected',
  'Critical': 's-rejected',
  'Escalated': 's-rejected',
  'Cancelled': 's-not-started',
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
      { path: 'plans', label: 'Strategic Plans', icon: 'ti-files' },
      { path: 'objectives', label: 'Objectives', icon: 'ti-target' },
      { path: 'projects', label: 'Strategic Projects', icon: 'ti-briefcase' },
      { path: 'kpis', label: 'KPIs', icon: 'ti-chart-infographic' },
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
      { path: 'projects-management', label: 'Projects Management', icon: 'ti-kanban' },
      { path: 'milestones', label: 'Milestones', icon: 'ti-flag-3' },
      { path: 'tasks', label: 'Tasks Management', icon: 'ti-list-check' },
      { path: 'time-plan', label: 'Time Plan', icon: 'ti-timeline' },
      { path: 'teams', label: 'Teams & Resources', icon: 'ti-users-group' },
      { path: 'risks', label: 'Risks & Issues', icon: 'ti-alert-triangle' },
      { path: 'notifications', label: 'Notifications', icon: 'ti-bell-ringing' },
      { path: 'collaboration', label: 'Collaboration', icon: 'ti-messages' },
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
          className={`dashboard-tab quality-module-tab ${activePath === tab.path ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activePath === tab.path}
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
          rows={accreditationMasterData}
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
          rows={accreditationStandards}
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
        rows={accreditationRequirements}
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
        rows={submissionDecisions}
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
        rows={accreditationActionLogs}
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

  if (activePath === 'plans') {
    return (
      <SortableTable
        title="Strategic Plans"
        rows={strategicPlans.map(plan => ({
          ...plan,
          name: <Link className="project-link" to={`/strategic-planning/plans/${plan.id}`}>{language === 'ar' ? plan.nameAr : plan.name}</Link>,
          status: language === 'ar' ? plan.statusAr : plan.status,
          progress: `${plan.progress}%`,
          objectives: plan.stats.objectives,
          projects: plan.stats.projects,
          kpis: plan.stats.kpis
        }))}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Plan Name' },
          { key: 'duration', label: 'Duration' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'objectives', label: 'Objectives' },
          { key: 'projects', label: 'Projects' },
          { key: 'kpis', label: 'KPIs' },
          { key: 'owner', label: 'Owner' },
        ]}
      />
    );
  }

  if (activePath === 'objectives') {
    return (
      <SortableTable
        title="Strategic Objectives"
        rows={strategicObjectives.map(obj => {
          const plan = strategicPlans.find(p => p.id === obj.planId);
          return {
            ...obj,
            name: <Link className="project-link" to={`/strategic-planning/objectives/${obj.id}`}>{language === 'ar' ? obj.nameAr : obj.name}</Link>,
            planName: language === 'ar' ? plan.nameAr : plan.name,
            status: language === 'ar' ? obj.statusAr : obj.status,
            progress: `${obj.progress}%`,
            weight: `${obj.weight}%`
          };
        })}
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'name', label: 'Objective' },
          { key: 'planName', label: 'Strategic Plan' },
          { key: 'owner', label: 'Owner' },
          { key: 'weight', label: 'Weight' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
        ]}
      />
    );
  }

  if (activePath === 'projects') {
    return (
      <SortableTable
        title="Strategic Projects"
        rows={strategicInitiatives.map(init => {
          const obj = strategicObjectives.find(o => o.id === init.objectiveId);
          return {
            ...init,
            name: <Link className="project-link" to={`/quality-projects/projects/${init.id}`}>{language === 'ar' ? init.nameAr : init.name}</Link>,
            objectiveName: language === 'ar' ? obj.nameAr : obj.name,
            progress: `${init.progress}%`,
            priority: language === 'ar' ? init.priorityAr : init.priority
          };
        })}
        columns={[
          { key: 'code', label: 'Code' },
          { key: 'name', label: 'Project' },
          { key: 'objectiveName', label: 'Objective' },
          { key: 'owner', label: 'Owner' },
          { key: 'priority', label: 'Priority' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'startDate', label: 'Start' },
          { key: 'endDate', label: 'End' },
        ]}
      />
    );
  }

  if (activePath === 'kpis') {
    return (
      <SortableTable
        title="Strategic KPIs"
        rows={strategicKPIs.map(kpi => {
          const obj = strategicObjectives.find(o => o.id === kpi.objectiveId);
          return {
            ...kpi,
            objectiveName: language === 'ar' ? obj.nameAr : obj.name,
            target: `${kpi.target}%`,
            actual: `${kpi.actual}%`
          };
        })}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Indicator' },
          { key: 'objectiveName', label: 'Objective' },
          { key: 'baseline', label: 'Baseline' },
          { key: 'target', label: 'Target' },
          { key: 'actual', label: 'Actual' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'owner', label: 'Owner' },
        ]}
      />
    );
  }

  if (activePath === 'reports') {
    return (
      <>
        <SummaryCards rows={strategicReports} statusKey="status" />
        <SortableTable
          title="Strategic Reports"
          rows={strategicReports}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'report', label: 'Report Title' },
            { key: 'type', label: 'Type' },
            { key: 'owner', label: 'Owner' },
            { key: 'date', label: 'Date' },
            { key: 'status', label: 'Status', type: 'status' },
          ]}
        />
      </>
    );
  }

  return (
    <>
      {activePath === 'dashboard' && <SummaryCards rows={strategicInitiatives} statusKey="status" />}
      <SortableTable
        title="Strategic Overview"
        rows={strategicInitiatives.map(init => ({
          ...init,
          name: <Link className="project-link" to={`/quality-projects/projects/${init.id}`}>{language === 'ar' ? init.nameAr : init.name}</Link>,
          progress: `${init.progress}%`
        }))}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Project' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'progress', label: 'Progress' },
          { key: 'endDate', label: 'Due Date' },
        ]}
      />
    </>
  );
}

function ProjectManagementDashboard() {
  const { language } = useI18n();
  const delayedCount = managedProjectsData.reduce((sum, p) => sum + p.kpis.delayedTasks, 0);
  const openRisks = risks.length; // From projectData
  const evidenceAvg = Math.round(managedProjectsData.reduce((sum, project) => sum + project.kpis.evidence, 0) / managedProjectsData.length);
  const requirementsAvg = Math.round(managedProjectsData.reduce((sum, project) => sum + project.kpis.requirements, 0) / managedProjectsData.length);

  return (
    <>
      <div className="project-command-panel">
        <div>
          <div className="section-title">{label('Strategic & Quality Projects Management', language)}</div>
          <div className="section-sub">{label('Project dashboard with execution plans, milestones, tasks, teams, performance indicators, and schedule follow-up.', language)}</div>
        </div>
        <div className="project-command-kpis">
          <div><strong>{managedProjectsData.length}</strong><span>{label('Projects Management', language)}</span></div>
          <div><strong>{delayedCount}</strong><span>{label('Delayed Tasks', language)}</span></div>
          <div><strong>{openRisks}</strong><span>{label('Risks & Issues', language)}</span></div>
          <div><strong>{evidenceAvg}%</strong><span>{label('Evidence Completion', language)}</span></div>
          <div><strong>{requirementsAvg}%</strong><span>{label('Requirements Completion', language)}</span></div>
        </div>
      </div>
      <SummaryCards rows={managedProjectsData} statusKey="status" />
      <SortableTable
        title="Projects Management"
        rows={managedProjectsData.map(p => ({
          ...p,
          projectName: <Link className="project-link" to={`/quality-projects/projects/${p.id}`}>{language === 'ar' ? p.nameAr : p.name}</Link>,
          projectType: language === 'ar' ? p.typeAr : p.type,
          owner: language === 'ar' ? p.ownerAr : p.owner,
          programCollege: language === 'ar' ? p.entityAr : p.entity,
          status: language === 'ar' ? p.statusAr : p.status,
          priority: language === 'ar' ? p.priorityAr : p.priority,
          completion: `${p.progress}%`,
          delayedTasks: p.kpis.delayedTasks,
          start: p.startDate,
          end: p.endDate
        }))}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'projectType', label: 'Project Type' },
          { key: 'owner', label: 'Owning Entity' },
          { key: 'programCollege', label: 'Program / College' },
          { key: 'start', label: 'Planned Start' },
          { key: 'end', label: 'Planned End' },
          { key: 'priority', label: 'Priority' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'completion', label: 'Completion' },
          { key: 'delayedTasks', label: 'Delayed Tasks' },
        ]}
      />
    </>
  );
}

function TimePlanContent() {
  const { language } = useI18n();
  return (
    <>
      <div className="quality-table-card gantt-card">
        <div className="quality-table-toolbar">
          <div>
            <div className="section-title">{label('Planned vs Actual Timeline', language)}</div>
            <div className="section-sub">{label('Search, sort, and pagination are available for this table.', language)}</div>
          </div>
          <div className="gantt-legend">
            <span><i className="planned" />{label('Planned', language)}</span>
            <span><i className="actual" />{label('Actual', language)}</span>
          </div>
        </div>
        <div className="gantt-list">
          {projectTimePlan.map((item) => (
            <div className="gantt-row" key={item.id}>
              <div className="gantt-title">
                <strong>{label(item.projectName, language)}</strong>
                <span>{label('Delay', language)}: {item.delay}</span>
              </div>
              <div className="gantt-track" aria-label={label(item.projectName, language)}>
                <span className="gantt-bar planned" style={{ insetInlineStart: `${item.plannedOffset}%`, width: `${item.plannedWidth}%` }} />
                <span className="gantt-bar actual" style={{ insetInlineStart: `${item.actualOffset}%`, width: `${item.actualWidth}%` }} />
              </div>
              <span className={`status-pill ${getStatusClass(item.status)}`}>{label(item.status, language)}</span>
            </div>
          ))}
        </div>
      </div>
      <SortableTable
        title="Time Plan"
        rows={projectTimePlan}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'plannedStart', label: 'Planned Start' },
          { key: 'plannedEnd', label: 'Planned End' },
          { key: 'actualStart', label: 'Actual Start' },
          { key: 'actualEnd', label: 'Actual End' },
          { key: 'delay', label: 'Delay' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    </>
  );
}

function QualityProjectsContent({ activePath }) {
  const { language } = useI18n();
  if (activePath === 'projects-management') {
    return <ProjectManagementDashboard />;
  }

  if (activePath === 'milestones') {
    return (
      <SortableTable
        title="Milestones"
        rows={projectMilestonesData.map(ms => {
          const p = managedProjectsData.find(prj => prj.id === ms.projectId) || { name: 'Unknown', nameAr: 'غير معروف' };
          return {
            ...ms,
            projectName: language === 'ar' ? p.nameAr : p.name,
            milestone: language === 'ar' ? ms.nameAr : ms.name,
            status: language === 'ar' ? ms.statusAr : ms.status,
            completion: `${ms.progress}%`,
            start: ms.startDate,
            end: ms.endDate
          };
        })}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'milestone', label: 'Milestones' },
          { key: 'start', label: 'Start' },
          { key: 'end', label: 'End' },
          { key: 'completion', label: 'Completion' },
          { key: 'owner', label: 'Owner' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'tasks') {
    return (
      <SortableTable
        title="Tasks Management"
        rows={projectTasksData.map(t => {
          const p = managedProjectsData.find(prj => prj.id === t.projectId) || { name: 'Unknown', nameAr: 'غير معروف' };
          return {
            ...t,
            projectName: language === 'ar' ? p.nameAr : p.name,
            task: language === 'ar' ? t.titleAr : t.title,
            subTasks: (t.subtasks || []).length,
            responsible: t.assignedTo,
            priority: language === 'ar' ? (t.priorityAr || t.priority) : t.priority,
            deadline: t.dueDate,
            dependencies: (t.dependencies || []).join(', ') || '-',
            status: language === 'ar' ? (t.statusAr || t.status) : t.status
          };
        })}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'task', label: 'Action' },
          { key: 'subTasks', label: 'Sub Tasks' },
          { key: 'responsible', label: 'Responsible' },
          { key: 'priority', label: 'Priority' },
          { key: 'deadline', label: 'Deadline' },
          { key: 'dependencies', label: 'Dependencies' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'time-plan') {
    return <TimePlanContent />;
  }

  if (activePath === 'teams') {
    return (
      <SortableTable
        title="Teams & Resources"
        rows={projectTeams}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'manager', label: 'Project Manager' },
          { key: 'members', label: 'Members' },
          { key: 'reviewers', label: 'Reviewers' },
          { key: 'consultants', label: 'Consultants' },
          { key: 'assignmentBasis', label: 'Assignment Basis' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'risks') {
    return (
      <SortableTable
        title="Risks & Issues"
        rows={projectRisksIssues}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'item', label: 'Risk / Issue' },
          { key: 'category', label: 'Category' },
          { key: 'impact', label: 'Impact' },
          { key: 'owner', label: 'Owner' },
          { key: 'treatmentPlan', label: 'Treatment Plan' },
          { key: 'escalation', label: 'Escalation', type: 'status' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'notifications') {
    return (
      <SortableTable
        title="Notifications"
        rows={projectNotifications}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'trigger', label: 'Trigger' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'channel', label: 'Channel' },
          { key: 'recipients', label: 'Recipients' },
          { key: 'deadline', label: 'Deadline' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

  if (activePath === 'collaboration') {
    return (
      <SortableTable
        title="Collaboration"
        rows={projectCollaboration}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'projectName', label: 'Project Name' },
          { key: 'comment', label: 'Comment' },
          { key: 'file', label: 'Uploaded File' },
          { key: 'meeting', label: 'Meeting' },
          { key: 'minutes', label: 'Minutes' },
          { key: 'activity', label: 'Activity Timeline' },
          { key: 'status', label: 'Status', type: 'status' },
        ]}
      />
    );
  }

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
        <SummaryCards rows={projectExecutiveReports} />
        <SortableTable
          title="Executive Reports"
          rows={projectExecutiveReports}
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
