import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Users, MessageSquare, Calendar, BookOpen, Award, Heart, TrendingUp, Sparkles } from "lucide-react";
import { UsersGroup } from "@/components/icons/ProfessionalIcons";

export default function CommunityPage() {
    const benefits = [
        {
            icon: Users,
            title: "Network with Peers",
            description: "Connect with fellow Riad owners across Morocco and beyond. Share experiences, challenges, and success stories."
        },
        {
            icon: BookOpen,
            title: "Exclusive Resources",
            description: "Access our library of guides, templates, and best practices curated specifically for Riad hospitality."
        },
        {
            icon: Calendar,
            title: "Monthly Events",
            description: "Join virtual and in-person meetups, workshops, and masterclasses led by industry experts."
        },
        {
            icon: TrendingUp,
            title: "Growth Opportunities",
            description: "Discover partnership opportunities, cross-promotion possibilities, and collaborative marketing initiatives."
        },
        {
            icon: Award,
            title: "Recognition Program",
            description: "Get featured in our success stories, earn badges, and gain visibility within the community."
        },
        {
            icon: Heart,
            title: "Support System",
            description: "Access peer support, mentorship programs, and a community that understands your unique challenges."
        }
    ];

    const discussions = [
        {
            title: "Best practices for managing seasonal demand",
            author: "Fatima El-Mansouri",
            replies: 24,
            category: "Operations"
        },
        {
            title: "How I increased direct bookings by 200%",
            author: "Karim Benjelloun",
            replies: 18,
            category: "Marketing"
        },
        {
            title: "Sustainable practices in Riad management",
            author: "Amina Tazi",
            replies: 15,
            category: "Sustainability"
        }
    ];

    const events = [
        {
            title: "Digital Marketing Masterclass",
            date: "December 15, 2024",
            type: "Virtual Workshop",
            spots: "12 spots left"
        },
        {
            title: "Riad Owners Meetup - Marrakech",
            date: "January 20, 2025",
            type: "In-Person Event",
            spots: "Open Registration"
        },
        {
            title: "Revenue Management Strategies",
            date: "February 5, 2025",
            type: "Virtual Seminar",
            spots: "20 spots left"
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
                        <UsersGroup className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">RiadConnect Circle</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground">
                        Join a Community of <span className="text-primary">Passionate Riad Owners</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        Connect, learn, and grow with fellow Riad owners who share your passion for authentic
                        Moroccan hospitality. Together, we&apos;re stronger.
                    </p>

                    <Button asChild size="lg" className="px-8 py-5 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        <Link href="/waitlist">Join the Circle</Link>
                    </Button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Community Benefits</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            More than just a network—it&apos;s a support system designed for your success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, idx) => (
                            <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4">
                                        <benefit.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Discussions Section */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-2">Recent Discussions</h2>
                                <p className="text-muted-foreground">Join the conversation and share your insights</p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/waitlist">View All</Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {discussions.map((discussion, idx) => (
                                <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                        {discussion.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">{discussion.replies} replies</span>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                                                    {discussion.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">Started by {discussion.author}</p>
                                            </div>
                                            <MessageSquare className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Upcoming Events</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Learn from experts and connect with peers at our exclusive events
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.map((event, idx) => (
                                <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-semibold text-primary">{event.date}</span>
                                        </div>
                                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                                        <CardDescription className="text-sm">{event.type}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">{event.spots}</span>
                                            <Button size="sm" variant="outline">Register</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="container mx-auto px-8">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                            <Award className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Success Stories</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Community Wins</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Celebrating the achievements of our community members
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="bg-card backdrop-blur-sm border-border">
                            <CardContent className="pt-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Sparkles key={i} className="w-5 h-5 text-primary fill-primary" />
                                    ))}
                                </div>
                                <p className="text-lg italic text-muted-foreground mb-6 leading-relaxed">
                                    &quot;The RiadConnect community helped me navigate my first peak season. The advice and support
                                    I received was invaluable. My bookings increased by 150%!&quot;
                                </p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold">Youssef Alami</p>
                                    <p className="text-sm text-muted-foreground">Riad Dar Essalam, Fes</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card backdrop-blur-sm border-border">
                            <CardContent className="pt-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Sparkles key={i} className="w-5 h-5 text-primary fill-primary" />
                                    ))}
                                </div>
                                <p className="text-lg italic text-muted-foreground mb-6 leading-relaxed">
                                    &quot;Being part of this community opened doors to collaborations I never imagined. We now
                                    cross-promote with 5 other Riads and everyone benefits!&quot;
                                </p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-semibold">Leila Benani</p>
                                    <p className="text-sm text-muted-foreground">Riad Zitoun, Marrakech</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-xl">
                        <CardContent className="pt-10 pb-10 text-center">
                            <UsersGroup className="w-14 h-14 mx-auto mb-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Join the Circle?</h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                Become part of a thriving community of Riad owners committed to excellence,
                                innovation, and authentic Moroccan hospitality.
                            </p>
                            <Button asChild size="lg" className="px-8 py-5 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                                <Link href="/waitlist">Join the Waitlist</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
