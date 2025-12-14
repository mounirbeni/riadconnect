"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Car, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TransportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "airport_pickup",
        pickupLocation: "",
        pickupDateTime: "",
        dropoffLocation: "",
        passengers: "1",
        luggage: "",
        vehiclePreference: "",
        flightDetails: "",
        specialRequests: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/transport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit transport request");
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
                        <h2 className="text-2xl font-serif font-bold mb-4">Transport Request Received!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your transport request. We&apos;ll confirm your booking and send you driver details within 24 hours.
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
            <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 md:py-28">
                <div className="container mx-auto px-8 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full mb-6">
                        <Car className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Transport Services</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Book Your <span className="text-primary">Transport</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Airport pickups, city transfers, and day rentals. Reliable, comfortable transportation for your journey.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Transport Request</CardTitle>
                            <CardDescription className="text-base">
                                Tell us about your transport needs and we&apos;ll arrange everything for you
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
                                    <h3 className="text-lg font-semibold border-b pb-2">Transport Details</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="serviceType" className="text-sm font-medium">
                                            Service Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            required
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="airport_pickup">Airport Pickup</option>
                                            <option value="city_transfer">City Transfer</option>
                                            <option value="day_rental">Day Rental</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="pickupLocation" className="text-sm font-medium">
                                                Pickup Location <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="pickupLocation"
                                                name="pickupLocation"
                                                type="text"
                                                required
                                                value={formData.pickupLocation}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="e.g., Marrakech Airport"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="dropoffLocation" className="text-sm font-medium">
                                                Drop-off Location <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="dropoffLocation"
                                                name="dropoffLocation"
                                                type="text"
                                                required
                                                value={formData.dropoffLocation}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="e.g., Riad in Medina"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="pickupDateTime" className="text-sm font-medium">
                                            Pickup Date & Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="pickupDateTime"
                                            name="pickupDateTime"
                                            type="datetime-local"
                                            required
                                            value={formData.pickupDateTime}
                                            onChange={handleChange}
                                            min={new Date().toISOString().slice(0, 16)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="passengers" className="text-sm font-medium">
                                                Number of Passengers <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="passengers"
                                                name="passengers"
                                                required
                                                value={formData.passengers}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="luggage" className="text-sm font-medium">
                                                Luggage Details
                                            </label>
                                            <input
                                                id="luggage"
                                                name="luggage"
                                                type="text"
                                                value={formData.luggage}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="e.g., 2 large, 1 small"
                                            />
                                        </div>
                                    </div>

                                    {formData.serviceType === "airport_pickup" && (
                                        <div className="space-y-2">
                                            <label htmlFor="flightDetails" className="text-sm font-medium">
                                                Flight Details
                                            </label>
                                            <input
                                                id="flightDetails"
                                                name="flightDetails"
                                                type="text"
                                                value={formData.flightDetails}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="Flight number and arrival time"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label htmlFor="vehiclePreference" className="text-sm font-medium">
                                            Vehicle Preference
                                        </label>
                                        <select
                                            id="vehiclePreference"
                                            name="vehiclePreference"
                                            value={formData.vehiclePreference}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">No preference</option>
                                            <option value="sedan">Sedan</option>
                                            <option value="suv">SUV</option>
                                            <option value="van">Van</option>
                                            <option value="luxury">Luxury Vehicle</option>
                                        </select>
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
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Any special requests or requirements"
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
                                            Submit Transport Request
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
