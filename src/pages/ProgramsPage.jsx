import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import EntityListToolbar from '../components/EntityListToolbar';
import { programs, programReportTypes } from '../data';
import { useI18n } from '../i18n';

const normalize = (value) => String(value || '').toLowerCase().trim();

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { t, text, statusFromClass } = useI18n();
  const [viewMode, setViewMode] = useState('list');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('code');

  const visiblePrograms = useMemo(() => {
    const search = normalize(query);
    const filtered = programs.filter((program) => {
      const haystack = [
        program.code,
        program.name,
        program.nameAr,
        program.year,
      ].map(normalize).join(' ');

      return !search || haystack.includes(search);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return text(a, 'name').localeCompare(text(b, 'name'));
      if (sortBy === 'year') return a.year.localeCompare(b.year);
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    });
  }, [query, sortBy, text]);

  const sortOptions = [
    { value: 'code', label: t('sortByCode') },
    { value: 'name', label: t('sortByName') },
    { value: 'year', label: t('sortByYear') },
  ];

  return (
    <>
      <Topbar breadcrumbs={[t('programs')]} />
      <div className="page-content">
        <div className="list-hero program-list-hero">
          <div>
            <div className="hero-badge">
              <i className="ti ti-award" /> {t('academic')} {t('programs')}
            </div>
            <div className="hero-title">{t('programs')}</div>
            <div className="hero-sub">{t('selectProgram')}</div>
          </div>
          <div className="hero-stats">
            <div className="stat-chip"><div className="num">{programs.length}</div><div className="lbl">{t('programs')}</div></div>
            <div className="stat-chip"><div className="num">{programReportTypes.length}</div><div className="lbl">{t('reports')}</div></div>
            <div className="stat-chip"><div className="num">{visiblePrograms.length}</div><div className="lbl">{t('shown')}</div></div>
          </div>
        </div>

        <div className="section-header compact">
          <div>
            <div className="section-title">{t('programList')}</div>
            <div className="section-sub">{t('openAnyProgram')}</div>
          </div>
          <div className="view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label={t('gridView')}
              title={t('gridView')}
            >
              <i className="ti ti-layout-grid" />
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label={t('listView')}
              title={t('listView')}
            >
              <i className="ti ti-list-details" />
            </button>
          </div>
        </div>

        <EntityListToolbar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          total={programs.length}
          visible={visiblePrograms.length}
          entityLabel={t('programs')}
          searchPlaceholder={t('searchPrograms')}
          sortOptions={sortOptions}
          onReset={() => setQuery('')}
        />

        <div className={`course-list-grid ${viewMode === 'list' ? 'as-list' : ''}`}>
          {visiblePrograms.map((program, index) => (
            <button
              key={program.id}
              className="course-list-card"
              onClick={() => navigate(`/programs/${program.id}`)}
            >
              <div className="course-card-main">
                <div className={`course-card-icon program-tone-${index % 3}`}>
                  <i className="ti ti-award" />
                </div>
                <div className="course-card-copy">
                  <div className="program-card-code">{program.code}</div>
                  <div className="course-card-title">{text(program, 'name')}</div>
                  <div className="course-card-sub">{t('academicYear')} {program.year}</div>
                </div>
              </div>
              <div className="course-card-meta">
                <span className="status-pill s-pending">1 {statusFromClass('s-pending')}</span>
                <span className="status-pill s-not-started">2 {statusFromClass('s-not-started')}</span>
                <i className="ti ti-arrow-right rc-arrow" />
              </div>
            </button>
          ))}
        </div>

        {!visiblePrograms.length && (
          <div className="list-empty-state">
            <i className="ti ti-search-off" />
            <strong>{t('noProgramsFound')}</strong>
            <span>{t('adjustSearch')}</span>
            <button type="button" className="act-btn primary" onClick={() => setQuery('')}>
              {t('clearSearch')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
