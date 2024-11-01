import { useState } from 'react';

import ClientLayout from '@/Layouts/ClientLayout';
import { Head } from '@inertiajs/react';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Textarea } from '@/Components/ui/textarea';

type BudgetType = 'hourly' | 'fixed';

export default function JobPost() {
  const [budgetType, setBudgetType] = useState<BudgetType | ''>('');

  return (
    <ClientLayout>
      <Head title="Post a Job" />
      <h1 className="text-4xl">Post a job</h1>
      <form className="mx-auto max-w-[560px] px-7 py-12">
        <div className="mb-8 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title" className="text-lg">
              Title
            </Label>
            <Input id="title" type="text"></Input>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description" className="text-lg">
              Description
            </Label>
            <Textarea className="resize-none" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">Budget</Label>
            <RadioGroup
              onValueChange={(value: BudgetType) => setBudgetType(value)}
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
            {budgetType === 'hourly' ? (
              <div className="grid grid-cols-2 gap-x-2">
                <div className="w-40">
                  <Label htmlFor="from">From</Label>
                  <Input id="from" type="text" />
                </div>
                <div className="w-40">
                  <Label htmlFor="to">To</Label>
                  <Input id="to" type="text" />
                </div>
              </div>
            ) : (
              <Input id="budget" type="text" className="mt-4 w-40"></Input>
            )}
          </div>
        </div>
        <div className="flex gap-x-4">
          <Button variant="secondary" size="lg" className="text-md">
            Submit
          </Button>
          <Button variant="ghost" size="lg" className="text-md">
            Cancel
          </Button>
        </div>
      </form>
    </ClientLayout>
  );
}
