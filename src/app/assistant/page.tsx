import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Bot, Sparkles, MessageSquareText } from "lucide-react";
import Link from "next/link";

export default function AssistantPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                        Meet Your New <span className="text-primary">AI Partner</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Leverage the power of artificial intelligence to automate tasks, personalize guest interactions, and gain actionable insights.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact">Request Demo</Link>
                    </Button>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-pulse">
                        <Bot className="w-32 h-32 text-primary" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <Sparkles className="w-10 h-10 text-primary mb-4" />
                        <CardTitle>Content Generation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Instantly generate engaging social media posts, blog articles, and email newsletters tailored to your Riad&apos;s voice.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <MessageSquareText className="w-10 h-10 text-primary mb-4" />
                        <CardTitle>Review Summarization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Aggregate reviews from multiple platforms and get AI-generated summaries of guest sentiment and areas for improvement.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Bot className="w-10 h-10 text-primary mb-4" />
                        <CardTitle>24/7 Guest Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            An intelligent chatbot that handles booking inquiries, FAQs, and concierge requests around the clock.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
