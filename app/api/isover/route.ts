import { db } from "@/lib/db";
import { CarStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    const transaction = await db.$transaction(async (tx) => {
      console.log("Updating washedCar...");
      const washedCar = await tx.washedCar.update({
        where:{
            id:localStorage.getItem("carID")!
        },
        data: {
          status: CarStatus.FINISH,
        },
      });
      console.log("WashedCar Finish...", washedCar);
      localStorage.removeItem(washedCar.id);

      return  {washedCar} ;
    });
    
    return new NextResponse(JSON.stringify({ entity: transaction, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating washed car and data entry:", error);
    return new NextResponse(JSON.stringify({ message: "Error updating data", success: false }), {
      status: 500,
    });
  }
}
  