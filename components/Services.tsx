import React from "react";
import styles from "../styles/Services.module.css";

const Services = () => {
  return (
    <div className={styles.servicesContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.servicesList}>
            <div className={styles.servicesHeader}>
              <p className={styles.servicesSubtitle}>Our Services</p>
              <h4 className={styles.servicesTitle}>
                We are the industry heads and produce the most reliable and
                trendy solution you are looking for.
              </h4>
            </div>

            <div className={styles.serviceItem}>
              <h3>Repair</h3>
              <p>
                We provide professional repair services for all types of
                equipment, ensuring your devices are in top condition.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <h3>Scooter</h3>
              <p>
                We offer high-quality electric scooters for sale and maintenance
                services, ensuring your mobility needs are met.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <h3>ATM</h3>
              <p>
                We provide ATM installation and maintenance services, ensuring
                your financial services are always available.
              </p>
            </div>
          </div>

          <div className={styles.heroMessage}>
            <h1 className={styles.mainTitle}>
              The only place where you'll get the perfect solution for all your
              industry needs.
            </h1>
            <button className={styles.learnMoreBtn}>LEARN MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
