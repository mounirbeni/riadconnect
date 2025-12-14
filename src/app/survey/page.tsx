"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SurveyPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        riadName: "",
        location: "",
        currentChallenges: "",
        digitalTools: "",
        budget: "",
        priorities: "",
        additionalComments: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/surveys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit survey");
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
                        <h2 className="text-2xl font-serif font-bold mb-4">Thank You!</h2>
                        <p className="text-muted-foreground mb-6">
                            Your feedback is invaluable to us. We appreciate you taking the time to help us shape the future of RiadConnect.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => setSubmitted(false)} variant="outline">
                                Submit Another Response
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Riad Owner <span className="text-primary">Survey</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Help us understand your needs and challenges. Your feedback will shape the future of RiadConnect.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Survey Form</CardTitle>
                            <CardDescription className="text-base">
                                Share your insights and help us build better solutions for riad owners
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder="+212 600 000 000"
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
                                                placeholder="Your riad name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="location" className="text-sm font-medium">
                                            Location (City)
                                        </label>
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="e.g., Marrakech, Fes, Essaouira"
                                        />
                                    </div>
                                </div>

                                {/* Survey Questions */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold border-b pb-2">Your Insights</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="currentChallenges" className="text-sm font-medium">
                                            What are your biggest operational challenges?
                                        </label>
                                        <textarea
                                            id="currentChallenges"
                                            name="currentChallenges"
                                            value={formData.currentChallenges}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="e.g., Managing bookings, staff coordination, guest communication..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="digitalTools" className="text-sm font-medium">
                                            What digital tools/systems do you currently use?
                                        </label>
                                        <textarea
                                            id="digitalTools"
                                            name="digitalTools"
                                            value={formData.digitalTools}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="e.g., Booking.com, Excel, WhatsApp, PMS software..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="budget" className="text-sm font-medium">
                                            What is your monthly budget for digital solutions?
                                        </label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">Select budget range</option>
                                            <option value="under-500">Under 500 MAD</option>
                                            <option value="500-1000">500-1,000 MAD</option>
                                            <option value="1000-2000">1,000-2,000 MAD</option>
                                            <option value="2000-5000">2,000-5,000 MAD</option>
                                            <option value="over-5000">Over 5,000 MAD</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="priorities" className="text-sm font-medium">
                                            What are your top 3 priorities for improvement?
                                        </label>
                                        <textarea
                                            id="priorities"
                                            name="priorities"
                                            value={formData.priorities}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="e.g., 1. Increase direct bookings, 2. Reduce manual work, 3. Better guest experience"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="additionalComments" className="text-sm font-medium">
                                            Additional Comments or Suggestions
                                        </label>
                                        <textarea
                                            id="additionalComments"
                                            name="additionalComments"
                                            value={formData.additionalComments}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Any other feedback or suggestions you'd like to share..."
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
                                            Submit Survey
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    Your responses will be kept confidential and used to improve our services.
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
