import styles from "./Schedule.module.sass";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { useStore } from "../../../store.js";

const Schedule = () => {
  const group = useStore((state) => state.activeGroup);
  const day = useStore((state) => state.currentDay);
  const fraction = useStore((state) => state.currentFraction);
  const loading = useStore((state) => state.loadingSchedule);
  const setLoading = useStore((state) => state.setLoadingSchedule);
  const [schedule, setSchedule] = useState([]);
  const [allSchedule, setAllSchedule] = useState({});

  useEffect(() => {
    if (group) {
      axios
        .get(`https://api.schedule.vingp.dev/api/v1/schedule/groups/${group}`)
        .then((response) => {
          setAllSchedule(response.data);
          setLoading();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [group]);

  useEffect(() => {
    if (
      allSchedule &&
      allSchedule.schedule &&
      allSchedule.schedule[fraction] &&
      allSchedule.schedule[fraction][day]
    ) {
      setSchedule(allSchedule.schedule[fraction][day]);
    } else {
      setSchedule([]);
    }
  }, [allSchedule, fraction, day]);

  return (
    <>
      {loading && (
        <p className={styles.loaderWrapper}>
          <Skeleton height={100} count={1} className={styles.loader} />
        </p>
      )}
      <div
        className={styles.schedule}
        style={{
          display: loading ? "none" : "grid",
        }}
      >
        {schedule && schedule.length > 0 ? (
          schedule.map((pair, index) => (
            <div className={styles.scheduleItem} key={index}>
              <p className={index === 0 ? `${styles.schedule__time} ${styles.firstPairTime}` : styles.schedule__time}>{pair.time}</p>
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
