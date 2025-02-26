import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

interface MapComponentProps {
  address: string;
  companyName: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  address,
  companyName,
}) => {
  const [position, setPosition] = useState<[number, number]>([
    -33.7785, 151.1164,
  ]); // Default position: Macquarie Park
  const [isLoading, setIsLoading] = useState(true);

  // Create custom red marker icon
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Fix Leaflet default icon issue
  useEffect(() => {
    // Only execute on client
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  useEffect(() => {
    // Use OpenStreetMap's Nominatim API to convert address to coordinates
    const fetchCoordinates = async () => {
      setIsLoading(true);
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  // Custom tooltip style with light blue background
  const tooltipStyle = `
    .prominent-tooltip .leaflet-tooltip {
      background-color: #3498db;
      color: white;
      font-weight: bold;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    .prominent-tooltip .leaflet-tooltip-top:before {
      border-top-color: #3498db;
    }
  `;

  if (isLoading) {
    return (
      <div
        className="map-loading"
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
    );
  }

  return (
    <>
      <style>{tooltipStyle}</style>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={redIcon}>
          <Tooltip
            permanent
            direction="top"
            offset={[0, -45]}
            className="prominent-tooltip"
          >
            <strong style={{ fontSize: "20px", color: "#e32214" }}>
              {companyName}
            </strong>
          </Tooltip>
          <Popup>
            <div>
              <strong>{companyName}</strong>
              <br />
              {address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapComponent;
