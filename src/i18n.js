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
    listTools: 'List tools',
    searchCourses: 'Search courses by code or name',
    searchPrograms: 'Search programs by code or name',
    sort: 'Sort',
    sortByCode: 'Code',
    sortByName: 'Name',
    sortBySemester: 'Semester',
    sortByYear: 'Year',
    shown: 'Shown',
    of: 'of',
    clear: 'Clear',
    clearSearch: 'Clear search',
    noCoursesFound: 'No courses found',
    noProgramsFound: 'No programs found',
    adjustSearch: 'Adjust your search terms or clear the filter.',
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
    listTools: '\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
    searchCourses: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0628\u0627\u0644\u0631\u0645\u0632 \u0623\u0648 \u0627\u0644\u0627\u0633\u0645',
    searchPrograms: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0628\u0627\u0644\u0631\u0645\u0632 \u0623\u0648 \u0627\u0644\u0627\u0633\u0645',
    sort: '\u062a\u0631\u062a\u064a\u0628',
    sortByCode: '\u0627\u0644\u0631\u0645\u0632',
    sortByName: '\u0627\u0644\u0627\u0633\u0645',
    sortBySemester: '\u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062f\u0631\u0627\u0633\u064a',
    sortByYear: '\u0627\u0644\u0639\u0627\u0645',
    shown: '\u0627\u0644\u0645\u0639\u0631\u0648\u0636',
    of: '\u0645\u0646',
    clear: '\u0645\u0633\u062d',
    clearSearch: '\u0645\u0633\u062d \u0627\u0644\u0628\u062d\u062b',
    noCoursesFound: '\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0645\u0642\u0631\u0631\u0627\u062a',
    noProgramsFound: '\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0628\u0631\u0627\u0645\u062c',
    adjustSearch: '\u063a\u064a\u0631 \u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0628\u062d\u062b \u0623\u0648 \u0627\u0645\u0633\u062d \u0627\u0644\u062a\u0635\u0641\u064a\u0629.',
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
