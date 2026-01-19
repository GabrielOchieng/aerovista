"use client";
import { useEffect } from "react";
import { useCurrency } from "@/store/useCurrency";

export function useFXAutoRefresh() {
  const fetchRates = useCurrency((s) => s.fetchRates);
  const lastUpdated = useCurrency((s) => s.lastUpdated);

  useEffect(() => {
    fetchRates(); // initial

    const SIX_HOURS = 1000 * 60 * 60 * 6;
    const interval = setInterval(fetchRates, SIX_HOURS);

    return () => clearInterval(interval);
  }, [fetchRates]);
}
