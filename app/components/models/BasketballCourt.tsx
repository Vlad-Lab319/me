"use client";
import * as THREE from "three";
import React, { Suspense } from "react";
import { useLayoutEffect } from "react";
import { applyProps, Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useBoxProjectedEnv,
  CubeCamera,
  Environment,
  OrbitControls,
  BakeShadows,
} from "@react-three/drei";

import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

const BasketballCourt = () => {
  return (
    <section className="text-white bg-transparent h-screen w-screen flex">
      <div className="h-full w-full">
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          shadows
          camera={{ near: 0.1, far: 40, fov: 75 }}
          className="h-full w-full block"
          resize={{ debounce: 200 }}
        >
          <Suspense fallback={<Loader />}>
            <fog attach="fog" args={["purple", 0, 130]} />
            <ambientLight intensity={1} />
            {/* <hemisphereLight color={"0xB1E1FF"} intensity={1} /> */}
            <group position={[0, -1, 0]}>
              <spotLight
                castShadow
                intensity={10}
                angle={0.1}
                position={[-200, 220, -100]}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.000001}
              />
              <spotLight
                angle={0.1}
                position={[-250, 120, -200]}
                intensity={1}
                castShadow
                shadow-mapSize={[50, 50]}
                shadow-bias={-0.000001}
              />
              <spotLight
                angle={0.1}
                position={[250, 120, 200]}
                intensity={1}
                castShadow
                shadow-mapSize={[50, 50]}
                shadow-bias={-0.000001}
              />
              <Court />
              <Ball />
              <Floor />
            </group>
            <OrbitControls
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
            {/* <Environment
            files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr"
            background
            /> */}
            <Environment preset="city" />
            <BakeShadows />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

function Court(props) {
  const { scene, nodes, materials } = useGLTF("/court-transformed.glb");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        if (o === nodes.GymFloor_ParquetShader_0) o.parent.remove(o);
        else
          applyProps(o, {
            castShadow: true,
            receiveShadow: true,
            "material-envMapIntensity": 0.1,
          });
      }
    });
  }, []);

  // console.log("scene:", scene);
  return <primitive object={scene} {...props} />;
}

function Ball(props) {
  const { scene, nodes, materials } = useGLTF("/Basketball_ball.glb");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, {
          castShadow: true,
          receiveShadow: true,
          "material-envMapIntensity": 0.1,
        });
      }
    });
  }, []);

  // console.log("scene:", scene);
  return <primitive object={scene} position={[-1, 0.51, -5]} {...props} />;
}

function Floor(props) {
  const { nodes, materials } = useGLTF("/court-transformed.glb");
  const projection = useBoxProjectedEnv([0, -0.5, 0], [27, 27, 27]);
  return (
    <>
      <CubeCamera
        frames={1}
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        resolution={1024}
        near={1}
        far={1000}
        {...props}
      >
        {(texture) => (
          <mesh
            receiveShadow
            position={[-13.68, -0.467, 17.52]}
            scale={0.02}
            geometry={nodes.GymFloor_ParquetShader_0.geometry}
            dispose={null}
          >
            <meshStandardMaterial
              map={materials.ParquetShader.map}
              normalMap={materials.ParquetShader.normalMap}
              normalMap-encoding={THREE.LinearSRGBColorSpace}
              envMap={texture}
              metalness={0.0}
              normalScale={[0.25, -0.25]}
              color="#aaa"
              {...projection}
              roughness={0.05}
              envMapIntensity={1.5}
            />
          </mesh>
        )}
      </CubeCamera>
    </>
  );
}

export default BasketballCourt;
