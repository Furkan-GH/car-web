"use server"
import { db } from "@/lib/db";
import { OperationStatus } from "@prisma/client";

export const UpdateWaterTankAction = async (id: string, waterTankStatus: OperationStatus) => {
    try {
      console.log("ID = "+id+"Barier Status = "+waterTankStatus);
      const updatedCar = await db.washedCar.update({
        where: { id },
        data: {
          waterTankStatus:waterTankStatus, 
        },
      });
  
      return updatedCar;
    } catch (error) {
      console.error("Error updating water tank status:", error);
      return null; 
    }
  };