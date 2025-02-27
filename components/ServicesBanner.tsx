"use client";

import React from "react";
import Image from "next/image";

const ServicesBanner = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src="/ServicesBanner.jpg"
          alt="Services Background"
          fill
          priority
          quality={100}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))",
            zIndex: 1,
          }}
        ></div>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            marginTop: "100px",
            padding: 0,
            textAlign: "center",
          }}
        >
          Our Services
        </h1>
      </div>
    </div>
  );
};

export default ServicesBanner;
