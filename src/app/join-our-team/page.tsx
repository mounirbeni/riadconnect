import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const positions = [
    {
        title: "Senior Full Stack Developer",
        type: "Full-time",
        location: "Remote / Marrakech",
        desc: "Help us build the next generation of hospitality tools."
    },
    {
        title: "Customer Success Manager",
        type: "Full-time",
        location: "Marrakech",
        desc: "Be the face of RiadConnect for our valued partners."
    },
    {
        title: "Digital Marketing Specialist",
        type: "Contract",
        location: "Remote",
        desc: "Create compelling campaigns to grow our community."
    }
];

export default function JoinTeamPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-foreground">Join Our Team</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We&apos;re on a mission to revolutionize the Riad experience. If you&apos;re passionate, innovative, and love hospitality, we want to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {positions.map((job, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Briefcase className="w-10 h-10 text-primary mb-4" />
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription>{job.type} • {job.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6">{job.desc}</p>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/contact">Apply Now</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-secondary/30 rounded-3xl p-8 md:p-16 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">Don&apos;t see the right fit?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    We are always looking for talent. Send us your resume and tell us how you can make a difference.
                </p>
                <Button asChild size="lg">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </div>
    );
}
