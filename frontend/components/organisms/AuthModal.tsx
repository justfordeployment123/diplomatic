'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import { apiClient } from '@/lib/apiClient';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
});

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/api/auth/login', data);
      setAuth(res.data.user, res.data.token);
      toast.success('Logged in');
      onSuccess?.();
      onClose();
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[var(--radius-xl)] shadow-lg w-full max-w-md mx-4 p-8 flex flex-col gap-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors rounded"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-display)' }}>
            Sign In
          </h2>
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
          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
