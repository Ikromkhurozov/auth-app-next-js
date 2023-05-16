import React, { useState } from "react";

import styles from "./PasswordInput.module.scss";

export default function PasswordInput({
  password,
  setPassword,
}) {
  const [hide, setHide] = useState(true);

  return (
    <div className={styles["password-wrapper"]}>
      <input
        type={hide ? "password" : "text"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className={styles["eye-icon"]} onClick={() => setHide(!hide)}>
        {hide ? (
          <ion-icon name="eye-off-outline" />
        ) : (
          <ion-icon name="eye-outline" />
        )}
      </div>
    </div>
  );
}
