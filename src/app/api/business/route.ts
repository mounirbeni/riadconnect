import { NextResponse } from "next/server";
import { db } from "@/db";
import { businessCollaborations } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            companyName,
            businessType,
            collaborationInterest,
            proposalDetails,
            expectedTimeline,
            website
        } = body;

        if (!name || !email || !phone || !companyName || !businessType || !collaborationInterest || !proposalDetails) {
            return NextResponse.json(
                { error: "Name, Email, Phone, Company Name, Business Type, Collaboration Interest, and Proposal Details are required" },
                { status: 400 }
            );
        }

        await db.insert(businessCollaborations).values({
            name,
            email,
            phone,
            companyName,
            businessType,
            collaborationInterest,
            proposalDetails,
            expectedTimeline,
            website,
        });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error submitting business collaboration:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const collaborations = await db.select().from(businessCollaborations).orderBy(desc(businessCollaborations.createdAt));
        return NextResponse.json(collaborations);
    } catch (error) {
        console.error("Error fetching business collaborations:", error);
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

        await db.delete(businessCollaborations).where(eq(businessCollaborations.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting business collaboration:", error);
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

        await db.update(businessCollaborations)
            .set(updateData)
            .where(eq(businessCollaborations.id, parseInt(id)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating business collaboration:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
