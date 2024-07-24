import AboutHero from "@/components/AboutHero";
import Image from "next/image";
import { BiBulb } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import { BiChat } from "react-icons/bi";

type CardProps = React.ComponentProps<typeof Card>;
const about = ({ className, ...props }: CardProps) => {
  return (
    <div>
      <AboutHero
        title="Your trusted partner for eco-friendly logistics solutions"
        subtitle="across Australia"
      />
      <div className="flex  w-[70%] justify-between ml-auto mr-auto  align-center gap-10 mt-20">
        <div className="w-[800px] ">
          <p className="text-2xl">
            Speedy Freight Solutions, an Australian-owned company, began its
            journey with a single van and has grown into a robust fleet of
            extra-large vans and trucks. Rooted in family values and commitment
            to excellence, we offer comprehensive moving and logistics services
            tailored to meet diverse client needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className=" flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <RiLightbulbFlashLine className="text-blue-1 text-6xl" />
            <div className="flex-1 space-y-1">
              <p className=" text-xl text-muted-foreground">Proven Expertise</p>
            </div>
          </div>

          <div className=" flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <FaRegHandshake className="text-blue-1 text-6xl" />
            <div className="flex-1 space-y-1">
              <p className=" text-xl text-muted-foreground">
                Trusted Partnership
              </p>
            </div>
          </div>

          <div className=" flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <BsPatchCheck className="text-blue-1 text-6xl" />

            <div className="flex-1 space-y-1">
              <p className=" text-xl text-muted-foreground">Reliability</p>
            </div>
          </div>
        </div>
      </div>

      <section className="my-32 grid place-items-center ">
        <h1 className="text-3xl uppercase font-normal">
          Our Unique Selling Point
        </h1>

        <Card className="w-[70%] my-8 py-10">
          <CardContent className=" grid grid-cols-4 place-items-center gap-8">
            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center  w-[200px]">
              <span>
                <BiChat className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center ">Trained Professionals</p>
              <p className=" text-center ">Contact our Sales rep</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex h-[400px] justify-center items-center ">
        <div
          className="w-full grid place-items-center h-[100%] bg-[#433A3A] text-white-1  bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/z.jpg)`,
          }}
        >
          <p className="text-3xl text-center">
            Fast, reliable delivery with broad reach and real-time tracking,
            tailored to meet your needs.
          </p>
        </div>
      </section>

      <section className="bg-slate-100">
        <div>
          <div>
            <h1>Message from the management</h1>
            <p>
              Message from the management Welcome to Speedy Freight, where we
              revolutionize premium delivery services for leading brands with
              reliability and efficiency. Our versatile fleet ensures timely and
              safe deliveries of bulky items, offering flexible options like
              same-day and emergency services. We pride ourselves on
              transparency with real-time GPS tracking and competitive rates.
              Thank you for choosing Speedy Freight, where excellence is our
              standard and your satisfaction is our priority.
            </p>
            <h2>Thomas Dennis</h2>
            <p> Director, Speedy Freight</p>
          </div>

          <div>
            <Image
              src={"/images/z.jpg"}
              alt="Thomas Dennis"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default about;
