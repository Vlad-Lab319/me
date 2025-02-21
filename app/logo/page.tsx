"use client";
import SBALogo from "../components/models/SBALogo";
import {
  AccumulativeShadows,
  CameraControls,
  Environment,
  RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

const LogoPage = () => {
  return (
    <div className="h-full grid grid-cols-1 grid-rows-[1fr_2fr_1fr]">
      <div className="h-full row-start-2">
        <Canvas
          shadows
          camera={{ position: [5, 0, 5], fov: 35 }}
          className="h-full bg-transparent"
        >
          <ambientLight intensity={2 * Math.PI} color={"orange"} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.25}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
            color={"blue"}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <SBALogo position={[0, 0, 0]} rotatiton={[Math.PI / 2, 0, 0]} />
          <AccumulativeShadows
            position={[0, -0.5, 0]}
            temporal
            frames={100}
            alphaTest={0.75}
            opacity={0.9}
          >
            <RandomizedLight radius={6} position={[5, 5, -10]} bias={0.001} />
          </AccumulativeShadows>
          <CameraControls />
          <Environment preset="dawn" />
        </Canvas>
      </div>
    </div>
  );
};

export default LogoPage;
