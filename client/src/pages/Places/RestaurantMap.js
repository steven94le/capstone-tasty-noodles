import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

const mapContainerStyle = {
  width: "35%",
  height: "60vh",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const centerMarker = {
  path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  fillColor: "lightblue",
  fillOpacity: 0.8,
  scale: 2,
};

const RestaurantMap = ({
  centerMapPosition,
  restaurants,
  activeMarker,
  setActiveMarker,
  restaurantDetails,
}) => {
  return (
    <GoogleMap
      zoom={14}
      center={centerMapPosition}
      mapContainerStyle={mapContainerStyle}
      options={options}
      onClick={() => setActiveMarker(null)}
    >
      {restaurants?.map((restaurant) => {
        const lat1 = restaurant.geometry.location.lat;
        const lng1 = restaurant.geometry.location.lng;
        const restauPosition = { lat: lat1, lng: lng1 };
        return (
          <Marker
            position={restauPosition}
            key={restaurant.place_id}
            onClick={() => setActiveMarker(restaurant.place_id)}
            icon={centerMarker}
          >
            {activeMarker === restaurant.place_id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p>
                    {restaurant.name} ({restaurant.rating}/5)
                  </p>
                  {restaurantDetails.website && (
                    <>
                      <a
                        href={restaurantDetails.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {restaurantDetails.website}
                      </a>
                      <br />
                      <br />
                    </>
                  )}
                  {restaurantDetails.opening_hours && (
                    <>
                      {restaurantDetails.opening_hours?.weekday_text.map(
                        (day) => (
                          <p key={day}>{day}</p>
                        )
                      )}
                    </>
                  )}
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
