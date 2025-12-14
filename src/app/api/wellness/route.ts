import { NextResponse } from "next/server";
import { db } from "@/db";
import { wellnessRequests } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            serviceType,
            preferredDate,
            preferredTime,
            numberOfPeople,
            treatmentPreferences,
            healthConsiderations,
            durationPreference,
            specialRequests
        } = body;

        if (!name || !email || !phone || !serviceType || !preferredDate || !numberOfPeople) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Service Type, Preferred Date, and Number of People are required" },
                { status: 400 }
            );
        }

        await db.insert(wellnessRequests).values({
            name,
            email,
            phone,
            serviceType,
            preferredDate,
            preferredTime,
            numberOfPeople: parseInt(numberOfPeople),
            treatmentPreferences,
            healthConsiderations,
            durationPreference,
            specialRequests,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting wellness request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const requests = await db.select().from(wellnessRequests).orderBy(desc(wellnessRequests.createdAt));
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error fetching wellness requests:", error);
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

        await db.delete(wellnessRequests).where(eq(wellnessRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting wellness request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, priority, notes } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updateData: Record<string, unknown> = { updatedAt: new Date() };
        if (status !== undefined) updateData.status = status;
        if (priority !== undefined) updateData.priority = priority;
        if (notes !== undefined) updateData.notes = notes;

        await db.update(wellnessRequests)
            .set(updateData)
            .where(eq(wellnessRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating wellness request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
