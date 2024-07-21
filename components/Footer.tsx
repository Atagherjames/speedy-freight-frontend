import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { TiLocation } from 'react-icons/ti';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='bg-white-1 p-6 w-full h-auto mt-20'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-bold uppercase text-2xl'>contact us</h2>
        <p className='text-normal text-center mt-4 mb-6'>
          Have any question or feedback, feel free to reach out to us. <br /> We
          are always available to help.
        </p>
      </div>

      <div className='flex justify-center gap-5'>
        <div className='grid place-items-center text-center'>
          <BiPhoneCall className='text-3xl mb-5 md:text-4xl' />
          <b>0480004037</b>
        </div>
        <div className='grid place-items-center text-center'>
          <TiLocation className='text-3xl mb-5 md:text-4xl' />
          <b>138 Juliette Street, Greenslopes</b>
        </div>
      </div>

      <div className='text-center py-8'>
        <p>&copy; Speedy Freight {date}, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
