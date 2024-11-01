import ClientNavigation from '@/Components/Client/ClientNavigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ClientNavigation />
      <main className="w-full">{children}</main>
    </>
  );
}
