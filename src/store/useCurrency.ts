import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { allowedCurrencies, type Currency } from "@/utils/currencies";

type FXRates = Record<string, number>;

type CurrencyState = {
  currency: Currency;
  rates: FXRates;
  lastUpdated: number | null;
  setCurrency: (c: Currency) => void;
  fetchRates: () => Promise<void>;
  convertFromEUR: (eur: number) => number;
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "EUR",
      rates: { EUR: 1 },
      lastUpdated: null,

      setCurrency: (c) => set({ currency: c }),

      fetchRates: async () => {
        try {
          const res = await fetch(
            "https://api.frankfurter.app/latest?from=EUR",
          );

          const data = await res.json();

          const filteredRates: FXRates = { EUR: 1 };
          allowedCurrencies.forEach((cur) => {
            if (cur !== "EUR" && data.rates[cur])
              filteredRates[cur] = data.rates[cur];
          });

          set({
            rates: filteredRates,
            lastUpdated: Date.now(),
          });
        } catch (err) {}
      },

      convertFromEUR: (eur) => {
        const { currency, rates } = get();
        const rate = rates[currency] || 1;
        return eur * rate;
      },
    }),
    {
      name: "currency-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
