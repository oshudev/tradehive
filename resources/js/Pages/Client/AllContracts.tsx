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
          alert('Contract cancelled successfully.');
          closeModal();
        },
        onError: () => {
          alert('Failed to cancel the contract. Please try again.');
          closeModal();
        },
      }
    );
  };

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
                <TableCell>{contract.bid_amount}</TableCell>
                <TableCell>{contract.title}</TableCell>
                <TableCell>{contract.status}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => openModal(contract.id)}
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