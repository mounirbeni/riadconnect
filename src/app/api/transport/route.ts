import { NextResponse } from "next/server";
import { db } from "@/db";
import { transportRequests } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            serviceType,
            pickupLocation,
            pickupDateTime,
            dropoffLocation,
            passengers,
            luggage,
            vehiclePreference,
            flightDetails,
            specialRequests
        } = body;

        if (!name || !email || !phone || !serviceType || !pickupLocation || !pickupDateTime || !dropoffLocation || !passengers) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Service Type, Pickup/Dropoff Locations, Date/Time, and Passengers are required" },
                { status: 400 }
            );
        }

        await db.insert(transportRequests).values({
            name,
            email,
            phone,
            serviceType,
            pickupLocation,
            pickupDateTime,
            dropoffLocation,
            passengers: parseInt(passengers),
            luggage,
            vehiclePreference,
            flightDetails,
            specialRequests,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting transport request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const requests = await db.select().from(transportRequests).orderBy(desc(transportRequests.createdAt));
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error fetching transport requests:", error);
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

        await db.delete(transportRequests).where(eq(transportRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting transport request:", error);
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

        await db.update(transportRequests)
            .set(updateData)
            .where(eq(transportRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating transport request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
