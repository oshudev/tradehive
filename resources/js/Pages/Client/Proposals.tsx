import ClientLayout from '@/Layouts/ClientLayout';
import { Head, useForm } from '@inertiajs/react';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

import { toast } from '@/hooks/use-toast';

import { Proposal } from '@/types';

interface ProposalProps {
  proposals: Proposal[];
}

const Proposals = ({ proposals }: ProposalProps) => {
  const { patch, processing } = useForm();

  const handleAction = (proposalId: string, action: 'accept' | 'reject') => {
    patch(`/client/proposals/${proposalId}/${action}`, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: `Proposal has been ${action}ed.`,
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: `Failed to ${action} the proposal.`,
        });
      },
    });
  };

  return (
    <>
      <Head title="Proposals" />
      <div className="w-full p-4">
        <h2 className="mb-4 text-xl font-bold">Proposals</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Freelancer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Bid Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell>
                  {proposal.freelancer.first_name}{' '}
                  {proposal.freelancer.last_name}
                </TableCell>
                <TableCell>{proposal.freelancer.email}</TableCell>
                <TableCell>${proposal.bid_amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      proposal.status === 'pending'
                        ? 'secondary'
                        : proposal.status === 'accepted'
                          ? 'default'
                          : 'destructive'
                    }
                  >
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {proposal.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleAction(proposal.id, 'accept')}
                        disabled={processing}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(proposal.id, 'reject')}
                        disabled={processing}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

Proposals.layout = (page: React.ReactNode) => <ClientLayout children={page} />;

export default Proposals;
