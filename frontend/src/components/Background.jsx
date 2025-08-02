import React from "react";
import DotGrid from "./DotGrid";

const Background = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10">
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#271E37"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      <div className="fixed inset-0 w-screen h-screen -z-20 bg-black/95"></div>
    </div>
  );
};

export default Background;
