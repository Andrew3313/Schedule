import styles from "./Schedule.module.sass";
import React, { useState, useEffect } from "react";

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [allSchedule, setAllSchedule] = useState();

  useEffect(() => {
    if (props.activeGroup) {
      fetch(
        `http://176.119.159.182:8081/api/v1/schedule/groups/${props.activeGroup}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          setAllSchedule(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.activeGroup]);

  useEffect(() => {
    if (allSchedule)
      setSchedule(allSchedule.schedule[props.fraction][props.day]);
  }, [allSchedule, props]);

  return (
    <div className={styles.schedule}>
      {schedule.length > 0 ? (
        schedule.map((pair, index) => (
          <div className={styles.scheduleItem} key={index}>
            <p className={styles.schedule__time}>{pair.time}</p>
            <p className={styles.schedule__lesson}>{pair.lesson}</p>
          </div>
        ))
      ) : (
        <div className={styles.noSchedule}>
          <h2>В этот день нет занятий</h2>
        </div>
      )}
    </div>
  );
};

export default Schedule;
