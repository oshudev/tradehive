import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';

import InputError from '@/Components/InputError';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout>
      <Head title="Log in" />
      <Card className="size-full border-none shadow-none md:w-[487px]">
        <CardHeader className="flex items-center justify-center p-7 text-center">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        </CardHeader>
        <div className="mb-2 px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Enter email address"
                disabled={processing}
                required
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div>
              <Input
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
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-7">
          <p className="w-full text-center">
            Already have an account?&nbsp;
            <Link href="/register" className="text-green-900 underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
