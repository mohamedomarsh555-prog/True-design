import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { AcademicTree, HierProgress, HierarchyMetricGrid, OrganizationMap, StatusChip, localName } from '../components/AcademicHierarchy';
import { academicPrograms, accreditationOperationalItems, colleges, getAccreditationSummary } from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

const accreditationPath = '/academic-accreditation';

function getCollegeAccreditationStats(collegeId) {
  const programs = academicPrograms.filter((program) => program.collegeId === collegeId);
  const accredited = programs.filter((program) => program.accreditationStatus === 'Accredited').length;
  const under = programs.filter((program) => ['Under Review', 'In Progress'].includes(program.accreditationStatus)).length;
  const conditional = programs.filter((program) => program.accreditationStatus === 'Conditional').length;
  const critical = programs.filter((program) => program.accreditationStatus === 'Expired' || program.readiness < 60).length;
  const readiness = Math.round(programs.reduce((sum, program) => sum + program.readiness, 0) / Math.max(programs.length, 1));
  const visits = accreditationOperationalItems.visits.filter((visit) => visit.collegeId === collegeId).sort((a, b) => a.date.localeCompare(b.date));
  const recommendations = accreditationOperationalItems.recommendations.filter((item) => item.collegeId === collegeId && item.status !== 'Closed').length;
  return { accredited, under, conditional, critical, readiness, nextVisit: visits[0]?.date || '-', recommendations };
}

