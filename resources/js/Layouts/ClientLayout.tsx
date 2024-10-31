import ClientNav from '@/Components/Client/ClientNav';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ClientNav />
      {children}
    </>
  );
}
