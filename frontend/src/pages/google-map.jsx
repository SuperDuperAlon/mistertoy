import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {
  const [coordinates, setCoordinates] = useState({
    lat: 32.0853,
    lng: 34.7818,
  });
  const zoom = 11;

  const handleClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng });
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "70vh", width: "90%", margin: "auto" }}>
      <GoogleMapReact
        onClick={handleClick}
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          // lat={coordinates.lat}
          // lng={coordinates.lng}
          {...coordinates}
          text="🍎🍎🍎"
        />
      </GoogleMapReact>
    </div>
  );
}
