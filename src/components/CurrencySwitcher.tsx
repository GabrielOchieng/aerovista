"use client";

import { MenuItem, Select, Stack, Typography } from "@mui/material";
import { useCurrency } from "@/store/useCurrency";
import { allowedCurrencies, type Currency } from "@/utils/currencies";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body2">Currency:</Typography>
      <Select
        size="small"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
      >
        {allowedCurrencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur} {/* You can add symbols later if needed */}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
