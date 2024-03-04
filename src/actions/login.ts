'use server';
import * as z from 'zod';
import { loginSchema } from '@/schemas';
import { redirect } from 'next/navigation';

export const login = async (values: z.infer<typeof loginSchema>) => {
  await new Promise((r) => setTimeout(r, 2000));
  const validatedValues = loginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid Fields' };
  }
  redirect('/store');
};
