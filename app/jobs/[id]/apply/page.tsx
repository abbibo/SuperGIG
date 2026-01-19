import ApplyClient from "./ApplyClient";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return [];
}

export default function ApplyPage() {
  return <ApplyClient />;
}
