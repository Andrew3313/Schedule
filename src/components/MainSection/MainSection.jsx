import styles from "./MainSection.module.sass";
import React, { useState, useEffect, useCallback } from "react";
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
  const [dataByGroup, setDataByGroup] = useState([]);
  const [facultyState, setFacultyState] = useState();
  const [courseState, setCourseState] = useState();
  const [activeGroup, setActiveGroup] = useState();
  const [fraction, setFraction] = useState();
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(true);
  const [getItem] = useLocalStorage();

  const fetchData = async () => {
    if (!facultyState || !courseState) return;

    const fetchUrl = `https://api.schedule.vingp.dev/api/v1/schedule/groups?faculty=${facultyState.toLowerCase()}&course=${courseState}`;

    try {
      const response = await axios.get(fetchUrl);
      setDataByGroup(response.data.groups);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [facultyState, courseState]);

  useEffect(() => {
    if (dataByGroup && dataByGroup.length > 0) {
      const group = getItem("group");
      setActiveGroup(group ?? dataByGroup[0]);
    }
  }, [dataByGroup]);

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
