import { db } from "@/db";
import { siteContent } from "@/db/schema";

export async function getSiteContent() {
    try {
        const content = await db.select().from(siteContent);
        return content.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error("Failed to fetch site content:", error);
        return {};
    }
}
