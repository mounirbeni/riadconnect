import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookingRequests } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            checkIn,
            checkOut,
            adults,
            children,
            roomPreferences,
            specialRequests,
            budgetRange
        } = body;

        if (!name || !email || !phone || !checkIn || !checkOut || !adults) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Check-in, Check-out, and Number of Adults are required" },
                { status: 400 }
            );
        }

        await db.insert(bookingRequests).values({
            name,
            email,
            phone,
            checkIn,
            checkOut,
            adults: parseInt(adults),
            children: children ? parseInt(children) : 0,
            roomPreferences,
            specialRequests,
            budgetRange,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting booking request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const bookings = await db.select().from(bookingRequests).orderBy(desc(bookingRequests.createdAt));
        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching booking requests:", error);
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

        await db.delete(bookingRequests).where(eq(bookingRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting booking request:", error);
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

        await db.update(bookingRequests)
            .set(updateData)
            .where(eq(bookingRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating booking request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
