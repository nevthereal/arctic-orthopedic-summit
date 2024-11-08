import logo from "../assets/logo.jpeg";
import { useState } from "react";

export const Nav = () => {
  const links = [
    { href: "/scientific-program", text: "scientific program" },
    { href: "/registration", text: "registration" },
    { href: "/history", text: "history" },
    { href: "/activities", text: "activities" },
    { href: "/venue", text: "venue/travel" },
  ];

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav className="py-4 md:flex items-center justify-center mx-auto gap-8 hidden">
        <div className="contents font-bold uppercase">
          <a href="/">Home</a>
          {links.map((link, idx) => {
            return (
              <a key={idx} href={link.href}>
                {link.text}
              </a>
            );
          })}
        </div>
        <a href="https://soy.fi" target="_blank">
          <img src={logo.src} alt="soy logo" className="w-16" />
        </a>
      </nav>

      {/* MOBILE NAV */}
      <div className="flex justify-between px-6 py-4 items-center">
        <button
          onClick={handleNav}
          className="p-1 bg-transparent md:hidden text-xl"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <a href="https://soy.fi" target="_blank" className="block md:hidden">
          <img src={logo.src} alt="soy logo" className="w-16" />
        </a>
      </div>
      <section className="block md:hidden">
        <nav
          className={
            nav
              ? "z-30 fixed h-screen top-0 left-0 bg-white ease-in-out duration-300 p-4 uppercase"
              : "z-30 fixed -left-full top-0"
          }
        >
          <h1 className="text-4xl mb-4 font-black">Navigation</h1>
          <ul className="flex flex-col gap-4 font-medium">
            <a href="/">Home</a>
            {links.map((link, idx) => {
              return (
                <li>
                  <a key={idx} href={link.href}>
                    {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          onClick={handleNav}
          className={`fixed w-screen h-screen top-0 bg-black/50 z-20 ${
            nav ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        ></div>
      </section>
    </>
  );
};
