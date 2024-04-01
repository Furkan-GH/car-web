"use server"

import { db } from "@/lib/db";
import { OperationStatus } from "@prisma/client";

export const UpdateBarrierAction = async (id: string, barrierStatus: OperationStatus) => {
    try {
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