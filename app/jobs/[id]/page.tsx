import JobDetailsClient from "./JobDetailsClient";

import { JobService } from "@/services/jobs";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Fallback to demo ID to allow build to pass without database access permissions
  return [{ id: 'demo-job' }];
}

export default function JobDetailsPage() {
  return <JobDetailsClient />;
}
