import { useNavigate } from 'react-router-dom';
import { historyItems } from '../data';
import { useI18n } from '../i18n';

export default function HistoryScreen({ entityCode, reportId, reportTitle, type, onBack }) {
  const navigate = useNavigate();
  const { t, statusFromClass } = useI18n();
  const isProgram = type === 'program';
  const newCardClass = isProgram ? 'new-program' : 'new-course';
  const newIconClass = isProgram ? 'hi-amber-new' : 'hi-primary-new';
  const addBtnClass = isProgram ? 'add-program' : 'add-course';
  const newPillClass = isProgram ? 's-new-amber' : 's-new';
  const histIconClass = isProgram ? 'hi-amber' : 'hi-primary';
  const histIcon = isProgram ? 'ti-file-certificate' : 'ti-file-description';

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{reportTitle} — {entityCode}</div>
          <div className="section-sub">{t('history')}</div>
        </div>
        <div className="btn-group">
          <button className="btn-outline" onClick={onBack}>
            <i className="ti ti-arrow-left" /> {t('backToReports')}
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              navigate(isProgram ? `/programs/reports/${reportId}` : `/courses/reports/${reportId}`);
            }}
          >
            <i className="ti ti-layout-list" /> {isProgram ? t('viewAllPrograms') : t('viewAllCourses')}
          </button>
        </div>
      </div>

      <div className="history-list">
        <div className={`history-card ${newCardClass}`}>
          <div className={`hist-icon ${newIconClass}`}>
            <i className="ti ti-plus" />
          </div>
          <div className="hist-info">
            <div className="hist-title">{t('newSubmission')} — 2025/2026</div>
            <div className="hist-sub">
              {t('notStartedYet')} · {isProgram ? `${t('academicYear')} 2025/2026` : t('firstSemester')}
            </div>
          </div>
          <div className="hist-meta">
            <span className={`status-pill ${newPillClass}`}>{t('new')}</span>
            <div className="hist-actions">
              <button className={`act-btn ${addBtnClass}`}>
                <i className="ti ti-plus" /> {t('add')}
              </button>
            </div>
          </div>
        </div>

        {historyItems.map((item, i) => (
          <div key={i} className="history-card">
            <div className={`hist-icon ${item.status === 's-done' ? 'hi-green' : item.status === 's-archived' ? 'hi-gray' : histIconClass}`}>
              <i className={`ti ${item.status === 's-done' ? 'ti-circle-check' : item.status === 's-archived' ? 'ti-archive' : histIcon}`} />
            </div>
            <div className="hist-info">
              <div className="hist-title">{reportTitle} — {item.year}</div>
              <div className="hist-sub">{item.date}</div>
            </div>
            <div className="hist-meta">
              <span className={`status-pill ${item.status}`}>{statusFromClass(item.status, item.statusLabel)}</span>
              <div className="hist-actions">
                <button className={`act-btn ${item.status === 's-pending' ? 'primary' : ''}`}>
                  <i className="ti ti-eye" /> {t('view')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
