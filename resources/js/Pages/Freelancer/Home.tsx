import FreelancerLayout from '@/Layouts/FreelancerLayout';

import { ProjectRow } from '@/Components/Freelancer/ProjectRow';

import { Project } from '@/types';
import { Head } from '@inertiajs/react';

interface HomeProps {
  projects: Project[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    description: 'A complete online store with payment gateway integration.',
    budget: 5000,
    status: 'open',
    type: 'fixed',
  },
  {
    id: '2',
    title: 'Mobile App for Fitness Tracking',
    description:
      'Developing a cross-platform app for tracking fitness goals and activities.',
    budget: 3000,
    status: 'open',
    type: 'fixed',
  },
  {
    id: '3',
    title: 'SEO Optimization for Tech Blog',
    description: 'Improving search engine ranking and driving more traffic.',
    budget: 1200,
    status: 'open',
    type: 'fixed',
  },
  {
    id: '4',
    title: 'Custom CRM Tool',
    description:
      'Creating a CRM tool tailored to client needs for customer management.',
    budget: 8000,
    status: 'open',
    type: 'fixed',
  },
  {
    id: '5',
    title: 'Website Maintenance and Updates',
    description:
      'Ongoing maintenance and regular updates for a corporate website.',
    budget: 50,
    status: 'open',
    type: 'fixed',
  },
];

const Home = () => {
  return (
    <>
      <Head title="Home" />
      <h1 className="mb-10 text-2xl font-bold">Jobs you might like</h1>
      <div className="cursor-pointer">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FreelancerLayout children={page} />;

export default Home;
