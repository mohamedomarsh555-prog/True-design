import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { courses } from '../data';
import { getCourseSpecification } from '../data/courseSpecificationData';
import { useI18n } from '../i18n';

const workflowSteps = [
  { label: 'Coordinator', icon: 'ti-user-check' },
  { label: 'Quality', icon: 'ti-shield-check' },
  { label: 'Supervisor', icon: 'ti-user-star' },
  { label: 'Approved', icon: 'ti-rosette-discount-check' },
];

const sections = [
  { id: 'information', label: 'Information', icon: 'ti-info-circle' },
  { id: 'identification', label: 'Identification', icon: 'ti-id' },
  { id: 'outcomes', label: 'Outcomes', icon: 'ti-target-arrow' },
  { id: 'contents', label: 'Contents', icon: 'ti-list-details' },
  { id: 'assessment', label: 'Assessment', icon: 'ti-clipboard-check' },
  { id: 'resources', label: 'Resources', icon: 'ti-books' },
  { id: 'evaluation', label: 'Evaluation', icon: 'ti-chart-dots' },
];

const specAr = {
  'Coordinator': '\u0627\u0644\u0645\u0646\u0633\u0642',
  'Quality': '\u0627\u0644\u062c\u0648\u062f\u0629',
  'Supervisor': '\u0627\u0644\u0645\u0634\u0631\u0641',
  'Approved': '\u0645\u0639\u062a\u0645\u062f',
  'Information': '\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Identification': '\u0627\u0644\u062a\u0639\u0631\u064a\u0641',
  'Outcomes': '\u0645\u062e\u0631\u062c\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u0645',
  'Contents': '\u0627\u0644\u0645\u062d\u062a\u0648\u064a\u0627\u062a',
  'Assessment': '\u0627\u0644\u062a\u0642\u064a\u064a\u0645',
  'Resources': '\u0627\u0644\u0645\u0648\u0627\u0631\u062f',
  'Evaluation': '\u0627\u0644\u062a\u0642\u0648\u064a\u0645',
  'Program Information': '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u0642\u0631\u0631',
  'Approvals History': '\u0633\u062c\u0644 \u0627\u0644\u0627\u0639\u062a\u0645\u0627\u062f\u0627\u062a',
  'Course Specification': '\u062a\u0648\u0635\u064a\u0641 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Course Title': '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Course Code': '\u0631\u0645\u0632 \u0627\u0644\u0645\u0642\u0631\u0631',
  'College': '\u0627\u0644\u0643\u0644\u064a\u0629',
  'Department': '\u0627\u0644\u0642\u0633\u0645',
  'Institution': '\u0627\u0644\u0645\u0624\u0633\u0633\u0629',
  'Version': '\u0627\u0644\u0625\u0635\u062f\u0627\u0631',
  'Last Revision Date': '\u062a\u0627\u0631\u064a\u062e \u0622\u062e\u0631 \u0645\u0631\u0627\u062c\u0639\u0629',
  'Program': '\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c',
  'Course Identification': '\u062a\u0639\u0631\u064a\u0641 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Credit Hours': '\u0627\u0644\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0645\u0639\u062a\u0645\u062f\u0629',
  'Course Type': '\u0646\u0648\u0639 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Level/Year at which this course is offered': '\u0627\u0644\u0645\u0633\u062a\u0648\u0649 / \u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u062a\u064a \u064a\u0642\u062f\u0645 \u0641\u064a\u0647\u0627 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Course General Description': '\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u0642\u0631\u0631',
  'Course Main Objectives': '\u0627\u0644\u0623\u0647\u062f\u0627\u0641 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 \u0644\u0644\u0645\u0642\u0631\u0631',
  'Prerequisites for this course': '\u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Co-requisites for this course': '\u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u062a\u0632\u0627\u0645\u0646\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Teaching Mode': '\u0646\u0645\u0637 \u0627\u0644\u062a\u062f\u0631\u064a\u0633',
  'Contact Hours': '\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
  'Percentage %': '\u0627\u0644\u0646\u0633\u0628\u0629 %',
  'Action': '\u0627\u0644\u0625\u062c\u0631\u0627\u0621',
  'Activity': '\u0627\u0644\u0646\u0634\u0627\u0637',
  'Total Contact Hours': '\u0625\u062c\u0645\u0627\u0644\u064a \u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
  'Course Learning Outcomes (CLOs)': '\u0645\u062e\u0631\u062c\u0627\u062a \u062a\u0639\u0644\u0645 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Program Learning Outcomes (PLOs)': '\u0645\u062e\u0631\u062c\u0627\u062a \u062a\u0639\u0644\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c',
  'Teaching Strategies': '\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0627\u062a \u0627\u0644\u062a\u062f\u0631\u064a\u0633',
  'Assessment Methods': '\u0637\u0631\u0642 \u0627\u0644\u062a\u0642\u064a\u064a\u0645',
  'Knowledge and Understanding': '\u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0648\u0627\u0644\u0641\u0647\u0645',
  'Skills': '\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062a',
  'Values, Autonomy and Responsibility': '\u0627\u0644\u0642\u064a\u0645 \u0648\u0627\u0644\u0627\u0633\u062a\u0642\u0644\u0627\u0644\u064a\u0629 \u0648\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629',
  'Course Contents': '\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Weeks': '\u0627\u0644\u0623\u0633\u0627\u0628\u064a\u0639',
  'Topic': '\u0627\u0644\u0645\u0648\u0636\u0648\u0639',
  'Students Assessment': '\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0637\u0644\u0627\u0628',
  'Assessment Activities': '\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062a\u0642\u064a\u064a\u0645',
  'Assessment Timing': '\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u062a\u0642\u064a\u064a\u0645',
  'Total': '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
  'Perfect!': '\u0645\u0643\u062a\u0645\u0644',
  'Learning Resources And Facilities': '\u0645\u0635\u0627\u062f\u0631 \u0627\u0644\u062a\u0639\u0644\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642',
  'Required Facilities And Equipments': '\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0648\u0627\u0644\u062a\u062c\u0647\u064a\u0632\u0627\u062a \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629',
  'Essential References': '\u0627\u0644\u0645\u0631\u0627\u062c\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629',
  'Supportive References': '\u0627\u0644\u0645\u0631\u0627\u062c\u0639 \u0627\u0644\u0645\u0633\u0627\u0646\u062f\u0629',
  'Electronic Materials': '\u0627\u0644\u0645\u0648\u0627\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
  'Other Learning Materials': '\u0645\u0648\u0627\u062f \u062a\u0639\u0644\u0645 \u0623\u062e\u0631\u0649',
  'Course Quality Evaluation': '\u062a\u0642\u0648\u064a\u0645 \u062c\u0648\u062f\u0629 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Assessment Areas / Issues': '\u0645\u062c\u0627\u0644\u0627\u062a / \u0642\u0636\u0627\u064a\u0627 \u0627\u0644\u062a\u0642\u064a\u064a\u0645',
  'Assessor': '\u0627\u0644\u0645\u0642\u064a\u0645',
  'Username': '\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645',
  'Job': '\u0627\u0644\u0648\u0638\u064a\u0641\u0629',
  'Status': '\u0627\u0644\u062d\u0627\u0644\u0629',
  'Reason': '\u0627\u0644\u0633\u0628\u0628',
  'Date': '\u0627\u0644\u062a\u0627\u0631\u064a\u062e',
  'Back': '\u0627\u0644\u0633\u0627\u0628\u0642',
  'Next': '\u0627\u0644\u062a\u0627\u0644\u064a',
  'Computer Science Fundamentals': '\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u0627\u0633\u0628',
  'Information Technology Fundamentals': '\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Programming Basic': '\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u0629',
  'Faculty of Computing and Information Technology': '\u0643\u0644\u064a\u0629 \u0627\u0644\u062d\u0627\u0633\u0628 \u0648\u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Computer Science Department': '\u0642\u0633\u0645 \u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u0627\u0633\u0628',
  'Information Technology Department': '\u0642\u0633\u0645 \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'High Institute': '\u0627\u0644\u0645\u0639\u0647\u062f \u0627\u0644\u0639\u0627\u0644\u064a',
  'Computer Science': '\u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u0627\u0633\u0628',
  'Information Technology': '\u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Information Systems': '\u0646\u0638\u0645 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Software Engineering': '\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a',
  'Department': '\u0627\u0644\u0642\u0633\u0645',
  'Required': '\u0645\u0637\u0644\u0648\u0628',
  'Lecture': '\u0645\u062d\u0627\u0636\u0631\u0629',
  'Practical Training': '\u062a\u062f\u0631\u064a\u0628 \u0639\u0645\u0644\u064a',
  'Educational': '\u062a\u0639\u0644\u064a\u0645\u064a',
  'Practical': '\u0639\u0645\u0644\u064a',
  'Exit Exam': '\u0627\u062e\u062a\u0628\u0627\u0631 \u0646\u0647\u0627\u0626\u064a',
  'Direct': '\u0645\u0628\u0627\u0634\u0631',
  'Approve': '\u0627\u0639\u062a\u0645\u0627\u062f',
  'Submit': '\u062a\u0642\u062f\u064a\u0645',
  'Course Coordinator': '\u0645\u0646\u0633\u0642 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Quality Unit': '\u0648\u062d\u062f\u0629 \u0627\u0644\u062c\u0648\u062f\u0629',
  'Facilities (Classrooms, Laboratories, exhibition rooms, simulation rooms, etc.)': '\u0627\u0644\u0645\u0631\u0627\u0641\u0642 (\u0627\u0644\u0642\u0627\u0639\u0627\u062a\u060c \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u060c \u0642\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0631\u0636\u060c \u0642\u0627\u0639\u0627\u062a \u0627\u0644\u0645\u062d\u0627\u0643\u0627\u0629\u060c \u0625\u0644\u062e)',
  'Technology equipment (projector, Smart Board, Software)': '\u0627\u0644\u062a\u062c\u0647\u064a\u0632\u0627\u062a \u0627\u0644\u062a\u0642\u0646\u064a\u0629 (\u062c\u0647\u0627\u0632 \u0639\u0631\u0636\u060c \u0633\u0628\u0648\u0631\u0629 \u0630\u0643\u064a\u0629\u060c \u0628\u0631\u0627\u0645\u062c)',
  'Other equipment (depending on the nature of the specialty)': '\u062a\u062c\u0647\u064a\u0632\u0627\u062a \u0623\u062e\u0631\u0649 (\u062d\u0633\u0628 \u0637\u0628\u064a\u0639\u0629 \u0627\u0644\u062a\u062e\u0635\u0635)',
  'Information Technology Fundamentals': '\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
  'Computer Skills': '\u0645\u0647\u0627\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u0633\u0628',
  'Computer Skills Lab': '\u0645\u0639\u0645\u0644 \u0645\u0647\u0627\u0631\u0627\u062a \u0627\u0644\u062d\u0627\u0633\u0628',
  'Programming Basic Lab': '\u0645\u0639\u0645\u0644 \u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u0629',
  'This course introduces core computing concepts, problem-solving techniques, data representation, and practical foundations needed for further study in computing disciplines.': '\u064a\u0642\u062f\u0645 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0631\u0631 \u0627\u0644\u0645\u0641\u0627\u0647\u064a\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u0644\u062d\u0648\u0633\u0628\u0629\u060c \u0648\u0623\u0633\u0627\u0644\u064a\u0628 \u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062a\u060c \u0648\u062a\u0645\u062b\u064a\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a\u060c \u0648\u0627\u0644\u0623\u0633\u0633 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0644\u0644\u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u0645\u062a\u0642\u062f\u0645\u0629 \u0641\u064a \u062a\u062e\u0635\u0635\u0627\u062a \u0627\u0644\u062d\u0648\u0633\u0628\u0629.',
  'By the end of the course, students will understand fundamental computing terminology, apply structured problem solving, and describe common hardware, software, network, and data concepts.': '\u0628\u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u0645\u0642\u0631\u0631 \u0633\u064a\u0641\u0647\u0645 \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u0644\u062d\u0648\u0633\u0628\u0629\u060c \u0648\u064a\u0637\u0628\u0642\u0648\u0646 \u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062a \u0628\u0634\u0643\u0644 \u0645\u0646\u0638\u0645\u060c \u0648\u064a\u0635\u0641\u0648\u0646 \u0645\u0641\u0627\u0647\u064a\u0645 \u0627\u0644\u0639\u062a\u0627\u062f \u0648\u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a \u0648\u0627\u0644\u0634\u0628\u0643\u0627\u062a \u0648\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a.',
  'Brookshear, J. Glenn and Brylow, Dennis. Computer Science: An Overview. Pearson.': '\u0628\u0631\u0648\u0643\u0634\u064a\u0631 \u0648\u0628\u0631\u0627\u064a\u0644\u0648\u060c \u0645\u062f\u062e\u0644 \u0625\u0644\u0649 \u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u0627\u0633\u0628\u060c Pearson.',
  'Dale, Nell and Lewis, John. Computer Science Illuminated. Jones & Bartlett Learning.': '\u062f\u064a\u0644 \u0648\u0644\u0648\u064a\u0633\u060c \u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u0627\u0633\u0628 \u0627\u0644\u0645\u0648\u0636\u062d\u0629\u060c Jones & Bartlett Learning.',
  'University LMS resources, course slides, lab sheets, digital library readings, and selected open educational resources.': '\u0645\u0648\u0627\u0631\u062f \u0646\u0638\u0627\u0645 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u062a\u0639\u0644\u0645\u060c \u0648\u0639\u0631\u0648\u0636 \u0627\u0644\u0645\u0642\u0631\u0631\u060c \u0648\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0639\u0645\u0644\u060c \u0648\u0642\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629\u060c \u0648\u0645\u0648\u0627\u0631\u062f \u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0645\u0641\u062a\u0648\u062d\u0629 \u0645\u062e\u062a\u0627\u0631\u0629.',
  'Laboratory exercises, instructor handouts, assessment rubrics, and practical activity guides.': '\u062a\u0645\u0627\u0631\u064a\u0646 \u0645\u0639\u0645\u0644\u064a\u0629\u060c \u0648\u0645\u0644\u0627\u0632\u0645 \u0627\u0644\u0645\u062f\u0631\u0633\u060c \u0648\u0633\u0644\u0627\u0644\u0645 \u0627\u0644\u062a\u0642\u064a\u064a\u0645\u060c \u0648\u0623\u062f\u0644\u0629 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0639\u0645\u0644\u064a\u0629.',
  'Classrooms equipped with projection, computer laboratories, reliable internet access, and learning management system access.': '\u0642\u0627\u0639\u0627\u062a \u0645\u062c\u0647\u0632\u0629 \u0628\u0623\u062c\u0647\u0632\u0629 \u0639\u0631\u0636\u060c \u0648\u0645\u0639\u0627\u0645\u0644 \u062d\u0627\u0633\u0628\u060c \u0648\u0627\u062a\u0635\u0627\u0644 \u0625\u0646\u062a\u0631\u0646\u062a \u0645\u0648\u062b\u0648\u0642\u060c \u0648\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0646\u0638\u0627\u0645 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u062a\u0639\u0644\u0645.',
  'Instructor workstation, projector, smart board, laboratory PCs, browser-based tools, and office productivity software.': '\u062c\u0647\u0627\u0632 \u0639\u0645\u0644 \u0644\u0644\u0645\u062f\u0631\u0633\u060c \u0648\u062c\u0647\u0627\u0632 \u0639\u0631\u0636\u060c \u0648\u0633\u0628\u0648\u0631\u0629 \u0630\u0643\u064a\u0629\u060c \u0648\u0623\u062c\u0647\u0632\u0629 \u0645\u0639\u0645\u0644\u064a\u0629\u060c \u0648\u0623\u062f\u0648\u0627\u062a \u062a\u0639\u0645\u0644 \u0639\u0628\u0631 \u0627\u0644\u0645\u062a\u0635\u0641\u062d\u060c \u0648\u0628\u0631\u0627\u0645\u062c \u0625\u0646\u062a\u0627\u062c\u064a\u0629 \u0645\u0643\u062a\u0628\u064a\u0629.',
  'Whiteboard, collaborative workspaces, and accessibility support tools when required.': '\u0633\u0628\u0648\u0631\u0629\u060c \u0648\u0645\u0633\u0627\u062d\u0627\u062a \u0639\u0645\u0644 \u062a\u0639\u0627\u0648\u0646\u064a\u0629\u060c \u0648\u0623\u062f\u0648\u0627\u062a \u062f\u0639\u0645 \u0625\u062a\u0627\u062d\u0629 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.',
  'Explain fundamental computing concepts and terminology.': '\u0634\u0631\u062d \u0627\u0644\u0645\u0641\u0627\u0647\u064a\u0645 \u0648\u0627\u0644\u0645\u0635\u0637\u0644\u062d\u0627\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0644\u0644\u062d\u0648\u0633\u0628\u0629.',
  'E-learning, guided readings, and interactive lectures': '\u062a\u0639\u0644\u0645 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u060c \u0642\u0631\u0627\u0621\u0627\u062a \u0645\u0648\u062c\u0647\u0629\u060c \u0648\u0645\u062d\u0627\u0636\u0631\u0627\u062a \u062a\u0641\u0627\u0639\u0644\u064a\u0629',
  'Apply structured problem-solving steps to simple computing tasks.': '\u062a\u0637\u0628\u064a\u0642 \u062e\u0637\u0648\u0627\u062a \u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062a \u0628\u0634\u0643\u0644 \u0645\u0646\u0638\u0645 \u0639\u0644\u0649 \u0645\u0647\u0627\u0645 \u062d\u0648\u0633\u0628\u0629 \u0628\u0633\u064a\u0637\u0629.',
  'Practical lab sessions': '\u062c\u0644\u0633\u0627\u062a \u0645\u0639\u0645\u0644\u064a\u0629 \u0639\u0645\u0644\u064a\u0629',
  'Lab performance and employer-style task survey': '\u0623\u062f\u0627\u0621 \u0645\u0639\u0645\u0644\u064a \u0648\u0627\u0633\u062a\u0628\u064a\u0627\u0646 \u0645\u0647\u0627\u0645 \u0628\u0623\u0633\u0644\u0648\u0628 \u062c\u0647\u0627\u062a \u0627\u0644\u0639\u0645\u0644',
  'Demonstrate responsibility, collaboration, and ethical use of computing resources.': '\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629 \u0648\u0627\u0644\u062a\u0639\u0627\u0648\u0646 \u0648\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0623\u062e\u0644\u0627\u0642\u064a \u0644\u0645\u0648\u0627\u0631\u062f \u0627\u0644\u062d\u0648\u0633\u0628\u0629.',
  'Group discussion and collaborative activities': '\u0645\u0646\u0627\u0642\u0634\u0629 \u062c\u0645\u0627\u0639\u064a\u0629 \u0648\u0623\u0646\u0634\u0637\u0629 \u062a\u0639\u0627\u0648\u0646\u064a\u0629',
  'Peer and alumni survey': '\u0627\u0633\u062a\u0628\u064a\u0627\u0646 \u0627\u0644\u0623\u0642\u0631\u0627\u0646 \u0648\u0627\u0644\u062e\u0631\u064a\u062c\u064a\u0646',
  'Final revision and course wrap up': '\u0645\u0631\u0627\u062c\u0639\u0629 \u0646\u0647\u0627\u0626\u064a\u0629 \u0648\u0625\u063a\u0644\u0627\u0642 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Introduction to computer networks and internet': '\u0645\u0642\u062f\u0645\u0629 \u0641\u064a \u0634\u0628\u0643\u0627\u062a \u0627\u0644\u062d\u0627\u0633\u0628 \u0648\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a',
  'Introduction to databases and data management': '\u0645\u0642\u062f\u0645\u0629 \u0641\u064a \u0642\u0648\u0627\u0639\u062f \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
  'Quiz and online activities': '\u0627\u062e\u062a\u0628\u0627\u0631 \u0642\u0635\u064a\u0631 \u0648\u0623\u0646\u0634\u0637\u0629 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
  'Practical lab work': '\u0639\u0645\u0644 \u0645\u0639\u0645\u0644\u064a \u0639\u0645\u0644\u064a',
  'Final exam': '\u0627\u062e\u062a\u0628\u0627\u0631 \u0646\u0647\u0627\u0626\u064a',
  'Course learning outcomes achievement': '\u062a\u062d\u0642\u0642 \u0645\u062e\u0631\u062c\u0627\u062a \u062a\u0639\u0644\u0645 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Teaching effectiveness and student feedback': '\u0641\u0627\u0639\u0644\u064a\u0629 \u0627\u0644\u062a\u062f\u0631\u064a\u0633 \u0648\u062a\u063a\u0630\u064a\u0629 \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0631\u0627\u062c\u0639\u0629',
  'Survey and direct review': '\u0627\u0633\u062a\u0628\u064a\u0627\u0646 \u0648\u0645\u0631\u0627\u062c\u0639\u0629 \u0645\u0628\u0627\u0634\u0631\u0629',
  'Course specification tabs': '\u062a\u0628\u0648\u064a\u0628\u0627\u062a \u062a\u0648\u0635\u064a\u0641 \u0627\u0644\u0645\u0642\u0631\u0631',
  'Course specification sections': '\u0623\u0642\u0633\u0627\u0645 \u062a\u0648\u0635\u064a\u0641 \u0627\u0644\u0645\u0642\u0631\u0631',
  'PLO1': '\u0645\u062e\u0631\u062c \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c 1',
  'PLO2': '\u0645\u062e\u0631\u062c \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c 2',
  'PLO3': '\u0645\u062e\u0631\u062c \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c 3',
  'Supervisor Supervisor': '\u0627\u0644\u0645\u0634\u0631\u0641',
  'SupervisorId': '\u0645\u0639\u0631\u0641 \u0627\u0644\u0645\u0634\u0631\u0641',
  'QualityAssistant qualityAssistant': '\u0645\u0633\u0627\u0639\u062f \u0627\u0644\u062c\u0648\u062f\u0629',
  'QualityAssistantId': '\u0645\u0639\u0631\u0641 \u0645\u0633\u0627\u0639\u062f \u0627\u0644\u062c\u0648\u062f\u0629',
  'coordinator coordinator': '\u0627\u0644\u0645\u0646\u0633\u0642',
  'This course introduces information technology concepts, digital infrastructure, software applications, networks, cybersecurity awareness, and IT service foundations.': '\u064a\u0642\u062f\u0645 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0631\u0631 \u0645\u0641\u0627\u0647\u064a\u0645 \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u060c \u0648\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629\u060c \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a\u060c \u0648\u0627\u0644\u0634\u0628\u0643\u0627\u062a\u060c \u0648\u0627\u0644\u0648\u0639\u064a \u0628\u0627\u0644\u0623\u0645\u0646 \u0627\u0644\u0633\u064a\u0628\u0631\u0627\u0646\u064a\u060c \u0648\u0623\u0633\u0633 \u062e\u062f\u0645\u0627\u062a \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a.',
  'Students will identify major IT components, use common productivity and network concepts, and explain the role of information systems in organizations.': '\u0633\u064a\u062a\u0639\u0631\u0641 \u0627\u0644\u0637\u0644\u0627\u0628 \u0639\u0644\u0649 \u0645\u0643\u0648\u0646\u0627\u062a \u062a\u0642\u0646\u064a\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629\u060c \u0648\u064a\u0633\u062a\u062e\u062f\u0645\u0648\u0646 \u0645\u0641\u0627\u0647\u064a\u0645 \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629 \u0648\u0627\u0644\u0634\u0628\u0643\u0627\u062a \u0627\u0644\u0634\u0627\u0626\u0639\u0629\u060c \u0648\u064a\u0634\u0631\u062d\u0648\u0646 \u062f\u0648\u0631 \u0646\u0638\u0645 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u0646\u0638\u0645\u0627\u062a.',
  'This course develops basic programming skills through algorithms, variables, control structures, functions, and simple problem-solving exercises.': '\u064a\u0637\u0648\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0631\u0631 \u0645\u0647\u0627\u0631\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0627\u062a\u060c \u0648\u0627\u0644\u0645\u062a\u063a\u064a\u0631\u0627\u062a\u060c \u0648\u062a\u0631\u0627\u0643\u064a\u0628 \u0627\u0644\u062a\u062d\u0643\u0645\u060c \u0648\u0627\u0644\u062f\u0648\u0627\u0644\u060c \u0648\u062a\u0645\u0627\u0631\u064a\u0646 \u062d\u0644 \u0645\u0634\u0643\u0644\u0627\u062a \u0628\u0633\u064a\u0637\u0629.',
  'Students will design simple algorithms, implement basic programs, test code, and apply introductory debugging techniques.': '\u0633\u064a\u0635\u0645\u0645 \u0627\u0644\u0637\u0644\u0627\u0628 \u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0627\u062a \u0628\u0633\u064a\u0637\u0629\u060c \u0648\u064a\u0646\u0641\u0630\u0648\u0646 \u0628\u0631\u0627\u0645\u062c \u0623\u0633\u0627\u0633\u064a\u0629\u060c \u0648\u064a\u062e\u062a\u0628\u0631\u0648\u0646 \u0627\u0644\u0634\u0641\u0631\u0629\u060c \u0648\u064a\u0637\u0628\u0642\u0648\u0646 \u062a\u0642\u0646\u064a\u0627\u062a \u062a\u0646\u0642\u064a\u062d \u062a\u0645\u0647\u064a\u062f\u064a\u0629.',
  'Algorithms and flowcharts': '\u0627\u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0627\u062a \u0648\u0645\u062e\u0637\u0637\u0627\u062a \u0627\u0644\u062a\u062f\u0641\u0642',
  'Variables, expressions, and control structures': '\u0627\u0644\u0645\u062a\u063a\u064a\u0631\u0627\u062a \u0648\u0627\u0644\u062a\u0639\u0627\u0628\u064a\u0631 \u0648\u062a\u0631\u0627\u0643\u064a\u0628 \u0627\u0644\u062a\u062d\u0643\u0645',
  'Functions, arrays, and debugging practice': '\u0627\u0644\u062f\u0648\u0627\u0644 \u0648\u0627\u0644\u0645\u0635\u0641\u0648\u0641\u0627\u062a \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u062a\u0646\u0642\u064a\u062d \u0627\u0644\u0623\u062e\u0637\u0627\u0621',
};

