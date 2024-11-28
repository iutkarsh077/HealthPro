import { Menu, X } from "lucide-react";
import { useState } from "react";

const navData = [
  "Donor Programme",
  "Fertility Preservation",
  "Advanced Treatments",
  "Infertility Treatments",
  "IVF Testing",
  "About Us",
];

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex w-full  items-center justify-between  py-3 bg-white shadow-md xl:justify-around">
      {/* Logo */}
      <a href="#" className="flex items-center space-x-2">
        <span className="text-2xl font-bold">
          <span className="bg-black px-3 py-[2px] text-white rounded-md">
            IVF
          </span>{" "}
          Pulse
        </span>
      </a>

      {/* Navigation */}
      <nav
        className="flex items-center xl:gap-x-4"
      >
        {/* Mobile Menu Icon */}
        <span  onClick={() => setIsMenuOpen(!isMenuOpen)}>

        {!isMenuOpen ? (
          <Menu
          className="block xl:hidden text-gray-700 cursor-pointer"
          size={28}
          />
        ) : (
          <X
          className="block xl:hidden text-gray-700 cursor-pointer"
          size={28}
          />
        )}
        </span>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white z-50 shadow-lg xl:hidden">
            <div className="flex flex-col items-start px-10 space-y-4 py-6">
              {navData.map((nav, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-700 font-medium text-lg hover:text-red-500"
                >
                  {nav}
                </a>
              ))}
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2">
                Talk to Us &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-6">
          {navData.map((nav, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-700 font-medium text-sm hover:text-red-500"
            >
              {nav}
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <button className="hidden xl:block bg-red-500 hover:bg-red-600 text-white px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2">
          Talk to Us &rarr;
        </button>
      </nav>
    </div>
  );
}
