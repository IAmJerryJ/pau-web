"use client";

import React from "react";
import Image from "next/image";
import styles from "../styles/AboutHero.module.css";

const TeamBanner = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.backgroundImage}>
        <Image
          src="/TeamBanner.jpg"
          alt="Team Banner"
          fill
          priority
          quality={100}
          style={{ objectFit: "cover" }}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Our Team</h1>
      </div>
    </div>
  );
};

export default TeamBanner;
