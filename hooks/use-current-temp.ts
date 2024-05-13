import { create } from "zustand";

type TemperatureState = {
    temp: number | null; 
    setTemp: (temp: number | null) => void; 
};

const useTemperature = create<TemperatureState>((set) => ({
    temp: null, 
    setTemp: (temp) => set({temp,setTemp(temp) {
        null
    }, }), 
}));

export default useTemperature;
