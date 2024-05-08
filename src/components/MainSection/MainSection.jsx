import styles from "./MainSection.module.sass";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
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

  const fetchUrl = `https://api.schedule.vingp.dev/api/v1/schedule/groups?faculty=${facultyState?.toLowerCase() || ''}&course=${courseState}`;

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

  return (
    <>
      {loading && (
        <p className={styles.loaderWrapper}>
          <Skeleton height={100} count={1} className={styles.loader} />
        </p>
      )}

      <div
        className={styles.nav}
        style={{
          display: loading ? "none" : "grid",
        }}
      >
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
        <Fraction setFraction={setFraction} />
        <Days setDay={setDay} />
        <Schedule activeGroup={activeGroup} fraction={fraction} day={day} />
      </div>
    </>
  );
};

export default MainSection;