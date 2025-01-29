"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";

const BasketballCourt = dynamic(
  () => import("../components/models/BasketballCourt"),
  // {
  //   ssr: false,
  // },
);

const Court = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BasketballCourt />
    </Suspense>
  );
};

export default Court;
