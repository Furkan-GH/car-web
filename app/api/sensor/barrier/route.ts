import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus, PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const washedCar = await db.washedCar.findFirst();
    console.log("GET GET GET ****:", washedCar);

    return new NextResponse(JSON.stringify({ entity: washedCar, success: true }), {
      status: 200,
    });
  
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST() {
  try {
    const transaction = await db.$transaction(async (tx) => {
      console.log("Creating washedCar...");
      const washedCar = await tx.washedCar.create({
        data: {
          status: CarStatus.BARRIER,
        },
      });
      console.log("WashedCar created:", washedCar);
      localStorage.setItem("carID",washedCar.id);
      return  {washedCar} ;
    });
    
    return new NextResponse(JSON.stringify({ entity: transaction, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating washed car and data entry:", error);
    return new NextResponse(JSON.stringify({ message: "Error creating data", success: false }), {
      status: 500,
    });
  }
}
