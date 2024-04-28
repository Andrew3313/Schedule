import styles from "./Title.module.sass";

const Title = () => {
  return (
    <div className={styles.title}>
      <h1 className={styles.title__text + " " + styles.uppercase}>
        расписание
      </h1>
    </div>
  );
};

export default Title;
