import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { academicPrograms, colleges, departments, getCollegeDepartments, getDepartmentPrograms, universityNode } from '../data/academicHierarchyData';
import { useI18n } from '../i18n';

export const localName = (item, key, language) => (language === 'ar' ? item?.[`${key}Ar`] || item?.[key] : item?.[key]);

export function statusTone(status = '') {
  const value = status.toLowerCase();
  if (value.includes('accredited') && !value.includes('conditional')) return 'green';
  if (value.includes('conditional') || value.includes('review')) return 'yellow';
  if (value.includes('progress') || value.includes('scheduled')) return 'orange';
  if (value.includes('expired') || value.includes('critical') || value.includes('missing') || value.includes('delayed')) return 'red';
  return 'neutral';
}

export function StatusChip({ status }) {
  return <span className={`hier-status tone-${statusTone(status)}`}>{status}</span>;
}

export function HierProgress({ value, label }) {
  return (
    <div className="hier-progress">
      <div>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <i><b style={{ width: `${Math.max(3, Math.min(100, value))}%` }} /></i>
    </div>
  );
}

export function ProgressRing({ value, label }) {
  return (
    <div className="progress-ring" style={{ '--value': `${value * 3.6}deg` }}>
      <div><strong>{value}%</strong><span>{label}</span></div>
    </div>
  );
}

export function AcademicBreadcrumbs({ items }) {
  return (
    <div className="academic-breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 && <i className="ti ti-chevron-right" />}
          {item}
        </span>
      ))}
    </div>
  );
}

