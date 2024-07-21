import Hero from "@/components/Swiper";
import ContactHero from "@/components/ContactHero";

const contact = () => {
  return (
    <div>
      <ContactHero />

      {/* ABOUT SPEEDY FREIGHT */}
      <section className="my-16">
        <div className="flex flex-col items-center justify-center w-full">
          <h5 className="font-bold uppercase text-2xl md:4xl mb-6 w-full  text-center py-3">
            GET IN TOUCH
          </h5>
          <h1 className="font-bold  text-xl md:2xl">
            we will respond as fast as we can
          </h1>
        </div>
      </section>

      {/* contact cards */}
      <section className="my-16"></section>
    </div>
  );
};

export default contact;
