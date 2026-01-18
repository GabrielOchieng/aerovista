function formatDuration(iso: string) {
  // PT20H30M → 20h 30m
  const hours = iso.match(/(\d+)H/)?.[1];
  const minutes = iso.match(/(\d+)M/)?.[1];

  return [hours ? `${hours}h` : null, minutes ? `${minutes}m` : null]
    .filter(Boolean)
    .join(" ");
}
