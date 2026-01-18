async function fetchRates(base = "USD") {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${base}`);
  if (!res.ok) throw new Error("Failed to fetch rates");
  return res.json();
}
