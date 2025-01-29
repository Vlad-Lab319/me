"use client";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";

import useBuildings3D from "../../lib/hooks/useBuildings3D";
import useModel3D from "@/lib/hooks/useModel3D";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic29sb21hZyIsImEiOiJjbDlteHprcDAwMmd4M29sNzZkNXBuaDVsIn0.KOQz-p6DZcPIuwk7z94YxA";

export default function Maps() {
  const MAP_CENTER = [-79.6335, 43.8472]; // === Model center for debugging
  const INITIAL_MAP_ZOOM = 14; // Debugging
  const INITIAL_PITCH = 82.5; // Debugging
  const INITIAL_BEARING = -63.64; // Debugging

  const MIN_MAP_ZOOM = 5;
  const MAX_MAP_ZOOM = 25;
  // const INITIAL_MAP_ZOOM = 16.22;
  // const INITIAL_PITCH = 58.66;
  // const INITIAL_BEARING = -10.64;
  // const MAP_CENTER = [-79.6264, 43.8405]; // Kleinburg

  // const MAP_CENTER = [-79.40, 43.65]; //Downtown Toronto
  const MODEL_CENTER = [-79.63355, 43.84715];
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(MAP_CENTER[0]);
  const [lat, setLat] = useState(MAP_CENTER[1]);
  const [zoom, setZoom] = useState(INITIAL_MAP_ZOOM);
  const [pitch, setPitch] = useState(INITIAL_PITCH);
  const [bearing, setBearing] = useState(INITIAL_BEARING);

  // const [idle, setIdle] = useState(false);
  // const onIdle = useCallback(() => {
  //   setIdle(true);
  // }, [setIdle]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,

      minZoom: MIN_MAP_ZOOM,
      maxZoom: MAX_MAP_ZOOM,
      bearing: bearing,
      pitch: pitch,
      // minPitch: 0,
      // maxPitch: 65,

      // minTileCacheSize: 1000,
      // antialias: true,
      // dragPan: false,
      // dragRotate: false,
      // pitchWithRotate: false,
      // touchPitch: false,
      // touchZoomRotate: true,
      // interactive: true,

      willReadFrequently: true,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      setPitch(map.current.getPitch().toFixed(2));
      setBearing(map.current.getBearing().toFixed(2));
    });

    // map.current.once("idle", handleIdle);

    function handleIdle() {
      setTimeout(() => {
        // map.current.easeTo({ center: MAP_CENTER, duration: 2000 });
        // map.current.jumpTo({ zoom: 18.8, pitch: 65, bearing: 21.16, center: [-79.6336, 43.8470]}, );
        map.current.easeTo({
          zoom: 23,
          pitch: 82.5,
          bearing: -63.64,
          center: [-79.6335, 43.8472],
          duration: 5000,
        });
        // map.current.setMinZoom(MIN_MAP_ZOOM);
        onIdle();
      }, 4000);
    }
  });

  // Add 3D buildings layer

  useBuildings3D(map);

  // Add Model layer

  // useModel3D(map, MODEL_CENTER);

  return (
    <div className="h-full w-full">
      <div className="sidebar ">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Pitch: {pitch} |
        Bearing: {bearing}
      </div>
      <div ref={mapContainer} className="map-container h-full w-full" />
    </div>
  );
}
