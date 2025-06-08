"use client";

import React, { useState, useEffect } from "react";
import { Home, ShoppingBag, User, MessageCircle, Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navigationLinks = [
    { href: "/", label: "Home", mobileOnly: false },
    { href: "/brands", label: "Brands", mobileOnly: false },
    { href: "/products", label: "Products", mobileOnly: false },
    { href: "/welcome", label: "Skin Analysis", mobileOnly: false },
    { href: "/consult", label: "Consultation", mobileOnly: false },
    { href: "/about", label: "About", mobileOnly: false },
  ];

  return (
    <>
      {/* Desktop/Tablet Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-amber-100"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 group"
              >
                <div className="relative">
                  <Image
                    width={60}
                    height={60}
                    src="/skyne.svg"
                    className="h-12 w-12 lg:h-16 lg:w-16 transition-transform group-hover:scale-105"
                    alt="Skyne Logo"
                  />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-amber-800 hidden sm:block">
                  Skyne
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.slice(1, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-amber-800"
                      : "text-gray-700 hover:text-amber-800"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-800 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200">
                <Search size={20} />
              </button>
              <Link
                href="/account"
                className="p-2 text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
              >
                <User size={20} />
              </Link>
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/welcome"
                className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 py-2 rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Free Analysis
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-b border-amber-100 animate-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-amber-800 bg-amber-50"
                        : "text-gray-700 hover:text-amber-800 hover:bg-amber-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-amber-100">
                  <Link
                    href="/analysis"
                    className="block w-full text-center bg-gradient-to-r from-amber-700 to-amber-800 text-white py-3 rounded-full font-semibold hover:from-amber-800 hover:to-amber-900 transition-all duration-200"
                  >
                    Start Free Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-amber-100 z-50">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/"
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive("/")
                ? "text-amber-800 bg-amber-50"
                : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          
          <Link
            href="/products"
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive("/products")
                ? "text-amber-800 bg-amber-50"
                : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
            }`}
          >
            <ShoppingBag size={20} />
            <span className="text-xs mt-1 font-medium">Shop</span>
          </Link>
          
          <Link
            href="/welcome"
            className="flex flex-col items-center py-2 px-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-lg"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold">Analyze</span>
          </Link>
          
          <Link
            href="/chat"
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              isActive("/chat")
                ? "text-amber-800 bg-amber-50"
                : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
            }`}
          >
            <MessageCircle size={20} />
            <span className="text-xs mt-1 font-medium">Chat</span>
          </Link>
          
          <Link
            href="/account"
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 relative ${
              isActive("/account")
                ? "text-amber-800 bg-amber-50"
                : "text-gray-600 hover:text-amber-800 hover:bg-amber-50"
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1 font-medium">Account</span>
          </Link>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 lg:h-0"></div>
    </>
  );
};

export default Navbar;