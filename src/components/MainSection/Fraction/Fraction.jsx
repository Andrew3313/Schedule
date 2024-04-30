import styles from "./Fraction.module.sass";
import React, { useState, useEffect } from "react";

const Fraction = (props) => {
  const [fractionState, setFractionState] = useState("numerator");

  useEffect(() => {
    props.setFraction(fractionState);
  }, [fractionState]);

  const handleNumeratorChange = () => {
    setFractionState("numerator");
  };

  const handleDenominatorChange = () => {
    setFractionState("denominator");
  };

  return (
    <>
      <button
        onClick={handleNumeratorChange}
        className={
          fractionState === "numerator"
            ? styles.numerator + " " + styles.active
            : styles.numerator
        }
      >
        ЧИСЛИТЕЛЬ
      </button>
      <button onClick={handleDenominatorChange} className={
        fractionState === "denominator" 
        ? styles.denominator + " " + styles.active 
        : styles.denominator}>
        ЗНАМЕНАТЕЛЬ
      </button>
    </>
  );
};

export default Fraction;
