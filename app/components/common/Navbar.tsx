"use client";

import React from "react";
import { Home, ShoppingBag, User, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - visible on md screens and above */}
          <div className="hidden md:flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-amber-800 flex items-center"
            >
              <Image
                width={80}
                height={80}
                src="/skyne.svg"
                className="max-h-20"
                alt=""
              />
            </Link>
          </div>

          {/* Navigation links - visible on md screens and above */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/brands"
              className={`text-sm font-medium ${
                isActive("/brands")
                  ? "text-amber-800"
                  : "text-gray-600 hover:text-amber-800"
              }`}
            >
              Brands
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium ${
                isActive("/products")
                  ? "text-amber-800"
                  : "text-gray-600 hover:text-amber-800"
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                isActive("/about")
                  ? "text-amber-800"
                  : "text-gray-600 hover:text-amber-800"
              }`}
            >
              About
            </Link>
          </div>

          {/* Icons for all screen sizes, but positioned differently */}
          <div className="flex items-center justify-around w-full md:w-auto md:space-x-6">
            <Link
              href="/"
              className={`flex flex-col items-center md:hidden ${
                isActive("/") ? "text-amber-800" : "text-gray-600"
              }`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              href="/products"
              className={`flex flex-col items-center md:hidden ${
                isActive("/products") ? "text-amber-800" : "text-gray-600"
              }`}
            >
              <ShoppingBag size={20} />
              <span className="text-xs mt-1">Shop</span>
            </Link>
            <Link
              href="/chat"
              className={`flex flex-col items-center md:hidden ${
                isActive("/chat") ? "text-amber-800" : "text-gray-600"
              }`}
            >
              <MessageCircle size={20} />
              <span className="text-xs mt-1">Chat</span>
            </Link>
            <Link
              href="/account"
              className={`flex flex-col items-center md:hidden ${
                isActive("/account") ? "text-amber-800" : "text-gray-600"
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Account</span>
            </Link>

            {/* Desktop-only icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/search" className="text-gray-600 hover:text-amber-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              <Link
                href="/account"
                className="text-gray-600 hover:text-amber-800"
              >
                <User size={20} />
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-amber-800 relative"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
