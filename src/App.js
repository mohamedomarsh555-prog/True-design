import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import ProgramPage from './pages/ProgramPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/programs/:programId" element={<ProgramPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
