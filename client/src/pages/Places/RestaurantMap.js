import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

const mapContainerStyle = {
  width: "40%",
  height: "65vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const RestaurantMap = ({
  centerMapPosition,
  restaurants,
  activeMarker,
  setActiveMarker,
}) => {
  console.log("restaurants:", restaurants);
  return (
    <GoogleMap
      zoom={14}
      center={centerMapPosition}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onClick={() => setActiveMarker(null)}
    >
      <Marker position={centerMapPosition} />
      {restaurants?.map((restaurant) => {
        const lat1 = restaurant.geometry.location.lat;
        const lng1 = restaurant.geometry.location.lng;
        const restauPosition = { lat: lat1, lng: lng1 };
        return (
          <Marker
            position={restauPosition}
            key={restaurant.place_id}
            onClick={() => setActiveMarker(restaurant.place_id)}
          >
            {activeMarker === restaurant.place_id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  {restaurant.name} ({restaurant.rating}/5)
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
};

export default RestaurantMap;
