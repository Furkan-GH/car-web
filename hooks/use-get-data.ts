import {create} from "zustand";
import React from "react";

type IsBarrier = {
    carIsBarrier : boolean;
}

const useBarrierDataStore = create<IsBarrier>((set) => ({
    carIsBarrier: false,
    setCarIsBarrier: () => set((state) => ({
        carIsBarrier: !state.carIsBarrier,
    })),
}))


export default useBarrierDataStore;