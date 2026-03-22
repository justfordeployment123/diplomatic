'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/lib/apiClient';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/api/auth/login', data);
      setAuth(res.data.user, res.data.token);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      toast.error(message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-navy-900">Sign in</h2>
        <p className="text-sm text-text-muted mt-1">Access your diplomatic documents</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register('email')}
          label="Email"
          type="email"
          placeholder="you@embassy.gov"
          error={errors.email?.message}
        />
        <Input
          {...register('password')}
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
        />
        <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-gold-600 hover:text-gold-500 font-medium transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
