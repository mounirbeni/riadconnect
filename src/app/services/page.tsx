import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import {
    Globe,
    CreditCard,
    MapPin,
    Bot,
    Search,
    TrendingUp,
    Users,
    Calendar,
    MessageSquare,
    BarChart,
    Smartphone,
    Mail,
    Star,
    Camera,
    BookOpen,
    Headphones,
    Award,
    Zap,
    Heart,
    Target
} from "lucide-react";
import { Sparkles, CheckCircle } from "@/components/icons/ProfessionalIcons";

export default function ServicesPage() {
    const services = {
        foundation: [
            {
                icon: Globe,
                title: "Custom Website Development",
                description: "A stunning, mobile-responsive website that showcases your Riad's unique character. Built with modern design principles and optimized for conversions.",
                features: ["Mobile-first design", "Fast loading speeds", "Beautiful galleries", "Integrated booking system"]
            },
            {
                icon: CreditCard,
                title: "Commission-Free Booking Engine",
                description: "Accept direct reservations without paying hefty commissions. Keep 100% of your revenue with our integrated booking system.",
                features: ["Real-time availability", "Secure payments", "Automated confirmations", "Multi-currency support"]
            },
            {
                icon: Search,
                title: "SEO & Local Search Optimization",
                description: "Dominate search results when travelers look for authentic Moroccan stays. Our SEO strategies ensure your Riad is found by the right guests.",
                features: ["Keyword optimization", "Local SEO", "Google My Business", "Content strategy"]
            },
            {
                icon: MapPin,
                title: "Google Maps Integration",
                description: "Make it easy for guests to find you with enhanced Google Maps presence and accurate location information.",
                features: ["Map embedding", "Directions integration", "Location verification", "Area highlights"]
            }
        ],
        experience: [
            {
                icon: Bot,
                title: "24/7 WhatsApp AI Assistant",
                description: "An intelligent AI assistant that handles guest inquiries instantly, even while you sleep. Trained specifically for Riad hospitality.",
                features: ["Instant responses", "Multi-language support", "Booking assistance", "Local recommendations"]
            },
            {
                icon: MessageSquare,
                title: "Automated Guest Communication",
                description: "Streamline your communication with automated pre-arrival, during-stay, and post-departure messages.",
                features: ["Welcome messages", "Check-in instructions", "Thank you notes", "Review requests"]
            },
            {
                icon: Star,
                title: "Review Management System",
                description: "Monitor, respond to, and showcase your best reviews across all platforms from one central dashboard.",
                features: ["Review monitoring", "Response templates", "Rating analytics", "Review showcase"]
            },
            {
                icon: Camera,
                title: "Professional Photography",
                description: "Showcase your Riad with stunning professional photography that captures its authentic beauty and charm.",
                features: ["Professional shoot", "Photo editing", "Virtual tours", "Seasonal updates"]
            },
            {
                icon: BookOpen,
                title: "Digital Concierge Services",
                description: "Provide guests with a digital guidebook featuring local recommendations, house rules, and essential information.",
                features: ["Interactive guides", "Local tips", "House manual", "Emergency contacts"]
            },
            {
                icon: Mail,
                title: "Email Marketing Campaigns",
                description: "Stay connected with past guests and attract repeat bookings through targeted email campaigns.",
                features: ["Newsletter creation", "Automated campaigns", "Guest segmentation", "Performance tracking"]
            }
        ],
        growth: [
            {
                icon: BarChart,
                title: "Revenue Management",
                description: "Optimize your pricing strategy with data-driven insights and dynamic pricing recommendations.",
                features: ["Dynamic pricing", "Competitor analysis", "Demand forecasting", "Revenue reports"]
            },
            {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Track your Riad's performance with comprehensive analytics and actionable insights.",
                features: ["Booking analytics", "Traffic reports", "Conversion tracking", "ROI measurement"]
            },
            {
                icon: Users,
                title: "Staff Training & Support",
                description: "Empower your team with training on modern hospitality tools and best practices.",
                features: ["Platform training", "Best practices", "Ongoing support", "Resource library"]
            },
            {
                icon: Calendar,
                title: "Channel Management",
                description: "Manage your presence across multiple booking platforms from one central dashboard.",
                features: ["Multi-channel sync", "Inventory management", "Rate parity", "Unified calendar"]
            },
            {
                icon: Smartphone,
                title: "Social Media Management",
                description: "Build your brand and engage with potential guests through strategic social media presence.",
                features: ["Content creation", "Post scheduling", "Engagement tracking", "Brand building"]
            },
            {
                icon: Target,
                title: "Digital Marketing Strategy",
                description: "Attract more guests with targeted digital marketing campaigns across Google, Facebook, and Instagram.",
                features: ["Ad campaigns", "Audience targeting", "A/B testing", "Campaign optimization"]
            },
            {
                icon: Headphones,
                title: "Priority Support",
                description: "Get dedicated support from our team whenever you need assistance with your digital presence.",
                features: ["24/7 support", "Dedicated account manager", "Priority response", "Technical assistance"]
            },
            {
                icon: Award,
                title: "Brand Development",
                description: "Create a cohesive brand identity that reflects your Riad's unique personality and values.",
                features: ["Logo design", "Brand guidelines", "Visual identity", "Brand storytelling"]
            }
        ]
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-8 text-center max-w-5xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full mb-8">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">Comprehensive Digital Solutions</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-foreground">
                        Everything Your Riad Needs to <span className="text-primary">Thrive</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                        From stunning websites to AI-powered guest support, we provide all the tools you need
                        to increase bookings, streamline operations, and deliver exceptional guest experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                            <Link href="/contact">Book a Consultation</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                            <Link href="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Core Foundation Services */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Core Foundation</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Digital Foundation</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Build a strong digital presence with essential tools that form the backbone of your online success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {services.foundation.map((service, idx) => (
                            <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                                <CardHeader>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guest Experience Services */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                            <Heart className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Guest Experience</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Enhance Guest Experiences</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Delight your guests with personalized service and seamless communication throughout their journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {services.experience.map((service, idx) => (
                            <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-accent/20">
                                <CardHeader>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                                    <CardDescription className="text-base leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Operations & Growth Services */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Operations & Growth</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Scale Your Success</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Optimize operations and accelerate growth with advanced tools and strategic support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {services.growth.map((service, idx) => (
                            <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
                                <CardHeader>
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-xs text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="container mx-auto px-8">
                    <Card className="max-w-4xl mx-auto bg-card backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
                        <CardContent className="pt-12 pb-12 text-center">
                            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                            <h2 className="text-4xl font-serif font-bold mb-6">Ready to Transform Your Riad?</h2>
                            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                                Let&apos;s discuss how RiadConnect can help you achieve your goals. Book a free consultation
                                to explore which services are right for your Riad.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                    <Link href="/contact">Book Free Consultation</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                    <Link href="/pricing">View Pricing Plans</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
