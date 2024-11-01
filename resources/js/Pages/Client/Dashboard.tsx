import ClientLayout from '@/Layouts/ClientLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
  const user = usePage().props.auth.user;

  return (
    <ClientLayout>
      <Head title="Dashboard" />
    </ClientLayout>
  );
}
