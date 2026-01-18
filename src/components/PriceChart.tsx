"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PriceChart({ flights }: { flights: any[] }) {
  const data = flights.map((f) => ({
    airline: f.validatingAirlineCodes[0],
    price: Number(f.price.total),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="airline" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" />
      </LineChart>
    </ResponsiveContainer>
  );
}
