"use server"
import { db } from "@/lib/db";
import { CarStatus, OperationStatus } from "@prisma/client";

export const UpdateWaterTankAction = async (id: string | null, waterTankStatus: OperationStatus) => {
    try {
      if(id){
      console.log("ID = "+id+"Barier Status = "+waterTankStatus);
      const updatedCar = await db.washedCar.update({
        where: { id },
        data: {
          waterTankStatus:waterTankStatus, 
        },
      });
      return updatedCar;
    }else {
      console.log("ID veya Barrier Status null, güncelleme işlemi yapılmayacak.");
      return null;
    }
    } catch (error) {
      console.error("Error updating water tank status:", error);
      return null; 
    }
  };

  export const UpdateWatertankCloseAction = async (id: string|null) => {
    try {
      if (id) {
        const updatedCar = await db.washedCar.update({
          where: { id:id },
          data: {
            waterTankStatus:OperationStatus.NONE,
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