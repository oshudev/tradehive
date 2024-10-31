import ClientLayout from '@/Layouts/ClientLayout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
  const user = usePage().props.auth.user;

  return <ClientLayout>Hello World</ClientLayout>;
}
