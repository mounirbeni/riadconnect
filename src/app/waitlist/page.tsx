"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Sparkles, CheckCircle, TrendingUp, Shield } from "@/components/icons/ProfessionalIcons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        riadName: "",
        location: ""
    });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    riadName: formData.riadName,
                    role: formData.location // Mapping location to role for now, or add location to schema
                }),
            });

            if (response.ok) {
                router.push("/thank-you");
            } else {
                console.error("Failed to join waitlist");
                // Handle error (show toast etc)
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Founding Members</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Be Among the <span className="text-primary">First</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join our exclusive waitlist and become a founding member of RiadConnect.
                        Get early access, special pricing, and help shape the future of the platform.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                        {/* Benefits */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-6">Founding Member Benefits</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    As a founding member, you&apos;ll receive exclusive perks and be part of shaping
                                    RiadConnect from the ground up.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Sparkles,
                                        title: "Early Access",
                                        description: "Be the first to access RiadConnect when we launch"
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: "Special Pricing",
                                        description: "Lock in founding member rates—up to 30% off regular pricing"
                                    },
                                    {
                                        icon: Shield,
                                        title: "Priority Support",
                                        description: "Get dedicated support and direct access to our team"
                                    },
                                    {
                                        icon: CheckCircle,
                                        title: "Shape the Platform",
                                        description: "Your feedback directly influences feature development"
                                    }
                                ].map((benefit, idx) => (
                                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <benefit.icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="bg-secondary/30 rounded-2xl p-6">
                                <p className="text-sm text-muted-foreground">
                                    <strong className="text-foreground">Limited Spots Available:</strong> We&apos;re accepting
                                    only 100 founding members to ensure we can provide exceptional service and support
                                    during our launch phase.
                                </p>
                            </div>
                        </div>

                        {/* Waitlist Form */}
                        <Card className="shadow-xl sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
                                <CardDescription>Secure your spot as a founding member</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Your Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="riadName" className="text-sm font-medium">
                                            Riad Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="riadName"
                                            name="riadName"
                                            type="text"
                                            required
                                            value={formData.riadName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="Your Riad's name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="location" className="text-sm font-medium">
                                            Location <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            required
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="City, Morocco"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? "Joining..." : "Join the Waitlist"}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        By joining, you agree to our{" "}
                                        <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                                        {" "}and{" "}
                                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
