import { useState } from 'react';
import { useI18n } from '../i18n';

const STATIC_AUTH = {
  username: 'Gouda',
  password: 'Passw0rd015',
  otp: '010011',
};

export default function LoginPage({ onAuthenticated }) {
  const { language, setLanguage, isRtl } = useI18n();
  const [step, setStep] = useState('login');
  const [username, setUsername] = useState(STATIC_AUTH.username);
  const [password, setPassword] = useState(STATIC_AUTH.password);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authText = {
    en: {
      brandSub: 'Quality assurance system',
      portal: 'Academic Quality Portal',
      welcome: 'Welcome back',
      intro: 'Sign in to continue to reports, accreditation evidence, dashboards, and program quality tracking.',
      signIn: 'Sign in',
      signInHint: 'Enter your account credentials.',
      verifyOtp: 'Verify OTP',
      otpHint: 'Enter the one-time passcode to access TRUE.',
      invalidLogin: 'Invalid username or password.',
      invalidOtp: 'Invalid OTP code.',
      username: 'Username',
      password: 'Password',
      otpCode: 'OTP Code',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      continue: 'Continue',
      verify: 'Verify and enter',
      back: 'Back to sign in',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      otpSent: 'Code sent to your email',
    },
    ar: {
      brandSub: 'نظام ضمان الجودة',
      portal: 'بوابة الجودة الأكاديمية',
      welcome: 'مرحباً بعودتك',
      intro: 'سجل الدخول للمتابعة إلى التقارير وأدلة الاعتماد ولوحات المتابعة وجودة البرامج.',
      signIn: 'تسجيل الدخول',
      signInHint: 'أدخل بيانات حسابك.',
      verifyOtp: 'التحقق من رمز OTP',
      otpHint: 'أدخل رمز التحقق لمتابعة الدخول إلى TRUE.',
      invalidLogin: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
      invalidOtp: 'رمز التحقق غير صحيح.',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      otpCode: 'رمز OTP',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordPlaceholder: 'أدخل كلمة المرور',
      continue: 'متابعة',
      verify: 'تحقق وادخل',
      back: 'العودة لتسجيل الدخول',
      remember: 'تذكرني',
      forgot: 'نسيت كلمة المرور؟',
      otpSent: 'تم إرسال الرمز إلى بريدك الإلكتروني',
    },
  }[language];

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (username.trim() === STATIC_AUTH.username && password === STATIC_AUTH.password) {
        setStep('otp');
        setIsLoading(false);
        return;
      }
      setError(authText.invalidLogin);
      setIsLoading(false);
    }, 800);
  };

  const handleOtp = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (otp.trim() === STATIC_AUTH.otp) {
        sessionStorage.setItem('true-authenticated', 'true');
        onAuthenticated();
        return;
      }
      setError(authText.invalidOtp);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className={`enhanced-login-page ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="login-background" />

      <div className="login-container">
        <div className="login-side-info">
          <div className="brand-header">
            <div className="brand-logo-circle">
              <svg width="32" height="32" viewBox="0 0 20 20" aria-hidden="true">
                <polyline points="3,10 8,15 17,5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="brand-text">
              <h1>CPTIT TRUE</h1>
              <p>{authText.brandSub}</p>
            </div>
          </div>

          <div className="language-selector-login" role="group" aria-label={language === 'ar' ? 'تبديل اللغة' : 'Language switch'}>
            <span className="login-language-icon" aria-hidden="true">
              <i className="ti ti-language" />
            </span>
            <button
              type="button"
              className={language === 'ar' ? 'active' : ''}
              onClick={() => setLanguage('ar')}
              aria-pressed={language === 'ar'}
            >
              عربي
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <div className="hero-content">
            <span className="portal-badge">{authText.portal}</span>
            <h2>{authText.welcome}</h2>
            <p>{authText.intro}</p>
          </div>

          <div className="hero-footer">
            <p>© 2026 TRUE Management System. All rights reserved.</p>
          </div>
        </div>

        <div className="login-card-side">
          <div className={`login-card ${isLoading ? 'loading' : ''}`}>
            <div className="card-header">
              <div className="step-icon">
                <i className={`ti ${step === 'login' ? 'ti-lock-open' : 'ti-shield-lock'}`} />
              </div>
              <div className="header-titles">
                <h3>{step === 'login' ? authText.signIn : authText.verifyOtp}</h3>
                <p>{step === 'login' ? authText.signInHint : authText.otpHint}</p>
              </div>
            </div>

            {error && <div className="error-message"><i className="ti ti-alert-circle" /> {error}</div>}

            <div className="card-body">
              {step === 'login' ? (
                <form onSubmit={handleLogin}>
                  <div className="input-group">
                    <label>{authText.username}</label>
                    <div className="input-wrapper">
                      <i className="ti ti-user" />
                      <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder={authText.usernamePlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>{authText.password}</label>
                    <div className="input-wrapper">
                      <i className="ti ti-key" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={authText.passwordPlaceholder}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>{authText.remember}</span>
                    </label>
                    <a href="#forgot" className="forgot-link">{authText.forgot}</a>
                  </div>

                  <button className="submit-btn" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loader" />
                    ) : (
                      <>
                        <span>{authText.continue}</span>
                        <i className={`ti ${isRtl ? 'ti-arrow-left' : 'ti-arrow-right'}`} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtp}>
                  <div className="input-group">
                    <label>{authText.otpCode}</label>
                    <div className="otp-wrapper">
                      <input
                        type="password"
                        maxLength="6"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="••••••"
                        className="otp-input"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        autoFocus
                      />
                    </div>
                    <p className="otp-help">{authText.otpSent}</p>
                  </div>

                  <button className="submit-btn" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loader" />
                    ) : (
                      <>
                        <span>{authText.verify}</span>
                        <i className="ti ti-login-2" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="back-btn"
                    onClick={() => {
                      setStep('login');
                      setError('');
                    }}
                  >
                    <i className={`ti ${isRtl ? 'ti-chevron-right' : 'ti-chevron-left'}`} />
                    {authText.back}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
