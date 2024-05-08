import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Course.module.sass";
import React, { useState, useEffect } from "react";

const Course = (props) => {
  const [course, setCourse] = useState();

  const [getItem, setItem] = useLocalStorage();

  const handleCourseChange = () => {
    const newCourse = course !== 4 ? course + 1 : 1;
    setCourse(newCourse);
    setItem("course", newCourse);
  };

  useEffect(() => {
    const course = getItem("course");
    course ? setCourse(course) : setCourse(1);
  }, []);

  useEffect(() => {
    props.setCourseState(course);
  }, [course]);

  return (
    <button onClick={handleCourseChange} className={styles.course}>
      {course}
    </button>
  );
};

export default Course;
