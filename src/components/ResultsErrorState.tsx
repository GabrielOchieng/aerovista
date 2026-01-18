"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouter } from "next/navigation";

type ResultsErrorStateProps = {
  message?: string;
};

export default function ResultsErrorState({
  message = "Please try your search again. If the problem persists, check your connection or try a different date.",
}: ResultsErrorStateProps) {
  const router = useRouter();

  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Stack spacing={2} alignItems="center">
        <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />

        <Typography variant="h6">
          OOPs!!! We hit a snag loading flights
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
          {message}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Start a New Search
        </Button>
      </Stack>
    </Box>
  );
}
