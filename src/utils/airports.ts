export type Airport = {
  code: string;
  name: string;
  city: string;
  country: string;
};

// Example: fetch from Amadeus once and paste here
export const airports: Airport[] = [
  {
    code: "NBO",
    name: "Jomo Kenyatta Intl",
    city: "Nairobi",
    country: "Kenya",
  },
  { code: "KIS", name: "Kisumu Intl", city: "Kisumu", country: "Kenya" },
  {
    code: "JFK",
    name: "John F. Kennedy Intl",
    city: "New York",
    country: "USA",
  },
  { code: "LHR", name: "London Heathrow", city: "London", country: "UK" },
  // ... add all other airports you need
];
