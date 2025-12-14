import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import images from "@/lib/placeholder-images.json";

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section with Founder Image */}
            <section className="relative bg-gradient-to-br from-secondary/50 to-background py-20 md:py-32">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Founder Image */}
                        <div className="order-2 lg:order-1">
                            <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src={images.founder.src}
                                    alt={images.founder.alt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Introductory Text */}
                        <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
                                Our Mission & Vision
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                At RiadConnect, we are dedicated to preserving the authentic charm of Moroccan hospitality
                                while empowering Riad owners with cutting-edge digital tools.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our vision is to bridge the gap between tradition and innovation, ensuring that every Riad
                                can thrive in the modern era without compromising the soul of what makes it special.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Authenticity",
                                desc: "We honor the rich heritage of Moroccan culture in everything we do. Your Riad's unique character is sacred to us."
                            },
                            {
                                title: "Innovation",
                                desc: "We constantly seek new ways to improve and modernize Riad operations while respecting traditional values."
                            },
                            {
                                title: "Partnership",
                                desc: "We view ourselves as partners in your success, not just service providers. Your growth is our mission."
                            },
                        ].map((value, index) => (
                            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-primary">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder's Message */}
            <section className="bg-secondary/30 py-20">
                <div className="container mx-auto px-8">
                    <Card className="max-w-4xl mx-auto bg-card backdrop-blur-md border-border">
                        <CardHeader>
                            <CardTitle className="text-3xl font-serif text-center">A Message from the Founder</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <blockquote className="text-lg md:text-xl italic text-muted-foreground text-center leading-relaxed border-l-4 border-primary pl-6">
                                &quot;I founded RiadConnect with a simple belief: that the magic of a Riad shouldn&apos;t be hidden
                                behind outdated systems or overshadowed by commission-hungry platforms. Every Riad has a
                                story to tell, and every owner deserves the tools to share that story with the world—effortlessly
                                and authentically.&quot;
                            </blockquote>
                            <div className="text-center pt-4">
                                <p className="font-bold text-lg text-foreground">Mounir Banni</p>
                                <p className="text-muted-foreground">Founder & CEO, RiadConnect</p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed pt-6">
                                Growing up surrounded by Morocco&apos;s incredible hospitality culture, I witnessed firsthand the
                                passion and dedication Riad owners pour into their craft. Yet I also saw how technology often
                                felt like a barrier rather than an enabler. RiadConnect was born from the desire to change that—to
                                create a platform that feels as welcoming and intuitive as the Riads it serves.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Join Team CTA */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-8 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join Our Mission</h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                        Are you passionate about hospitality and technology? We are always looking for talented individuals
                        who share our vision of empowering Riad owners across Morocco and beyond.
                    </p>
                    <Button asChild size="lg" className="text-lg px-10 py-6 h-auto rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        <Link href="/join-our-team">View Open Positions</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}