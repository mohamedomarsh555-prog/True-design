import Topbar from '../components/Topbar';
import { useI18n } from '../i18n';

export default function ProfilePage() {
  const { language } = useI18n();

  return (
    <>
      <Topbar breadcrumbs={[language === 'ar' ? 'الملف الشخصي' : 'User Profile']} />
      <div className="page-content">
        <section className="panel user-profile-panel">
          <div className="user-profile-avatar">MH</div>
          <div>
            <h1>{language === 'ar' ? 'Mohammed Hassan' : 'Mohammed Hassan'}</h1>
            <p>m.hassan@taif.edu.sa</p>
            <span>{language === 'ar' ? 'منسق' : 'Coordinator'}</span>
          </div>
        </section>
      </div>
    </>
  );
}
