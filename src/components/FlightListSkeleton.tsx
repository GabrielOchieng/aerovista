"use client";

import { Box, Skeleton, Stack, useTheme } from "@mui/material";

export default function FlightListSkeleton({ count = 3 }: { count?: number }) {
  const theme = useTheme();

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: theme.palette.background.default,
        p: 2,
        borderRadius: 2,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          {/* Airline / Flight code */}
          <Skeleton
            variant="text"
            animation="wave"
            width={60}
            height={28}
            sx={{ bgcolor: theme.palette.action.hover }}
          />

          {/* Stops */}
          <Skeleton
            variant="text"
            animation="wave"
            width={100}
            height={18}
            sx={{ mt: 0.5, bgcolor: theme.palette.action.hover }}
          />

          {/* Price */}
          <Skeleton
            variant="text"
            animation="wave"
            width={120}
            height={22}
            sx={{ mt: 0.5, bgcolor: theme.palette.action.hover }}
          />
        </Box>
      ))}
    </Stack>
  );
}
