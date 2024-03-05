'use server';
import * as z from 'zod';
import { registerSchema } from '@/schemas';
import { redirect } from 'next/navigation';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedValues = registerSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid Fields' };
  }

  const { email, password, name } = validatedValues.data;

  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw error;
  }

  redirect('/auth/login');
};