function specText(value, language) {
  return language === 'ar' && typeof value === 'string' ? specAr[value] || value : value;
}

function localizeSpecValue(value, language) {
  if (Array.isArray(value)) return value.map((item) => localizeSpecValue(item, language));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeSpecValue(item, language)]));
  }
  return specText(value, language);
}

function sumBy(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function SpecWorkflow() {
  const { language } = useI18n();
  return (
    <div className="spec-workflow panel">
      {workflowSteps.map((step, index) => (
        <div className="spec-workflow-step" key={step.label}>
          <div className="spec-workflow-icon">
            <i className={`ti ${step.icon}`} />
          </div>
          <span>{specText(step.label, language)}</span>
          {index < workflowSteps.length - 1 && <i className="spec-workflow-line" />}
        </div>
      ))}
    </div>
  );
}

function SpecTabs({ activeTab, setActiveTab }) {
  const { language } = useI18n();
  return (
    <div className="spec-tabs" role="tablist" aria-label={specText('Course specification tabs', language)}>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'program'}
        className={activeTab === 'program' ? 'active' : ''}
        onClick={() => setActiveTab('program')}
      >
        {specText('Program Information', language)}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'approvals'}
        className={activeTab === 'approvals' ? 'active' : ''}
        onClick={() => setActiveTab('approvals')}
      >
        {specText('Approvals History', language)}
      </button>
    </div>
  );
}

