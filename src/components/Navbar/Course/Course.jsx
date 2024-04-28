import styles from "./Course.module.sass";
import React, { useState, useEffect } from "react";

const Course = (props) => {
  const [course, setCourse] = useState(1);

  const handleCourseChange = () => {
    setCourse((prevState) => (prevState !== 4 ? prevState + 1 : 1));
  };

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
