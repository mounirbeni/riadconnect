import { NextResponse } from "next/server";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, riadName, role } = body;

        if (!email || !name) {
            return NextResponse.json(
                { error: "Email and Name are required" },
                { status: 400 }
            );
        }

        await db.insert(waitlistEntries).values({
            email,
            name,
            riadName,
            role,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting to waitlist:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const entries = await db.select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt));
        return NextResponse.json(entries);
    } catch (error) {
        console.error("Error fetching waitlist:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await db.delete(waitlistEntries).where(eq(waitlistEntries.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting waitlist entry:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "ID and Status are required" }, { status: 400 });
        }

        await db.update(waitlistEntries)
            .set({ status })
            .where(eq(waitlistEntries.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating waitlist entry:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
