//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url("https://ik.imagekit.io/9ioq0auj1/red%20and%20gray%20fire%20truck%20par....jpg?updatedAt=1721602330028")`,
  };

  return (
    <section className="flex h-[80vh] juastify-center items-center flex-col">
      <div
        className="w-full h-screen bg-[#433A3A] text-white-1  bg-cover bg-center"
        style={heroStyle}
      >
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
          <div className="my-auto lg:ml-[50px] lg:text-left text-center text-white mx-auto w-[90%]">
            <h1 className="lg:text-[4rem] text-[2rem] font-[700]">Hi there</h1>
            <p
              className="lg:text-[1.4rem] text-[1rem] my-4 lg:w-[50%] w-[100%]"
              id="description"
            >
              We would love to hear from you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
