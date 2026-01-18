import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FlightState = {
  selectedFlight: any | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setSelectedFlight: (flight: any) => void;
  clearSelectedFlight: () => void;
};

export const useSelectedFlight = create<FlightState>()(
  persist(
    (set) => ({
      selectedFlight: null,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      clearSelectedFlight: () => set({ selectedFlight: null }),
    }),
    {
      name: "selected-flight",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
