import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full h-screen relative">
      <Image
        src="/Background.jpg"
        alt="Hero"
        width={1000}
        height={800}
        className="w-full h-screen object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center ml-96">
        <div className="bg-black/60 px-12 py-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            PEGATRON AUSTRALIA
          </h1>
          <h4 className="text-white text-2xl mt-10">
            We are dedicated to introducing innovative design thinking into
            every detail of production.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
