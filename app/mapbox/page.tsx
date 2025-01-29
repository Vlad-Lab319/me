"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { Threebox } from "threebox-plugin";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic29sb21hZyIsImEiOiJjbDlteHprcDAwMmd4M29sNzZkNXBuaDVsIn0.KOQz-p6DZcPIuwk7z94YxA";

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-79.63355, 43.84715], // Kleinburg
      zoom: 15.4,
      pitch: 64.9,
      bearing: 172.5,
      antialias: true,
    });

    mapRef.current.on("style.load", () => {
      mapRef.current.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: function () {
          window.tb = new Threebox(
            mapRef.current,
            mapRef.current.getCanvas().getContext("webgl"),
            { defaultLights: true },
          );
          const scale = 1;
          const options = {
            // obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
            // obj: "/court-transformed.glb",
            obj: "/test_court.gltf",
            type: "gltf",
            scale: { x: scale, y: scale, z: scale },
            units: "meters",
            rotation: { x: 90, y: 0, z: 0 },
          };

          window.tb.loadObj(options, (model) => {
            model.setCoords([-79.63365, 43.8473]);
            model.setRotation({ x: 0, y: 0, z: 230 });
            window.tb.add(model);
          });
        },

        render: function () {
          window.tb.update();
        },
      });

      const layers = mapRef.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"],
      ).id;

      mapRef.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 20,
          paint: {
            "fill-extrusion-color": "#aaa",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId,
      );
    });
  });

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.once("idle", handleIdle);

    function handleIdle() {
      setTimeout(() => {
        mapRef.current.easeTo({
          zoom: 23,
          pitch: 82.5,
          bearing: -63.64,
          center: [-79.6337, 43.84715],
          duration: 5000,
        });
      }, 4000);
    }
  }, []);

  return <div id="map" ref={mapContainerRef} style={{ height: "100%" }}></div>;
};

export default MapboxExample;
