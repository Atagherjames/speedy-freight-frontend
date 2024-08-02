"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useForm as formsPree } from "@formspree/react";
import { FieldValues } from "react-hook-form";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTruck,
  FaCalendarAlt,
  FaDollarSign,
  FaTimes,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Service data
const services: Record<string, Record<string, number>> = {
  "Labor Hire Services": {
    "Office Relocations": 165,
    "Warehouse Staffing": 150,
    "1-Man Teams": 165,
    "2-Man Teams": 235,
  },
  "Internal House Moves": {
    "Furniture Rearrangement": 165,
    "Room-to-Room Moves": 165,
    "1-Man Teams": 165,
    "2-Man Teams": 235,
  },
  "Removal Services": {
    "Residential Moves (1-man team)": 165,
    "Residential Moves (2-man team)": 235,
    "Commercial Moves (1-man team)": 165,
    "Commercial Moves (2-man team)": 235,
    "Piano Moving": 330,
    "Heavy Item Transport (over 150kg)": 200,
  },
  "Furniture Assembly": {
    "Assembly Services": 165,
    "Disassembly Services": 165,
    "1-Man Teams": 165,
    "2-Man Teams": 235,
  },
  "Waste and Junk Removals": {
    "Residential Waste Removal": 165,
    "Commercial Waste Removal": 165,
    "All Types of Waste Removal": 165,
    "1-Man Teams": 165,
    "2-Man Teams": 235,
  },
  "Couriering Services": {
    "General Courier Services": 165,
    "Marketplace Deliveries": 165,
    "Business to Customer Deliveries": 165,
    "Big and Bulky Items (1-man team)": 165,
    "Big and Bulky Items (2-man team)": 235,
  },
};

// Disposal fees
const disposalFees = [
  { maxWeight: 100, fee: 30 },
  { maxWeight: 500, fee: 106 },
  { maxWeight: Infinity, fee: 307.8 }, // Each tonne above 500 kg
];

// Zod schemas for validation
const step1Schema = z.object({
  service: z.string().min(1, "Service is required"),
  location: z.string().min(1, "Location is required"),
  dropOffLocation: z.string().min(1, "Drop-off Location is required"),
});

const step2Schema = z.object({
  stairs: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(0, "Number of stairs must be a positive number")
  ),
  weight: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0, "Weight must be a positive number")
  ),
});

const step3Schema = z.object({
  timeSlot: z.string().min(1, "Time slot is required"),
  subscription: z
    .string()
    .min(1, "Subscription is required")
    .refine(
      (value) => ["One-Time", "Daily", "Weekly", "Monthly"].includes(value),
      {
        message: "Invalid subscription selected",
      }
    ),
});

// TypeScript types inferred from Zod schemas
type Step1Schema = z.infer<typeof step1Schema>;
type Step2Schema = z.infer<typeof step2Schema>;
type Step3Schema = z.infer<typeof step3Schema>;

