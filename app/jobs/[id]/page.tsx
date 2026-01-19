import JobDetailsClient from "./JobDetailsClient";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return [];
}

export default function JobDetailsPage() {
  return <JobDetailsClient />;
}
