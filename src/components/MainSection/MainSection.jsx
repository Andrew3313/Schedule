import styles from "./MainSection.module.sass";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../store.js";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

import Course from "./Course";
import Department from "./Department";
import Group from "./Group";
import Fraction from "./Fraction";
import Days from "./Days";
import Schedule from "./Schedule";

const MainSection = () => {
  const course = useStore((state) => state.courseState);
  const faculty = useStore((state) => state.facultyState);
  const activeGroup = useStore((state) => state.activeGroup);
  const setDataByGroup = useStore((state) => state.setDataByGroup);
  const setActiveGroup = useStore((state) => state.setActiveGroup);
  const setCurrentFraction = useStore((state) => state.setCurrentFraction);
  const setCurrentDay = useStore((state) => state.setCurrentDay);
  const loading = useStore((state) => state.loadingNav);
  const setLoadingNav = useStore((state) => state.setLoadingNav);
  const firstRender = useRef(true);

  const fetchData = async () => {
    const fetchUrl = `https://api.schedule.vingp.dev/api/v1/schedule/groups?faculty=${
      faculty?.toLowerCase() || ""
    }&course=${course}`;
    try {
      const response = await axios.get(fetchUrl);
      const groups = response.data.groups;
      if (groups.length > 0) {
        setDataByGroup(groups);
        if (firstRender.current && !activeGroup) {
          setActiveGroup(groups[0]);
        } else if (activeGroup && !groups.includes(activeGroup)) {
          setActiveGroup(groups[0]);
        }
      } else {
        setDataByGroup([]);
        setActiveGroup(null);
      }
      setLoadingNav();
    } catch (error) {
      console.log(error);
      setDataByGroup([]);
      setActiveGroup(null);
    }
    firstRender.current = false;
  };

  const getToday = async () => {
    const todayUrl = "https://api.schedule.vingp.dev/api/v1/schedule/day";
    try {
      const today = await axios.get(todayUrl);
      if (
        today.data.day.toLowerCase() === "sunday" &&
        today.data.week_type === "числитель"
      ) {
        setCurrentFraction("denominator");
        setCurrentDay("monday");
      } else if (
        today.data.day.toLowerCase() === "sunday" &&
        today.data.week_type === "знаменатель"
      ) {
        setCurrentFraction("numerator");
        setCurrentDay("monday");
      } else if (today.data.week_type === "числитель") {
        setCurrentFraction("numerator");
        setCurrentDay(today.data.day.toLowerCase());
      } else {
        setCurrentFraction("denominator");
        setCurrentDay(today.data.day.toLowerCase());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToday();
  }, []);

  useEffect(() => {
    fetchData();
  }, [course, faculty]);

  return (
    <>
      {loading && (
        <p className={styles.loaderWrapper}>
          <Skeleton height={100} count={1} className={styles.loader} />
        </p>
      )}
      <div className={styles.navWrapper}>
        <main
          className={styles.nav}
          style={{
            display: loading ? "none" : "grid",
          }}
        >
          <Course />
          <Department />
          <Group />
          <Fraction />
          <Days />
          <Schedule />
        </main>
      </div>
    </>
  );
};

export default MainSection;
