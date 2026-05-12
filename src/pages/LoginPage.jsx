
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authText = {
    en: {
      signInAria: 'TRUE sign in',
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
      otpPlaceholder: 'Enter 6-digit OTP',
      continue: 'Continue',
      verify: 'Verify and enter',
      back: 'Back to sign in',
      loginForm: 'Login form',
      otpForm: 'OTP verification',
    },
    ar: {
      signInAria: 'تسجيل الدخول إلى TRUE',
      brandSub: 'نظام ضمان الجودة',
      portal: 'بوابة الجودة الأكاديمية',
      welcome: 'مرحباً بعودتك',
      intro: 'سجّل الدخول للمتابعة إلى التقارير وأدلة الاعتماد ولوحات المتابعة وجودة البرامج.',
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
      otpPlaceholder: 'أدخل رمز التحقق من 6 أرقام',
      continue: 'متابعة',
      verify: 'تحقق وادخل',
      back: 'العودة لتسجيل الدخول',
      loginForm: 'نموذج تسجيل الدخول',
      otpForm: 'التحقق من OTP',
    },
  }[language];

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
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
      <div className="login-background"></div>
      
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

          <div className="language-selector-login">
            <button 
              className={language === 'ar' ? 'active' : ''} 
              onClick={() => setLanguage('ar')}
            >العربية</button>
            <span className="divider"></span>
            <button 
              className={language === 'en' ? 'active' : ''} 
              onClick={() => setLanguage('en')}
            >English</button>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={authText.passwordPlaceholder}
                        required
                      />
                      <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`} />
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" />
                      <span>{language === 'ar' ? 'تذكرني' : 'Remember me'}</span>
                    </label>
                    <a href="#forgot" className="forgot-link">{language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}</a>
                  </div>

                  <button className="submit-btn" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loader"></span>
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
                        type="text"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="••••••"
                        className="otp-input"
                        autoFocus
                      />
                    </div>
                    <p className="otp-help">{language === 'ar' ? 'تم إرسال الرمز إلى بريدك الإلكتروني' : 'Code sent to your email'}</p>
                  </div>

                  <button className="submit-btn" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loader"></span>
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
