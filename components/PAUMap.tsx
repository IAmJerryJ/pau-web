"use client";

import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  address: string;
  companyName: string;
}

// 动态导入Leaflet组件，禁用SSR
const MapWithNoSSR = dynamic<MapComponentProps>(
  () => import("./MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        Loading map...
      </div>
    ),
  }
);

interface PAUMapProps {
  address?: string;
  companyName?: string;
}

const PAUMap: React.FC<PAUMapProps> = ({
  address = "5 Talavera Rd, Macquarie Park, NSW 2113",
  companyName = "Pegatron Australia",
}) => {
  return (
    <div className="map-container-wrapper" style={{ width: "100%" }}>
      <MapWithNoSSR address={address} companyName={companyName} />
      <div
        className="address-display"
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <strong>Company Address:</strong> {address}
      </div>
    </div>
  );
};

export default PAUMap;
