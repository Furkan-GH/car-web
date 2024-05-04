import { CarStatus } from "@prisma/client";
import { create } from "zustand";

type CurrentCarData = {
  carId: string | null;
  setCarId: (id: string) => void;

  carBarrierStatus: boolean;
  setCarBarierStatus: () => void;
  carFanStatus: boolean;
  setCarFanStatus: () => void;
  carWaterTankStatus: boolean;
  setCarWaterTankStatus: () => void;
  carCameraStatus: boolean;
  setCarCameraStatus: () => void;

  isOver:boolean;
  setIsOver:()=>void;

  error: any; 
  setError: (error: string) => void; 
};

const useCurrentCarData = create<CurrentCarData>((set) => ({
  carId: null,
  carBarrierStatus: false,
  carFanStatus:false,
  carWaterTankStatus:false,
  carCameraStatus:false,
  isOver:false,
  error: null, 

  setCarId:(id: string) => set((state) => ({ carId: id })),
  setCarBarierStatus: () => set({carBarrierStatus: true}),
  setCarWaterTankStatus:()=> set({carWaterTankStatus: true,carBarrierStatus:false}),
  setCarFanStatus: ()=> set({carFanStatus: true,carWaterTankStatus:false}),
  setCarCameraStatus:()=> set({carCameraStatus: true,carFanStatus:false}),
  setIsOver:()=>set({
    carId:null,  carBarrierStatus: false,
    carFanStatus:false,
    carWaterTankStatus:false,
    carCameraStatus:false,
    isOver:false,
    error: null,}),
  setError: (error: any) => set((prev) => ({ ...prev, error: error })),
}));

export default useCurrentCarData;