'use server';
import * as z from 'zod';
import { loginSchema } from '@/schemas';
import { signIn } from '../../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof loginSchema>) => {
  await new Promise((r) => setTimeout(r, 500));
  const validatedValues = loginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: 'Invalid Fields' };
  }
  const { email, password } = validatedValues.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
