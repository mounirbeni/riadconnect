"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();

    // Mounted check to avoid hydration mismatch
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className="w-9 h-9 opacity-0" aria-hidden="true" />;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle theme"
        >
            <Sun
                className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-all",
                    resolvedTheme === "dark" ? "-rotate-90 scale-0 text-foreground" : "rotate-0 scale-100 text-foreground"
                )}
            />
            <Moon
                className={cn(
                    "absolute h-[1.2rem] w-[1.2rem] transition-all",
                    resolvedTheme === "dark" ? "rotate-0 scale-100 text-foreground" : "rotate-90 scale-0 text-foreground"
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
