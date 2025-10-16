import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const topCategories = [
    { name: "Development", href: "/category/development" },
    { name: "Finance & Accounting", href: "/category/finance" },
    { name: "Design", href: "/category/design" },
    { name: "Business", href: "/category/business" },
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Become Instructor", href: "/instructor" },
    { name: "Contact", href: "/contact" },
    { name: "Career", href: "/career" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help-center" },
    { name: "FAQs", href: "/faqs" },
    { name: "Terms & Condition", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  // Style commun de soulignement
  const underlineClass =
    "relative text-sm text-gray-400 hover:text-orange-500 font-medium " +
    "after:content-[''] after:absolute after:w-0 hover:after:w-full " +
    "after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-orange-500 " +
    "after:transition-all after:duration-300";

  return (
    <footer className="bg-[#1F2025] text-gray-300 w-full py-16 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 border-b border-[#3b3b41] pb-10">
        {/* Colonne 1 : Logo et description */}
        <div className="col-span-2 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center text-3xl font-bold text-orange-500 mb-5"
          >
            <Image
              src={require("../../assets/logo/pangolin.png")}
              alt="Savoora Logo"
              width={160}
              height={160}
              priority
              className="h-15 w-auto object-contain"
            />
            Savoora
          </Link>

          <p className="text-sm mb-6 text-gray-400 max-w-xs">
            Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
            mattis odio ac.
          </p>

          {/* Liens sociaux */}
          <div className="flex space-x-3">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-[#2A2B32] hover:bg-orange-500 rounded-md transition-colors"
                  aria-label={`Lien ${Icon.name}`}
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* TOP 4 CATEGORY */}
        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-widest">
            TOP 4 CATEGORY
          </h5>
          <ul className="space-y-3">
            {topCategories.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={underlineClass}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-widest">
            QUICK LINKS
          </h5>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.name}>
                {item.name === "Become Instructor" ? (
                  <Link
                    href={item.href}
                    className={
                      "text-sm text-orange-500 font-medium flex items-center group " +
                      "relative after:content-[''] after:absolute after:w-0 hover:after:w-full " +
                      "after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-orange-500 " +
                      "after:transition-all after:duration-300"
                    }
                  >
                    {item.name}
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                ) : (
                  <Link href={item.href} className={underlineClass}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h5 className="text-white font-semibold mb-4 text-sm tracking-widest">
            SUPPORT
          </h5>
          <ul className="space-y-3">
            {supportLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={underlineClass}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DOWNLOAD OUR APP */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-start">
          <h5 className="text-white font-semibold mb-4 text-sm tracking-widest">
            DOWNLOAD OUR APP
          </h5>

          <a href="#" className="mb-3 w-40">
            <div className="bg-[#2A2B32] p-2 flex items-center justify-center rounded-md hover:opacity-90 transition-opacity">
              <span className="text-xl mr-2"></span>
              <div className="text-xs">
                <div className="text-[10px] opacity-70">Download now</div>
                <div className="font-semibold text-sm">App Store</div>
              </div>
            </div>
          </a>

          <a href="#" className="w-40">
            <div className="bg-[#2A2B32] p-2 flex items-center justify-center rounded-md hover:opacity-90 transition-opacity">
              <span className="text-xl mr-2">▶</span>
              <div className="text-xs">
                <div className="text-[10px] opacity-70">Download now</div>
                <div className="font-semibold text-sm">Play Store</div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bande inférieure */}
      <div className="max-w-[1200px] mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p className="text-center md:text-left mb-2 md:mb-0">
          © {currentYear} <span className="text-orange-500">Savoora</span>. All
          rights reserved.
        </p>

        {/* Sélecteur de langue */}
        <div className="relative">
          <select
            defaultValue="English"
            className="appearance-none bg-[#2A2B32] border border-[#3b3b41] text-gray-300 py-2 px-4 pr-8 rounded-md focus:outline-none cursor-pointer"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
