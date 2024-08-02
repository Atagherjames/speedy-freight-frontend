import Hero from "@/components/Swiper";
import Image from "next/image";
import x from "../public/icons/feature-1.svg";
import y from "../public/icons/feature-2.svg";
import z from "../public/icons/feature-3.svg";
import { Button } from "@/components/ui/button";
import { TbRouteSquare } from "react-icons/tb";
import { FaHeadphonesAlt } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero title="Hello" subtitle="Hello, this is a subtitle" />

      {/* ABOUT SPEEDY FREIGHT */}
      <section className="my-16">
        <div className="flex flex-col items-center justify-center w-full">
          <h5 className="text-blue-1 font-bold uppercase">About</h5>
          <h1 className="font-bold uppercase text-2xl md:4xl mb-6 w-full border-b-2 border-[#ccc] text-center py-3">
            Speedy Freight
          </h1>
        </div>

        <div className="w-[95%] lg:w-[80%] text-left md:text-justify md:leading-10 mx-auto leading-7 text-lg md:text-xl">
          <p>
            Speedy Freight is a leading transportation and delivery company
            based in Australia, renowned for its reliable and efficient
            logistics solutions. With a commitment to speed, safety, and
            customer satisfaction, utilizing a modern fleet and advanced
            tracking technologies, Speedy Freight ensures timely and secure
            deliveries across the nation. Our experienced team of professionals
            is dedicated to providing exceptional service, ensuring that every
            package arrives on time, every time. Whether you’re shipping locally
            or across the country, trust Speedy Freight to deliver with
            precision and care.
          </p>
        </div>
      </section>

      {/* UNIQUE FEATURES */}
      <main className="w-full py-6">
        <div className="w-[95%] lg:w-[80%] mx-auto flex  flex-col-reverse gap-6 sm:flex-row justify-between items-center mb-3">
          <div className="w-full text-center sm:text-left sm:w-2/3">
            <h2 className="font-bold text-2xl mb-3 md:text-4xl text-blue-1 uppercase">
              Rapid Same day Delivery
            </h2>
            <p>
              Speedy Freight excels in providing rapid same-day delivery
              services, ensuring that urgent packages reach their destinations
              without delay.
            </p>
          </div>

          <div className=" justify-end">
            <Image
              src={y}
              alt="zzz"
              width={100}
              height={100}
              className=" w-52 h-52 md:h-96 md:w-96"
            />
          </div>
        </div>
        {/* FEATURE TWO */}
        <div className="w-[95%] lg:w-[80%] mx-auto flex flex-col-reverse sm:flex-row-reverse gap-6 justify-between items-center mb-3">
          <div className="w-full text-center sm:text-left sm:w-2/3">
            <h2 className="font-bold text-2xl md:text-4xl mb-3 text-blue-1 uppercase">
              Nationwide Coverage
            </h2>
            <p>
              With an extensive network across Australia, Speedy Freight
              guarantees comprehensive coverage. No matter how remote, Speedy
              Freight can deliver efficiently and reliably.
            </p>
          </div>

          <div className=" justify-end">
            <Image
              src={x}
              alt="zzz"
              width={100}
              height={100}
              className="w-52 h-52 md:h-96 md:w-96"
            />
          </div>
        </div>

        {/* FEATURE THREE */}

        <div className="w-[95%] lg:w-[80%] mx-auto gap-6 flex flex-col-reverse sm:flex-row justify-between items-center">
          <div className="w-full text-center sm:text-left sm:w-2/3">
            <h2 className="font-bold text-2xl md:text-4xl text-blue-1 mb-3 uppercase">
              Advanced tracking technology
            </h2>
            <p>
              Utilizing state-of-the-art tracking systems, Speedy Freight offers
              real-time updates on shipment status. Customers can track
              deliveries from dispatch to arrival, ensuring transparency.
            </p>
          </div>

          <div className=" justify-end">
            <Image
              src={z}
              alt="zzz"
              width={100}
              height={100}
              className="w-52 h-52 md:h-96 md:w-96"
            />
          </div>
        </div>
      </main>

      {/* HERO BACKGROUND */}
      <section
        id="home-hero"
        className="flex flex-col text-center  justify-center items-center px-2 w-full h-[500px]  mt-6"
      >
        <div></div>

        <div>
          <p className="mb-4 text-white-1 font-bold text-2xl md:text-4xl">
            Reliable, fast, and nationwide delivery. Trust Speedy Freight for
            all your logistics needs.
          </p>
          <Link href="/bookings">
            <Button className="bg-blue-1 text-white-1 cursor-pointer text-2xl px-4 py-4 ">
              Book us
            </Button>
          </Link>
        </div>
      </section>

      {/* EASE RELIEF */}
      <section className="w-full py-36 min-h-48 h-auto bg-blue-1 ">
        <h1 className="text-center text-3xl text-white-1 mb-12 font-bold">
          EASE YOUR RELIEF
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 place-items-center">
          <div className="bg-white-2 rounded-md w-[300px] aspect-square flex flex-col items-center justify-center">
            <IoRocketSharp className="text-6xl mb-6 md:text-8xl text-blue-1" />
            <p className="font-bold text-2xl md:text-3xl px-2 text-center">
              Active 24/7
            </p>
          </div>
          <div className="bg-white-2 rounded-md w-[300px] aspect-square flex flex-col items-center justify-center">
            <FaHeadphonesAlt className="text-6xl mb-6 md:text-8xl text-blue-1" />
            <p className="font-bold text-2xl md:text-3xl px-2 text-center">
              Good customer care
            </p>
          </div>
          <div className="bg-white-2 rounded-md w-[300px] aspect-square flex flex-col items-center justify-center">
            <TbRouteSquare className="text-6xl mb-6 md:text-8xl text-blue-1" />
            <p className="font-bold text-2xl md:text-3xl px-2 text-center">
              Timely delivery
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
