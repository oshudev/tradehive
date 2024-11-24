import { useState } from 'react';

import ClientLayout from '@/Layouts/ClientLayout';
import { Project, ProjectStatus } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

import ConfirmationModal from '@/Components/ConfirmationModal';
import { Button } from '@/Components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';
import { Plus } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
}

export default function Dashboard({ projects }: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedProject) {
      router.delete(
        route('client.project-delete', { id: selectedProject.id }),
        {
          onSuccess: () => closeModal(),
        }
      );
    }
  };

  return (
    <ClientLayout>
      <Head title="Dashboard" />
      <ConfirmationModal
        title="Confirm Delete"
        description={`Are you sure you want to delete the project "${selectedProject?.title}"?`}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl">Your Jobs</h1>
        <Button size="lg" className="px-5 text-lg" asChild>
          <Link href={route('client.job-post')}>
            <Plus />
            Post a Job
          </Link>
        </Button>
      </div>

      {/* Render table if there are projects */}
      {projects.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {project.description}
                </TableCell>
                <TableCell>${project.budget.toLocaleString()}</TableCell>
                <TableCell>{formatStatus(project.status)}</TableCell>
                <TableCell>{capitalizeFirstLetter(project.type)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* // TODO: Create edit functionality */}
                    <Button size="sm" variant="outline" asChild>
                      <Link href="">Edit</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openModal(project)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">
          No projects posted yet. Start by creating your first project!
        </p>
      )}
    </ClientLayout>
  );
}

function formatStatus(status: ProjectStatus): string {
  return capitalizeFirstLetter(status.replace('_', ' '));
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
