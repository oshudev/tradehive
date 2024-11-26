import React, { useState } from 'react';

import ClientLayout from '@/Layouts/ClientLayout';
import { Project, ProjectStatus } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

import ConfirmationModal from '@/Components/ConfirmationModal';
import EditJobPost from '@/Components/EditJobPost';
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

const Dashboard = ({ projects }: DashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
          onSuccess: closeModal,
        }
      );
    }
  };

  const openSheet = (project: Project) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setSelectedProject(null);
    setIsSheetOpen(false);
  };

  return (
    <>
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
      <EditJobPost
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        selectedProject={selectedProject}
        closeSheet={closeSheet}
      />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl">Your Jobs</h1>
        <Button size="lg" className="px-5 text-lg" asChild>
          <Link href={route('client.job-post.index')}>
            <Plus />
            Post a Job
          </Link>
        </Button>
      </div>

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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openSheet(project)}
                    >
                      Edit
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
    </>
  );
};

function formatStatus(status: ProjectStatus): string {
  return capitalizeFirstLetter(status.replace('_', ' '));
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

Dashboard.layout = (page: React.ReactNode) => <ClientLayout children={page} />;

export default Dashboard;
