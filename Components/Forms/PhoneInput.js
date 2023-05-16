import React from "react";
import InputMask from "react-input-mask";

import styles from "./PhoneInput.module.scss";

export default function PhoneInput({ mask, onChange, value, ...rest }) {
  const handlePhoneNumber = (value) => {
    onChange(value.replace(/\s/g, "").replaceAll("_", ""));
  };


  return (
    <div className={styles["phone-wrapper"]}>
      <InputMask
        mask={mask}
        onChange={(e) => handlePhoneNumber(e.target.value)}
        value={value}
        {...rest}
      />
    </div>
  );
}
