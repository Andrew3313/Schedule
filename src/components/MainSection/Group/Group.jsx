import styles from "./Group.module.sass";
import React from "react";
import { useStore } from "../../../store.js";

const Group = (props) => {
  const selectedGroup = useStore((state) => state.activeGroup);
  const setSelectedGroup = useStore((state) => state.setActiveGroup);
  const data = useStore((state) => state.dataByGroup);

  const handleGroupChange = ({ target: { value } }) => {
    setSelectedGroup(value);
  };

  return (
    <select
      className={styles.group}
      value={selectedGroup}
      onChange={handleGroupChange}
    >
      <option disabled value="" className={styles.group__item}>
        ГРУППА
      </option>
      {data &&
        data.map((group) => (
          <option className={styles.group__item} key={data.indexOf(group)}>
            {group}
          </option>
        ))}
    </select>
  );
};

export default Group;
