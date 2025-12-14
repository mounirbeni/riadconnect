import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-primary">
                            RiadConnect
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            The sophisticated digital partner for modern Riad owners. Elevate your guest experience and streamline operations.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-serif font-semibold mb-4 text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/join-our-team" className="hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-semibold mb-4 text-foreground">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/services" className="hover:text-primary transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className="hover:text-primary transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/assistant" className="hover:text-primary transition-colors">
                                    AI Assistant
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-semibold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} RiadConnect. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
