import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://riadconnect.ma";

    // Static pages
    const routes = [
        "",
        "/about",
        "/services",
        "/contact",
        "/waitlist",
        "/privacy",
        "/terms",
        "/join-our-team",
        "/survey",
        "/pricing",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    return routes;
}
