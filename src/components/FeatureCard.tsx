"use client";

import { Paper, Typography, Grid } from "@mui/material";

interface FeatureCardProps {
  title: string;
  description: string;
  xs?: number;
  md?: number;
}

export default function FeatureCard({
  title,
  description,
  xs = 12,
  md = 6,
}: FeatureCardProps) {
  return (
    <Grid size={{ xs: xs, md: md }}>
      <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
    </Grid>
  );
}
