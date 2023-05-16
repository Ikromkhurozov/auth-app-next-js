
import React, {useEffect, useMemo, useState} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";

const PhoneInput = dynamic(() => import("@/Components/Forms/PhoneInput"));
const PasswordInput = dynamic(() => import("@/Components/Forms/PasswordInput"));
const CommonDatePicker = dynamic(() => import("@/Components/Forms/DatePicker"));

import styles from "../styles/Registration.module.scss";

export default function Home() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    const login = localStorage.getItem('login');
    setLogin(login);

    if(login === null){
       router.push("/registration");
    }else{
       router.push("/home")
    }
  }, []);


  const calcAge = moment().format("YYYY") - moment(fromDate).format("YYYY");

  const isValidLogin = () => {
    const alphanumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    return login?.length >= 6 && alphanumericRegex.test(login);
  }

  const isValidPassword = () => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    return  password?.length >= 8 && uppercaseRegex.test(password) && numberRegex.test(password) && alphanumericRegex.test(password);
  }

  const validLogin = useMemo(() => isValidLogin(), [login]);
  const validPassword = useMemo(() => isValidPassword(), [password]);
  const validAge = useMemo(() => calcAge >= 18, [fromDate]);
  const validName = useMemo(() => name.length >=2, [name]);
  const validPhone = useMemo(() => phoneNumber.length === 13, [phoneNumber]);

  const onLogin = () => {
    if(!validLogin || !validPassword || !validAge || !validName || !validPhone) return;

    localStorage.setItem('login', login);
    localStorage.setItem('name', name);
    localStorage.setItem('fromDate', fromDate);
    localStorage.setItem('phoneNumber', phoneNumber);

    router.push("/home")
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <h1>Please Login to start</h1>
        <div>
          <Link href="/profile" className={styles.profile}>
            Profile
          </Link>
        </div>
      </div>

      <div className={styles.form}>
        <h3>Fill the form</h3>
        <div className={styles["input-wrapper"]}>
          <label>Login</label>
          <input
            type="text"
            onChange={(e) => setLogin(e.target.value)}
          />
          {!validLogin && (
            <div className={styles.error}>Alphanumeric characters, at least 6 symbols, numbers</div>
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <label>Password</label>
          <PasswordInput password={password} setPassword={setPassword} />
          {!validPassword && (
            <div className={styles.error}>At least 8 symbols, 1 uppercase letter and a number</div>
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <label>Phone number</label>
          <PhoneInput
            mask="+\9\9\8 99  999 99 99"
            onChange={setPhoneNumber}
            value={phoneNumber}
            alwaysShowMask={false}
            placeholder={"+998"}
            className={styles["phone-input"]}
          />

          {!validPhone && (
            <div className={styles.error}>Fill correct number</div>
          )}

        </div>
        <div className={styles["input-wrapper"]}>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {!validName && (
            <div className={styles.error}>At least 2 symbols</div>
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <label>BirthDate</label>
          <CommonDatePicker
            startDate={fromDate}
            setDate={date => setFromDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd.MM.yyyy"
          />
          {!validAge && (
            <div className={styles.error}>Age must bigger than 18.</div>
          )}
        </div>

        <div className={styles.btn}>
          <button onClick={onLogin}>Submit</button>
        </div>
      </div>
    </div>
  );
}
