"use server"
import { db } from "@/lib/db";
import { OperationStatus } from "@prisma/client";

export const UpdateFannAction = async (id: string, fanStatus: OperationStatus) => {
    try {
      console.log("ID = "+id+"Fan Status = "+fanStatus);
      const updatedCar = await db.washedCar.update({
        where: { id },
        data: {
          fanStatus:fanStatus, 
        },
      });
  
      return updatedCar;
    } catch (error) {
      console.error("Error updating fan status:", error);
      return null; 
    }
  };