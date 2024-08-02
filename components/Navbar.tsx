"use client";
import Image from "next/image";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { navbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  // Initialize the usePathname hook
  const pathname = usePathname();

  return (
    <>
      {/* Nav styles */}
      <nav className="flex justify-between items-center fixed h-[80px] mb-[70px] z-40 w-full bg-white-1 !text-dark-1 px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Speedy freight"
            //     className='max-sm:size-10'
            width={80}
            height={80}
          />
        </Link>

        {/* Navbar Links */}
        <ul className="hidden gap-1 text-white md:flex">
          {/* Loop through the Links array from the Constant file */}
          {navbarLinks.map((link, index) => {
            const isActive = pathname === link.route;
            return (
              <li className="flex" key={index}>
                <Link
                  href={link.route}
                  className={cn(
                    "flex rounded items-center px-6 py-2  w-max text-white",
                    {
                      "bg-blue-1 text-white-1": isActive,
                    }
                  )}
                >
                  <p className="text-md font-semibold">{link.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex md:hidden justify-between gap-5">
          {/* Embed Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
