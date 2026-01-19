"use client";

import { useState, useMemo } from "react";
import { useCurrency } from "@/store/useCurrency";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TooltipMUI from "@mui/material/Tooltip";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import AreaChartIcon from "@mui/icons-material/StackedLineChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

type ChartType = "line" | "area" | "bar" | "stacked";

export default function PriceChart({ flights }: { flights: any[] }) {
  const { convertFromEUR, currency } = useCurrency();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [chartType, setChartType] = useState<ChartType>("line");

  // Base data for Line, Area, Bar
  const baseData = useMemo(
    () =>
      flights.map((f) => ({
        airline: f.validatingAirlineCodes[0],
        price: convertFromEUR(Number(f.price.total)),
      })),
    [flights, convertFromEUR, currency],
  );

  // Stacked bar data
  const stackedData = useMemo(() => {
    const grouped: Record<string, number[]> = {};
    flights.forEach((f) => {
      const airline = f.validatingAirlineCodes[0];
      const price = convertFromEUR(Number(f.price.total));
      if (!grouped[airline]) grouped[airline] = [];
      grouped[airline].push(price);
    });

    const maxDepth = Math.max(
      ...Object.values(grouped).map((v) => v.length),
      0,
    );

    const rows = Object.entries(grouped).map(([airline, prices]) => {
      const row: any = { airline };
      for (let i = 0; i < maxDepth; i++) row[`p${i}`] = prices[i] ?? 0;
      return row;
    });

    // sort ascending by total price
    rows.sort((a, b) => {
      const sum = (obj: any) =>
        Object.keys(obj)
          .filter((k) => k.startsWith("p"))
          .reduce((acc, k) => acc + obj[k], 0);
      return sum(a) - sum(b);
    });

    return rows;
  }, [flights, convertFromEUR, currency]);

  const ChartWrapper =
    chartType === "bar" || chartType === "stacked"
      ? BarChart
      : chartType === "area"
        ? AreaChart
        : LineChart;

  const chartData = chartType === "stacked" ? stackedData : baseData;

  return (
    <>
      {/* Chart Type Toggle  */}
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={(_, newType) => newType && setChartType(newType)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="line">
          <TooltipMUI title="Line Chart" arrow>
            <ShowChartIcon />
          </TooltipMUI>
        </ToggleButton>

        <ToggleButton value="area">
          <TooltipMUI title="Area Chart" arrow>
            <AreaChartIcon />
          </TooltipMUI>
        </ToggleButton>

        <ToggleButton value="bar">
          <TooltipMUI title="Bar Chart" arrow>
            <BarChartIcon />
          </TooltipMUI>
        </ToggleButton>

        <ToggleButton value="stacked">
          <TooltipMUI title="Stacked Bar Chart" arrow>
            <StackedBarChartIcon />
          </TooltipMUI>
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Chart  */}
      <ResponsiveContainer width="100%" height={300}>
        <ChartWrapper data={chartData}>
          <XAxis dataKey="airline" />
          <YAxis allowDecimals />
          <Tooltip />

          {chartType === "line" && (
            <Line type="monotone" dataKey="price" stroke={primaryColor} />
          )}
          {chartType === "area" && (
            <Area dataKey="price" stroke={primaryColor} fill={primaryColor} />
          )}
          {chartType === "bar" && <Bar dataKey="price" fill={primaryColor} />}
          {chartType === "stacked" &&
            stackedData.length > 0 &&
            Object.keys(stackedData[0])
              .filter((k) => k.startsWith("p"))
              .map((key, idx) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="price"
                  fill={`hsl(${idx * 45}, 70%, 50%)`}
                />
              ))}
        </ChartWrapper>
      </ResponsiveContainer>
    </>
  );
}
