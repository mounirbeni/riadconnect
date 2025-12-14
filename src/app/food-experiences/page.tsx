"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Utensils, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function FoodExperiencesPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experienceType: "traditional_dining",
        preferredDate: "",
        preferredTime: "",
        guests: "2",
        dietaryRestrictions: "",
        cuisinePreferences: "",
        specialOccasion: "",
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
            const response = await fetch("/api/food-experiences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit food experience request");
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
                            Thank you for your food experience request. We&apos;ll confirm details and send you more information within 24 hours.
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
                        <Utensils className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Food Experiences</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Taste <span className="text-primary">Morocco</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        From traditional dining to cooking classes, experience authentic Moroccan cuisine.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Food Experience Request</CardTitle>
                            <CardDescription className="text-base">
                                Tell us about your culinary interests
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
                                    <h3 className="text-lg font-semibold border-b pb-2">Experience Details</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="experienceType" className="text-sm font-medium">
                                            Experience Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="experienceType"
                                            name="experienceType"
                                            required
                                            value={formData.experienceType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="traditional_dining">Traditional Dining</option>
                                            <option value="cooking_class">Cooking Class</option>
                                            <option value="food_tour">Food Tour</option>
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
                                                <option value="lunch">Lunch (12PM-3PM)</option>
                                                <option value="dinner">Dinner (7PM-10PM)</option>
                                                <option value="morning">Morning (9AM-12PM)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="guests" className="text-sm font-medium">
                                            Number of Guests <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="guests"
                                            name="guests"
                                            required
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="dietaryRestrictions" className="text-sm font-medium">
                                            Dietary Restrictions / Allergies
                                        </label>
                                        <input
                                            id="dietaryRestrictions"
                                            name="dietaryRestrictions"
                                            type="text"
                                            value={formData.dietaryRestrictions}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Vegetarian, Gluten-free, Nut allergy"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="cuisinePreferences" className="text-sm font-medium">
                                            Cuisine Preferences
                                        </label>
                                        <input
                                            id="cuisinePreferences"
                                            name="cuisinePreferences"
                                            type="text"
                                            value={formData.cuisinePreferences}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Tagine, Couscous, Pastilla"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="specialOccasion" className="text-sm font-medium">
                                            Special Occasion
                                        </label>
                                        <input
                                            id="specialOccasion"
                                            name="specialOccasion"
                                            type="text"
                                            value={formData.specialOccasion}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Birthday, Anniversary"
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
