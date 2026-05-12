import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import AllCoursesReportPage from './pages/AllCoursesReportPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramPage from './pages/ProgramPage';
import AllProgramsReportPage from './pages/AllProgramsReportPage';
import ModulePage from './pages/ModulePage';
import InstitutionalAccreditationPage from './pages/InstitutionalAccreditationPage';
import QualityModulesPage from './pages/QualityModulesPage';

const STATIC_AUTH = {
  username: 'Gouda',
  password: 'Passw0rd015',
  otp: '010011',
};

function LoginFlow({ onAuthenticated }) {
  const [step, setStep] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() === STATIC_AUTH.username && password === STATIC_AUTH.password) {
      setError('');
      setStep('otp');
      return;
    }
    setError('Invalid username or password.');
  };

  const handleOtp = (event) => {
    event.preventDefault();
    if (otp.trim() === STATIC_AUTH.otp) {
      sessionStorage.setItem('true-authenticated', 'true');
      onAuthenticated();
      return;
    }
    setError('Invalid OTP code.');
  };

  return (
    <main className="auth-page">
      <section className="auth-hero" aria-label="TRUE sign in">
        <div className="auth-brand">
          <div className="auth-logo">
            <svg width="24" height="24" viewBox="0 0 20 20" aria-hidden="true">
              <polyline points="3,10 8,15 17,5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <strong>CPTIT TRUE</strong>
            <span>Quality assurance system</span>
          </div>
        </div>
        <div className="auth-hero-copy">
          <span className="auth-kicker">Academic Quality Portal</span>
          <h1>Welcome back</h1>
          <p>Sign in to continue to reports, accreditation evidence, dashboards, and program quality tracking.</p>
        </div>
      </section>

      <section className="auth-card" aria-label={step === 'login' ? 'Login form' : 'OTP verification'}>
        <div className="auth-card-head">
          <div className="auth-step-icon">
            <i className={`ti ${step === 'login' ? 'ti-lock' : 'ti-shield-check'}`} />
          </div>
          <div>
            <h2>{step === 'login' ? 'Sign in' : 'Verify OTP'}</h2>
            <p>{step === 'login' ? 'Enter your account credentials.' : 'Enter the one-time passcode to access TRUE.'}</p>
          </div>
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}

        {step === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label className="auth-field">
              <span>Username</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                placeholder="Enter username"
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
              />
            </label>
            <button className="auth-submit" type="submit">
              Continue
              <i className="ti ti-arrow-right" />
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleOtp}>
            <label className="auth-field">
              <span>OTP Code</span>
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
              />
            </label>
            <button className="auth-submit" type="submit">
              Verify and enter
              <i className="ti ti-login-2" />
            </button>
            <button
              className="auth-back"
              type="button"
              onClick={() => {
                setStep('login');
                setOtp('');
                setError('');
              }}
            >
              Back to sign in
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('true-authenticated') === 'true'
  );

  if (!isAuthenticated) {
    return <LoginFlow onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/reports/:reportId" element={<AllCoursesReportPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/courses/:courseId/reports/:reportId" element={<CoursePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/reports/:reportId" element={<AllProgramsReportPage />} />
            <Route path="/programs/:programId" element={<ProgramPage />} />
            <Route path="/programs/:programId/reports/:reportId" element={<ProgramPage />} />
            <Route
              path="/clo-plo-management"
              element={
                <ModulePage
                  titleKey="cloPloManagement"
                  subtitleKey="moduleSubtitles.clo"
                  icon="ti-sitemap"
                />
              }
            />
            <Route
              path="/institutional-accreditation"
              element={<InstitutionalAccreditationPage />}
            />
            <Route path="/accreditation" element={<QualityModulesPage moduleType="accreditation" />} />
            <Route path="/accreditation/:section" element={<QualityModulesPage moduleType="accreditation" />} />
            <Route path="/strategic-planning" element={<QualityModulesPage moduleType="strategic" />} />
            <Route path="/strategic-planning/:section" element={<QualityModulesPage moduleType="strategic" />} />
            <Route path="/quality-projects" element={<QualityModulesPage moduleType="quality" />} />
            <Route path="/quality-projects/:section" element={<QualityModulesPage moduleType="quality" />} />
            <Route
              path="/documentation-definitions"
              element={
                <ModulePage
                  titleKey="documentationDefinitions"
                  subtitleKey="moduleSubtitles.documentation"
                  icon="ti-folders"
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
