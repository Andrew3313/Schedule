import styles from "./Days.module.sass";
import React, { useState, useEffect } from "react";

const Days = (props) => {
  const [dayOfTheWeek, setDayOfTheWeek] = useState("monday");

  useEffect(() => {
    props.setDay(dayOfTheWeek);
  }, [dayOfTheWeek]);

  const handleMonday = () => {
    setDayOfTheWeek("monday");
  };
  const handleTuesday = () => {
    setDayOfTheWeek("tuesday");
  };
  const handleWednesday = () => {
    setDayOfTheWeek("wednesday");
  };
  const handleThursday = () => {
    setDayOfTheWeek("thursday");
  };
  const handleFriday = () => {
    setDayOfTheWeek("friday");
  };
  const handleSaturday = () => {
    setDayOfTheWeek("saturday");
  };

  return (
    <>
      <button onClick={handleMonday} className={styles.day + " " + styles.Mon}>
        Пн
      </button>
      <button onClick={handleTuesday} className={styles.day + " " + styles.Tue}>
        Вт
      </button>
      <button
        onClick={handleWednesday}
        className={styles.day + " " + styles.Wed}
      >
        Ср
      </button>
      <button
        onClick={handleThursday}
        className={styles.day + " " + styles.Thu}
      >
        Чт
      </button>
      <button onClick={handleFriday} className={styles.day + " " + styles.Fri}>
        Пт
      </button>
      <button
        onClick={handleSaturday}
        className={styles.day + " " + styles.Sat}
      >
        Сб
      </button>
    </>
  );
};

export default Days;
