import styles from "./Course.module.sass";
import React from "react";
import { useStore } from "../../../store.js";

const Course = (props) => {
  const course = useStore((state) => state.courseState);
  const setCourse = useStore((state) => state.setCourseState);

  const handleCourseChange = () => {
    if (course !== 4) {
      setCourse(course + 1);
    } else {
      setCourse(1);
    }
  };

  return (
    <button onClick={handleCourseChange} className={styles.course}>
      {course}
    </button>
  );
};

export default Course;
