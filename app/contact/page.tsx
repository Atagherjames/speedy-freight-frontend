"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ContactHero from "@/components/ContactHero";

import { BiChat, BiHome, BiPhoneIncoming } from "react-icons/bi";

const contact = () => {
  // const formSchema = z.object({
  //   username: z.string().min(2, {
  //     message: "Username must be at least 2 characters.",
  //   }),
  // });

  return (
    <>
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
        <section className="mb-12 flex justify-center gap-5 flex-wrap align-center">
          {/* CARD ONE */}
          <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiChat className="text-4xl md:text-6xl text-blue-1" />
            </span>

            <p className="text-2xl text-center -mt-10">Contact our Sales rep</p>
          </div>

          {/* CARD TWO */}
          <div className="cursor-pointer border-2  border-[#EC9A16] rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiHome className="text-4xl md:text-6xl text-[#EC9A16]" />
            </span>

            <p className="text-2xl text-center -mt-10">Our office</p>
          </div>

          {/* CARD THREE */}

          <div className="cursor-pointer border-2 border-[#3F9A60] rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiPhoneIncoming className="text-4xl md:text-6xl text-[#3F9A60]" />
            </span>

            <p className="text-2xl text-center -mt-10">Contact our Sales rep</p>
          </div>
        </section>
      </div>
      {/* FORM */}
      {/* <Form {...form}>
        <form onSubmit={() => {}} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
    </>
  );
};

export default contact;
