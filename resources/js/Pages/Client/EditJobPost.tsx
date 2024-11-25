import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Textarea } from '@/Components/ui/textarea';
import ClientLayout from '@/Layouts/ClientLayout';
import { Project } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface EditJobPostProps {
  project: Project;
}

export default function EditJobPost({ project }: EditJobPostProps) {
  const { data, setData, patch, processing, errors } = useForm({
    id: project.id,
    title: project.title,
    description: project.description,
    budget: project.budget as number,
    type: project.type as string,
    status: project.status,
    from: '',
    to: '',
  });

  const calculateBudget = () => {
    if (data.type === 'hourly' && data.from && data.to) {
      const fromValue = parseFloat(data.from);
      const toValue = parseFloat(data.to);
      if (!isNaN(fromValue) && !isNaN(toValue)) {
        return ((fromValue + toValue) / 2).toFixed(2);
      }
    }
    return data.budget;
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    setData('budget', calculateBudget());
    patch(route('client.job-post.update'));
  };

  return (
    <ClientLayout>
      <Head title="Edit Job Post" />
      <h1 className="text-4xl">Post a job</h1>
      <form onSubmit={submit} className="mx-auto max-w-[560px] px-7 py-12">
        <input type="hidden" name="id" value={data.id} />
        <div className="mb-8 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title" className="text-lg">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && <div className="text-red-600">{errors.title}</div>}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description" className="text-lg">
              Description
            </Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="resize-none"
            />
            {errors.description && (
              <div className="text-red-600">{errors.description}</div>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">Budget</Label>
            <RadioGroup
              onValueChange={(value) => setData('type', value)}
              className="flex gap-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly">Hourly</Label>
              </div>
            </RadioGroup>
            {errors.type && <div className="text-red-600">{errors.type}</div>}

            {data.type === 'hourly' ? (
              <div className="grid grid-cols-2 gap-x-2">
                <div className="w-40">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    type="number"
                    value={data.from}
                    onChange={(e) => setData('from', e.target.value)}
                  />
                </div>
                <div className="w-40">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    type="number"
                    value={data.to}
                    onChange={(e) => setData('to', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <Input
                id="budget"
                type="number"
                value={data.budget}
                onChange={(e) => setData('budget', e.target.value)}
                className="mt-4 w-40"
              />
            )}
            {errors.budget && (
              <div className="text-red-600">{errors.budget}</div>
            )}
          </div>
        </div>

        <div className="flex gap-x-4">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="text-md"
            disabled={processing}
          >
            {processing ? 'Submitting...' : 'Submit'}
          </Button>
          <Button variant="ghost" size="lg" className="text-md" asChild>
            <Link href="/client/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </ClientLayout>
  );
}