export function HierarchyMetricGrid({ metrics }) {
  return (
    <div className="hier-metric-grid">
      {metrics.map((metric) => (
        <div className="hier-metric" key={metric.label}>
          <i className={`ti ${metric.icon}`} />
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

export function AcademicTree({ activeType, activeId, onSelect }) {
  const { language } = useI18n();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(() => new Set(colleges.map((college) => college.id).concat(departments.map((department) => department.id))));
  const normalized = query.trim().toLowerCase();

  const toggle = (id) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleColleges = useMemo(() => {
    if (!normalized) return colleges;
    return colleges.filter((college) => {
      const collegeText = `${college.name} ${college.nameAr} ${college.code}`.toLowerCase();
      const departmentText = getCollegeDepartments(college.id).map((department) => `${department.name} ${department.nameAr}`).join(' ').toLowerCase();
      const programText = academicPrograms.filter((program) => program.collegeId === college.id).map((program) => `${program.name} ${program.nameAr} ${program.code}`).join(' ').toLowerCase();
      return `${collegeText} ${departmentText} ${programText}`.includes(normalized);
    });
  }, [normalized]);

  return (
    <aside className="academic-tree-panel">
      <div className="tree-search">
        <i className="ti ti-search" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === 'ar' ? 'بحث في الهيكل' : 'Search structure'} />
      </div>
      <button type="button" className={`tree-node university ${activeType === 'university' ? 'active' : ''}`} onClick={() => onSelect?.('university', universityNode.id)}>
        <i className="ti ti-building-bank" />
        <span>{localName(universityNode, 'name', language)}</span>
        <em>{universityNode.readiness}%</em>
      </button>
      <div className="tree-list">
        {visibleColleges.map((college) => (
          <div key={college.id}>
            <div className={`tree-node college tone-${statusTone(college.accreditationStatus)} ${activeType === 'college' && activeId === college.id ? 'active' : ''}`}>
              <button type="button" onClick={() => toggle(college.id)}><i className={`ti ${open.has(college.id) ? 'ti-chevron-down' : 'ti-chevron-right'}`} /></button>
              <span onClick={() => onSelect?.('college', college.id)}>{localName(college, 'name', language)}</span>
              <em>{college.readiness}% · {college.programsCount}</em>
            </div>
            {open.has(college.id) && getCollegeDepartments(college.id).map((department) => (
              <div key={department.id}>
                <div className={`tree-node department tone-${statusTone(department.accreditationStatus)} ${activeType === 'department' && activeId === department.id ? 'active' : ''}`}>
                  <button type="button" onClick={() => toggle(department.id)}><i className={`ti ${open.has(department.id) ? 'ti-chevron-down' : 'ti-chevron-right'}`} /></button>
                  <span onClick={() => onSelect?.('department', department.id)}>{localName(department, 'name', language)}</span>
                  <em>{department.readiness}% · {department.openTasks}</em>
                </div>
                {open.has(department.id) && getDepartmentPrograms(department.id).map((program) => (
                  <button
                    key={program.id}
                    type="button"
                    className={`tree-node program tone-${statusTone(program.accreditationStatus)} ${activeType === 'program' && activeId === program.id ? 'active' : ''}`}
                    onClick={() => onSelect?.('program', program.id)}
                  >
                    <i className="ti ti-award" />
                    <span>{localName(program, 'name', language)}</span>
                    <em>{program.readiness}% · {program.accreditationStatus}</em>
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

export function OrganizationMap({ compact = false }) {
  const { language } = useI18n();
  return (
    <div className={`org-map ${compact ? 'compact' : ''}`}>
      <div className="org-node university"><i className="ti ti-building-bank" /><strong>{localName(universityNode, 'name', language)}</strong><span>{universityNode.readiness}%</span></div>
      <div className="org-branches">
        {colleges.map((college) => (
          <div className="org-branch" key={college.id}>
            <div className="org-node college"><strong>{localName(college, 'name', language)}</strong><span>{college.readiness}%</span></div>
            {!compact && (
              <div className="org-children">
                {getCollegeDepartments(college.id).map((department) => (
                  <div className="org-node department" key={department.id}><span>{localName(department, 'name', language)}</span><em>{department.programsCount}</em></div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgramHierarchyCard({ program }) {
  const { language } = useI18n();
  const navigate = useNavigate();
  return (
    <article className="program-h-card">
      <div className="program-h-head">
        <div>
          <span>{program.code}</span>
          <h3>{localName(program, 'name', language)}</h3>
          <p>{program.degree} · {program.accreditationBody}</p>
        </div>
        <StatusChip status={program.accreditationStatus} />
      </div>
      <div className="program-h-stats">
        <div><strong>{program.evidenceCount}</strong><span>{language === 'ar' ? 'أدلة' : 'Evidence'}</span></div>
        <div><strong>{program.standardsCompleted}/{program.standardsTotal}</strong><span>{language === 'ar' ? 'معايير' : 'Standards'}</span></div>
        <div><strong>{program.nextVisit}</strong><span>{language === 'ar' ? 'زيارة' : 'Next Visit'}</span></div>
      </div>
      <HierProgress value={program.readiness} label={language === 'ar' ? 'الجاهزية' : 'Readiness'} />
      <button type="button" className="hier-open-btn" onClick={() => navigate(`/academic-accreditation/programs/${program.id}`)}>
        {language === 'ar' ? 'فتح البرنامج' : 'Open Program'}
        <i className="ti ti-arrow-right" />
      </button>
    </article>
  );
}

export function FloatingDetailsPanel({ item, onClose }) {
  const { language } = useI18n();
  if (!item) return null;
  return (
    <div className="floating-details-panel">
      <div className="floating-panel-head">
        <div>
          <span>{item.type}</span>
          <h3>{item.title}</h3>
        </div>
        <button type="button" onClick={onClose}><i className="ti ti-x" /></button>
      </div>
      <div className="floating-panel-body">
        <StatusChip status={item.status || item.level || 'In Progress'} />
        <p>{item.description || item.owner || item.due || (language === 'ar' ? 'تفاصيل العنصر مرتبطة بالهيكل الأكاديمي.' : 'This item is linked to the academic hierarchy.')}</p>
      </div>
    </div>
  );
}
