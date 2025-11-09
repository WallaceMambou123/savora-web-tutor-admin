"use client";

import React from "react";
import { useState } from 'react';
import { Search, Bell, ShoppingCart, ChevronDown, Heart } from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "../ThemeSwitcher";
import Link from "next/link";

export default function Header() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Become an Instructor", href: "/instructor" },
    ];

    return (
        <header
            className="
        flex items-center justify-between 
        px-6 py-4
        border-b border-savoora-light 
        bg-[var(--color-bg)] 
        text-[var(--color-text)] 
        shadow-sm 
        transition-colors duration-300
      "
        >
            {/* ----------------- LEFT SECTION ----------------- */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center transform hover:scale-105 transition-transform duration-300"
                >
                    <Image
                        src={require("../../assets/logo/6.png")}
                        alt="Savoora Logo"
                        width={160}
                        height={160}
                        priority
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-[var(--color-text)] hover:text-savoora-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* ----------------- SEARCH BAR ----------------- */}
            <div
                className={`
                    hidden lg:flex items-center flex-grow max-w-2xl mx-4
                    border-2 p-3 rounded-full
                    transition-all duration-300 ease-out
                    ${isSearchFocused
                        ? 'border-savoora-primary shadow-lg shadow-savoora-primary/20 scale-105'
                        : 'border-savoora-light/50 hover:border-savoora-accent/50'
                    }
                  `}
            >
                <Search
                    className={`mr-3 transition-colors duration-300 ${isSearchFocused
                        ? 'text-savoora-primary'
                        : 'text-savoora-muted'
                        }`}
                    size={20}
                />
                <input
                    type="text"
                    placeholder="What do you want to learn..."
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="
                      flex-grow bg-transparent border-none 
                      text-sm lg:text-base 
                      text-[var(--color-text)]
                      placeholder-savoora-muted
                      focus:outline-none
                    "
                />
            </div>

            {/* ----------------- RIGHT SECTION ----------------- */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* Icons */}
                <div className="flex gap-2 sm:gap-3">
                    <button
                        className="
              p-2 rounded-md 
              text-savoora-muted 
              hover:text-[var(--color-text)]
              transition-colors relative
            "
                    >
                        <Heart size={20} />
                    </button>
                    <button
                        className="
              p-2 rounded-md 
              text-savoora-muted 
              hover:text-[var(--color-text)]
              transition-colors relative
            "
                    >
                        <ShoppingCart size={20} />
                    </button>
                    <button
                        className="
              p-2 rounded-md 
              text-savoora-muted 
              hover:text-[var(--color-text)]
              transition-colors relative
            "
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-savoora-danger)] rounded-full animate-pulse"></span>
                    </button>
                </div>

                {/* Boutons d'action */}
                <div className="hidden sm:flex items-center gap-2">
                    <Link href="/register">
                        <button
                            className="
                            bg-white
                            text-savoora-primary
                            border border-savoora-primary
                              px-4 py-2 rounded-md font-semibold text-sm
                            hover:bg-savoora-light/70
                              transition-colors
                            "
                        >
                            Create Account
                        </button>
                    </Link>
                    <Link href="/login">
                        <button
                            className="
                        bg-savoora-primary 
                        text-white 
                          px-4 py-2 rounded-md font-semibold text-sm
                        hover:bg-savoora-primary/90
                          transition-colors
                        "
                        >
                            Sign In
                        </button>
                    </Link>
                </div>

                {/* Sélecteurs Langue/Devise */}
                <div className="hidden md:flex items-center gap-2">
                    <select className="bg-transparent border-none text-sm text-[var(--color-text)] cursor-pointer focus:outline-none">
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                    <select className="bg-transparent border-none text-sm text-[var(--color-text)] cursor-pointer focus:outline-none">
                        <option>English</option>
                        <option>Français</option>
                    </select>
                </div>

                <ThemeSwitcher />
            </div>
        </header>
    );
}
