import { BiPhoneCall } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";
import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-white p-6 w-full h-auto mt-20">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold uppercase text-2xl">Contact Us</h2>
        <p className="text-normal text-center mt-4 mb-6">
          Have any questions or feedback? Feel free to reach out to us. <br />
          We are always available to help.
        </p>
      </div>

      <div className="flex justify-center gap-5">
        <div className="grid place-items-center text-center">
          <BiPhoneCall className="text-3xl mb-5 md:text-4xl" />
          <b>0480004037</b>
        </div>
        <div className="grid place-items-center text-center">
          <TiLocation className="text-3xl mb-5 md:text-4xl" />
          <b>138 Juliette Street, Greenslopes</b>
        </div>
      </div>

      <div className="flex justify-center gap-5 mt-8">
        <Link
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl" />
        </Link>
        <Link
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-3xl" />
        </Link>

        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-3xl" />
        </Link>
      </div>

      <div className="text-center py-8">
        <p>&copy; Speedy Freight {date}, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
