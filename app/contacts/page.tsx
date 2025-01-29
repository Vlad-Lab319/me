"use client";
import React, { Suspense } from "react";
// console.log("React version:", React.version);
import dynamic from "next/dynamic";
import ContactInfo from "../components/brackets/ContactInfo";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Dynamically import 3d model
const Model = dynamic(() => import("../components/models/Model"), {
  // ssr: false,
});

const Contacts = () => {
  return (
    <section className="text-white h-full w-full grid grid-cols-1 grid-rows-[2fr_1fr] landscape:grid-cols-[1fr_1fr_1fr] landscape:grid-rows-1">
      <div
        id="brackets"
        className="w-full h-full max-h-[calc(100vh/3*2-100vh/6)] landscape:h-full landscape:max-h-[calc(100vh/3*2)] landscape:col-span-2 relative overflow-hidden"
      >
        {/* <h2>brackets</h2> */}
        <ContactInfo />
      </div>
      <div
        id="container-3d"
        className="w-full h-full max-h-[calc(100vh/3-100vh/12)] landscape:h-full landscape:max-h-full relative overflow-hidden row-start-2 landscape:row-start-1 landscape:col-start-3 self-end"
      >
        <Canvas
          camera={{ position: [2, 0, 12], fov: 15 }}
          className="h-full w-full block"
          resize={{ debounce: 200 }}
        >
          <ambientLight intensity={1.25} />
          <Suspense fallback={<div>Loading 3D Model...</div>}>
            <Model position={[0, -1, 0]} />
          </Suspense>
          <OrbitControls />
          {/* <axesHelper args={[5]} /> */}
          {/* <gridHelper args={[10, 10]} /> */}
        </Canvas>
      </div>
    </section>
  );
};

export default Contacts;
