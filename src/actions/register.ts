'use server';
import * as z from 'zod';
import { registerSchema } from '@/schemas';
import { redirect } from 'next/navigation';

export const register = async (values: z.infer<typeof registerSchema>) => {
  await new Promise((r) => setTimeout(r, 2000));
  const validatedValues = registerSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid Fields' };
  }

  redirect('/auth/login');
};
