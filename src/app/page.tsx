import Link from "next/link";
import { Globe, CreditCard, MapPin, Bot, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Sparkles, CheckCircle, TrendingUp, Shield, UsersGroup } from "@/components/icons/ProfessionalIcons";
import images from "@/lib/placeholder-images.json";

import { getSiteContent } from "@/lib/content";

export default async function Home() {
    const content = await getSiteContent();

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Image with enhanced overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${images.hero.src}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
                </div>

                <div className="container relative z-10 px-8 text-center max-w-6xl mx-auto text-white">
                    {/* Building2 Icon with glow effect */}
                    <div className="mb-6 inline-block">
                        <Building2 className="w-20 h-20 mx-auto text-primary drop-shadow-2xl animate-pulse" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-[1.15] drop-shadow-2xl">
                        {content.hero_title || "Your Digital Oasis for"} <br className="hidden md:block" />
                        <span className="text-primary bg-clip-text">Authentic Hospitality</span>
                    </h1>

                    <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto font-light drop-shadow-lg text-white/95 leading-relaxed">
                        {content.hero_subtitle || "You've mastered the art of creating unforgettable experiences within your Riad's walls. Now, let RiadConnect be your partner in sharing that magic with the world—commission-free, effortlessly, and with the elegance your craft deserves."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                        <Button asChild size="lg" className="px-8 py-5 h-auto rounded-full shadow-2xl hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-white border-none">
                            <Link href="/waitlist" className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                {content.hero_cta_primary || "Become a Founding Member"}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="px-8 py-5 h-auto rounded-full shadow-2xl hover:scale-105 transition-all duration-300 text-white border-white/70 hover:bg-white/20 hover:border-white backdrop-blur-sm">
                            <Link href="/services">{content.hero_cta_secondary || "Explore Our Solutions"}</Link>
                        </Button>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>100% Commission-Free</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>Trusted by Riad Owners</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span>Proven Results</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section - NEW */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 border-y border-primary/10">
                <div className="container px-8 mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { number: "100+", label: "Riads Ready to Join", icon: Building2 },
                            { number: "0%", label: "Commission Fees", icon: Shield },
                            { number: "24/7", label: "AI Support", icon: Bot },
                            { number: "3x", label: "Average Booking Increase", icon: TrendingUp },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                                <div className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">{stat.number}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section - NEW */}
            <section className="py-24 bg-background">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">How RiadConnect Works</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Three simple steps to transform your Riad&apos;s digital presence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Join the Circle",
                                description: "Sign up for our waitlist and become a founding member. Share your vision and challenges with us.",
                                icon: UsersGroup
                            },
                            {
                                step: "02",
                                title: "We Build Your Oasis",
                                description: "Our team creates your custom website, sets up commission-free booking, and configures your AI assistant.",
                                icon: Sparkles
                            },
                            {
                                step: "03",
                                title: "Watch Your Riad Thrive",
                                description: "Launch your digital presence and start receiving direct bookings. We provide ongoing support and optimization.",
                                icon: TrendingUp
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/20 mb-6">
                                        <span className="text-3xl font-bold font-serif text-primary">{item.step}</span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                                {idx < 2 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="bg-secondary/30 py-24">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Suite of Tools Designed for You</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Everything you need to thrive in the modern hospitality landscape
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                            <CardHeader>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Globe className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Your Custom Website</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                    A stunning, mobile-optimized website that reflects your Riad&apos;s unique character and charm.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                            <CardHeader>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <CreditCard className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Commission-Free Bookings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                    Accept direct reservations without paying hefty commissions to third-party platforms.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                            <CardHeader>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <MapPin className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">Dominate Local Search</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                    SEO optimization ensures travelers find your Riad when searching for authentic Moroccan stays.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                            <CardHeader>
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Bot className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl">24/7 WhatsApp Assistant</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                    An AI-powered assistant handles guest inquiries instantly, even while you sleep.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button asChild variant="default" size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                            <Link href="/services" className="flex items-center gap-2">
                                Discover All Our Services
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - NEW */}
            <section className="py-24 bg-background">
                <div className="container px-8 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Trusted by Riad Owners</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            See what early partners are saying about RiadConnect
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                quote: "RiadConnect transformed how we manage bookings. No more commission fees, and our direct bookings have tripled!",
                                author: "Fatima El-Mansouri",
                                role: "Owner, Riad Al-Fassia",
                                rating: 5
                            },
                            {
                                quote: "The AI assistant is incredible. It handles guest questions 24/7, giving me peace of mind and more time for hospitality.",
                                author: "Karim Benjelloun",
                                role: "Manager, Dar El-Bacha",
                                rating: 5
                            },
                            {
                                quote: "Finally, a platform that understands Riads. Beautiful website, easy booking system, and truly commission-free.",
                                author: "Amina Tazi",
                                role: "Owner, Riad Zitoun",
                                rating: 5
                            }
                        ].map((testimonial, idx) => (
                            <Card key={idx} className="bg-card backdrop-blur-sm hover:shadow-xl transition-shadow border-border">
                                <CardContent className="pt-8">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Sparkles key={i} className="w-5 h-5 text-primary fill-primary" />
                                        ))}
                                    </div>
                                    <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">
                                        &quot;{testimonial.quote}&quot;
                                    </p>
                                    <div className="border-t border-border pt-4">
                                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Summary */}
            <section className="py-24 bg-gradient-to-br from-secondary/50 to-background">
                <div className="container px-8 mx-auto text-center max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Built on a Foundation of Respect</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                        RiadConnect was born from a genuine appreciation for the dedication and passion Riad owners pour
                        into their craft. We understand the challenges of balancing authentic hospitality with modern business
                        demands. That&apos;s why we&apos;ve created tools that work for you—not the other way around.
                    </p>
                    <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        <Link href="/about" className="flex items-center gap-2">
                            Read Our Story
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Dual CTA Section */}
            <section className="bg-secondary/30 py-24">
                <div className="container px-8 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Survey Card */}
                        <Card className="bg-card backdrop-blur-md border-2 border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-7 h-7 text-primary" />
                                </div>
                                <CardTitle className="text-3xl font-serif">Help Us Build for You</CardTitle>
                                <CardDescription className="text-lg">
                                    Your insights shape our platform
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Take our 5-minute survey and tell us what matters most to you as a Riad owner.
                                    Your feedback directly influences which features we prioritize.
                                </p>
                                <Button asChild variant="outline" className="w-full" size="lg">
                                    <Link href="/survey">Share Your Insights</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Waitlist Card */}
                        <Card className="bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/20 dark:to-accent/10 backdrop-blur-md border-2 border-primary/30 dark:border-primary/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                                    <Sparkles className="w-7 h-7 text-primary" />
                                </div>
                                <CardTitle className="text-3xl font-serif">Become a Founding Partner</CardTitle>
                                <CardDescription className="text-lg">
                                    Join our exclusive pre-launch community
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Be among the first to access RiadConnect. Founding members receive exclusive benefits,
                                    priority support, and special pricing as we grow together.
                                </p>
                                <Button asChild className="w-full" size="lg">
                                    <Link href="/waitlist">Join the Waitlist</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
