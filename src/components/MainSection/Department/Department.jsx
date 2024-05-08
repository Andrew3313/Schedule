import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Department.module.sass";
import React, { useState, useEffect } from "react";

const Department = (props) => {
  const [selectedDepartment, setSelectedDepartment] = useState();

  const [getItem, setItem] = useLocalStorage();

  const handleDepartmentChange = ({ target: { value } }) => {
    setSelectedDepartment(value);
    setItem("department", value);
  };

  useEffect(() => {
    const department = getItem("department");
    department
      ? setSelectedDepartment(department)
      : setSelectedDepartment("фвт");
  }, []);

  useEffect(() => {
    props.setFacultyState(selectedDepartment);
  }, [selectedDepartment]);

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
