import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const dictionaries = {
  en: {
    academic: 'Academic',
    active: 'Active',
    add: 'Add',
    additionalForms: 'Additional Forms',
    allCourses: 'Course List',
    allPrograms: 'Program List',
    approvedReports: 'Approved Reports',
    backToCourses: 'Back to courses',
    backToPrograms: 'Back to programs',
    backToReports: 'Back to reports',
    courseList: 'Course List',
    courses: 'Courses',
    dashboard: 'Dashboard',
    documentationDefinitions: 'Documentation Definitions',
    institutionalAccreditation: 'Institutional Accreditation',
    cloPloManagement: 'CLO & PLO Managment',
    mainReports: 'Main Reports',
    module: 'Module',
    moduleWorkspace: 'Module workspace',
    new: 'New',
    newSubmission: 'New Submission',
    notFound: 'Not found',
    openAnyCourse: 'Open any course to continue to reports and forms.',
    openAnyProgram: 'Open any program to continue to reports and forms.',
    pendingReports: 'Pending Reports',
    programList: 'Program List',
    programs: 'Programs',
    quickActions: 'Quick Actions',
    reportNotFound: 'Report type not found.',
    reportTypes: 'Report Types',
    reports: 'Reports',
    reviewCoursesReport: 'Review this report type for every active course',
    reviewProgramsReport: 'Review this report type for every active program',
    role: 'Coordinator',
    selectCourse: 'Select a course to view its available report types',
    selectProgram: 'Select a program to view its available report types',
    submissionsByCourse: 'Available submissions grouped by course.',
    submissionsByProgram: 'Available submissions grouped by program.',
    view: 'View',
    viewAllCourses: 'View course list',
    viewAllPrograms: 'View program list',
    welcome: 'Welcome back',
    history: 'History of submissions',
    gridView: 'Grid view',
    listView: 'List view',
    notStartedYet: 'Not started yet',
    firstSemester: 'First Semester',
    academicYear: 'Academic Year',
    thisSemester: 'This semester',
    requiresAction: 'Requires action',
    moduleSubtitles: {
      clo: 'Manage course learning outcomes and program learning outcomes.',
      accreditation: 'Prepare institutional accreditation documents and evidence.',
      documentation: 'Maintain documentation templates, definitions, and references.',
    },
    status: {
      approved: 'Approved',
      archived: 'Archived',
      inProgress: 'In Progress',
      new: 'New',
      notStarted: 'Not Started',
      pending: 'Pending',
      pendingSubmit: 'Pending Submit',
    },
  },
  ar: {
    academic: 'أكاديمي',
    active: 'نشط',
    add: 'إضافة',
    additionalForms: 'نماذج إضافية',
    allCourses: 'قائمة المقررات',
    allPrograms: 'قائمة البرامج',
    approvedReports: 'تقارير معتمدة',
    backToCourses: 'العودة إلى المقررات',
    backToPrograms: 'العودة إلى البرامج',
    backToReports: 'العودة إلى التقارير',
    courseList: 'قائمة المقررات',
    courses: 'المقررات',
    dashboard: 'لوحة التحكم',
    documentationDefinitions: 'تعريفات التوثيق',
    institutionalAccreditation: 'الاعتماد المؤسسي',
    cloPloManagement: 'إدارة مخرجات المقرر والبرنامج',
    mainReports: 'التقارير الرئيسية',
    module: 'وحدة',
    moduleWorkspace: 'مساحة عمل الوحدة',
    new: 'جديد',
    newSubmission: 'تقديم جديد',
    notFound: 'غير موجود',
    openAnyCourse: 'افتح أي مقرر للمتابعة إلى التقارير والنماذج.',
    openAnyProgram: 'افتح أي برنامج للمتابعة إلى التقارير والنماذج.',
    pendingReports: 'تقارير معلقة',
    programList: 'قائمة البرامج',
    programs: 'البرامج',
    quickActions: 'إجراءات سريعة',
    reportNotFound: 'نوع التقرير غير موجود.',
    reportTypes: 'أنواع التقارير',
    reports: 'تقارير',
    reviewCoursesReport: 'استعراض هذا النوع من التقارير لكل المقررات النشطة',
    reviewProgramsReport: 'استعراض هذا النوع من التقارير لكل البرامج النشطة',
    role: 'منسق',
    selectCourse: 'اختر مقررا لعرض أنواع التقارير المتاحة',
    selectProgram: 'اختر برنامجا لعرض أنواع التقارير المتاحة',
    submissionsByCourse: 'التقديمات المتاحة مصنفة حسب المقرر.',
    submissionsByProgram: 'التقديمات المتاحة مصنفة حسب البرنامج.',
    view: 'عرض',
    viewAllCourses: 'عرض قائمة المقررات',
    viewAllPrograms: 'عرض قائمة البرامج',
    welcome: 'مرحبا بعودتك',
    history: 'سجل التقديمات',
    gridView: 'عرض شبكي',
    listView: 'عرض قائمة',
    notStartedYet: 'لم يبدأ بعد',
    firstSemester: 'الفصل الدراسي الأول',
    academicYear: 'العام الأكاديمي',
    thisSemester: 'هذا الفصل',
    requiresAction: 'يتطلب إجراء',
    moduleSubtitles: {
      clo: 'إدارة مخرجات تعلم المقرر ومخرجات تعلم البرنامج.',
      accreditation: 'إعداد وثائق الاعتماد المؤسسي والأدلة.',
      documentation: 'إدارة قوالب التوثيق والتعريفات والمراجع.',
    },
    status: {
      approved: 'معتمد',
      archived: 'مؤرشف',
      inProgress: 'قيد التنفيذ',
      new: 'جديد',
      notStarted: 'لم يبدأ',
      pending: 'معلق',
      pendingSubmit: 'بانتظار التقديم',
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('true-language') || 'en');

  useEffect(() => {
    localStorage.setItem('true-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => {
    const t = (key) => {
      const parts = key.split('.');
      return parts.reduce((acc, part) => acc?.[part], dictionaries[language]) ?? key;
    };

    const text = (item, field) => {
      if (!item) return '';
      return language === 'ar'
        ? item[`${field}Ar`] || item[field]
        : item[`${field}En`] || item[field];
    };

    const status = (statusKey, fallback) => {
      return dictionaries[language].status[statusKey] || fallback;
    };

    const statusFromClass = (className, fallback) => {
      const map = {
        's-pending': 'pendingSubmit',
        's-not-started': 'notStarted',
        's-done': 'approved',
        's-inprogress': 'inProgress',
        's-new': 'new',
        's-new-amber': 'new',
        's-archived': 'archived',
      };
      return status(map[className], fallback);
    };

    return { language, setLanguage, t, text, status, statusFromClass, isRtl: language === 'ar' };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used inside LanguageProvider');
  }
  return context;
}
