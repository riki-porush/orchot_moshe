import React, { useState, useEffect } from "react";
import students from "./data.json";
import "./squares.css";
import OMHeader from "./header.js";

const Squares = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsByLesson, setStudentsByLesson] = useState({});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const studentsByLesson = {};

    students.forEach((student) => {
      const lessonKey = `${student.grade} ${student.gradeNum}`;
      if (!studentsByLesson[lessonKey]) {
        studentsByLesson[lessonKey] = [];
      }
      studentsByLesson[lessonKey].push(student);
    });

    setStudentsByLesson(studentsByLesson);
  }, []);

  useEffect(() => {
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
        <h2 >{`שיעור ${lessonKey} >>`}</h2>
        {studentsForLesson.map((student, index) => (
          <div
            key={index}
            className={`student-card ${
              selectedStudent === student.id ? "selected" : ""
            }`}
            onClick={() => setSelectedStudent(student.id)}
          >
            <h2>{`${student.firstName} ${student.lastName}`}</h2>
            <p>שיעור: {student.grade}</p>
            <p>מס' שיעור: {student.gradeNum}</p>
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