export default function CollegesPage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const summary = getAccreditationSummary();

  const visibleColleges = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return colleges.filter((college) => {
      const matchesQuery = !normalized || `${college.name} ${college.nameAr} ${college.code} ${college.dean}`.toLowerCase().includes(normalized);
      const matchesStatus = status === 'All' || college.accreditationStatus === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const labels = {
    title: language === 'ar' ? 'إدارة الاعتماد الأكاديمي' : 'Academic Accreditation Management',
    subtitle: language === 'ar'
      ? 'إدارة ومتابعة الاعتماد الأكاديمي من مستوى الجامعة إلى الكليات والأقسام والبرامج.'
      : 'Manage academic accreditation from university level down to colleges, departments, and programs.',
    system: language === 'ar' ? 'نظام الاعتماد الأكاديمي الهرمي' : 'Academic Accreditation Hierarchy System',
  };

  const metrics = [
    { icon: 'ti-building-community', value: summary.colleges, label: language === 'ar' ? 'الكليات' : 'Colleges' },
    { icon: 'ti-sitemap', value: summary.departments, label: language === 'ar' ? 'الأقسام' : 'Departments' },
    { icon: 'ti-award', value: summary.programs, label: language === 'ar' ? 'البرامج' : 'Programs' },
    { icon: 'ti-rosette-discount-check', value: summary.accredited, label: language === 'ar' ? 'البرامج المعتمدة' : 'Accredited Programs' },
    { icon: 'ti-progress-check', value: summary.underAccreditation, label: language === 'ar' ? 'تحت الاعتماد' : 'Under Accreditation' },
    { icon: 'ti-adjustments-check', value: summary.conditional, label: language === 'ar' ? 'مشروطة' : 'Conditional' },
    { icon: 'ti-ban', value: summary.unaccredited, label: language === 'ar' ? 'غير معتمدة' : 'Unaccredited' },
    { icon: 'ti-alert-triangle', value: summary.critical, label: language === 'ar' ? 'برامج حرجة' : 'Critical Programs' },
    { icon: 'ti-gauge', value: `${summary.averageReadiness}%`, label: language === 'ar' ? 'متوسط الجاهزية' : 'Avg Readiness' },
    { icon: 'ti-message-report', value: summary.openRecommendations, label: language === 'ar' ? 'توصيات مفتوحة' : 'Open Recommendations' },
    { icon: 'ti-calendar-event', value: summary.upcomingVisits, label: language === 'ar' ? 'زيارات قادمة' : 'Upcoming Visits' },
    { icon: 'ti-folder-question', value: summary.missingEvidence, label: language === 'ar' ? 'أدلة ناقصة' : 'Missing Evidence' },
  ];

  return (
    <>
      <Topbar breadcrumbs={[labels.title]} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType="university"
            onSelect={(type, id) => {
              if (type === 'college') navigate(`${accreditationPath}/colleges/${id}`);
              if (type === 'program') navigate(`${accreditationPath}/programs/${id}`);
            }}
          />

          <main className="hierarchy-main">
            <section className="hier-hero">
              <div>
                <span><i className="ti ti-certificate" /> {labels.system}</span>
                <h1>{labels.title}</h1>
                <p>{labels.subtitle}</p>
              </div>
              <OrganizationMap compact />
            </section>

            <HierarchyMetricGrid metrics={metrics} />

            <section className="hier-panel">
              <div className="hier-panel-head">
                <div>
                  <h2>{language === 'ar' ? 'اعتماد الكليات والبرامج' : 'College and Program Accreditation'}</h2>
                  <p>{language === 'ar' ? 'اعرض حالة الاعتماد والجاهزية والزيارات والتوصيات لكل كلية وبرنامج.' : 'View accreditation status, readiness, visits, and recommendations for each college and program.'}</p>
                </div>
                <div className="hier-filters">
                  <label>
                    <i className="ti ti-search" />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === 'ar' ? 'بحث عن كلية' : 'Search colleges'} />
                  </label>
                  <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="All">{language === 'ar' ? 'الكل' : 'All'}</option>
                    <option value="Accredited">{language === 'ar' ? 'معتمد' : 'Accredited'}</option>
                    <option value="Conditional">{language === 'ar' ? 'مشروط' : 'Conditional'}</option>
                    <option value="In Progress">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
                  </select>
                </div>
              </div>

              <div className="college-card-grid">
                {visibleColleges.map((college) => {
                  const stats = getCollegeAccreditationStats(college.id);
                  return (
                    <article className="college-card" key={college.id}>
                      <div className="college-card-head">
                        <div className="college-icon"><i className="ti ti-building-community" /></div>
                        <div>
                          <span>{college.code}</span>
                          <h3>{localName(college, 'name', language)}</h3>
                          <p>{college.dean}</p>
                        </div>
                      </div>
                      <StatusChip status={college.accreditationStatus} />
                      <HierProgress value={stats.readiness} label={language === 'ar' ? 'متوسط جاهزية البرامج' : 'Average Program Readiness'} />
                      <div className="college-stats">
                        <div><strong>{college.programsCount}</strong><span>{language === 'ar' ? 'برامج' : 'Programs'}</span></div>
                        <div><strong>{stats.accredited}</strong><span>{language === 'ar' ? 'معتمدة' : 'Accredited'}</span></div>
                        <div><strong>{stats.under}</strong><span>{language === 'ar' ? 'تحت الاعتماد' : 'Under'}</span></div>
                        <div><strong>{stats.conditional}</strong><span>{language === 'ar' ? 'مشروطة' : 'Conditional'}</span></div>
                        <div><strong>{stats.critical}</strong><span>{language === 'ar' ? 'حرجة' : 'Critical'}</span></div>
                        <div><strong>{stats.nextVisit}</strong><span>{language === 'ar' ? 'أقرب زيارة' : 'Next Visit'}</span></div>
                        <div><strong>{stats.recommendations}</strong><span>{language === 'ar' ? 'توصيات' : 'Recommendations'}</span></div>
                        <div><strong>{college.risks}</strong><span>{language === 'ar' ? 'مخاطر' : 'Risks'}</span></div>
                      </div>
                      <div className="college-card-foot">
                        <span>{language === 'ar' ? 'آخر تحديث' : 'Updated'} {college.lastUpdate}</span>
                        <button type="button" onClick={() => navigate(`${accreditationPath}/colleges/${college.id}`)}>
                          {language === 'ar' ? 'فتح الاعتماد' : 'Open Accreditation'}
                          <i className={`ti ${language === 'ar' ? 'ti-arrow-left' : 'ti-arrow-right'}`} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
