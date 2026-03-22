'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { MOCK_TOKEN } from '@/lib/mockData';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    // Mock mode: create user from form data
    await new Promise((r) => setTimeout(r, 600));
    document.cookie = 'session=mock; path=/; max-age=86400';
    setAuth(
      { id: 'mock-user-1', name: data.name, email: data.email, role: 'user' },
      MOCK_TOKEN
    );
    toast.success('Account created! Welcome to DiploDocs.');
    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-navy-900">Create account</h2>
        <p className="text-sm text-text-muted mt-1">Join the diplomatic document platform</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register('name')}
          label="Full Name"
          placeholder="Your Name"
          error={errors.name?.message}
        />
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
          placeholder="Min. 8 characters"
          error={errors.password?.message}
        />
        <Input
          {...register('confirmPassword')}
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link href="/login" className="text-gold-600 hover:text-gold-500 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
