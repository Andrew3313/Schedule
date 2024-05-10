import styles from "./MainSection.module.sass";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

import Course from "./Course/Course";
import Department from "./Department/Department";
import Group from "./Group/Group";
import Fraction from "./Fraction/Fraction";
import Days from "./Days/Days";
import Schedule from "./Schedule/Schedule";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MainSection = (props) => {
  const [getItem, setItem] = useLocalStorage();
  const [dataByGroup, setDataByGroup] = useState([]);
  const [facultyState, setFacultyState] = useState(getItem("faculty") || "фвт");
  const [courseState, setCourseState] = useState(getItem("course") || 1);
  const [activeGroup, setActiveGroup] = useState();
  const [fraction, setFraction] = useState();
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState("");
  const [currentFraction, setCurrentFraction] = useState("");

  const todayUrl = "https://api.schedule.vingp.dev/api/v1/schedule/day";

  const fetchUrl = `https://api.schedule.vingp.dev/api/v1/schedule/groups?faculty=${
    facultyState?.toLowerCase() || ""
  }&course=${courseState}`;

  const cachedData = useMemo(() => {
    const cached = localStorage.getItem(fetchUrl);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }, [fetchUrl]);

  const fetchData = useCallback(async () => {
    if (!courseState) return;

    if (cachedData) {
      setDataByGroup(cachedData.groups);
      setLoading(false);

      const group = getItem("group");
      if (cachedData.groups.includes(group)) {
        setActiveGroup(group);
      } else if (cachedData.groups.length > 0) {
        setActiveGroup(cachedData.groups[0]);
      }
    } else {
      try {
        const response = await axios.get(fetchUrl);
        localStorage.setItem(fetchUrl, JSON.stringify(response.data));
        setDataByGroup(response.data.groups);
        setLoading(false);

        const group = getItem("group");
        if (response.data.groups.includes(group)) {
          setActiveGroup(group);
        } else if (response.data.groups.length > 0) {
          setActiveGroup(response.data.groups[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [courseState, cachedData, fetchUrl, getItem]);

  const getToday = useCallback(async () => {
    try {
      const today = await axios.get(todayUrl);
      setCurrentFraction(today.data.week_type);
      setCurrentDay(today.data.day.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }, [todayUrl]);

  useEffect(() => {
    if (facultyState && courseState) {
      fetchData();
    }
  }, [facultyState, courseState, fetchData]);

  useEffect(() => {
    setItem("faculty", facultyState);
    setItem("course", courseState);
  }, [facultyState, courseState, setItem]);

  useEffect(() => {
    if (activeGroup) {
      setItem("group", activeGroup);
    }
  }, [activeGroup, setItem]);

  useEffect(() => {
    getToday();
  }, [getToday]);

  return (
    <main className={styles.nav}>
      <Course courseState={courseState} setCourseState={setCourseState} />
      <Department
        facultyState={facultyState}
        setFacultyState={setFacultyState}
      />
      <Group
        dataByGroup={dataByGroup}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
      />
      <Fraction setFraction={setFraction} currentFraction={currentFraction} />

      <Days setDay={setDay} currentDay={currentDay} />
      <Schedule activeGroup={activeGroup} fraction={fraction} day={day} />
    </main>
  );
};

export default MainSection;
