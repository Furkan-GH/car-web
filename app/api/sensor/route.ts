import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const body = await req.json();

    console.log("Sensor Data:", body);

    try {
        console.error('Request Object:', body);

        const transaction = await db.$transaction(async (tx) => {
            console.log("Deleting washedCar...");
            console.log(body.id)
            if(body.id === ""){
                console.warn("Empty Id !!! All washedCars are deleting...");
                await tx.washedCar.deleteMany();
                console.log("Deleted all washedCars.");
            }else{
            const washedCar = await tx.washedCar.delete({ 
                where: { 
                    id: body.id 
                }});
            console.log("WashedCar delete:", washedCar.id);
            return { washedCar };}
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

export async function GET() {
    const message = {
      " Endpoint is Running - ": "🚀",
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