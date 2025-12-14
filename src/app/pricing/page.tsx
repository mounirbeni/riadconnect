import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Check, X, Sparkles, Shield, TrendingUp, HelpCircle } from "lucide-react";
import { CheckCircle } from "@/components/icons/ProfessionalIcons";

export default function PricingPage() {
    const plans = [
        {
            name: "Essential Oasis",
            price: "€299",
            period: "/month",
            description: "Perfect for Riads starting their digital journey",
            popular: false,
            features: [
                { name: "Custom Website Design", included: true },
                { name: "Commission-Free Booking Engine", included: true },
                { name: "Basic SEO Optimization", included: true },
                { name: "Google Maps Integration", included: true },
                { name: "Mobile Responsive Design", included: true },
                { name: "Monthly Performance Reports", included: true },
                { name: "Email Support", included: true },
                { name: "24/7 WhatsApp AI Assistant", included: false },
                { name: "Professional Photography", included: false },
                { name: "Social Media Management", included: false },
                { name: "Revenue Management", included: false },
                { name: "Priority Support", included: false },
            ]
        },
        {
            name: "Digital Riad",
            price: "€599",
            period: "/month",
            description: "Comprehensive solution for growing Riads",
            popular: true,
            features: [
                { name: "Custom Website Design", included: true },
                { name: "Commission-Free Booking Engine", included: true },
                { name: "Advanced SEO Optimization", included: true },
                { name: "Google Maps Integration", included: true },
                { name: "Mobile Responsive Design", included: true },
                { name: "Weekly Performance Reports", included: true },
                { name: "Priority Email Support", included: true },
                { name: "24/7 WhatsApp AI Assistant", included: true },
                { name: "Professional Photography", included: true },
                { name: "Social Media Management", included: true },
                { name: "Revenue Management", included: false },
                { name: "Priority Support", included: false },
            ]
        },
        {
            name: "Growth Partner",
            price: "€999",
            period: "/month",
            description: "Complete digital ecosystem for ambitious Riads",
            popular: false,
            features: [
                { name: "Custom Website Design", included: true },
                { name: "Commission-Free Booking Engine", included: true },
                { name: "Premium SEO Optimization", included: true },
                { name: "Google Maps Integration", included: true },
                { name: "Mobile Responsive Design", included: true },
                { name: "Daily Performance Reports", included: true },
                { name: "24/7 Priority Support", included: true },
                { name: "24/7 WhatsApp AI Assistant", included: true },
                { name: "Professional Photography", included: true },
                { name: "Social Media Management", included: true },
                { name: "Revenue Management", included: true },
                { name: "Dedicated Account Manager", included: true },
            ]
        }
    ];

    const faqs = [
        {
            question: "Are there any setup fees?",
            answer: "No, there are no setup fees. We believe in transparent pricing. Your monthly subscription covers everything including initial setup, website development, and ongoing support."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Yes, you can cancel your subscription at any time with 30 days notice. We don't believe in locking you into long-term contracts. However, we're confident you'll love the results!"
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, bank transfers, and can accommodate local Moroccan payment methods. Payment is processed securely through our payment partners."
        },
        {
            question: "Do you offer custom packages?",
            answer: "Absolutely! If none of our standard plans fit your needs, we can create a custom package tailored to your Riad's specific requirements. Contact us to discuss your needs."
        },
        {
            question: "Is there a contract period?",
            answer: "We offer both month-to-month and annual contracts. Annual contracts receive a 15% discount. There's no long-term commitment required for monthly plans."
        },
        {
            question: "What happens to my website if I cancel?",
            answer: "Your website and all content belong to you. If you cancel, we'll provide you with all necessary files and help you transition to another hosting provider if needed."
        }
    ];

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
                        <span className="text-sm font-semibold text-primary">Transparent Pricing</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Choose Your <span className="text-primary">Growth Path</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Simple, transparent pricing with no hidden fees. All plans include commission-free booking
                        and are designed to help your Riad thrive in the digital age.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">No Setup Fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Cancel Anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">15% Off Annual Plans</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, idx) => (
                            <Card
                                key={idx}
                                className={`relative hover:shadow-2xl transition-all duration-300 ${plan.popular
                                        ? 'border-2 border-primary shadow-xl scale-105 md:scale-110'
                                        : 'hover:-translate-y-1'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                                    <CardDescription className="text-sm mb-6">{plan.description}</CardDescription>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold font-serif text-foreground">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                                                )}
                                                <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        asChild
                                        className={`w-full ${plan.popular ? 'shadow-lg' : ''}`}
                                        variant={plan.popular ? 'default' : 'outline'}
                                    >
                                        <Link href="/waitlist">Get Started</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-12 max-w-2xl mx-auto">
                        All prices are in Euros (€). Custom packages available for Riads with unique requirements.
                        <Link href="/contact" className="text-primary hover:underline ml-1">Contact us</Link> to discuss.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                            <HelpCircle className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-accent uppercase tracking-wide">FAQ</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about our pricing and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        {faq.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground mb-4">Still have questions?</p>
                        <Button asChild variant="outline">
                            <Link href="/contact">Contact Our Team</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-xl">
                        <CardContent className="pt-10 pb-10 text-center">
                            <Sparkles className="w-14 h-14 mx-auto mb-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Transform Your Riad?</h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join the waitlist today and be among the first to access RiadConnect.
                                Founding members receive exclusive benefits and special pricing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="px-8 py-5 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                    <Link href="/waitlist">Join the Waitlist</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="px-8 py-5 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                    <Link href="/contact">Schedule a Call</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
