import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus } from "@prisma/client";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import useBarrierDataStore from "@/hooks/use-get-data";
import React from "react";

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
    //const setCarIsBarrier = useBarrierDataStore((state) => state.carIsBarrier);
    const body = await req.json();
    const sensorDataSchema = z.array(
      z.object({
        sensorId: z.string().nonempty(),
        value: z.number(),
        timestamp : z.string().datetime(),
        state: z.boolean(),
      })
    )

    console.log("Sensor Data:", body);
  
    try {
      const validatedData = sensorDataSchema.safeParse(body.sensorData);

      if(!validatedData.success){
        console.error('Validation errors:', validatedData.error.issues);
      return new NextResponse(JSON.stringify({ message: 'Invalid sensor data format', success: false }), {
        status: 400 // Bad Request
      });
      }

      //const sensorData = validatedData.data;
      



      const transaction = await db.$transaction(async (tx) => {
        console.log("Creating washedCar...");
        const washedCar = await tx.washedCar.create({
          data: {
            status: CarStatus.BARRIER,
          },
        });
        console.log("WashedCar created:", washedCar.id);
  
        console.log("Creating dataEntity...");
        const dataEntity = await tx.sensorData.create({
          data: {
            washedCarId: washedCar.id,
            name: "Barrier Data at " + washedCar.createdDate,
            sensorData: body,
          },
        });
        console.log("DataEntity created:", dataEntity.id);
  
        return { washedCar, dataEntity };
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

// ORNEK API'YE POST ISTEGİ ATILACAK FORMAT 
//{
//  "sensorData" : [
//      {
//        "sensorId": "sensor123",
//        "value": 12.5,
//        "timestamp": "2024-04-24T18:23:00.000Z",
//        "state": true
//      }
//    ]
//  }
  
