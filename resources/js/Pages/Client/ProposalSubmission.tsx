import { FormEventHandler } from 'react';

import FreelancerLayout from '@/Layouts/FreelancerLayout';
import { Project } from '@/types';
import { useForm } from '@inertiajs/react';

interface ProposalSubmissionProps {
  project: Project;
}

const ProposalSubmission = ({ project }: ProposalSubmissionProps) => {
  const { data, setData, post, processing } = useForm({
    bid_amount: '',
    project_id: project.id,
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('freelancer.proposal.store', { id: project.id }));
  };

  return (
    <div className="mx-auto max-w-md rounded bg-white p-4 shadow">
      <h1 className="mb-4 text-2xl font-bold">
        Submit Your Proposal to {project.title}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="bid_amount"
            className="block text-sm font-medium text-gray-700"
          >
            Bid Amount
          </label>
          <input
            type="number"
            id="bid_amount"
            value={data.bid_amount}
            onChange={(e) => setData('bid_amount', e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring focus:ring-green-300"
          disabled={processing}
        >
          Submit Proposal
        </button>
      </form>
    </div>
  );
};

ProposalSubmission.layout = (page: React.ReactNode) => (
  <FreelancerLayout children={page} />
);

export default ProposalSubmission;
