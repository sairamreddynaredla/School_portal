/* =====================================================
   REALISTIC SCHOOL DUMMY DATA (ERP STYLE)
===================================================== */

/* ===================== SUBJECTS ===================== */

export const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies",
];

/* ===================== TEACHERS ===================== */

export const teachers = [
  { id: "T001", name: "Mr. Srinivas", subject: "Mathematics" },
  { id: "T002", name: "Mrs. Kavitha", subject: "Physics" },
  { id: "T003", name: "Mr. Pradeep", subject: "Chemistry" },
  { id: "T004", name: "Mrs. Anjali", subject: "Biology" },
  { id: "T005", name: "Mr. Ramesh", subject: "English" },
  { id: "T006", name: "Mrs. Deepika", subject: "Social Studies" },
];

/* ===================== CLASSES ===================== */

export const classes = [
  { class: "8", section: "A" },
  { class: "9", section: "B" },
  { class: "10", section: "A" },
];

/* ===================== STUDENT NAMES ===================== */

const boyNames = [
  "Rahul","Arjun","Sai","Vamsi","Rohit","Ajay","Tarun","Karthik","Naveen","Manoj",
  "Pranay","Lokesh","Rakesh","Vikas","Naresh"
];

const girlNames = [
  "Anita","Sneha","Divya","Harika","Sravani","Keerthi","Swapna","Bhavya","Deepthi","Niharika",
  "Meghana","Anusha","Lakshmi","Pooja","Sowmya"
];

/* ===================== PARENTS ===================== */

export const parents = [];

/* ===================== STUDENTS ===================== */

export const students = [];

let studentId = 1;

classes.forEach((cls) => {

  const className = `${cls.class}th Standard – ${cls.section}`;

  const createPerformance = () => [
    {
      subject: "Mathematics",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
    {
      subject: "Physics",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
    {
      subject: "Chemistry",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
    {
      subject: "Biology",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
    {
      subject: "English",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
    {
      subject: "Social Studies",
      maxMarks: 100,
      passMarks: 35,
      marksObtained: 60 + Math.floor(Math.random() * 40),
    },
  ];

  /* ---------- BOYS ---------- */

  boyNames.forEach((name) => {

    const parentId = `P${String(studentId).padStart(3,"0")}`;

    parents.push({
      id: parentId,
      name: `${name} Kumar`,
      relation: "Father",
      phone: `9${Math.floor(100000000 + Math.random()*899999999)}`
    });

    students.push({
      id: studentId,
      parentId,
      name,
      gender: "Boy",
      class: className,
      status: "Present",

      attendance: [
        { date: "01 Feb", status: "Present" },
        { date: "02 Feb", status: "Present" },
        { date: "03 Feb", status: Math.random()>0.2?"Present":"Absent" },
        { date: "04 Feb", status: "Present" },
        { date: "05 Feb", status: "Present" },
      ],

      performance: createPerformance(),
    });

    studentId++;
  });

  /* ---------- GIRLS ---------- */

  girlNames.forEach((name) => {

    const parentId = `P${String(studentId).padStart(3,"0")}`;

    parents.push({
      id: parentId,
      name: `${name} Devi`,
      relation: "Mother",
      phone: `9${Math.floor(100000000 + Math.random()*899999999)}`
    });

    students.push({
      id: studentId,
      parentId,
      name,
      gender: "Girl",
      class: className,
      status: "Present",

      attendance: [
        { date: "01 Feb", status: "Present" },
        { date: "02 Feb", status: "Present" },
        { date: "03 Feb", status: Math.random()>0.2?"Present":"Absent" },
        { date: "04 Feb", status: "Present" },
        { date: "05 Feb", status: "Present" },
      ],

      performance: createPerformance(),
    });

    studentId++;
  });

});

/* ===================== TEACHER CLASSES ===================== */

export const teacherClasses = [
  { teacherId:"T001", subject:"Mathematics", class:"10th Standard – A", time:"10:00 AM", day:"Monday" },
  { teacherId:"T002", subject:"Physics", class:"10th Standard – A", time:"11:00 AM", day:"Monday" },
  { teacherId:"T003", subject:"Chemistry", class:"10th Standard – A", time:"12:00 PM", day:"Monday" },
  { teacherId:"T004", subject:"Biology", class:"9th Standard – B", time:"9:30 AM", day:"Tuesday" },
  { teacherId:"T005", subject:"English", class:"8th Standard – A", time:"2:00 PM", day:"Wednesday" },
  { teacherId:"T006", subject:"Social Studies", class:"9th Standard – B", time:"3:00 PM", day:"Thursday" },
];