import React, { useRef } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import GetCoordinate from "../../constants/GetCoordinate";
import { useRestaurantContext } from "../../context/RestaurantContext";
import { useHoverContext } from "../../context/HoverContext";

const Map = (props) => {
  const { hoveredRestaurant, setHoveredRestaurant } = useHoverContext();
  // const { restaurantData } = useRestaurantContext();
  const restaurantData = props.restaurantData;
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const markersRef = useRef([]);
  const [coordinates, setCoordinates] = useState({
    latitude: 1.0,
    longitude: 1.0,
  });

  useEffect(() => {
    const getLocAndInitializeMap = async () => {
      try {
        const location = await GetCoordinate();
        const { latitude, longitude } = location;
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        setCoordinates({
          latitude: parsedLatitude,
          longitude: parsedLongitude,
        });

        // Initialize the map after coordinates are set
        const accessToken = import.meta.env.VITE_PUBLIC_TOKEN_MAP_BOX_GL;
        if (!accessToken) {
          console.error("Mapbox access token is not defined");
          return;
        }
        mapboxgl.accessToken = accessToken;

        if (mapContainer.current) {
          const newMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/paramesh2005/clw7kpezj02rv01qze47ogzxz",
            center: [parsedLongitude, parsedLatitude],
            zoom: 12,
            pitch: 60,
            bearing: 45,
          });

          newMap.addControl(new mapboxgl.NavigationControl());

          newMap.on("load", () => {
            setMap(newMap);
            newMap.resize();
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLocAndInitializeMap();
  }, []);

  useEffect(() => {
    if (map && restaurantData) {
      markersRef.current = [];
      restaurantData.forEach((element) => {
        const lat = parseFloat(element.latitude);
        const lng = parseFloat(element.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([lng, lat])
            .addTo(map);
          markersRef.current.push(marker);
        }
      });
    }
    // console.log(markersRef.current);
  }, [map, restaurantData]);

  useEffect(() => {
    if (hoveredRestaurant && map) {
      markersRef.current.forEach((marker) => {
        if (marker) {
          const element = marker.getElement();
          if (
            marker.getLngLat().lat === hoveredRestaurant.latitude &&
            marker.getLngLat().lng === hoveredRestaurant.longitude
          ) {
            element.style.transform = "scale(1.5)";
          } else {
            element.style.transform = "scale(1)";
          }
        }
      });
      // console.log(markersRef);
    }
  }, [hoveredRestaurant]);
  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Map;
