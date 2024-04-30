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
      <button onClick={handleMonday} className={
        dayOfTheWeek === "monday" 
        ? styles.day + " " + styles.Mon + " " + styles.active 
        : styles.day + " " + styles.Mon}>
        Пн
      </button>
      <button onClick={handleTuesday} className={
        dayOfTheWeek === "tuesday"
        ? styles.day + " " + styles.Tue + " " + styles.active
        : styles.day + " " + styles.Tue}>
        Вт
      </button>
      <button
        onClick={handleWednesday}
        className={
        dayOfTheWeek === "wednesday"
        ? styles.day + " " + styles.Wed + " " + styles.active  
        : styles.day + " " + styles.Wed}
      >
        Ср
      </button>
      <button
        onClick={handleThursday}
        className={
        dayOfTheWeek === "thursday"  
        ? styles.day + " " + styles.Thu + " " + styles.active  
        : styles.day + " " + styles.Thu}
      >
        Чт
      </button>
      <button onClick={handleFriday} className={
        dayOfTheWeek === "friday"
        ? styles.day + " " + styles.Fri + " " + styles.active
        : styles.day + " " + styles.Fri}>
        Пт
      </button>
      <button
        onClick={handleSaturday}
        className={
        dayOfTheWeek === "saturday"  
        ? styles.day + " " + styles.Sat + " " + styles.active  
        : styles.day + " " + styles.Sat}
      >
        Сб
      </button>
    </>
  );
};

export default Days;
