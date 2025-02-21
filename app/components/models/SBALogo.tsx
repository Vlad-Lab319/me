"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";

function SBALogo(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // const logo = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.z -= delta / 4));
  // Return the view, these are regular Threejs elements expressed in JSX

  const { nodes, materials } = useGLTF("/SBA_logo_3D.glb");
  // materials.SBAlogo.roughness = 0.15;
  // materials.SBAlogo.metalness = 1;

  return (
    <>
      <group>
        <mesh
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          geometry={nodes.BézierCurve001.geometry}
          rotation={[Math.PI / 2, 0, -(2.25 * Math.PI)]}
          material={materials.SBAlogo}
        ></mesh>
      </group>
      {/* <Html >
      <div className='text-slate-600'>
        {`Z=${(ref.current?.rotation.z)}`}
      </div>
    </Html> */}
    </>
  );
}

export default SBALogo;
