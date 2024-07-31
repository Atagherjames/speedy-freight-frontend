"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm as formsPree } from "@formspree/react";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.min.css";

// Define the form schema using zod
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  pickUpLocation: z
    .string()
    .min(2, { message: "Pick up location must be at least 2 characters." }),
  deliveryAddress: z
    .string()
    .min(2, { message: "Delivery address must be at least 2 characters." }),
  typeOfItem: z.string().min(2, { message: "Type of item must be specified." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(4, { message: "Phone number is required" }),
  bookingDate: z.string().optional(),
  time: z.string().optional(),
  items: z.string().optional(),
  type: z.enum(["personal", "business"], {
    required_error: "Please select a type",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(400, { message: "Message must not be longer than 400 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [formState, handleFormspreeSubmit] = formsPree("xkgwoylv");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      pickUpLocation: "",
      deliveryAddress: "",
      typeOfItem: "",
      email: "",
      phoneNumber: "",
      bookingDate: "",
      time: "",
      items: "",
      type: "personal",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await handleFormspreeSubmit(values);
      if (formState.succeeded) {
        toast.success("🦄 Wow, message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        form.reset();
      }
    } catch (err) {
      toast.error("🚨 Error sending message, please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="grid place-items-center my-auto mb-5">
        <h1 className="text-xl uppercase md:text-2xl mt-20">Get a quote</h1>
      </section>
      <section className="grid place-items-center mb-28">
        <div className="px-3 py-5 border-2 rounded-md border-blue-1 w-[90%] md:w-[900px] md:px-8 md:py-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pick Up Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Pick up location" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Delivery address" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typeOfItem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Type of item" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Items</FormLabel>
                      <FormControl>
                        <Input placeholder="Number of items" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Booking date"
                          {...field}
                        />
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of business</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type of business" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white-1">
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
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
                          className="border-2 p-2 rounded border-gray-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="py-3 bg-blue-1 flex gap-4 text-white-1 w-full"
              >
                <span>Submit</span>
                {loading && (
                  <Circles
                    height="25"
                    width="25"
                    color="green"
                    ariaLabel="circles-loading"
                  />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Page;
