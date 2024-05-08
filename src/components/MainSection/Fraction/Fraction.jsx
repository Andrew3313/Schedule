import styles from "./Fraction.module.sass";
import React, { useState, useEffect, useCallback } from "react";

const Fraction = (props) => {
  const [fractionState, setFractionState] = useState("");

  useEffect(() => {
    props.setFraction(fractionState);
  }, [fractionState, props.setFraction]);

  useEffect(() => {
    if (props.currentFraction === "числитель") {
      setFractionState("numerator");
    } else {
      setFractionState("denominator");
    }
  }, [props.currentFraction]);

  const handleNumeratorChange = useCallback(() => {
    setFractionState("numerator");
  }, []);

  const handleDenominatorChange = useCallback(() => {
    setFractionState("denominator");
  }, []);

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
