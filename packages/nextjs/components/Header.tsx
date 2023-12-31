import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
//import { useRouter } from "next/router";
import { FaucetButton, RainbowKitCustomConnectButton } from "@/components/scaffold-eth";
import { useOutsideClick } from "@/hooks/scaffold-eth";

//import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

//const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
//  const router = useRouter();
//  const isActive = router.pathname === href;
//
//  return (
//    <Link
//      href={href}
//      passHref
//      className={`${
//        isActive ? "bg-secondary shadow-md" : ""
//      } hover:bg-secondary hover:shadow-md py-1.5 px-3 text-sm rounded-full gap-2`}
//    >
//      {children}
//    </Link>
//  );
//};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      {/*<li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/dashboard">
          <BugAntIcon className="h-4 w-4" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink href="/">
          <SparklesIcon className="h-4 w-4" />
          Example UI
        </NavLink>
      </li>
      <li>
        <NavLink href="/">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Block Explorer
        </NavLink>
      </li>*/}
    </>
  );

  return (
    <div className="fixed top-0 navbar bg-none min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          ></label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/quizStation" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/Wlogo.png" />
          </div>
          <div className="flex flex-col font-kum font bold text-xl">Croissant</div>
        </Link>
        <Link href="/dashboard">
          <div className="homeBT">Dashboard</div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
