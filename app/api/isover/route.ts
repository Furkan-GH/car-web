import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;
    console.log("ID DEĞERI =>" + id);
    const transaction = await db.$transaction(async (tx) => {
      const washedCar = await tx.washedCar.delete({
        where: {
          id:id
        },
      });
      console.log("WashedCar deleted:", washedCar); 

      return { washedCar }; 
    });

    window.location.href = '/';

    return new NextResponse(JSON.stringify({ entity: transaction, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting washed car and data entry:", error);
    return new NextResponse(JSON.stringify({ message: "Error updating data", success: false }), {
      status: 500,
    });
  }
}
