import { FormEventHandler, useEffect } from 'react';

import { Project } from '@/types';
import { useForm } from '@inertiajs/react';

import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent } from '@/Components/ui/sheet';

interface EditJobPostProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  selectedProject: Project | null;
  closeSheet: () => void;
}

export default function EditJobPost({
  isSheetOpen,
  setIsSheetOpen,
  selectedProject,
  closeSheet,
}: EditJobPostProps) {
  const { data, setData, patch, processing, reset } = useForm({
    title: selectedProject?.title || '',
    description: selectedProject?.description || '',
    budget: selectedProject?.budget || 0,
    type: selectedProject?.type || '',
    status: selectedProject?.status || '',
  });

  useEffect(() => {
    if (selectedProject) {
      setData({
        title: selectedProject.title,
        description: selectedProject.description,
        budget: selectedProject.budget,
        type: selectedProject.type,
        status: selectedProject.status,
      });
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  const handleEditSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('client.job-post.update', { id: selectedProject?.id }), {
      onSuccess: closeSheet,
    });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <h2 className="mb-4 text-xl font-bold">Edit Project</h2>
        {selectedProject && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                value={data.budget}
                onChange={(e) => setData('budget', parseFloat(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <Button type="submit" className="w-full" disabled={processing}>
              Save Changes
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
