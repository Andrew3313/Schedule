import styles from "./Title.module.sass";

const Title = () => {
  return (
    <header className={styles.title}>
      <h1 className={styles.title__text + " " + styles.uppercase}>
        расписание
      </h1>
    </header>
  );
};

export default Title;
