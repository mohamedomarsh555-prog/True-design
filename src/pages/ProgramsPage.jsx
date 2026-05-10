import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { programs } from '../data';
import { useI18n } from '../i18n';

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { t, text, statusFromClass } = useI18n();
  const [viewMode, setViewMode] = useState('list');

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
            <div className="stat-chip"><div className="num">9</div><div className="lbl">{t('reports')}</div></div>
            <div className="stat-chip"><div className="num">3</div><div className="lbl">{t('status.pending')}</div></div>
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

        <div className={`course-list-grid ${viewMode === 'list' ? 'as-list' : ''}`}>
          {programs.map((program, index) => (
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
      </div>
    </>
  );
}
