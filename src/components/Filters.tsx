"use client";
import {
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import CurrencySwitcher from "./CurrencySwitcher";

type FiltersState = {
  maxPrice: number;
  stops: string;
  airlines: string[];
};

export default function Filters({
  flights,
  filters,
  setFilters,
}: {
  flights: any[];
  filters: FiltersState;
  setFilters: (f: FiltersState) => void;
}) {
  // get airlines from res
  const airlines = Array.from(
    new Set(flights.map((f) => f.validatingAirlineCodes[0])),
  );

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Filters</Typography>
        <CurrencySwitcher />
      </Stack>

      {/* Price */}
      <Typography gutterBottom>Max Price</Typography>
      <Slider
        value={filters.maxPrice}
        min={50}
        max={2000}
        step={50}
        valueLabelDisplay="auto"
        onChange={(_, value) =>
          setFilters({ ...filters, maxPrice: value as number })
        }
      />

      {/* Stops */}
      <Typography gutterBottom mt={2}>
        Stops
      </Typography>
      <Select
        fullWidth
        value={filters.stops}
        onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
      >
        <MenuItem value="any">Any</MenuItem>
        <MenuItem value="0">Non-stop</MenuItem>
        <MenuItem value="1">1 Stop</MenuItem>
        <MenuItem value="2">2+ Stops</MenuItem>
      </Select>

      {/* Airlines */}
      <Typography gutterBottom mt={2}>
        Airlines
      </Typography>
      <div
        style={{
          maxHeight: 200,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        <FormGroup>
          {airlines.map((code) => (
            <FormControlLabel
              key={code}
              control={
                <Checkbox
                  checked={filters.airlines.includes(code)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filters.airlines, code]
                      : filters.airlines.filter((a) => a !== code);

                    setFilters({ ...filters, airlines: updated });
                  }}
                />
              }
              label={code}
            />
          ))}
        </FormGroup>
      </div>
    </Box>
  );
}
