import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { AcademicTree, HierProgress, HierarchyMetricGrid, OrganizationMap, StatusChip, localName } from '../components/AcademicHierarchy';
import { colleges, getHierarchySummary } from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

export default function CollegesPage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const summary = getHierarchySummary();

  const visibleColleges = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return colleges.filter((college) => {
      const matchesQuery = !normalized || `${college.name} ${college.nameAr} ${college.code} ${college.dean}`.toLowerCase().includes(normalized);
      const matchesStatus = status === 'All' || college.accreditationStatus === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <Topbar breadcrumbs={[language === 'ar' ? 'الكليات' : 'Colleges']} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree activeType="university" onSelect={(type, id) => {
            if (type === 'college') navigate(`/colleges/${id}`);
            if (type === 'program') navigate(`/programs/${id}`);
          }} />
          <main className="hierarchy-main">
            <section className="hier-hero">
              <div>
                <span><i className="ti ti-building-community" /> {language === 'ar' ? 'الهيكل الأكاديمي المؤسسي' : 'Institutional Academic Structure'}</span>
                <h1>{language === 'ar' ? 'الكليات والاعتماد الأكاديمي' : 'Colleges and Academic Accreditation'}</h1>
                <p>{language === 'ar' ? 'تنقل هرمي من الجامعة إلى الكلية والقسم والبرنامج ودورة الاعتماد.' : 'Navigate from university to college, department, program, and accreditation cycle.'}</p>
              </div>
              <OrganizationMap compact />
            </section>

            <HierarchyMetricGrid metrics={[
              { icon: 'ti-building-community', value: summary.colleges, label: language === 'ar' ? 'الكليات' : 'Colleges' },
              { icon: 'ti-sitemap', value: summary.departments, label: language === 'ar' ? 'الأقسام' : 'Departments' },
              { icon: 'ti-award', value: summary.programs, label: language === 'ar' ? 'البرامج' : 'Programs' },
              { icon: 'ti-rosette-discount-check', value: summary.accredited, label: language === 'ar' ? 'برامج معتمدة' : 'Accredited Programs' },
              { icon: 'ti-progress-check', value: summary.underAccreditation, label: language === 'ar' ? 'تحت الاعتماد' : 'Under Accreditation' },
              { icon: 'ti-alert-triangle', value: summary.critical, label: language === 'ar' ? 'حرجة' : 'Critical' },
            ]} />

            <section className="hier-panel">
              <div className="hier-panel-head">
                <div>
                  <h2>{language === 'ar' ? 'قائمة الكليات' : 'Colleges List'}</h2>
                  <p>{language === 'ar' ? 'اعرض حالة الاعتماد والجاهزية والمخاطر والتوصيات لكل كلية.' : 'View accreditation status, readiness, risks, and recommendations for each college.'}</p>
                </div>
                <div className="hier-filters">
                  <label><i className="ti ti-search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === 'ar' ? 'بحث عن كلية' : 'Search colleges'} /></label>
                  <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option>All</option>
                    <option>Accredited</option>
                    <option>Conditional</option>
                    <option>In Progress</option>
                  </select>
                </div>
              </div>

              <div className="college-card-grid">
                {visibleColleges.map((college) => (
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
                    <HierProgress value={college.readiness} label={language === 'ar' ? 'نسبة الجاهزية' : 'Readiness'} />
                    <div className="college-stats">
                      <div><strong>{college.programsCount}</strong><span>{language === 'ar' ? 'برامج' : 'Programs'}</span></div>
                      <div><strong>{college.accreditedPrograms}</strong><span>{language === 'ar' ? 'معتمدة' : 'Accredited'}</span></div>
                      <div><strong>{college.recommendations}</strong><span>{language === 'ar' ? 'توصيات' : 'Recommendations'}</span></div>
                      <div><strong>{college.risks}</strong><span>{language === 'ar' ? 'مخاطر' : 'Risks'}</span></div>
                    </div>
                    <div className="college-card-foot">
                      <span>{language === 'ar' ? 'آخر تحديث' : 'Updated'} {college.lastUpdate}</span>
                      <button type="button" onClick={() => navigate(`/colleges/${college.id}`)}>{language === 'ar' ? 'فتح' : 'Open'} <i className="ti ti-arrow-right" /></button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
