import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { AcademicTree, HierProgress, HierarchyMetricGrid, StatusChip, localName } from '../components/AcademicHierarchy';
import { academicPrograms, colleges, departments, getHierarchySummary } from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

export default function HierarchyReportsPage({ mode = 'reports' }) {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState('all');
  const [departmentId, setDepartmentId] = useState('all');
  const [status, setStatus] = useState('all');
  const summary = getHierarchySummary();
  const isKpi = mode === 'kpis';

  const filteredDepartments = departments.filter((department) => collegeId === 'all' || department.collegeId === collegeId);
  const rows = useMemo(() => academicPrograms.filter((program) => {
    const matchesCollege = collegeId === 'all' || program.collegeId === collegeId;
    const matchesDepartment = departmentId === 'all' || program.departmentId === departmentId;
    const matchesStatus = status === 'all' || program.accreditationStatus === status;
    return matchesCollege && matchesDepartment && matchesStatus;
  }), [collegeId, departmentId, status]);

  return (
    <>
      <Topbar breadcrumbs={[isKpi ? 'KPIs' : 'Reports']} />
      <div className="page-content hierarchy-page">
        <div className="hierarchy-layout">
          <AcademicTree
            activeType={isKpi ? 'kpi' : 'report'}
            onSelect={(type, id) => {
              if (type === 'college') setCollegeId(id);
              if (type === 'department') setDepartmentId(id);
              if (type === 'program') navigate(`/academic-accreditation/programs/${id}`);
            }}
          />
          <main className="hierarchy-main">
            <section className="hier-hero compact">
              <div>
                <span><i className={`ti ${isKpi ? 'ti-target-arrow' : 'ti-report-analytics'}`} /> {isKpi ? 'Hierarchical KPI Center' : 'Hierarchical Reports Center'}</span>
                <h1>{isKpi ? (language === 'ar' ? 'مؤشرات الأداء حسب الهيكل الأكاديمي' : 'KPIs by Academic Hierarchy') : (language === 'ar' ? 'التقارير حسب الهيكل الأكاديمي' : 'Reports by Academic Hierarchy')}</h1>
                <p>{language === 'ar' ? 'صف حسب الجامعة أو الكلية أو القسم أو البرنامج وحالة الاعتماد.' : 'Filter by university, college, department, program, and accreditation status.'}</p>
              </div>
            </section>

            <HierarchyMetricGrid metrics={[
              { icon: 'ti-building-community', value: summary.colleges, label: language === 'ar' ? 'الكليات' : 'Colleges' },
              { icon: 'ti-sitemap', value: summary.departments, label: language === 'ar' ? 'الأقسام' : 'Departments' },
              { icon: 'ti-award', value: rows.length, label: language === 'ar' ? 'البرامج المعروضة' : 'Shown Programs' },
              { icon: isKpi ? 'ti-target-arrow' : 'ti-report', value: isKpi ? `${summary.universityProgress}%` : rows.reduce((sum, program) => sum + program.evidenceCount, 0), label: isKpi ? (language === 'ar' ? 'متوسط المؤشرات' : 'Avg KPI') : (language === 'ar' ? 'الأدلة' : 'Evidence') },
            ]} />

            <section className="hier-panel">
              <div className="hier-panel-head">
                <div>
                  <h2>{isKpi ? 'KPI Portfolio' : 'Report Portfolio'}</h2>
                  <p>{language === 'ar' ? 'كل صف مرتبط بموقعه الحقيقي داخل الهيكل الأكاديمي.' : 'Every row is linked to its real position in the academic hierarchy.'}</p>
                </div>
                <div className="hier-filters">
                  <select value={collegeId} onChange={(event) => { setCollegeId(event.target.value); setDepartmentId('all'); }}>
                    <option value="all">{language === 'ar' ? 'كل الكليات' : 'All Colleges'}</option>
                    {colleges.map((college) => <option key={college.id} value={college.id}>{localName(college, 'name', language)}</option>)}
                  </select>
                  <select value={departmentId} onChange={(event) => setDepartmentId(event.target.value)}>
                    <option value="all">{language === 'ar' ? 'كل الأقسام' : 'All Departments'}</option>
                    {filteredDepartments.map((department) => <option key={department.id} value={department.id}>{localName(department, 'name', language)}</option>)}
                  </select>
                  <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="all">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                    <option>Accredited</option>
                    <option>Under Review</option>
                    <option>Conditional</option>
                    <option>In Progress</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

              <div className="hier-report-grid">
                {rows.map((program) => {
                  const college = colleges.find((item) => item.id === program.collegeId);
                  const department = departments.find((item) => item.id === program.departmentId);
                  return (
                    <article className="hier-report-card" key={program.id}>
                      <div>
                        <span>{localName(college, 'name', language)} / {localName(department, 'name', language)}</span>
                        <h3>{isKpi ? `${program.code} KPI Dashboard` : `${program.code} Accreditation Report`}</h3>
                        <p>{localName(program, 'name', language)} · {program.accreditationBody}</p>
                      </div>
                      <StatusChip status={program.accreditationStatus} />
                      <HierProgress value={isKpi ? program.kpiAchievement : program.readiness} label={isKpi ? 'KPI Achievement' : 'Readiness'} />
                      <div className="report-actions">
                        <button type="button" onClick={() => navigate(`/academic-accreditation/programs/${program.id}`)}><i className="ti ti-eye" /> View</button>
                        <button type="button"><i className="ti ti-file-type-pdf" /> PDF</button>
                        <button type="button"><i className="ti ti-file-spreadsheet" /> Excel</button>
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
