import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
    return (
        <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <CheckCircle className="w-24 h-24 text-primary mb-6" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-10">
                Your submission has been received. We appreciate your interest in RiadConnect.
            </p>
            <Button asChild size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
