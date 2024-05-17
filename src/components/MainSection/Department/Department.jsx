import styles from "./Department.module.sass";
import React from "react";
import { useStore } from "../../../store.js";

const Department = (props) => {
  const selectedDepartment = useStore((state) => state.facultyState);
  const setSelectedDepartment = useStore((state) => state.setFacultyState);

  const handleDepartmentChange = ({ target: { value } }) => {
    setSelectedDepartment(value);
  };

  return (
    <select
      className={styles.department}
      value={selectedDepartment}
      onChange={handleDepartmentChange}
    >
      <option disabled value="" className={styles.department__item}>
        ФАКУЛЬТЕТ
      </option>
      <option className={styles.department__item}>ФВТ</option>
      <option className={styles.department__item}>ФАИТУ</option>
      <option className={styles.department__item}>ФЭ</option>
      <option className={styles.department__item}>ФРТ</option>
      <option className={styles.department__item}>ИЭФ</option>
    </select>
  );
};

export default Department;
