import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus, PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const washedCar = await db.washedCar.findFirst({
        where:{
            id:localStorage.getItem("carID")!
        }});
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

export async function POST(req : NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;
    console.log("ID DEĞERI => "+ id);
    const transaction = await db.$transaction(async (tx) => {
      console.log("Updating washedCar...");
      const washedCar = await tx.washedCar.update({
        where:{
            id:id
        },
        data: {
          status: CarStatus.FAN,
        },
      });
      console.log("WashedCar Updated:", washedCar);
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
