"use client";

import React from "react";
import Image from "next/image";
import styles from "../styles/AboutHero.module.css";

const ContactsBanner = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundImage}>
        <Image
          src="/ContactsBanner.jpg"
          alt="Contacts Background"
          fill
          priority
          quality={100}
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Contact Us</h1>
      </div>
    </div>
  );
};

export default ContactsBanner;
