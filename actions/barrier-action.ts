"use server"

import { db } from "@/lib/db";
import { OperationStatus } from "@prisma/client";

export const UpdateBarrierAction = async (id: string, barrierStatus: OperationStatus) => {
    try {
      // (TODO) All sensor action file create and write this code 
      console.log("ID = "+id+"Barier Status = "+barrierStatus);
      const updatedCar = await db.washedCar.update({
        where: { id },
        data: {
          barrierStatus:barrierStatus, 
        },
      });
  
      return updatedCar;
    } catch (error) {
      console.error("Error updating barrier status:", error);
      return null; 
    }
  };