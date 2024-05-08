import styles from "./Days.module.sass";
import React, { useState, useEffect } from "react";

const Days = ({ setDay, currentDay }) => {
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");

  useEffect(() => {
    setDayOfTheWeek(currentDay === "sunday" ? "monday" : currentDay);
  }, [currentDay]);

  useEffect(() => {
    setDay(dayOfTheWeek);
  }, [dayOfTheWeek]);

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
