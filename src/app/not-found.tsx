import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Page Not Found</h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-10">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button asChild size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
