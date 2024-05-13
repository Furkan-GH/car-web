import { create } from 'zustand';

type TemperatureState = {
  temp: number | null;
  newTemp: number | null;
  setTemp: (newTemp: number | null) => void;
};

const useTemperature = create<TemperatureState>((set) => ({
  temp: null,
  newTemp: null,
  setTemp: (newTemp: number | null) =>
    set((prevState) => ({ ...prevState, temp: newTemp, newTemp: null })),
}));

export default useTemperature;

