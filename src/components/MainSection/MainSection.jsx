import Course from "./Course/Course";
import Department from "./Department/Department";
import Group from "./Group/Group";
import Fraction from "./Fraction/Fraction";
import Days from "./Days/Days";
import Schedule from "./Schedule/Schedule";
import styles from "./MainSection.module.sass";
import React, { useState, useEffect } from "react";

const MainSection = (props) => {
  const [dataByGroup, setDataByGroup] = useState([]);
  const [facultyState, setFacultyState] = useState("фвт");
  const [courseState, setCourseState] = useState(1);
  const [activeGroup, setActiveGroup] = useState();
  const [fraction, setFraction] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    fetch(
      `http://176.119.159.182:8081/api/v1/schedule/groups?faculty=${facultyState.toLowerCase()}&course=${courseState}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        setDataByGroup(data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
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