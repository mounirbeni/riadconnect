import { NextResponse } from "next/server";
import { db } from "@/db";
import { tourBookings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            tourType,
            preferredDate,
            preferredTime,
            participants,
            languagePreference,
            accessibilityRequirements,
            dietaryRestrictions,
            specialInterests,
            budgetRange
        } = body;

        if (!name || !email || !phone || !tourType || !preferredDate || !participants) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Tour Type, Preferred Date, and Participants are required" },
                { status: 400 }
            );
        }

        await db.insert(tourBookings).values({
            name,
            email,
            phone,
            tourType,
            preferredDate,
            preferredTime,
            participants: parseInt(participants),
            languagePreference,
            accessibilityRequirements,
            dietaryRestrictions,
            specialInterests,
            budgetRange,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting tour booking:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const tours = await db.select().from(tourBookings).orderBy(desc(tourBookings.createdAt));
        return NextResponse.json(tours);
    } catch (error) {
        console.error("Error fetching tour bookings:", error);
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

        await db.delete(tourBookings).where(eq(tourBookings.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting tour booking:", error);
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

        await db.update(tourBookings)
            .set(updateData)
            .where(eq(tourBookings.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating tour booking:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
