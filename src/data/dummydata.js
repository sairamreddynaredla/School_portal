/* =========================================================
   👨‍👩‍👧 PARENT
========================================================= */

export const parent = {
  name: "Ramesh Kumar",
};

/* =========================================================
   🎓 STUDENTS DATA (REALISTIC + BACKEND STYLE)
========================================================= */

export const students = [
  {
    id: 1,
    name: "Rahul Kumar",
    gender: "Boy",
    class: "10th Standard – A",
    status: "Present",

    /* ⭐ DAILY ATTENDANCE (Backend normally stores this) */
    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Present" },
      { date: "03 Feb", status: "Absent" },
      { date: "04 Feb", status: "Present" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 80,
    performanceLabel: "Average",

    performance: {
      maths: 72,
      physics: 70,
      chemistry: 65,
      biology: 75,
      english: 80,
      socialStudies: 68,
      computerScience: 85,
      secondLanguage: 74,
      physicalEducation: 90,
      artActivity: 88,
      percentage: 76,
      grade: "B+",
    },

    // 📄 Sample exam results for demo
    examPapers: [
      {
        exam: "Mid Term Exam 2025",
        papers: [
          {
            subject: "Mid Exam 1",
            file: "MidExam1_2025.pdf"
          },
          {
            subject: "Mid Exam 2",
            file: "MidExam2_2025.pdf"
          }
        ]
      },
      {
        exam: "Final Exam 2025",
        papers: [
          {
            subject: "Final Exam",
            file: "FinalExam_2025.pdf"
          }
        ]
      },
      {
        exam: "Slip Test 2025",
        papers: [
          {
            subject: "Mathematics",
            file: "Maths_SlipTest2025.pdf"
          },
          {
            subject: "Science",
            file: "Science_SlipTest2025.pdf"
          }
        ]
      }
    ]
  },

  {
    id: 2,
    name: "Anita Sharma",
    gender: "Girl",
    class: "9th Standard – B",
    status: "Absent",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Absent" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Absent" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 60,
    performanceLabel: "Good",

    performance: {
      maths: 82,
      physics: 80,
      chemistry: 84,
      biology: 86,
      english: 88,
      socialStudies: 79,
      computerScience: 90,
      secondLanguage: 76,
      physicalEducation: 85,
      artActivity: 92,
      percentage: 85,
      grade: "A",
    },
  },

  {
    id: 3,
    name: "Arjun Reddy",
    gender: "Boy",
    class: "8th Standard – A",
    status: "Present",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Present" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Present" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 100,
    performanceLabel: "Excellent",

    performance: {
      maths: 95,
      physics: 94,
      chemistry: 90,
      biology: 92,
      english: 88,
      socialStudies: 86,
      computerScience: 96,
      secondLanguage: 89,
      physicalEducation: 93,
      artActivity: 90,
      percentage: 91,
      grade: "A+",
    },
  },

  {
    id: 4,
    name: "Sneha Patel",
    gender: "Girl",
    class: "10th Standard – A",
    status: "Present",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Present" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Absent" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 80,
    performanceLabel: "Average",

    performance: {
      maths: 65,
      physics: 60,
      chemistry: 58,
      biology: 72,
      english: 75,
      socialStudies: 70,
      computerScience: 78,
      secondLanguage: 69,
      physicalEducation: 85,
      artActivity: 88,
      percentage: 72,
      grade: "B",
    },
  },

  {
    id: 5,
    name: "Kiran Kumar",
    gender: "Boy",
    class: "9th Standard – B",
    status: "Absent",

    attendance: [
      { date: "01 Feb", status: "Absent" },
      { date: "02 Feb", status: "Absent" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Absent" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 40,
    performanceLabel: "Needs Improvement",

    performance: {
      maths: 40,
      physics: 38,
      chemistry: 35,
      biology: 45,
      english: 50,
      socialStudies: 48,
      computerScience: 52,
      secondLanguage: 46,
      physicalEducation: 70,
      artActivity: 60,
      percentage: 48,
      grade: "C",
    },
  },

  {
    id: 6,
    name: "Divya Rani",
    gender: "Girl",
    class: "8th Standard – A",
    status: "Present",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Present" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Present" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 100,
    performanceLabel: "Excellent",

    performance: {
      maths: 98,
      physics: 95,
      chemistry: 94,
      biology: 97,
      english: 93,
      socialStudies: 90,
      computerScience: 99,
      secondLanguage: 92,
      physicalEducation: 88,
      artActivity: 91,
      percentage: 94,
      grade: "A+",
    },
  },

  {
    id: 7,
    name: "Mohit Verma",
    gender: "Boy",
    class: "10th Standard – A",
    status: "Present",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Absent" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Absent" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 60,
    performanceLabel: "Below Average",

    performance: {
      maths: 52,
      physics: 48,
      chemistry: 45,
      biology: 55,
      english: 60,
      socialStudies: 58,
      computerScience: 62,
      secondLanguage: 54,
      physicalEducation: 75,
      artActivity: 70,
      percentage: 57,
      grade: "C+",
    },
  },

  {
    id: 8,
    name: "Lakshmi Devi",
    gender: "Girl",
    class: "9th Standard – B",
    status: "Present",

    attendance: [
      { date: "01 Feb", status: "Present" },
      { date: "02 Feb", status: "Present" },
      { date: "03 Feb", status: "Present" },
      { date: "04 Feb", status: "Present" },
      { date: "05 Feb", status: "Present" },
    ],

    attendancePercentage: 100,
    performanceLabel: "Very Good",

    performance: {
      maths: 89,
      physics: 86,
      chemistry: 84,
      biology: 88,
      english: 90,
      socialStudies: 85,
      computerScience: 92,
      secondLanguage: 87,
      physicalEducation: 80,
      artActivity: 95,
      percentage: 88,
      grade: "A",
    },
  },
];

/* =========================================================
   💬 MESSAGES
========================================================= */

export const messages = [
  {
    id: 1,
    sender: "Teacher - Maths",
    message: "Your child was absent yesterday due to fever.",
    time: "Today • 10:30 AM",
    replied: false,
    unread: true,
  },
  {
    id: 2,
    sender: "Teacher - Science",
    message: "Please ensure the homework is submitted tomorrow.",
    time: "Yesterday",
    replied: true,
    unread: false,
  },
  
];
/* =========================================================
   👨‍🏫 TEACHER CLASSES (⭐ NEW - REQUIRED FOR DASHBOARD)
========================================================= */

export const teacherClasses = [
  {
    id: 1,
    teacherId: "T001",
    subject: "Math",
    grade: 6,
    className: "8th Standard – A",
    time: "10:00 AM",
    day: "Monday",
  },
  {
    id: 2,
    teacherId: "T001",
    subject: "Science",
    grade: 7,
    className: "9th Standard – B",
    time: "11:30 AM",
    day: "Monday",
  },
  {
    id: 3,
    teacherId: "T001",
    subject: "English",
    grade: 8,
    className: "10th Standard – A",
    time: "2:00 PM",
    day: "Monday",
  },
  {
    id: 4,
    teacherId: "T001",
    subject: "Physics",
    grade: 9,
    className: "9th Standard – B",
    time: "9:00 AM",
    day: "Monday",
  },
  {
    id: 5,
    teacherId: "T001",
    subject: "Chemistry",
    grade: 10,
    className: "10th Standard – A",
    time: "12:00 PM",
    day: "Monday",
  },
  {
    id: 6,
    teacherId: "T001",
    subject: "Biology",
    grade: 6,
    className: "8th Standard – A",
    time: "3:30 PM",
    day: "Monday",
  },
];
