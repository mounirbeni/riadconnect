"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function BusinessPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        businessType: "",
        collaborationInterest: "",
        proposalDetails: "",
        expectedTimeline: "",
        website: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/business", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to submit business collaboration request");
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
                        <h2 className="text-2xl font-serif font-bold mb-4">Proposal Received!</h2>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your interest in collaborating with us. We&apos;ll review your proposal and get back to you within 48 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button onClick={() => setSubmitted(false)} variant="outline">
                                Submit Another Proposal
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
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Business Collaboration</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Partner With <span className="text-primary">RiadConnect</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Explore partnership opportunities and collaborate to grow the Moroccan hospitality industry.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-3xl mx-auto shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">Collaboration Proposal</CardTitle>
                            <CardDescription className="text-base">
                                Tell us about your business and collaboration ideas
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
                                    <h3 className="text-lg font-semibold border-b pb-2">Business Details</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="companyName" className="text-sm font-medium">
                                            Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            required
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="businessType" className="text-sm font-medium">
                                            Business Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="businessType"
                                            name="businessType"
                                            required
                                            value={formData.businessType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">Select business type</option>
                                            <option value="hospitality">Hospitality</option>
                                            <option value="technology">Technology</option>
                                            <option value="marketing">Marketing/PR</option>
                                            <option value="tourism">Tourism</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="website" className="text-sm font-medium">
                                            Website
                                        </label>
                                        <input
                                            id="website"
                                            name="website"
                                            type="url"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            placeholder="https://yourcompany.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="collaborationInterest" className="text-sm font-medium">
                                            Collaboration Interest <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="collaborationInterest"
                                            name="collaborationInterest"
                                            required
                                            value={formData.collaborationInterest}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">Select collaboration type</option>
                                            <option value="partnership">Strategic Partnership</option>
                                            <option value="integration">Technology Integration</option>
                                            <option value="marketing">Marketing Collaboration</option>
                                            <option value="investment">Investment Opportunity</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="proposalDetails" className="text-sm font-medium">
                                            Proposal Details <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="proposalDetails"
                                            name="proposalDetails"
                                            required
                                            value={formData.proposalDetails}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            placeholder="Please describe your collaboration proposal in detail..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="expectedTimeline" className="text-sm font-medium">
                                            Expected Timeline
                                        </label>
                                        <select
                                            id="expectedTimeline"
                                            name="expectedTimeline"
                                            value={formData.expectedTimeline}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="immediate">Immediate (1-2 weeks)</option>
                                            <option value="short">Short-term (1-3 months)</option>
                                            <option value="medium">Medium-term (3-6 months)</option>
                                            <option value="long">Long-term (6+ months)</option>
                                        </select>
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
                                            Submit Proposal
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
