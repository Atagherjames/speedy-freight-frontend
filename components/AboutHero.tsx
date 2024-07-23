//@ts-nocheck
"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import styles from "./swiper.module.css";
import x from "@/public/images/x.jpg";
import y from "@/public/images/y.jpg";
import z from "@/public/images/z.jpg";

import { sliders } from "@/constants";

interface HeroProps {
  title: string;
  subtitle: string;
  btnText?: string;
}
import { Button } from "@/components/ui/button";

const Hero = ({ title, subtitle, btnText }: HeroProps) => {
  const heroStyle = {
    backgroundImage: `url(${x})`,
  };

  return (
    <section className="flex h-[80vh] justify-center items-center flex-col">
      <div
        className="w-full h-screen bg-[#433A3A] text-white-1  bg-cover bg-center"
        style={heroStyle}
      >
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
          <div className="my-auto lg:ml-[50px] lg:text-left text-center text-white mx-auto w-[90%]">
            <h1 className="lg:text-[1.4rem] text-[2rem] font-[700]">{title}</h1>
            <p
              className="lg:text-[1.4rem] text-[1rem] my-4 lg:w-[50%] w-[100%]"
              id="description"
            >
              {subtitle}
            </p>
            <Button className="bg-blue-1">Book Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
