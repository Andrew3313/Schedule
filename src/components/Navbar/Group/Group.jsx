import styles from "./Group.module.sass";
import React, {useState, useEffect} from "react";

const Group = (props) => {
  const [selectedGroup, setSelectedGroup] = useState(props.dataByGroup[0]);

  const handleGroupChange = ({ target: { value } }) => {
    setSelectedGroup(value);
  };

  useEffect(() => {
    if (props.dataByGroup && props.dataByGroup.length > 0) {
      props.setActiveGroup(selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <select
      className={styles.group}
      value={selectedGroup}
      onChange={handleGroupChange}
    >
      <option disabled value="" className={styles.group__item}>
        ГРУППА
      </option>
      {props.dataByGroup && props.dataByGroup.map((group) => (
        <option className={styles.group__item} key={props.dataByGroup.indexOf(group)}>
          {group}
        </option>
      ))}
    </select>
  );
};


export default Group;
