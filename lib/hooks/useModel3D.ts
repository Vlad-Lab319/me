"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import mapboxgl from "mapbox-gl";

import {
  ambientLight,
  spotLight,
  spotLight2,
  spotLight3,
} from "../utils/lights";

export default function useModel3D(map, MODEL_CENTER) {
  useEffect(() => {
    if (typeof window === "undefined" || !map.current) return;
    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin = MODEL_CENTER;
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0.8, 0];

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude,
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.PerspectiveCamera({
          near: 0.1,
          far: 40,
          fov: 75,
          aspect: 0.7,
        });
        this.scene = new THREE.Scene();

        this.scene.add(ambientLight);
        this.scene.add(spotLight);
        this.scene.add(spotLight2);
        this.scene.add(spotLight3);

        // const spotLight = new THREE.SpotLight(0xffffff, 2); // Higher intensity for spotlights
        // spotLight.position.set(10, 20, 10);
        // spotLight.castShadow = true;

        const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        this.scene.add(spotLight, spotLightHelper);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new GLTFLoader();

        loader.load(
          // "/test_court.gltf",
          "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          (gltf) => {
            // console.log("GLTF: ", gltf);
            const court = gltf.scene;
            // court.add(ambientLight);
            // court.add(spotLight);
            // court.add(spotLight2);
            // court.add(spotLight3);
            court.traverse((child) => {
              if (child.isMesh) {
                if (child.name === "GymFloor_ParquetShader_0") {
                  child.receiveShadow = true;
                  child.roughness = 0.06;
                  child["material-envMapIntensity"] = 1;
                  child.material.metalness = 0.1;
                  child.material.normalMap.encoding =
                    THREE.LinearSRGBColorSpace;
                } else {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child["material-envMapIntensity"] = 0.1;
                }
              }
            });

            this.scene.add(court);
          },
        );
        this.map = map;

        console.log("Scene: ", this.scene);

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
        });

        this.renderer.antialiasis = true;
        this.renderer.alpha = true;
        this.renderer.autoClear = false;
        this.renderer.powerPreference = "high-performance";
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.outputEncoding = THREE.SRGBColorSpace;
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX,
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY,
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ,
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ,
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale,
            ),
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.render(this.scene, this.camera);
        this.renderer.resetState();
        this.map.triggerRepaint();
      },
    };

    map.current.on("style.load", () => {
      map.current.addLayer(customLayer);
    });
  }, [map, MODEL_CENTER]);

  return map;
}
