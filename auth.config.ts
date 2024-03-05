import Credencials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import { loginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credencials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
