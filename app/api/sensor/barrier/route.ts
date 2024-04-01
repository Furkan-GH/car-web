import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CarStatus } from "@prisma/client";

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
// {
//     "sensorData": [
//       {
//         "sensorId": 1,
//         "value": 12.5,
//         "timestamp": "2023-11-16T12:34:56.789Z"
//       },
//       {
//         "sensorId": 2,
//         "value": 25.0,
//         "timestamp": "2023-11-16T12:34:56.789Z"
//       }
//     ]
//   }
  
