'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "../styles/Home.module.scss";

function HoundImages() {
  const [houndImages, setHoundImages] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/hound/images")
      .then((response) => response.json())
      .then((data) => setHoundImages(data.message.slice(0, 12)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.container}>
     <div className={styles.header}>
       <h2>There have some images</h2>
       <div>
         <Link href="/profile" className={styles.profile}>
           Profile
         </Link>
       </div>
     </div>

      <div className={styles.content}>
        {houndImages.map((img) => (
          <div className={styles.image} key={img}>
            <img src={img} alt="Hound breed dog"/>
            <div>Random image</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoundImages;
