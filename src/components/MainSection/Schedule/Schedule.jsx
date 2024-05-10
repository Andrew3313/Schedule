import styles from "./Schedule.module.sass";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

const Schedule = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [allSchedule, setAllSchedule] = useState();
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  useEffect(() => {
    if (props.activeGroup) {
      axios
        .get(
          `https://api.schedule.vingp.dev/api/v1/schedule/groups/${props.activeGroup}`
        )
        .then((response) => {
          setAllSchedule(response.data);
          setLoadingSchedule(false);
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
    <>
      {loadingSchedule && (
        <p className={styles.loaderWrapper}>
          <Skeleton
            height={100}
            count={1}
            className={styles.loader}
          />
        </p>
      )}
      <div
        className={styles.schedule}
        style={{
          display: loadingSchedule ? "none" : "grid",
        }}
      >
        {(schedule && schedule.length > 0) ? (
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
    </>
  );
};

export default Schedule;
