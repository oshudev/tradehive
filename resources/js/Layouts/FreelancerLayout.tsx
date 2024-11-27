import Navigation from '@/Components/Freelancer/Navigation';

interface FreelancerLayoutProps {
  children: React.ReactNode;
}

export default function FreelancerLayout({ children }: FreelancerLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="mx-auto mt-8 pb-6 max-w-screen-2xl px-6">{children}</main>
    </>
  );
}
