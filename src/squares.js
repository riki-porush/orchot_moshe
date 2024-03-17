// import React, { useState, useEffect } from "react";
// import students from "./data.json";
// import "./squares.css";
// import OMHeader from "./header.js";

// const Squares = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [studentsByLesson, setStudentsByLesson] = useState({});
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
//   // const [students, setStudents] = useState(null);

//   fetch(process.env.PUBLIC_URL + '/data.json')
//   .then(response => response.json())
//   .then(data => console.log(data));


//   useEffect(() => {
//     const studentsByLesson = {};

//     students.forEach((student) => {
//       const lessonKey = `${student.grade} ${student.gradeNum}`;
//       if (!studentsByLesson[lessonKey]) {
//         studentsByLesson[lessonKey] = [];
//       }
//       studentsByLesson[lessonKey].push(student);
//     });

//     setStudentsByLesson(studentsByLesson);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLessonIndex((prevIndex) => (prevIndex + 1) % Object.keys(studentsByLesson).length);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [studentsByLesson]);

//   const renderLessonStudents = (lessonKey) => {
//     const studentsForLesson = studentsByLesson[lessonKey];
//     if (!studentsForLesson) return null;

//     return (
//       <div className="lesson-students">
//         <h2 >{`שיעור ${lessonKey} >>`}</h2>
//         {studentsForLesson.map((student, index) => (
//           <div
//             key={index}
//             className={`student-card ${
//               selectedStudent === student.id ? "selected" : ""
//             }`}
//             onClick={() => setSelectedStudent(student.id)}
//           >
//             <h2>{`${student.firstName} ${student.lastName}`}</h2>
//             <p>שיעור: {student.grade}</p>
//             <p>מס' שיעור: {student.gradeNum}</p>
//             <p>התרים: {student.donation} ש"ח</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <header>
//         <OMHeader />
//       </header>
//       <div>
//         {Object.keys(studentsByLesson).map((lessonKey, index) => (
//           <div key={index} style={{ display: index === currentLessonIndex ? 'block' : 'none' }}>
//             {renderLessonStudents(lessonKey)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Squares;
import React, { useState, useEffect } from "react";
import "./squares.css";
import OMHeader from "./header.js";

const Squares = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsByLesson, setStudentsByLesson] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        const studentsByLesson = {};
        // Organize students by lesson
        data.forEach((student) => {
          const lessonKey = `${student.grade} ${student.gradeNum}`;
          if (!studentsByLesson[lessonKey]) {
            studentsByLesson[lessonKey] = [];
          }
          studentsByLesson[lessonKey].push(student);
        });
        setStudentsByLesson(studentsByLesson);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Set an interval to switch lessons
    const interval = setInterval(() => {
      setCurrentLessonIndex((prevIndex) => (prevIndex + 1) % Object.keys(studentsByLesson).length);
    }, 10000);

    return () => clearInterval(interval);
  }, [studentsByLesson]);

  const renderLessonStudents = (lessonKey) => {
    const studentsForLesson = studentsByLesson[lessonKey];
    if (!studentsForLesson) return null;

    return (
      <div className="lesson-students">
        <h2 >{`Lesson ${lessonKey} >>`}</h2>
        {studentsForLesson.map((student, index) => (
          <div
            key={index}
            className={`student-card ${
              selectedStudent === student.id ? "selected" : ""
            }`}
            onClick={() => setSelectedStudent(student.id)}
          >
            <h2>{`${student.firstName} ${student.lastName}`}</h2>
            <p>{`שיעור: ${student.grade} ${student.gradeNum}`}</p>
            <p>התרים: {student.donation} ש"ח</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <header>
        <OMHeader />
      </header>
      <div>
        {Object.keys(studentsByLesson).map((lessonKey, index) => (
          <div key={index} style={{ display: index === currentLessonIndex ? 'block' : 'none' }}>
            {renderLessonStudents(lessonKey)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Squares;
