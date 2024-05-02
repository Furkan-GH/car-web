import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus, WashedCar } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import useCurrentCarData from "@/hooks/use-current-car-data";
import React from "react";
import { UpdateBarrierAction } from "@/actions/barrier-action";


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
  //const { setCarId,setCarStatus } = useCurrentCarData();

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
      
      
      //setCarId(washedCar.id);
      //setCarStatus(CarStatus.BARRIER);

      return { washedCar };
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
