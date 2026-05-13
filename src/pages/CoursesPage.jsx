import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import EntityListToolbar from '../components/EntityListToolbar';
import { courses, courseReportTypes } from '../data';
import { useI18n } from '../i18n';

const normalize = (value) => String(value || '').toLowerCase().trim();

export default function CoursesPage() {
  const navigate = useNavigate();
  const { t, text, statusFromClass } = useI18n();
  const [viewMode, setViewMode] = useState('list');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('code');

  const visibleCourses = useMemo(() => {
    const search = normalize(query);
    const filtered = courses.filter((course) => {
      const haystack = [
        course.code,
        course.name,
        course.nameAr,
        course.semester,
        course.semesterAr,
      ].map(normalize).join(' ');

      return !search || haystack.includes(search);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return text(a, 'name').localeCompare(text(b, 'name'));
      if (sortBy === 'semester') return text(a, 'semester').localeCompare(text(b, 'semester'));
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    });
  }, [query, sortBy, text]);

  const sortOptions = [
    { value: 'code', label: t('sortByCode') },
    { value: 'name', label: t('sortByName') },
    { value: 'semester', label: t('sortBySemester') },
  ];

  return (
    <>
      <Topbar breadcrumbs={[t('courses')]} />
      <div className="page-content">
        <div className="list-hero">
          <div>
            <div className="hero-badge">
              <i className="ti ti-book" /> {t('academic')} {t('courses')}
            </div>
            <div className="hero-title">{t('courses')}</div>
            <div className="hero-sub">{t('selectCourse')}</div>
          </div>
          <div className="hero-stats">
            <div className="stat-chip"><div className="num">{courses.length}</div><div className="lbl">{t('courses')}</div></div>
            <div className="stat-chip"><div className="num">{courseReportTypes.length}</div><div className="lbl">{t('reports')}</div></div>
            <div className="stat-chip"><div className="num">{visibleCourses.length}</div><div className="lbl">{t('shown')}</div></div>
          </div>
        </div>

        <div className="section-header compact">
          <div>
            <div className="section-title">{t('courseList')}</div>
            <div className="section-sub">{t('openAnyCourse')}</div>
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
          total={courses.length}
          visible={visibleCourses.length}
          entityLabel={t('courses')}
          searchPlaceholder={t('searchCourses')}
          sortOptions={sortOptions}
          onReset={() => setQuery('')}
        />

        <div className={`course-list-grid ${viewMode === 'list' ? 'as-list' : ''}`}>
          {visibleCourses.map((course, index) => (
            <button
              key={course.id}
              className="course-list-card"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="course-card-main">
                <div className={`course-card-icon tone-${index % 3}`}>
                  <i className="ti ti-book-2" />
                </div>
                <div className="course-card-copy">
                  <div className="course-card-code">{course.code}</div>
                  <div className="course-card-title">{text(course, 'name')}</div>
                  <div className="course-card-sub">{text(course, 'semester')} · 2025/2026</div>
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

        {!visibleCourses.length && (
          <div className="list-empty-state">
            <i className="ti ti-search-off" />
            <strong>{t('noCoursesFound')}</strong>
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
