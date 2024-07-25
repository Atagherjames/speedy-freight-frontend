"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import ContactHero from "@/components/ContactHero";
import { BiChat, BiHome, BiPhoneIncoming } from "react-icons/bi";

const contact = () => {
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),

    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),

    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(4, {
      message: "Phone number is required",
    }),

    message: z
      .string()
      .min(10, {
        message: "Message must be at least 10 characters.",
      })
      .max(400, {
        message: "message must not be longer than 400 characters.",
      }),

    accountType: z.union([
      z.enum(["individual", "organization"], {
        required_error: "Please select type of business",
      }),
      z.literal(""),
    ]),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      accountType: undefined,
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
        <section className="mb-12 flex justify-center gap-8 md:gap-20 flex-wrap align-center">
          {/* CARD ONE */}
          <div className="cursor-pointer border-2 border-blue-1 rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiChat className="text-4xl md:text-6xl text-blue-1" />
            </span>

            <p className="text-2xl text-center mt-10">Contact our Sales rep</p>
          </div>

          {/* CARD TWO */}
          <div className="cursor-pointer border-2  border-[#EC9A16] rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiHome className="text-4xl md:text-6xl text-[#EC9A16]" />
            </span>

            <p className="text-2xl text-center mt-10">Visit us</p>
          </div>

          {/* CARD THREE */}

          <div className="cursor-pointer border-2 border-[#3F9A60] rounded p-2 h-[250px] grid place-items-center  w-[250px]">
            <span>
              <BiPhoneIncoming className="text-4xl md:text-6xl text-[#3F9A60]" />
            </span>

            <p className="text-2xl text-center -mt-10">Call Us</p>
          </div>
        </section>
      </div>

      {/* FORM */}
      <section className="grid place-items-center mt-32 mb-10 md:mb-20 ">
        <h1 className="text-xl uppercase md:text-2xl">Drop a message</h1>
      </section>
      <section className="grid place-items-center mb-28">
        <div className="px-3 py-5 border-2 rounded-md border-blue-1 w-[90%]  md:w-[900px] md:px-8 md:py-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full ">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry="AU"
                          className="border-2 p-2 rounded  border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type of  business" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white-1">
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="organization">
                          Organization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="py-3 bg-blue-1 text-white-1 w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default contact;
