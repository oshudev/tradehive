import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <header className="bg-neutral-100">
        <nav className="mx-auto max-w-screen-2xl p-4 text-2xl font-bold">
          <Link href="/">Tradehive</Link>
        </nav>
      </header>
      <main className="min-h-screen bg-neutral-100">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
