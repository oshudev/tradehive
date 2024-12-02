import { useState } from 'react';

import ClientLayout from '@/Layouts/ClientLayout';

import { Button } from '@/Components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

import { Contract } from '@/types';

import ConfirmationModal from '@/Components/ConfirmationModal';
import { Head, router } from '@inertiajs/react';

interface AllContractsProps {
  contracts: Contract[];
}

const AllContracts = ({ contracts }: AllContractsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const openModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (!selectedProjectId) return;

    router.patch(
      route('client.projects.cancel', { project: selectedProjectId }),
      {},
      {
        onSuccess: () => {
          closeModal();
        },
        onError: () => {
          closeModal();
        },
      }
    );
  };

  function formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <>
      <Head title="All Contracts" />
      <div className="container mx-auto p-6">
        <ConfirmationModal
          title="Cancel Contract"
          description="Are you sure you want to cancel this contract? This action cannot be undone."
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onConfirm={handleCancel}
          confirmText="Yes, Cancel It"
          cancelText="No, Keep It"
        />
        <h1 className="mb-4 text-2xl font-bold">All Contracts</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Freelancer</TableHead>
              <TableHead>Bid Amount</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Project Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>{contract.freelancer}</TableCell>
                <TableCell>{'$' + contract.bid_amount}</TableCell>
                <TableCell>{contract.title}</TableCell>
                <TableCell>{formatStatus(contract.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => openModal(contract.project_id)}
                    disabled={contract.status === 'cancelled'}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

AllContracts.layout = (page: React.ReactNode) => (
  <ClientLayout>{page}</ClientLayout>
);

export default AllContracts;
