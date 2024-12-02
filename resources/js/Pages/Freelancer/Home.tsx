import FreelancerLayout from '@/Layouts/FreelancerLayout';

import { ProjectRow } from '@/Components/Freelancer/ProjectRow';

import { Project } from '@/types';
import { Head } from '@inertiajs/react';

interface HomeProps {
  projects: Project[];
}

const Home = ({ projects }: HomeProps) => {
  return (
    <>
      <Head title="Home" />
      <h1 className="mb-10 text-2xl font-bold">Jobs you might like</h1>
      {projects.map((project) => (
        <ProjectRow key={project.id} project={project} />
      ))}
    </>
  );
};

Home.layout = (page: React.ReactNode) => <FreelancerLayout children={page} />;

export default Home;
