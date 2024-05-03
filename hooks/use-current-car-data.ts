import { CarStatus } from "@prisma/client";
import { create } from "zustand";

type CurrentCarData = {
  carId: string | null; 
  setCarId: (id:string) => void;
  carStatus: CarStatus;
  setCarStatus: (status:CarStatus) => void;
};

const useCurrentCarData = create<CurrentCarData>((set) => ({
  carId: null,
  carStatus: CarStatus.NONE, 

  setCarId: (id: string) => set((state) => ({ carId: id })),
  setCarStatus: (newStatus: CarStatus) => set((prev) => ({ ...prev, carStatus: newStatus })),
}));

export default useCurrentCarData;