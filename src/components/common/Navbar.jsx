"use client";
import { useEffect, useState } from "react";
import ChartOne from "../../app/chart2025/ChartOne";
import Link from "next/link";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Navbar hide/show logic
      if (scrollTop > 100) {
        if (scrollTop > lastScroll) {
          setShowNavbar(false); // scrolling down
        } else {
          setShowNavbar(true); // scrolling up
        }
      } else {
        setShowNavbar(true);
      }

      setLastScroll(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const sattaLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Chart 2025", href: "/chart2025" },
    { id: 3, title: "Chart 2024", href: "/chart2024" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-1 bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <nav
        className={`fixed top-0 left-0 w-full bg-gradientmidyellow4 shadow-lg z-40 transition-transform-3d duration-500 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container max-w-[1240px] mx-auto px-4 py-5">
          <div className="grid grid-cols-2 items-center justify-center sm:grid-cols-3 gap-4">
            {sattaLinks.map((link) => (
              <Link
                href={link.href}
                key={link.id}
                className="bg-gradient2 text-center flex items-center justify-center px-4 sm:px-5 md:px-6 py-3 leading-0 rounded-xs cursor-pointer hover:transform transition"
              >
                <p className="text-base max-sm:text-sm m-0 font-bold uppercase text-black">
                  {link.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
