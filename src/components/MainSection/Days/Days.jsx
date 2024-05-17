import { useStore } from "../../../store.js";
import styles from "./Days.module.sass";
import React from "react";

const Days = () => {
  const dayOfTheWeek = useStore((state) => state.currentDay);
  const setDayOfTheWeek = useStore((state) => state.setCurrentDay);

  const handleDayClick = (day) => {
    setDayOfTheWeek(day);
  };

  const daysOfWeek = [
    { eng: "monday", rus: "Пн" },
    { eng: "tuesday", rus: "Вт" },
    { eng: "wednesday", rus: "Ср" },
    { eng: "thursday", rus: "Чт" },
    { eng: "friday", rus: "Пт" },
    { eng: "saturday", rus: "Сб" },
  ];

  return (
    <>
      {daysOfWeek.map((day, index) => (
        <button
          key={index}
          onClick={() => handleDayClick(day.eng)}
          className={`${styles.day} ${styles[day.eng]} ${
            dayOfTheWeek === day.eng ? styles.active : ""
          }`}
        >
          {day.rus}
        </button>
      ))}
    </>
  );
};

export default Days;
