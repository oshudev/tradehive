import ClientLayout from '@/Layouts/ClientLayout';
import { Head, Link } from '@inertiajs/react';

import { Button } from '@/Components/ui/button';

import { Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <ClientLayout>
      <Head title="Dashboard" />
      <div className="flex items-center justify-between">
        <h1 className="text-4xl">Your Jobs</h1>
        <Button size="lg" className="px-5 text-lg" asChild>
          <Link href={route('client.job-post')}>
            <Plus />
            Post a Job
          </Link>
        </Button>
      </div>
    </ClientLayout>
  );
}
