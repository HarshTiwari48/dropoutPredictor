"use client";

import Lottie from "lottie-react";
import graduationAnimation from "@/assets/gradCap.json";

export default function GraduationCap() {
  return (
    <div className="relative w-[320px] md:w-115 animate-float">

      <Lottie
        animationData={graduationAnimation}
        loop
        autoplay
      />
    </div>
  );
}