function SpecSideNav({ activeSection, setActiveSection }) {
  const { language } = useI18n();
  return (
    <aside className="spec-side-nav" aria-label={specText('Course specification sections', language)}>
      {sections.map((section, index) => {
        const isActive = section.id === activeSection;
        return (
          <button
            type="button"
            key={section.id}
            className={isActive ? 'active' : ''}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="spec-step-dot">
              {isActive ? index + 1 : <i className="ti ti-check" />}
            </span>
            <span>{specText(section.label, language)}</span>
          </button>
        );
      })}
    </aside>
  );
}

function InfoCard({ tone = 'green', icon, label, children }) {
  const { language } = useI18n();
  return (
    <article className={`spec-info-card ${tone}`}>
      <div className="spec-info-icon">
        <i className={`ti ${icon}`} />
      </div>
      <h3>{specText(label, language)}</h3>
      <div>{children}</div>
    </article>
  );
}

function SectionShell({ title, children }) {
  const { language } = useI18n();
  return (
    <section className="spec-section-card">
      <div className="spec-section-head">
        <h3>{specText(title, language)}</h3>
        <i className="ti ti-chevron-up" />
      </div>
      <div className="spec-section-body">{children}</div>
    </section>
  );
}

function SpecTable({ columns, rows, footer }) {
  const { language } = useI18n();
  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{specText(column.label, language)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>{specText(row[column.key], language)}</td>
              ))}
            </tr>
          ))}
          {footer && (
            <tr className="spec-table-total">
              {footer.map((cell, index) => (
                <td key={index}>{specText(cell, language)}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function InformationSection({ specification }) {
  const { language } = useI18n();
  return (
    <div>
      <h2 className="spec-section-title">{specText('Information', language)}</h2>
      <div className="spec-info-grid">
        <InfoCard icon="ti-notebook" label="Course Title">
          <p>{specification.title}</p>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-code" label="Course Code">
          <p>{specification.code}</p>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-building-bank" label="College">
          <ul><li>{specification.college}</li></ul>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-building-community" label="Department">
          <ul><li>{specification.department}</li></ul>
        </InfoCard>
        <InfoCard icon="ti-home-cog" label="Institution">
          <p>{specification.institution}</p>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-versions" label="Version">
          <div className="spec-readonly-input">{specification.version}</div>
        </InfoCard>
        <InfoCard tone="amber" icon="ti-calendar-stats" label="Last Revision Date">
          <div className="spec-readonly-input">{specification.lastRevisionDate}</div>
        </InfoCard>
        <InfoCard tone="purple" icon="ti-book-2" label="Program">
          <ul>{specification.programs.map((program) => <li key={program}>{program}</li>)}</ul>
        </InfoCard>
      </div>
    </div>
  );
}

function IdentificationSection({ specification }) {
  const { language } = useI18n();
  return (
    <div>
      <h2 className="spec-section-title">{specText('Identification', language)}</h2>
      <SectionShell title="Course Identification">
        <div className="spec-field-list">
          <div><strong>{specText('Credit Hours', language)}</strong><span>{specification.creditHours}</span></div>
          <div>
            <strong>{specText('Course Type', language)}</strong>
            <span>{specification.courseType.scope} / {specification.courseType.delivery}</span>
          </div>
          <div>
            <strong>{specText('Level/Year at which this course is offered', language)}</strong>
            <ul>{specification.offeredLevels.map((level) => <li key={level}>{level}</li>)}</ul>
          </div>
          <div><strong>{specText('Course General Description', language)}</strong><textarea readOnly value={specification.description} /></div>
          <div><strong>{specText('Course Main Objectives', language)}</strong><textarea readOnly value={specification.objectives} /></div>
          <div><strong>{specText('Prerequisites for this course', language)}</strong><ul>{specification.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><strong>{specText('Co-requisites for this course', language)}</strong><ul>{specification.coRequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </SectionShell>

      <SectionShell title="Teaching Mode">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'mode', label: 'Teaching Mode' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'percentage', label: 'Percentage %' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.teachingModes.map((item, index) => ({
            ...item,
            index: index + 1,
            percentage: `${item.percentage}%`,
            action: '',
          }))}
          footer={['', 'Total Contact Hours', sumBy(specification.teachingModes, 'contactHours'), '100%', '']}
        />
      </SectionShell>

      <SectionShell title="Contact Hours">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'activity', label: 'Activity' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.contactHours.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          footer={['', 'Total Contact Hours', sumBy(specification.contactHours, 'contactHours'), '']}
        />
      </SectionShell>
    </div>
  );
}

function OutcomesSection({ specification }) {
  const { language } = useI18n();
  const groups = [
    ['Knowledge and Understanding', specification.outcomes.knowledge],
    ['Skills', specification.outcomes.skills],
    ['Values, Autonomy and Responsibility', specification.outcomes.values],
  ];

  return (
    <div>
      <h2 className="spec-section-title">{specText('Course Learning Outcomes (CLOs)', language)}</h2>
      {groups.map(([title, rows]) => (
        <SectionShell title={title} key={title}>
          <SpecTable
            columns={[
              { key: 'index', label: '#' },
              { key: 'clo', label: 'Course Learning Outcomes (CLOs)' },
              { key: 'plo', label: 'Program Learning Outcomes (PLOs)' },
              { key: 'strategy', label: 'Teaching Strategies' },
              { key: 'assessment', label: 'Assessment Methods' },
              { key: 'action', label: 'Action' },
            ]}
            rows={rows.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          />
        </SectionShell>
      ))}
    </div>
  );
}

function ContentsSection({ specification }) {
  const { language } = useI18n();
  return (
    <div>
      <h2 className="spec-section-title">{specText('Course Contents', language)}</h2>
      <SectionShell title="Course Contents">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'weeks', label: 'Weeks' },
            { key: 'topic', label: 'Topic' },
            { key: 'contactHours', label: 'Contact Hours' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.contents.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
          footer={['', '', 'Total Contact Hours', sumBy(specification.contents, 'contactHours'), '']}
        />
      </SectionShell>
    </div>
  );
}

function AssessmentSection({ specification }) {
  const { language } = useI18n();
  return (
    <div>
      <h2 className="spec-section-title">{specText('Students Assessment', language)}</h2>
      <SectionShell title="Students Assessment">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'activity', label: 'Assessment Activities' },
            { key: 'timing', label: 'Assessment Timing' },
            { key: 'percentage', label: 'Percentage %' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.assessment.map((item, index) => ({
            ...item,
            index: index + 1,
            percentage: `${item.percentage}%`,
            action: '',
          }))}
          footer={['', 'Total', '', '100%', 'Perfect!']}
        />
      </SectionShell>
    </div>
  );
}

function ResourcesSection({ specification }) {
  const { language } = useI18n();
  const learningRows = [
    ['Essential References', specification.essentialReferences],
    ['Supportive References', specification.supportiveReferences],
    ['Electronic Materials', specification.electronicMaterials],
    ['Other Learning Materials', specification.otherMaterials],
  ];
  const facilityRows = [
    ['Facilities (Classrooms, Laboratories, exhibition rooms, simulation rooms, etc.)', specification.facilities],
    ['Technology equipment (projector, Smart Board, Software)', specification.technologyEquipment],
    ['Other equipment (depending on the nature of the specialty)', specification.otherEquipment],
  ];

  return (
    <div>
      <h2 className="spec-section-title">{specText('Learning Resources And Facilities', language)}</h2>
      <SectionShell title="Learning Resources And Facilities">
        <div className="spec-textarea-list">
          {learningRows.map(([label, value]) => (
            <label key={label}><span>{specText(label, language)}</span><textarea readOnly value={value} /></label>
          ))}
        </div>
      </SectionShell>
      <SectionShell title="Required Facilities And Equipments">
        <div className="spec-textarea-list">
          {facilityRows.map(([label, value]) => (
            <label key={label}><span>{specText(label, language)}</span><textarea readOnly value={value} /></label>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}

function EvaluationSection({ specification }) {
  const { language } = useI18n();
  return (
    <div>
      <h2 className="spec-section-title">{specText('Course Quality Evaluation', language)}</h2>
      <SectionShell title="Course Quality Evaluation">
        <SpecTable
          columns={[
            { key: 'index', label: '#' },
            { key: 'issue', label: 'Assessment Areas / Issues' },
            { key: 'assessor', label: 'Assessor' },
            { key: 'method', label: 'Assessment Methods' },
            { key: 'action', label: 'Action' },
          ]}
          rows={specification.evaluation.map((item, index) => ({ ...item, index: index + 1, action: '' }))}
        />
      </SectionShell>
    </div>
  );
}

function ApprovalsHistory({ specification }) {
  const { language } = useI18n();
  return (
    <div className="spec-approvals-view">
      <h2 className="spec-section-title">{specText('Approvals History', language)}</h2>
      <SectionShell title="Approvals History">
        <SpecTable
          columns={[
            { key: 'username', label: 'Username' },
            { key: 'job', label: 'Job' },
            { key: 'status', label: 'Status' },
            { key: 'reason', label: 'Reason' },
            { key: 'date', label: 'Date' },
          ]}
          rows={specification.approvals}
        />
      </SectionShell>
    </div>
  );
}

function SectionContent({ activeSection, specification }) {
  if (activeSection === 'identification') return <IdentificationSection specification={specification} />;
  if (activeSection === 'outcomes') return <OutcomesSection specification={specification} />;
  if (activeSection === 'contents') return <ContentsSection specification={specification} />;
  if (activeSection === 'assessment') return <AssessmentSection specification={specification} />;
  if (activeSection === 'resources') return <ResourcesSection specification={specification} />;
  if (activeSection === 'evaluation') return <EvaluationSection specification={specification} />;
  return <InformationSection specification={specification} />;
}

export default function CourseSpecificationViewPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState('program');
  const [activeSection, setActiveSection] = useState('information');
  const course = courses.find((item) => item.id === courseId);
  const specification = useMemo(() => localizeSpecValue(getCourseSpecification(course), language), [course, language]);
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  if (!course) {
    return (
      <>
        <Topbar breadcrumbs={[t('courses'), t('notFound')]} />
        <div className="page-content"><p>{t('notFound')}</p></div>
      </>
    );
  }

  const goToRelativeSection = (offset) => {
    const next = sections[activeIndex + offset];
    if (next) setActiveSection(next.id);
  };

  return (
    <>
      <Topbar breadcrumbs={[t('courses'), course.code, specText('Course Specification', language)]} />
      <div className="page-content course-spec-page">
        <SpecWorkflow />
        <div className="course-spec-shell panel">
          <SpecTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'approvals' ? (
            <ApprovalsHistory specification={specification} />
          ) : (
            <div className="course-spec-layout">
              <SpecSideNav activeSection={activeSection} setActiveSection={setActiveSection} />
              <main className="course-spec-content">
                <SectionContent activeSection={activeSection} specification={specification} />
                <div className="spec-actions">
                  <button type="button" className="btn-outline" onClick={() => activeIndex === 0 ? navigate(-1) : goToRelativeSection(-1)}>
                    {specText('Back', language)}
                  </button>
                  {activeIndex < sections.length - 1 && (
                    <button type="button" className="act-btn primary" onClick={() => goToRelativeSection(1)}>
                      {specText('Next', language)}
                    </button>
                  )}
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
