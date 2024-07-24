import AboutHero from "@/components/AboutHero";
import Image from "next/image";
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
import { GoPeople, GoBroadcast } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { RiShakeHandsLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";

const about: React.FC = () => {
  return (
    <div>
      <AboutHero
        title="Your trusted partner for eco-friendly logistics solutions"
        subtitle="across Australia"
      />
      <div className="flex w-[70%] justify-between ml-auto mr-auto align-center gap-10 mt-20">
        <div className="w-[800px]">
          <p className="text-2xl">
            Speedy Freight Solutions, an Australian-owned company, began its
            journey with a single van and has grown into a robust fleet of
            extra-large vans and trucks. Rooted in family values and commitment
            to excellence, we offer comprehensive moving and logistics services
            tailored to meet diverse client needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <RiLightbulbFlashLine className="text-blue-1 text-6xl" />
            <div className="flex-1 space-y-1">
              <p className="text-xl text-muted-foreground">Proven Expertise</p>
            </div>
          </div>

          <div className="flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <FaRegHandshake className="text-blue-1 text-6xl" />
            <div className="flex-1 space-y-1">
              <p className="text-xl text-muted-foreground">
                Trusted Partnership
              </p>
            </div>
          </div>

          <div className="flex items-center w-[300px] space-x-4 rounded-md border z-40 p-4 bg-white-1">
            <BsPatchCheck className="text-blue-1 text-6xl" />
            <div className="flex-1 space-y-1">
              <p className="text-xl text-muted-foreground">Reliability</p>
            </div>
          </div>
        </div>
      </div>

      <section className="my-32 grid place-items-center">
        <h1 className="text-3xl uppercase font-normal">
          Our Unique Selling Point
        </h1>

        <Card className="w-[70%] my-8 py-10">
          <CardContent className="grid grid-cols-3 place-items-center gap-8">
            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <GoPeople className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Trained Professionals</p>
              <p className="text-center">
                Skilled drivers and logistics experts delivering with precision
              </p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <GoBroadcast className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Broad Reach</p>
              <p className="text-center">
                Servicing a wide geographic region, including remote areas
              </p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <TbTruckDelivery className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Speedy Delivery</p>
              <p className="text-center">Fast shipping times</p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <RiShakeHandsLine className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Partnerships</p>
              <p className="text-center">
                Collaborations with other businesses for enhanced services.
              </p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <RiMoneyDollarCircleFill className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Cost Efficiency</p>
              <p className="text-center">
                Competitive pricing and various cost-saving options.
              </p>
            </div>

            <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[200px] grid place-items-center w-[200px]">
              <span>
                <MdOutlineSecurity className="text-2xl md:text-6xl text-blue-1" />
              </span>
              <p className="font-bold text-center">Secure Handling</p>
              <p className="text-center">
                Ensuring packages are handled safely and securely.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex h-[400px] justify-center items-center">
        <div
          className="w-full grid place-items-center h-[100%] bg-[#433A3A] text-white-1 bg-cover bg-center"
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

      <section className="grid place-items-center bg-slate-100 mt-20 py-10">
        <div className="flex w-[70%] gap-10">
          <div className="w-[800px]">
            <h1 className="text-2xl font-bold pb-6 uppercase">
              Message from the management
            </h1>
            <p>
               Welcome to Speedy Freight, where we
              revolutionize premium delivery services for leading brands with
              reliability and efficiency. Our versatile fleet ensures timely and
              safe deliveries of bulky items, offering flexible options like
              same-day and emergency services. We pride ourselves on
              transparency with real-time GPS tracking and competitive rates.
              Thank you for choosing Speedy Freight, where excellence is our
              standard and your satisfaction is our priority.
            </p>
            <h2 className="text-xl font-bold pt-3">Thomas Dennis</h2>
            <p> Director, Speedy Freight</p>
          </div>

          <div>
            <Image
              src={"/images/thomas.png"}
              alt="Thomas Dennis"
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default about;
