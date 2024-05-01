import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const message = {
    "Barrier Endpoint is Running - ": "🚀",
  };
  try {
    const messageBody = JSON.stringify(message);

    return new NextResponse(messageBody, {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("Sensor Data:", body);

  try {
    console.error('Request Object:', body);

    const transaction = await db.$transaction(async (tx) => {
      console.log("Creating washedCar...");
      const washedCar = await tx.washedCar.create({
        data: {
          status: CarStatus.BARRIER,
        },
      });
      console.log("WashedCar created:", washedCar.id);

      return { washedCar };
    });
    // (TODO) We are work in this id value other section and sensors. Id value save in this state(zustand)
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
