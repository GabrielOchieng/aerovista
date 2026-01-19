// import ResultsClient from "@/components/ResultsClient";

// export default function ResultsPage() {
//   return <ResultsClient />;
// }

import { Suspense } from "react";
import ResultsClient from "@/components/ResultsClient";
import FlightListSkeleton from "@/components/FlightListSkeleton";

export default function ResultsPage() {
  return (
    <Suspense fallback={<FlightListSkeleton count={5} />}>
      <ResultsClient />
    </Suspense>
  );
}
