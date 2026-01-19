"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack, Autocomplete, Box } from "@mui/material";
import { airports, Airport } from "@/utils/airports";
import { searchFormSchema, SearchFormData } from "@/schemas/searchFormSchema";

export default function SearchForm({
  onSearch,
}: {
  onSearch: (data: SearchFormData) => void;
}) {
  const { control, handleSubmit, register, formState } =
    useForm<SearchFormData>({
      resolver: zodResolver(searchFormSchema),
      defaultValues: {
        origin: "",
        destination: "",
        date: "",
      },
    });

  const { errors } = formState;

  const inputSx = { backgroundColor: "white", borderRadius: 1 };

  // 👇 today in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: "rgba(145, 140, 140, 0.6)",
        boxShadow: 3,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Origin */}
        <Controller
          name="origin"
          control={control}
          render={({ field }) => {
            const selectedAirport =
              airports.find((a) => a.code === field.value) || null;

            return (
              <Autocomplete
                options={airports}
                getOptionLabel={(option: Airport) =>
                  `${option.code} - ${option.city}, ${option.country}`
                }
                value={selectedAirport}
                onChange={(_, value: Airport | null) =>
                  field.onChange(value?.code || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Origin"
                    sx={inputSx}
                    error={!!errors.origin}
                    helperText={errors.origin?.message}
                  />
                )}
                sx={{ width: "100%" }}
              />
            );
          }}
        />

        {/* Destination */}
        <Controller
          name="destination"
          control={control}
          render={({ field }) => {
            const selectedAirport =
              airports.find((a) => a.code === field.value) || null;

            return (
              <Autocomplete
                options={airports}
                getOptionLabel={(option: Airport) =>
                  `${option.code} - ${option.city}, ${option.country}`
                }
                value={selectedAirport}
                onChange={(_, value: Airport | null) =>
                  field.onChange(value?.code || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destination"
                    sx={inputSx}
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                  />
                )}
                sx={{ width: "100%" }}
              />
            );
          }}
        />

        <TextField
          type="date"
          {...register("date")}
          slotProps={{
            htmlInput: {
              min: today,
            },
          }}
          sx={{ width: "100%", ...inputSx }}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <Button
          variant="contained"
          onClick={handleSubmit(onSearch)}
          sx={{ width: "100%" }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}
