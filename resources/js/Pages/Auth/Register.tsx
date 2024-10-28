import { FormEventHandler, useState } from 'react';

import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Separator } from '@/Components/ui/separator';

import InputError from '@/Components/InputError';

import { cn } from '@/lib/utils';

import { Hammer, Laptop } from 'lucide-react';
export default function Register() {
  const [accountType, setAccountType] = useState('');
  const [isReadyToProceed, setIsReadyToProceed] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    password: '',
  });

  const handleAccountTypeSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setData('role', accountType.toLowerCase());
    setIsReadyToProceed(true);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout>
      <Head title="Register" />
      {!isReadyToProceed ? (
        <div className="">
          <div className="">
            <h1 className="text-center text-3xl font-bold">
              Join as a client or freelancer
            </h1>
            <div className="max-w-xl py-8">
              <fieldset className="my-20">
                <div className="grid grid-cols-2 gap-x-4">
                  <div
                    className={cn(
                      'relative rounded-xl border-2 border-gray-200 bg-white p-6',
                      accountType === 'Client' && 'border-green-600'
                    )}
                  >
                    <input
                      className="absolute left-0 top-0 size-full cursor-pointer opacity-0"
                      type="radio"
                      name="accountType"
                      onClick={() => setAccountType('Client')}
                    />
                    <div className="py-4">
                      <Laptop className="mb-8 size-8" />
                      <h2 className="mb-16 mr-2.5 text-2xl font-semibold">
                        I'm a client, hiring for a project
                      </h2>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'relative rounded-xl border-2 border-gray-200 bg-white p-6',
                      accountType === 'Freelance' && 'border-green-600'
                    )}
                  >
                    <input
                      className="absolute left-0 top-0 size-full cursor-pointer opacity-0"
                      type="radio"
                      name="accountType"
                      onClick={() => setAccountType('Freelance')}
                    />
                    <div className="py-4">
                      <Hammer className="mb-8 size-8" />
                      <h2 className="mb-16 mr-2.5 text-2xl font-semibold">
                        I'm a freelancer, looking for work
                      </h2>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-center">
                <Button
                  onClick={handleAccountTypeSubmit}
                  className="text-md mx-auto mt-4"
                  size="lg"
                  disabled={processing || !accountType}
                >
                  {!accountType ? 'Create Account' : `Join as ${accountType}`}
                </Button>
              </div>
            </div>
            <p className="text-center text-muted-foreground">
              Already have an account?&nbsp;
              <Link href="/login" className="text-green-900 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <Card className="size-full border-none shadow-none md:w-[487px]">
          <CardHeader className="flex items-center justify-center p-7 text-center">
            <CardTitle className="text-2xl">
              Sign up to&nbsp;
              {accountType === 'Client' ? 'hire talent' : 'find work you love'}
            </CardTitle>
          </CardHeader>
          <div className="mb-2 px-7">
            <Separator />
          </div>
          <CardContent className="p-7">
            <form onSubmit={submit} className="space-y-8">
              <div className="flex gap-x-4">
                <div className="flex flex-1 flex-col gap-y-4">
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    placeholder="Enter your firstname"
                    disabled={processing}
                    required
                  />
                  <InputError message={errors.first_name} className="mt-2" />
                </div>
                <div className="flex flex-1 flex-col gap-y-4">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    placeholder="Enter your lastname"
                    disabled={processing}
                    required
                  />
                  <InputError message={errors.last_name} className="mt-2" />
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Enter your email"
                  disabled={processing}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="flex flex-col gap-y-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Enter password"
                  disabled={processing}
                  min={8}
                  max={256}
                  required
                />
                <InputError message={errors.password} className="mt-2" />
              </div>
              <Button disabled={processing} size="lg" className="w-full">
                Create my account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-7">
            <p className="w-full text-center">
              Already have an account?&nbsp;
              <Link href="/login" className="text-green-900 underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </AuthLayout>
  );
}
