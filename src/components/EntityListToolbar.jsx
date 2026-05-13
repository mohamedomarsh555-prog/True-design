import { useI18n } from '../i18n';

export default function EntityListToolbar({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
  total,
  visible,
  entityLabel,
  searchPlaceholder,
  sortOptions,
  onReset,
}) {
  const { t } = useI18n();
  const hasActiveSearch = query.trim().length > 0;

  return (
    <div className="list-toolbar" aria-label={t('listTools')}>
      <label className="list-search">
        <i className="ti ti-search" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
      </label>

      <label className="list-sort">
        <span>{t('sort')}</span>
        <select value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="list-result-count">
        <strong>{visible}</strong>
        <span>{t('of')} {total} {entityLabel}</span>
      </div>

      {hasActiveSearch && (
        <button type="button" className="list-reset-btn" onClick={onReset}>
          <i className="ti ti-x" />
          {t('clear')}
        </button>
      )}
    </div>
  );
}
