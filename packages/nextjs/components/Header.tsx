"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
};

export const menuLinks: HeaderMenuLink[] = [
  { label: "Overview", href: "/" },
  { label: "Repositories", href: "/repositories" },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "text-base-content bg-base-200"
                  : "text-base-content/60 hover:text-base-content hover:bg-base-200/50"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  return (
    <header className="sticky top-0 z-20 border-b border-base-200 bg-base-100/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.svg" alt="SE2 Logo" width={32} height={32} className="rounded" />
            <span className="font-semibold text-base-content hidden sm:block">Scaffold-ETH Projects</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              <HeaderMenuLinks />
            </ul>
          </nav>

          {/* Mobile Menu */}
          <details className="dropdown dropdown-end md:hidden" ref={burgerMenuRef}>
            <summary className="btn btn-ghost btn-sm btn-square">
              <Bars3Icon className="h-5 w-5" />
            </summary>
            <ul
              className="menu dropdown-content mt-2 p-2 bg-base-100 border border-base-200 rounded-lg shadow-lg w-44 z-50"
              onClick={() => burgerMenuRef?.current?.removeAttribute("open")}
            >
              <HeaderMenuLinks />
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
};
