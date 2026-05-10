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

export default function App() {
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
