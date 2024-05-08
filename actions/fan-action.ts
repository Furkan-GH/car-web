"use server"
import { db } from "@/lib/db";
import { OperationStatus } from "@prisma/client";

export const UpdateFannAction = async (id: string | null, fanStatus: OperationStatus) => {
    try {
      console.log("ID = "+id+"Fan Status = "+fanStatus);
      if(id){
      const updatedCar = await db.washedCar.update({
        where: { id:id },
        data: {
          fanStatus:fanStatus, 
        },
      });
      return updatedCar;
    }else {
      console.log("ID veya Barrier Status null, güncelleme işlemi yapılmayacak.");
      return null;
    }
    } catch (error) {
      console.error("Error updating fan status:", error);
      return null; 
    }
  };