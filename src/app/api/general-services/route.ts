import { NextResponse } from "next/server";
import { db } from "@/db";
import { generalServiceRequests } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            serviceType,
            description,
            preferredDate,
            preferredTime,
            budgetRange,
            specialRequirements
        } = body;

        if (!name || !email || !phone || !serviceType || !description) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Service Type, and Description are required" },
                { status: 400 }
            );
        }

        await db.insert(generalServiceRequests).values({
            name,
            email,
            phone,
            serviceType,
            description,
            preferredDate,
            preferredTime,
            budgetRange,
            specialRequirements,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting general service request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const requests = await db.select().from(generalServiceRequests).orderBy(desc(generalServiceRequests.createdAt));
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error fetching general service requests:", error);
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

        await db.delete(generalServiceRequests).where(eq(generalServiceRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting general service request:", error);
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

        await db.update(generalServiceRequests)
            .set(updateData)
            .where(eq(generalServiceRequests.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating general service request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
