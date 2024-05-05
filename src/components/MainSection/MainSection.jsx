import Course from "./Course/Course";
import Department from "./Department/Department";
import Group from "./Group/Group";
import Fraction from "./Fraction/Fraction";
import Days from "./Days/Days";
import Schedule from "./Schedule/Schedule";
import styles from "./MainSection.module.sass";
import React, { useState, useEffect, useRef } from "react";

const MainSection = (props) => {
  const [dataByGroup, setDataByGroup] = useState([]);
  const [facultyState, setFacultyState] = useState("фвт");
  const [courseState, setCourseState] = useState(1);
  const [activeGroup, setActiveGroup] = useState();
  const [fraction, setFraction] = useState();
  const [day, setDay] = useState();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchUrl = `https://api.schedule.vingp.dev/api/v1/schedule/groups?faculty=${facultyState.toLowerCase()}&course=${courseState}`;

    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          const data = await response.json();
          setDataByGroup(data.groups);
        } else {
          throw new Error(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      fetchData();
    }
  }, [facultyState, courseState]);

  useEffect(() => {
    if (dataByGroup && dataByGroup.length > 0) {
      setActiveGroup(dataByGroup[0]);
    }
  }, [dataByGroup]);

  return (
    <div className={styles.nav}>
      <Course courseState={courseState} setCourseState={setCourseState} />
      <Department
        facultyState={facultyState}
        setFacultyState={setFacultyState}
      />
      <Group dataByGroup={dataByGroup} setActiveGroup={setActiveGroup} />
      <Fraction setFraction={setFraction} />
      <Days setDay={setDay} />
      <Schedule activeGroup={activeGroup} fraction={fraction} day={day} />
    </div>
  );
};

export default MainSection;
