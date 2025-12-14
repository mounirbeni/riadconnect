"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm h-20 transition-colors duration-300">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-primary">
                    <Building2 className="w-8 h-8" />
                    <span>RiadConnect</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Button asChild variant="default" size="sm">
                        <Link href="/waitlist">Join Waitlist</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col space-y-4 shadow-lg animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex justify-center py-2">
                        <ThemeToggle />
                    </div>
                    <Button asChild variant="default" className="w-full">
                        <Link href="/waitlist" onClick={() => setIsOpen(false)}>
                            Join Waitlist
                        </Link>
                    </Button>
                </div>
            )}
        </nav>
    );
}
