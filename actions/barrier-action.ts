"use server"
import { db } from "@/lib/db";
import { CarStatus, OperationStatus } from "@prisma/client";

export const UpdateBarrierAction = async (id: string|null, barrierStatus: OperationStatus) => {
    try {
      if (id && barrierStatus !== null) {
        console.log("ID = " + id + " Barrier Status = " + barrierStatus);
        const updatedCar = await db.washedCar.update({
          where: { id:id },
          data: {
            barrierStatus: barrierStatus,
          },
        });
        return updatedCar;
      } else {
        console.log("ID veya Barrier Status null, güncelleme işlemi yapılmayacak.");
        return null;
      }
    } catch (error) {
      console.error("Error updating barrier status:", error);
      return null; 
    }
  };

  export const UpdateBarrierCloseAction = async (id: string|null) => {
    try {
      if (id) {
        const updatedCar = await db.washedCar.update({
          where: { id:id },
          data: {
            barrierStatus:OperationStatus.NONE,
          },
        });
        return updatedCar;
      } else {
        console.log("ID veya Barrier Status null, güncelleme işlemi yapılmayacak.");
        return null;
      }
    } catch (error) {
      console.error("Error updating barrier status:", error);
      return null; 
    }
  };