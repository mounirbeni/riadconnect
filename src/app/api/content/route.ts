import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const content = await db.select().from(siteContent);
        // Transform array to object for easier consumption { key: value }
        const contentMap = content.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(contentMap);
    } catch (error) {
        console.error("Error fetching site content:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { key, value, section } = body;

        if (!key || value === undefined) {
            return NextResponse.json({ error: "Key and Value are required" }, { status: 400 });
        }

        // Check if exists
        const existing = await db.select().from(siteContent).where(eq(siteContent.key, key));

        if (existing.length > 0) {
            await db.update(siteContent)
                .set({ value, section, updatedAt: new Date() })
                .where(eq(siteContent.key, key));
        } else {
            await db.insert(siteContent).values({
                key,
                value,
                section
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating site content:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
