import { Project } from '@/types';

interface ProjectRowProps {
  project: Project;
}

export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <div className="border-b px-4 py-6 hover:bg-gray-50">
      <div className="flex-1">
        <h2 className="mb-2 text-xl font-medium text-gray-800">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600">
            {`${firstWordCapitalize(project.type)} - Est. Budget: $${project.budget}`}
        </p>
      </div>
      <div className="mt-6">
        <p className="text-xl">{project.description}</p>
      </div>
    </div>
  );
}

function firstWordCapitalize(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
