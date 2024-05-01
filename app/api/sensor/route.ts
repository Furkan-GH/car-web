import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const body = await req.json();

    console.log("Sensor Data:", body);

    try {
        console.error('Request Object:', body);

        const transaction = await db.$transaction(async (tx) => {
            console.log("Deleting washedCar...");
            const washedCar = await tx.washedCar.delete({ where: { id: body.id } });
            //(TODO) İf id value is empty we delete all washed car in db
            console.log("WashedCar delete:", washedCar.id);

            return { washedCar };
        });

        return new NextResponse(JSON.stringify({ entity: transaction, success: true }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting washed car and data entry:", error);
        return new NextResponse(JSON.stringify({ message: "Error deleting data", success: false }), {
            status: 500,
        });
    }
}