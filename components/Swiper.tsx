//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
// import AOS from  'aos';
// import "aos/dist/aos.css";
// import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import styles from "./swiper.module.css";
import x from "@/public/images/x.jpg";
import y from "@/public/images/y.jpg";
import z from "@/public/images/z.jpg";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { sliders } from "@/constants";

interface HeroProps {
  title: string;
  subtitle: string;
  btnText?: string;
}
import { Button } from "@/components/ui/button";

const Hero = ({ title, subtitle, btnText }: HeroProps) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgroundData = [
    "https://ik.imagekit.io/vasl2zgr3d/4.png?updatedAt=1720750422223",
    "https://ik.imagekit.io/vasl2zgr3d/3.png?updatedAt=1720750422077",
    "https://ik.imagekit.io/vasl2zgr3d/2.png?updatedAt=1720750421781",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundData.length
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const heroStyle = {
    backgroundImage: `url(${backgroundData[backgroundIndex]})`,
  };

  return (
    <section className="flex h-[80vh] justify-center items-center flex-col">
      <div
        className="w-full h-screen bg-[#433A3A] text-white-1  bg-cover bg-center"
        style={heroStyle}
      >
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
          <div className="my-auto lg:ml-[50px] lg:text-left text-center text-white mx-auto w-[90%]">
            <h1 className="lg:text-[4rem] text-[2rem] font-[700]">
              Welcome <span className="text-blue-1">to</span> Speedy Freight
            </h1>
            <p
              className="lg:text-[1.4rem] text-[1rem] my-4 lg:w-[50%] w-[100%]"
              id="description"
            >
              Reliable, Fast, and Secure Transportation Services Tailored to
              Your Needs
            </p>
            <Button className="bg-blue-1">Book Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
