"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        adults: "1",
        children: "0",
        roomPreferences: "",
        specialRequests: "",
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
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit booking request");
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
                        <h2 className="text-2xl font-serif font-bold mb-4">Booking Request Received!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your booking request. We&apos;ll review your details and get back to you within 24 hours to confirm availability and pricing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => setSubmitted(false)} variant="outline">
                                Submit Another Request
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
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-28">
                <div className="container mx-auto px-8 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full mb-6">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Riad Reservation</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Book Your <span className="text-primary">Authentic Stay</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Experience the magic of traditional Moroccan hospitality. Submit your booking request and we&apos;ll help you find the perfect Riad for your stay.
                    </p>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Reservation Request</CardTitle>
                            <CardDescription className="text-base">
                                Fill out the form below and we&apos;ll get back to you with availability and pricing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Contact Information */}
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

                                {/* Booking Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Booking Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="checkIn" className="text-sm font-medium">
                                                Check-in Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="checkIn"
                                                name="checkIn"
                                                type="date"
                                                required
                                                value={formData.checkIn}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="checkOut" className="text-sm font-medium">
                                                Check-out Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="checkOut"
                                                name="checkOut"
                                                type="date"
                                                required
                                                value={formData.checkOut}
                                                onChange={handleChange}
                                                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="adults" className="text-sm font-medium">
                                                Number of Adults <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="adults"
                                                name="adults"
                                                required
                                                value={formData.adults}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="children" className="text-sm font-medium">
                                                Number of Children
                                            </label>
                                            <select
                                                id="children"
                                                name="children"
                                                value={formData.children}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Preferences */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Preferences & Requests</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="budgetRange" className="text-sm font-medium">
                                            Budget Range (per night)
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
                                            <option value="2000-3000">2,000-3,000 MAD</option>
                                            <option value="over-3000">Over 3,000 MAD</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="roomPreferences" className="text-sm font-medium">
                                            Room Preferences
                                        </label>
                                        <input
                                            id="roomPreferences"
                                            name="roomPreferences"
                                            type="text"
                                            value={formData.roomPreferences}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Ground floor, balcony, twin beds"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="specialRequests" className="text-sm font-medium">
                                            Special Requests
                                        </label>
                                        <textarea
                                            id="specialRequests"
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Any special requests or requirements (dietary restrictions, accessibility needs, celebrations, etc.)"
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
                                            Submit Booking Request
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    By submitting this form, you agree to our terms and privacy policy. We&apos;ll contact you within 24 hours.
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
