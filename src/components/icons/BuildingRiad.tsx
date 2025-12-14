import * as React from "react";

export function BuildingRiad({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Outer building structure */}
            <rect x="3" y="9" width="18" height="13" />
            {/* Archway/door */}
            <path d="M9 22V16a3 3 0 0 1 6 0v6" />
            {/* Decorative top with traditional Moroccan elements */}
            <path d="M3 9l9-7 9 7" />
            {/* Windows */}
            <rect x="5" y="12" width="3" height="3" />
            <rect x="16" y="12" width="3" height="3" />
            {/* Decorative pattern */}
            <circle cx="12" cy="6" r="1" />
        </svg>
    );
}
