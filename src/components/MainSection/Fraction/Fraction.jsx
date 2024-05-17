import styles from "./Fraction.module.sass";
import React from "react";
import { useStore } from "../../../store.js";

const Fraction = () => {
  const fractionState = useStore((state) => state.currentFraction);
  const setFractionState = useStore((state) => state.setCurrentFraction);

  const handleNumeratorChange = () => {
    setFractionState("numerator");
  };

  const handleDenominatorChange = () => {
    setFractionState("denominator");
  };

  const getNumeratorClassName = () =>
    fractionState === "numerator"
      ? `${styles.numerator} ${styles.active}`
      : styles.numerator;

  const getDenominatorClassName = () =>
    fractionState === "denominator"
      ? `${styles.denominator} ${styles.active}`
      : styles.denominator;

  return (
    <>
      <button
        onClick={handleNumeratorChange}
        className={getNumeratorClassName()}
      >
        ЧИСЛИТЕЛЬ
      </button>
      <button
        onClick={handleDenominatorChange}
        className={getDenominatorClassName()}
      >
        ЗНАМЕНАТЕЛЬ
      </button>
    </>
  );
};

export default Fraction;
