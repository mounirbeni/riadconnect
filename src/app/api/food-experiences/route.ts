import { NextResponse } from "next/server";
import { db } from "@/db";
import { foodExperiences } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            experienceType,
            preferredDate,
            preferredTime,
            guests,
            dietaryRestrictions,
            cuisinePreferences,
            specialOccasion,
            specialRequests
        } = body;

        if (!name || !email || !phone || !experienceType || !preferredDate || !guests) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Experience Type, Preferred Date, and Number of Guests are required" },
                { status: 400 }
            );
        }

        await db.insert(foodExperiences).values({
            name,
            email,
            phone,
            experienceType,
            preferredDate,
            preferredTime,
            guests: parseInt(guests),
            dietaryRestrictions,
            cuisinePreferences,
            specialOccasion,
            specialRequests,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting food experience request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const experiences = await db.select().from(foodExperiences).orderBy(desc(foodExperiences.createdAt));
        return NextResponse.json(experiences);
    } catch (error) {
        console.error("Error fetching food experiences:", error);
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

        await db.delete(foodExperiences).where(eq(foodExperiences.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting food experience:", error);
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

        await db.update(foodExperiences)
            .set(updateData)
            .where(eq(foodExperiences.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating food experience:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
