import UserButton from '@/components/auth/user-button';
import React from 'react';
import { auth } from '../../../auth';
import CartButton from '@/components/cart-button';
import { getCartCount } from '@/data/cart';

const ProtectedLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  let cartCount = 0;
  if (userId) {
    cartCount = await getCartCount(userId);
  }
  return (
    <div className="bg-primary text-secondary min-h-full">
      <header className="h-20 border-b-2 border-muted-foreground">
        <nav className="w-full h-full flex items-center justify-between p-10">
          <React.Suspense>
            <CartButton cartCount={cartCount} />
          </React.Suspense>
          <div className="space-x-2">
            <span className="font-semibold tracking-wider">
              {session?.user?.name}
            </span>
            <UserButton />
          </div>
        </nav>
      </header>
      <main className="container py-20">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
