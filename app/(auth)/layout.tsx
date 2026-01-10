export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
       <div className="w-full max-w-md">
          {children}
       </div>
    </div>
  );
}
