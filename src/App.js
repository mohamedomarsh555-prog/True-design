import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import AllCoursesReportPage from './pages/AllCoursesReportPage';
import CourseSpecificationViewPage from './pages/CourseSpecificationViewPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramPage from './pages/ProgramPage';
import AllProgramsReportPage from './pages/AllProgramsReportPage';
import ModulePage from './pages/ModulePage';
import InstitutionalAccreditationPage from './pages/InstitutionalAccreditationPage';
import QualityModulesPage from './pages/QualityModulesPage';
import ProjectDetailsPage from './pages/ProjectManagement/ProjectDetailsPage';
import StrategicPlanDetailsPage from './pages/ProjectManagement/StrategicPlanDetailsPage';
import StrategicObjectiveDetailsPage from './pages/ProjectManagement/StrategicObjectiveDetailsPage';
import LoginPage from './pages/LoginPage';
import { useI18n } from './i18n';
import './login.css';

const STATIC_AUTH = {
  username: 'Gouda',
  password: 'Passw0rd015',
  otp: '010011',
};

// The LoginPage component is now used directly in the App component.

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('true-authenticated') === 'true'
  );

  if (!isAuthenticated) {
    return <LoginPage onAuthenticated={() => setIsAuthenticated(true)} />;
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
            <Route path="/courses/:courseId/reports/course-specification/view" element={<CourseSpecificationViewPage />} />
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
            <Route path="/strategic-planning/plans/:planId" element={<StrategicPlanDetailsPage />} />
            <Route path="/strategic-planning/plans/:planId/:tab" element={<StrategicPlanDetailsPage />} />
            <Route path="/strategic-planning/objectives/:objectiveId" element={<StrategicObjectiveDetailsPage />} />
            <Route path="/strategic-planning/objectives/:objectiveId/:tab" element={<StrategicObjectiveDetailsPage />} />
            <Route path="/quality-projects" element={<QualityModulesPage moduleType="quality" />} />
            <Route path="/quality-projects/:section" element={<QualityModulesPage moduleType="quality" />} />
            <Route path="/quality-projects/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/quality-projects/projects/:projectId/:tab" element={<ProjectDetailsPage />} />
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
