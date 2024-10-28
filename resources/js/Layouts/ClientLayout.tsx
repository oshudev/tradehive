import ClientNavigation from '@/Components/Client/ClientNavigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ClientNavigation />
      <main className="mx-auto mt-8 max-w-screen-2xl px-6">{children}</main>
    </>
  );
}
