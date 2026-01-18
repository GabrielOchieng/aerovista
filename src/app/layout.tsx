import { ReactNode } from "react";
import Providers from "./providers";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>AirVista - Flight Search Engine</title>
        <meta
          name="description"
          content="Search and compare flights with AirVista. Find the best prices and routes for your next trip."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Providers>
          <Navbar />

          <main style={{ flex: 1 }}>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
