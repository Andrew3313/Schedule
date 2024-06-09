import styles from "./Schedule.module.sass";
import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import "moment-timezone";
import axios from "axios";
import { useStore } from "../../../store.js";

moment.tz.setDefault("Europe/Moscow");

const Schedule = () => {
  const group = useStore((state) => state.activeGroup);
  const day = useStore((state) => state.currentDay);
  const fraction = useStore((state) => state.currentFraction);
  const loading = useStore((state) => state.loadingSchedule);
  const setLoading = useStore((state) => state.setLoadingSchedule);
  const [schedule, setSchedule] = useState([]);
  const [allSchedule, setAllSchedule] = useState({});
  const currentTime = useRef(moment().format("HH:mm"));

  const currentPairIndex = (schedule) => {
    if (!schedule || schedule.length === 0) {
      return -1;
    }

    const daysOfTheWeek = {
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6,
      'sunday': 0
    }

    if (moment(currentTime.current, 'HH:mm').day() !== daysOfTheWeek[day]) {
      return -1;
    }

    const time = [];
    schedule?.forEach((pair) => {
      const [start, end] = pair.time.split("-");
      time.push({
        start: start.slice(0, 5).split(".").join(":"),
        end: end.slice(0, 5).split(".").join(":"),
      });
    });

    for (let i = 0; i < time.length; i++) {
      if (
        moment(currentTime.current, "HH:mm").isSameOrAfter(
          moment(time[i].start, "HH:mm").subtract(10, "minutes")
        ) &&
        moment(currentTime.current, "HH:mm").isBefore(
          moment(time[i].end, "HH:mm")
        )
      ) {
        return i;
      }
    }
    return -1;
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      currentTime.current = moment().format("HH:mm");
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
            <div
              className={
                index === currentPairIndex(schedule) &&
                currentPairIndex(schedule) !== -1
                  ? `${styles.scheduleItem} ${styles.currentPair}`
                  : styles.scheduleItem
              }
              key={index}
            >
              <p
                className={
                  index === currentPairIndex(schedule) &&
                  currentPairIndex(schedule) !== -1
                    ? `${styles.schedule__time} ${styles.currentPairTime}`
                    : styles.schedule__time
                }
              >
                {pair.time}
              </p>
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
