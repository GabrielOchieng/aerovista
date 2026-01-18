"use client";
import { Box, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        // mt: 4,
        py: 3,
        px: 2,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1">© 2026 AirVista</Typography>
        <Stack direction="row" spacing={2}>
          <Link href="#" color="inherit" underline="hover">
            Privacy
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Terms
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Support
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
