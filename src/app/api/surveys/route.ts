import { db } from "@/db";
import { surveyResponses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// POST - Create new survey response
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            riadName,
            location,
            currentChallenges,
            digitalTools,
            budget,
            priorities,
            additionalComments
        } = body;

        // Validate required fields
        if (!name || !email || !riadName) {
            return NextResponse.json(
                { error: "Name, email, and riad name are required" },
                { status: 400 }
            );
        }

        await db.insert(surveyResponses).values({
            name,
            email,
            phone,
            riadName,
            location,
            currentChallenges,
            digitalTools,
            budget,
            priorities,
            additionalComments
        });

        return NextResponse.json({ message: "Survey response submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating survey response:", error);
        return NextResponse.json({ error: "Failed to submit survey response" }, { status: 500 });
    }
}

// GET - Retrieve all survey responses
export async function GET() {
    try {
        const responses = await db.select().from(surveyResponses).orderBy(surveyResponses.createdAt);
        return NextResponse.json(responses);
    } catch (error) {
        console.error("Error fetching survey responses:", error);
        return NextResponse.json({ error: "Failed to fetch survey responses" }, { status: 500 });
    }
}

// DELETE - Delete a survey response
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Survey response ID is required" }, { status: 400 });
        }

        await db.delete(surveyResponses).where(eq(surveyResponses.id, parseInt(id)));
        return NextResponse.json({ message: "Survey response deleted successfully" });
    } catch (error) {
        console.error("Error deleting survey response:", error);
        return NextResponse.json({ error: "Failed to delete survey response" }, { status: 500 });
    }
}

// PATCH - Update survey response status or notes
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json({ error: "Survey response ID is required" }, { status: 400 });
        }

        const updateData: { status?: string; notes?: string } = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        await db.update(surveyResponses)
            .set(updateData)
            .where(eq(surveyResponses.id, id));

        return NextResponse.json({ message: "Survey response updated successfully" });
    } catch (error) {
        console.error("Error updating survey response:", error);
        return NextResponse.json({ error: "Failed to update survey response" }, { status: 500 });
    }
}
