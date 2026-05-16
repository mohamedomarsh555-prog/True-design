import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { courses } from '../data';

export default function CourseCrnRoutePage() {
  const { courseCode } = useParams();
  const course = courses.find((item) => item.code.toLowerCase() === String(courseCode || '').toLowerCase());

  if (!course) return <Navigate to="/courses" replace />;

  return <Navigate to={`/courses/${course.id}/reports/crns`} replace />;
}
