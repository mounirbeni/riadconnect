"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ToursPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        tourType: "city_tour",
        preferredDate: "",
        preferredTime: "",
        participants: "1",
        languagePreference: "English",
        accessibilityRequirements: "",
        dietaryRestrictions: "",
        specialInterests: "",
        budgetRange: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/tours", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit tour booking");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (submitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center">
                    <CardContent className="pt-10 pb-10">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold mb-4">Tour Booking Received!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your tour booking. We&apos;ll confirm availability and send you the itinerary within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => setSubmitted(false)} variant="outline">
                                Book Another Tour
                            </Button>
                            <Button asChild>
                                <Link href="/">Return Home</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-28">
                <div className="container mx-auto px-8 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full mb-6">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Tours & Excursions</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Discover <span className="text-primary">Morocco</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        From city tours to desert excursions, explore the rich culture and beauty of Morocco with expert guides.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Book Your Tour</CardTitle>
                            <CardDescription className="text-base">
                                Choose your adventure and we&apos;ll create an unforgettable experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Full Name <span className="text-red-500">*</span>
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
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="+212 600 000 000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Tour Details</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="tourType" className="text-sm font-medium">
                                            Tour Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="tourType"
                                            name="tourType"
                                            required
                                            value={formData.tourType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="city_tour">City Tour</option>
                                            <option value="desert_excursion">Desert Excursion</option>
                                            <option value="cultural_experience">Cultural Experience</option>
                                            <option value="shopping">Shopping Tour</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="preferredDate" className="text-sm font-medium">
                                                Preferred Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="preferredDate"
                                                name="preferredDate"
                                                type="date"
                                                required
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="preferredTime" className="text-sm font-medium">
                                                Preferred Time
                                            </label>
                                            <select
                                                id="preferredTime"
                                                name="preferredTime"
                                                value={formData.preferredTime}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                <option value="">No preference</option>
                                                <option value="morning">Morning (8AM-12PM)</option>
                                                <option value="afternoon">Afternoon (12PM-5PM)</option>
                                                <option value="evening">Evening (5PM-8PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="participants" className="text-sm font-medium">
                                                Number of Participants <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="participants"
                                                name="participants"
                                                required
                                                value={formData.participants}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="languagePreference" className="text-sm font-medium">
                                                Language Preference
                                            </label>
                                            <select
                                                id="languagePreference"
                                                name="languagePreference"
                                                value={formData.languagePreference}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                <option value="English">English</option>
                                                <option value="French">French</option>
                                                <option value="Arabic">Arabic</option>
                                                <option value="Spanish">Spanish</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="budgetRange" className="text-sm font-medium">
                                            Budget Range (per person)
                                        </label>
                                        <select
                                            id="budgetRange"
                                            name="budgetRange"
                                            value={formData.budgetRange}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">Select budget range</option>
                                            <option value="under-500">Under 500 MAD</option>
                                            <option value="500-1000">500-1,000 MAD</option>
                                            <option value="1000-2000">1,000-2,000 MAD</option>
                                            <option value="over-2000">Over 2,000 MAD</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="accessibilityRequirements" className="text-sm font-medium">
                                            Accessibility Requirements
                                        </label>
                                        <input
                                            id="accessibilityRequirements"
                                            name="accessibilityRequirements"
                                            type="text"
                                            value={formData.accessibilityRequirements}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Wheelchair accessible"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="dietaryRestrictions" className="text-sm font-medium">
                                            Dietary Restrictions
                                        </label>
                                        <input
                                            id="dietaryRestrictions"
                                            name="dietaryRestrictions"
                                            type="text"
                                            value={formData.dietaryRestrictions}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Vegetarian, Halal"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="specialInterests" className="text-sm font-medium">
                                            Special Interests
                                        </label>
                                        <textarea
                                            id="specialInterests"
                                            name="specialInterests"
                                            value={formData.specialInterests}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Tell us about your interests (history, architecture, photography, etc.)"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin mr-2">⏳</span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Book Tour
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
