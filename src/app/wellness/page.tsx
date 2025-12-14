"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Heart, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function WellnessPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "spa",
        preferredDate: "",
        preferredTime: "",
        numberOfPeople: "1",
        treatmentPreferences: "",
        healthConsiderations: "",
        durationPreference: "",
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
            const response = await fetch("/api/wellness", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit wellness request");
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
                        <h2 className="text-2xl font-serif font-bold mb-4">Request Received!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your wellness request. We&apos;ll confirm availability and send you more details within 24 hours.
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
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Health & Wellness</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Relax & <span className="text-primary">Rejuvenate</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Experience traditional Moroccan wellness treatments and modern spa services.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Wellness Request</CardTitle>
                            <CardDescription className="text-base">
                                Book your wellness experience
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
                                    <h3 className="text-lg font-semibold border-b pb-2">Service Details</h3>

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
                                            <option value="spa">Spa Treatment</option>
                                            <option value="massage">Massage</option>
                                            <option value="hammam">Traditional Hammam</option>
                                            <option value="yoga">Yoga Session</option>
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
                                                <option value="morning">Morning (9AM-12PM)</option>
                                                <option value="afternoon">Afternoon (2PM-5PM)</option>
                                                <option value="evening">Evening (6PM-8PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="numberOfPeople" className="text-sm font-medium">
                                                Number of People <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="numberOfPeople"
                                                name="numberOfPeople"
                                                required
                                                value={formData.numberOfPeople}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="durationPreference" className="text-sm font-medium">
                                                Duration Preference
                                            </label>
                                            <select
                                                id="durationPreference"
                                                name="durationPreference"
                                                value={formData.durationPreference}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            >
                                                <option value="">No preference</option>
                                                <option value="30min">30 minutes</option>
                                                <option value="60min">60 minutes</option>
                                                <option value="90min">90 minutes</option>
                                                <option value="2hours">2 hours</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="treatmentPreferences" className="text-sm font-medium">
                                            Treatment Preferences
                                        </label>
                                        <input
                                            id="treatmentPreferences"
                                            name="treatmentPreferences"
                                            type="text"
                                            value={formData.treatmentPreferences}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Aromatherapy, Deep tissue"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="healthConsiderations" className="text-sm font-medium">
                                            Health Considerations
                                        </label>
                                        <textarea
                                            id="healthConsiderations"
                                            name="healthConsiderations"
                                            value={formData.healthConsiderations}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Any health conditions, injuries, or allergies we should know about"
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
                                            rows={2}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Any special requests"
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
                                            Submit Request
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
