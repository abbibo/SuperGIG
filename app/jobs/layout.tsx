import { AppShell } from "@/components/layout/AppShell";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell title="Works">
      {children}
    </AppShell>
  );
}
