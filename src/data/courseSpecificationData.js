const sharedNarrative = {
  description:
    'This course introduces core computing concepts, problem-solving techniques, data representation, and practical foundations needed for further study in computing disciplines.',
  objectives:
    'By the end of the course, students will understand fundamental computing terminology, apply structured problem solving, and describe common hardware, software, network, and data concepts.',
  prerequisites: ['Information Technology Fundamentals'],
  coRequisites: ['Information Technology Fundamentals'],
  essentialReferences:
    'Brookshear, J. Glenn and Brylow, Dennis. Computer Science: An Overview. Pearson.',
  supportiveReferences:
    'Dale, Nell and Lewis, John. Computer Science Illuminated. Jones & Bartlett Learning.',
  electronicMaterials:
    'University LMS resources, course slides, lab sheets, digital library readings, and selected open educational resources.',
  otherMaterials:
    'Laboratory exercises, instructor handouts, assessment rubrics, and practical activity guides.',
  facilities:
    'Classrooms equipped with projection, computer laboratories, reliable internet access, and learning management system access.',
  technologyEquipment:
    'Instructor workstation, projector, smart board, laboratory PCs, browser-based tools, and office productivity software.',
  otherEquipment:
    'Whiteboard, collaborative workspaces, and accessibility support tools when required.',
};

const commonSpecification = {
  college: 'Faculty of Computing and Information Technology',
  department: 'Computer Science Department',
  institution: 'High Institute',
  version: '1',
  lastRevisionDate: '2026-05-19T11:43:00',
  programs: ['Computer Science', 'Information Technology', 'Information Systems'],
  creditHours: 3,
  courseType: {
    scope: 'Department',
    delivery: 'Required',
  },
  offeredLevels: ['CS110 - 2', 'CS190 - 2', 'IS102 - 2'],
  teachingModes: [
    { mode: 'Lecture', contactHours: 2, percentage: 40 },
    { mode: 'Practical Training', contactHours: 3, percentage: 60 },
  ],
  contactHours: [
    { activity: 'Educational', contactHours: 5 },
    { activity: 'Practical', contactHours: 3 },
  ],
  outcomes: {
    knowledge: [
      {
        clo: 'Explain fundamental computing concepts and terminology.',
        plo: 'PLO1',
        strategy: 'E-learning, guided readings, and interactive lectures',
        assessment: 'Exit Exam',
      },
    ],
    skills: [
      {
        clo: 'Apply structured problem-solving steps to simple computing tasks.',
        plo: 'PLO2',
        strategy: 'Practical lab sessions',
        assessment: 'Lab performance and employer-style task survey',
      },
    ],
    values: [
      {
        clo: 'Demonstrate responsibility, collaboration, and ethical use of computing resources.',
        plo: 'PLO3',
        strategy: 'Group discussion and collaborative activities',
        assessment: 'Peer and alumni survey',
      },
    ],
  },
  contents: [
    { weeks: 2, topic: 'Final revision and course wrap up', contactHours: 3 },
    { weeks: 1, topic: 'Introduction to computer networks and internet', contactHours: 3 },
    { weeks: 3, topic: 'Introduction to databases and data management', contactHours: 3 },
  ],
  assessment: [
    { activity: 'Quiz and online activities', timing: '1 - 2', percentage: 20 },
    { activity: 'Practical lab work', timing: '2 - 8', percentage: 30 },
    { activity: 'Final exam', timing: '14 - 15', percentage: 50 },
  ],
  evaluation: [
    { issue: 'Course learning outcomes achievement', assessor: 'Course Coordinator', method: 'Direct' },
    { issue: 'Teaching effectiveness and student feedback', assessor: 'Quality Unit', method: 'Survey and direct review' },
  ],
  approvals: [
    { username: 'Supervisor Supervisor', job: 'SupervisorId', status: 'Approve', reason: '', date: '5/12/26, 12:35 PM' },
    { username: 'QualityAssistant qualityAssistant', job: 'QualityAssistantId', status: 'Approve', reason: '', date: '5/12/26, 12:35 PM' },
    { username: 'coordinator coordinator', job: 'Coordinator', status: 'Submit', reason: '', date: '5/12/26, 12:34 PM' },
  ],
};

export const courseSpecificationById = {
  cs12: {
    ...commonSpecification,
    title: 'Computer Science Fundamentals',
    code: 'CS12',
    ...sharedNarrative,
  },
  it1231: {
    ...commonSpecification,
    title: 'Information Technology Fundamentals',
    code: 'IT1231',
    department: 'Information Technology Department',
    programs: ['Information Technology', 'Computer Science', 'Information Systems'],
    description:
      'This course introduces information technology concepts, digital infrastructure, software applications, networks, cybersecurity awareness, and IT service foundations.',
    objectives:
      'Students will identify major IT components, use common productivity and network concepts, and explain the role of information systems in organizations.',
    prerequisites: ['Computer Skills'],
    coRequisites: ['Computer Skills Lab'],
  },
  c180: {
    ...commonSpecification,
    title: 'Programming Basic',
    code: 'C180',
    programs: ['Computer Science', 'Software Engineering', 'Information Technology'],
    description:
      'This course develops basic programming skills through algorithms, variables, control structures, functions, and simple problem-solving exercises.',
    objectives:
      'Students will design simple algorithms, implement basic programs, test code, and apply introductory debugging techniques.',
    prerequisites: ['Computer Science Fundamentals'],
    coRequisites: ['Programming Basic Lab'],
    contents: [
      { weeks: 2, topic: 'Algorithms and flowcharts', contactHours: 4 },
      { weeks: 4, topic: 'Variables, expressions, and control structures', contactHours: 12 },
      { weeks: 4, topic: 'Functions, arrays, and debugging practice', contactHours: 12 },
    ],
  },
};

export function getCourseSpecification(course) {
  const specification = courseSpecificationById[course?.id] || commonSpecification;

  return {
    ...specification,
    title: course?.name || specification.title,
    code: course?.code || specification.code,
  };
}
