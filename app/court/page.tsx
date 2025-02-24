// "use client";
import React, { Suspense } from "react";
// import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import BasketballCourt from "../components/models/BasketballCourt";

// const BasketballCourt = dynamic(
//   () => import("../components/models/BasketballCourt"),
//   // {
//   //   ssr: false,
//   // },
// );

const Court = () => {
  return <BasketballCourt />;
};

export default Court;
