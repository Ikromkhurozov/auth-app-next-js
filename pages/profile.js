'use client';
import React, {useEffect, useState} from "react";
import Link from "next/link";

import styles from "../styles/Profile.module.scss";
import moment from "moment";

export default function Profile() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState();
  useEffect(() => {
    const login = localStorage.getItem('login');
    setLogin(login);
    const name = localStorage.getItem('name');
    setName(name);
    const fromDate = localStorage.getItem('fromDate');
    setFromDate(fromDate);
    const phoneNumber = localStorage.getItem('phoneNumber');
    setPhoneNumber(phoneNumber);

    if(phoneNumber === null && login === null) return;

  }, []);

  const handleLocalStorage = () =>{
    localStorage.clear();
  }

  return (
    <div className={styles.container}>
      <h2>User info</h2>
      {login && phoneNumber && name ? (
        <div className={styles.content}>
          <div>
            Name: <p>{name}</p>
          </div>
          <div>
            Date of birth: <p>{moment(fromDate).format("DD.mm.YYYY")}</p>
          </div>
          <div>
            Login: <p>{login}</p>
          </div>
          <div>
            Phone: <p>{phoneNumber}</p>
          </div>

          <div className={styles.back} onClick={handleLocalStorage} >
            <Link href="/registration">Quit Account</Link>
          </div>

        </div>
      ) : (
        <>
          <div>
            <h2>You have not registered!</h2>
          </div>
          <div className={styles.back} onClick={handleLocalStorage}>
            <Link href="/registration">Back to Registration Page</Link>
          </div>
        </>
      )}

      {login && phoneNumber && name && (
        <div className={styles.back}>
          <Link href="/home">Go to home page</Link>
        </div>
        )
      }
    </div>
  );
}
