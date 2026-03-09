"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Data Provider", path: "/provider" },
  { name: "Worker Portal", path: "/worker" },
  { name: "Admin", path: "/admin" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
              DropSafe
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="relative px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    <span
                      className={isActive ? "text-white" : "text-gray-300 hover:text-white"}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Placeholder */}
          <div className="md:hidden flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs px-2 py-1 rounded ${
                  pathname === link.path ? "bg-white/10 text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
