//@ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

import { sliders } from '@/constants';

interface HeroProps {
  title: string;
  subtitle: string;
  btnText?: string;
}
import { Button } from '@/components/ui/button';

const Hero = ({ title, subtitle, btnText }: HeroProps) => {
  const heroStyle = {
    backgroundImage: `url(/images/z.jpg)`,
  };

  return (
    <>
      <section className='flex h-[80vh] justify-center items-center flex-col'>
        <div
          className='w-full h-screen bg-[#433A3A] text-white-1  bg-cover bg-center'
          style={heroStyle}
        >
          <div className='w-full h-full flex  justify-center items-center backdrop-brightness-50'>
            <div className='my-auto lg:ml-[50px] lg:text-left text-center text-white mx-auto w-[90%]'>
              <h1 className='lg:text-[1.4rem] text-[2rem] font-[700]'>
                {title}
              </h1>
              <p
                className='lg:text-[1.4rem] text-[1rem] my-4 lg:w-[50%] w-[100%]'
                id='description'
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='my-8'>
        <h1 className='text-center mt-5 font-bold'>
          Frequently Asked Questions (FAQ)
        </h1>

        <Accordion
          type='single'
          collapsible
          className='w-[90%] my-8  mx-auto md:w-[70%]'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>Labor Hire Services</AccordionTrigger>
            <AccordionContent>
              • Office Relocations: Providing skilled labor to assist with
              moving office furniture and equipment within a commercial
              building.
              <br />
              • Warehouse Staffing: Temporary labor for warehouse operations,
              including packing, loading, and unloading goods.
              <br />
              • 1-Man Teams: Single hauler available for smaller tasks or less
              intensive jobs.
              <br />
              • 2-Man Teams: Two haulers for larger or more complex tasks
              requiring additional manpower.
              <br />• Flexible Scheduling: Available on a daily, weekly, or
              monthly basis to suit your business needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger> Internal House Moves</AccordionTrigger>
            <AccordionContent>
              • Furniture Rearrangement: Helping customers move heavy furniture
              within their homes for renovations or redecoration.
              <br />
              • Room-to-Room Moves: Assisting with shifting items between rooms
              in a residential property.
              <br />
              • 1-Man Teams: Ideal for smaller internal moves and
              rearrangements.
              <br />• 2-Man Teams: For more extensive moves within the home,
              ensuring efficiency and safety.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger> Removal Services</AccordionTrigger>
            <AccordionContent>
              • Residential Moves: Full-service moving for individuals
              relocating to a new home, including packing, loading,
              transportation, and unpacking.
              <br />
              • Commercial Moves: Relocating businesses, including office
              furniture, equipment, and files.
              <br />
              • Piano Moving: Specialized service for moving pianos, ensuring
              safe handling and transport.
              <br />
              • Heavy Item Transport: Moving items over 150kg, such as safes,
              large appliances, and machinery, with premium insurance coverage.
              <br />
              • 1-Man Teams: Suitable for small moves or fewer items.
              <br />• 2-Man Teams: Recommended for larger moves or when handling
              heavy or bulky items.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger> Furniture Assembly</AccordionTrigger>
            <AccordionContent>
              • Assembly Services: Professional assembly of all types of
              furniture for homes or offices.
              <br />
              • Disassembly Services: Taking apart furniture for moves or
              storage.
              <br />
              • 1-Man Teams: Ideal for straightforward assembly tasks.
              <br />• 2-Man Teams: For larger or more complex assembly projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-5'>
            <AccordionTrigger> Waste and Junk Removals</AccordionTrigger>
            <AccordionContent>
              • Residential Waste Removal: Clearing out unwanted items,
              household waste, and junk from homes.
              <br />
              • Commercial Waste Removal: Efficiently handling office and
              industrial waste, including old furniture, electronics, and
              general junk.
              <br />
              • All Types of Waste: Capable of removing various types of waste,
              including construction debris, garden waste, and more.
              <br />
              • 1-Man Teams: Effective for smaller waste removal jobs.
              <br />• 2-Man Teams: Best for larger cleanouts or when handling
              heavy and bulky items.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-6'>
            <AccordionTrigger> Couriering Services</AccordionTrigger>
            <AccordionContent>
              • General Courier Services: Delivering a wide range of items, from
              small parcels to large, bulky goods.
              <br />
              • Marketplace Deliveries: Handling deliveries for items bought and
              sold on online marketplaces.
              <br />
              • Business to Customer Deliveries: Direct delivery of goods from
              businesses to their customers, ensuring timely and safe transport.
              <br />
              • Big and Bulky Items: Specialized service for delivering large
              items such as furniture, appliances, and equipment.
              <br />
              • 1-Man Teams: Suitable for smaller courier jobs and less bulky
              items.
              <br />• 2-Man Teams: Ideal for handling larger and heavier items,
              ensuring they are safely and efficiently delivered.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
};

export default Hero;