interface QuoteDetails {
  service: string;
  baseRate: number;
  distanceFee: number;
  stairsFee: number;
  locationName: any;
  dropOffLocationName: any;
  subscription: any;
  distance: any;
  peakHourFee: number;
  disposalFee: number;
  bookingFee: number;
  total: number;
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formState, handleFormspreeSubmit] = formsPree("xkgwoylv");
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const methodsStep1 = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
  });
  const methodsStep2 = useForm<Step2Schema>({
    resolver: zodResolver(step2Schema),
  });
  const methodsStep3 = useForm<Step3Schema>({
    resolver: zodResolver(step3Schema),
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  async function getGeolocation(
    address: string
  ): Promise<{ lat: number; lon: number }> {
    const apiKey = "0957cc585d0740ffb4190aec39c08655";
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lon: lng };
    } else {
      throw new Error("Unable to geocode address");
    }
  }

  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const calculateQuote = async () => {
    const service = methodsStep1.getValues("service");
    const location = methodsStep1.getValues("location");
    const dropOffLocation = methodsStep1.getValues("dropOffLocation");
    const stairs = methodsStep2.getValues("stairs");
    const timeSlot = methodsStep3.getValues("timeSlot");
    const weight = methodsStep2.getValues("weight");
    const subscription = methodsStep3.getValues("subscription");
    setLoading(true);

    try {
      const locationGeolocation = await getGeolocation(
        `${location}, Australia`
      );
      const dropOffLocationGeolocation = await getGeolocation(
        `${dropOffLocation}, Australia`
      );

      const distance = calculateDistance(
        locationGeolocation.lat,
        locationGeolocation.lon,
        dropOffLocationGeolocation.lat,
        dropOffLocationGeolocation.lon
      );

      const foundGroup = Object.keys(services).find(
        (group) => services[group][service]
      );

      const baseRate = foundGroup ? services[foundGroup]?.[service] || 0 : 0;

      const distanceFee = distance > 50 ? (distance - 50) * 1 : 0;
      const stairsFee = stairs ? stairs * 50 : 0;
      const peakHourFee = timeSlot === "10am-2pm" ? 50 : 0;

      let disposalFee = 0;
      for (const fee of disposalFees) {
        if (weight <= fee.maxWeight) {
          disposalFee = fee.fee;
          break;
        } else {
          disposalFee += fee.fee;
        }
      }

      const roughTotal =
        baseRate + distanceFee + stairsFee + peakHourFee + disposalFee + 55;
      const total = parseFloat(roughTotal.toFixed(2));
      setLoading(false);
      setQuote(total);
      setQuoteDetails({
        service,
        baseRate,
        distanceFee,
        stairsFee,
        distance,
        locationName: location,
        dropOffLocationName: dropOffLocation,
        subscription,
        peakHourFee,
        disposalFee,
        bookingFee: 55,
        total,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleGenerateQuote = () => {
    calculateQuote();
  };

  const handleCloseModal = () => {
    setQuoteDetails(null);
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to generate and download the PDF
  function downloadPDF(quoteDetails: QuoteDetails) {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set document title with style
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Quote Summary", 10, 20);

    // Add a line below the title for separation
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Define starting Y position for quote details
    let yPos = 35;

    // Function to add text in a clean and consistent manner
    const addText = (label: string, value: string, yPosition: number) => {
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(`${label}:`, 10, yPosition);
      doc.text(value, 60, yPosition);
    };

    // Add quote details with styled text
    addText("Service", quoteDetails.service, yPos);
    addText("From", quoteDetails.locationName, (yPos += 10));
    addText("To", quoteDetails.dropOffLocationName, (yPos += 10));
    addText("Distance", `${quoteDetails.distance.toFixed(2)} km`, (yPos += 10));
    addText("Base Rate", `$${quoteDetails.baseRate.toFixed(2)}`, (yPos += 10));
    addText(
      "Distance Fee",
      `$${quoteDetails.distanceFee.toFixed(2)}`,
      (yPos += 10)
    );
    addText(
      "Stairs Fee",
      `$${quoteDetails.stairsFee.toFixed(2)}`,
      (yPos += 10)
    );
    addText(
      "Peak Hour Fee",
      `$${quoteDetails.peakHourFee.toFixed(2)}`,
      (yPos += 10)
    );
    addText(
      "Disposal Fee",
      `$${quoteDetails.disposalFee.toFixed(2)}`,
      (yPos += 10)
    );
    addText(
      "Booking Fee",
      `$${quoteDetails.bookingFee.toFixed(2)}`,
      (yPos += 10)
    );
    addText("Subscription", `${quoteDetails.subscription}`, (yPos += 10));

    // Highlight the total with emphasis
    yPos += 20; // Add some space before the total
    doc.setFontSize(14);
    doc.setTextColor(0, 150, 0);
    doc.text(`Total: $${quoteDetails.total.toFixed(2)}`, 10, yPos);

    // Save the generated PDF
    doc.save("quote.pdf");
  }
  const handleSubmit = async (quoteDetails: QuoteDetails) => {
    try {
      setLoading(true);

      const formValues: FieldValues = {
        serviceType: quoteDetails?.service,
        baseRate: quoteDetails?.baseRate,
        location: quoteDetails?.locationName,
        pickUpLocation: quoteDetails?.dropOffLocationName,
        distanceFee: quoteDetails?.distanceFee,
        stairsFee: quoteDetails?.stairsFee,
        peakHourFee: quoteDetails?.peakHourFee,
        disposalFee: quoteDetails?.disposalFee,
        bookingFee: quoteDetails?.bookingFee,
        subscription: quoteDetails?.subscription,
        total: quoteDetails?.total,
      };

      // Submit the form to Formspree
      await handleFormspreeSubmit(formValues);
      if (formState.succeeded) {
        toast.success("🦄 Order Placed, Successfully!", {
          position: "top-right",
          autoClose: 5000,
        });

        // Generate and download the PDF
        downloadPDF(quoteDetails);

        // Reset form if needed
        methodsStep1.reset();
        methodsStep2.reset();
        methodsStep3.reset();
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
    <div className="h-[1200px] bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex md:w-4/5 h-full">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100 p-10">
          <FaTruck className="text-9xl text-gray-300" />
        </div>

        <div className="w-full p-8 lg:w-1/2 md:p-10 md:flex flex justify-center items-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                key="step1"
              >
                <FormProvider {...methodsStep1}>
                  <form onSubmit={methodsStep1.handleSubmit(handleNextStep)}>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaDollarSign className="text-xl mr-2" />
                        Select Service
                      </label>
                      <Controller
                        name="service"
                        control={methodsStep1.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          >
                            <option value="">Select a Service</option>
                            {Object.keys(services).map((group) => (
                              <optgroup label={group} key={group}>
                                {Object.keys(services[group]).map((service) => (
                                  <option key={service} value={service}>
                                    {service} - ${services[group][service]}/hour
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        )}
                      />
                      {methodsStep1.formState.errors.service && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep1.formState.errors.service.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaMapMarkerAlt className="text-xl mr-2" />
                        Location
                      </label>
                      <Controller
                        name="location"
                        control={methodsStep1.control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter Location"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        )}
                      />
                      {methodsStep1.formState.errors.location && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep1.formState.errors.location.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaMapMarkerAlt className="text-xl mr-2" />
                        Pick Up Location
                      </label>
                      <Controller
                        name="dropOffLocation"
                        control={methodsStep1.control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter Pick Up Location"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        )}
                      />
                      {methodsStep1.formState.errors.dropOffLocation && (
                        <p className="text-red-500 text-sm mt-1">
                          {
                            methodsStep1.formState.errors.dropOffLocation
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-100 text-blue-900 font-bold shadow-md rounded-lg border border-blue-200 hover:bg-blue-200 text-lg px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Next
                    </Button>
                  </form>
                </FormProvider>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                key="step2"
              >
                <FormProvider {...methodsStep2}>
                  <form
                    className="w-[inherit] md:w-[500px]"
                    onSubmit={methodsStep2.handleSubmit(handleNextStep)}
                  >
                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaBuilding className="text-xl mr-2" />
                        Number of Stairs
                      </label>
                      <Controller
                        name="stairs"
                        control={methodsStep2.control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        )}
                      />
                      {methodsStep2.formState.errors.stairs && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep2.formState.errors.stairs.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaTruck className="text-xl mr-2" />
                        Item Weight (in kg)
                      </label>
                      <Controller
                        name="weight"
                        control={methodsStep2.control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                        )}
                      />
                      {methodsStep2.formState.errors.weight && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep2.formState.errors.weight.message}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={handlePreviousStep}
                        className="bg-green-100 text-green-900 font-bold shadow-md rounded-lg border border-green-200 hover:bg-green-200 text-lg px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        className="bg-blue-100 text-blue-900 font-bold shadow-md rounded-lg border border-blue-200 hover:bg-blue-200 text-lg px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                key="step3"
              >
                <FormProvider {...methodsStep3}>
                  <form
                    className="w-[inherit] md:w-[500px]"
                    onSubmit={methodsStep3.handleSubmit(handleGenerateQuote)}
                  >
                    <div className="mb-6">
                      <label className="block text-gray-700 text-lg font-semibold mb-2 flex items-center">
                        <FaCalendarAlt className="text-xl mr-2" />
                        Delivery Time Slot
                      </label>
                      <Controller
                        name="timeSlot"
                        control={methodsStep3.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg"
                          >
                            <option value="">Select a Time Slot</option>
                            <option value="7-10am">7-10am</option>
                            <option value="10am-2pm">10am-2pm</option>
                            <option value="2-6pm">2-6pm</option>
                          </select>
                        )}
                      />
                      {methodsStep3.formState.errors.timeSlot && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep3.formState.errors.timeSlot.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center mb-6">
                      <h2 className="text-2xl font-bold mb-4">Subscription</h2>
                      <div className="flex flex-wrap justify-center gap-4">
                        {["One-Time", "Daily", "Weekly", "Monthly"].map(
                          (option) => (
                            <div
                              key={option}
                              onClick={() =>
                                methodsStep3.setValue("subscription", option, {
                                  shouldValidate: true,
                                })
                              }
                              className={`bg-white border border-gray-200 rounded-lg shadow-md p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ease-in-out ${
                                methodsStep3.getValues("subscription") ===
                                option
                                  ? "bg-gray-100 border-gray-300"
                                  : ""
                              } ${
                                methodsStep3.getValues("subscription") &&
                                methodsStep3.getValues("subscription") !==
                                  option
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <h3 className="text-lg font-semibold">
                                {option}
                              </h3>
                            </div>
                          )
                        )}
                      </div>
                      {methodsStep3.formState.errors.subscription && (
                        <p className="text-red-500 text-sm mt-1">
                          {methodsStep3.formState.errors.subscription.message}
                        </p>
                      )}
                    </div>

                    {/* Existing form fields and buttons */}

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={handlePreviousStep}
                        className="bg-green-100 text-green-900 font-bold shadow-md rounded-lg border border-green-200 hover:bg-green-200 text-lg px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        className="bg-white text-gray-900 font-bold shadow-md rounded-lg border border-gray-300 hover:bg-gray-100 text-lg px-5 py-2.5 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Generate Quote{" "}
                        {loading && (
                          <span className="ml-2">
                            <Circles
                              height="20"
                              width="20"
                              color="blue"
                              ariaLabel="circles-loading"
                            />
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </motion.div>
            )}
          </AnimatePresence>

          {quoteDetails && (
            <div className="absolute left-0 top-0 inset-0 bg-white-50 bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-[999]">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                ref={modalRef}
                className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full relative"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <FaTimes className="text-xl" />
                </button>
                <h2 className="text-2xl font-bold mb-4">Quote Summary</h2>
                <div className="mb-4">
                  <p className="text-lg font-medium">Service:</p>
                  <p className="text-lg">{quoteDetails.service}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Location:</p>
                  <p className="text-lg">{quoteDetails.locationName}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Pick Up Location:</p>
                  <p className="text-lg">{quoteDetails.dropOffLocationName}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Distance:</p>
                  <p className="text-lg">
                    {quoteDetails.distance.toFixed(2)} km
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Base Rate:</p>
                  <p className="text-lg">${quoteDetails.baseRate}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Distance Fee:</p>
                  <p className="text-lg">${quoteDetails.distanceFee}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Stairs Fee:</p>
                  <p className="text-lg">${quoteDetails.stairsFee}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Peak Hour Fee:</p>
                  <p className="text-lg">${quoteDetails.peakHourFee}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Disposal Fee:</p>
                  <p className="text-lg">${quoteDetails.disposalFee}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Booking Fee:</p>
                  <p className="text-lg">${quoteDetails.bookingFee}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium">Subscription:</p>
                  <p className="text-lg">{quoteDetails.subscription}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Total:</p>
                  <p className="text-lg text-green-600">
                    ${quoteDetails.total}
                  </p>
                </div>
                <Button
                  onClick={() => handleSubmit(quoteDetails)}
                  className="mt-4 w-full bg-white text-gray-900 font-semibold shadow-lg rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                >
                  Submit/Download PDF
                  {loading && (
                    <span className="ml-2">
                      <Circles
                        height="20"
                        width="20"
                        color="blue"
                        ariaLabel="circles-loading"
                      />
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
