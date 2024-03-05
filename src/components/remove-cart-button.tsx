'use client';

import React from 'react';
import { Button } from './ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { removeFromCart } from '@/actions/cart';

interface Props {
  cartItemId: string;
}

const RemoveCartButton = ({ cartItemId }: Props) => {
  const [pending, startTransition] = React.useTransition();
  const session = useSession();
  const userId = session?.data?.user?.id!;
  return (
    <Button
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          if (!userId || !cartItemId) return;
          await removeFromCart(userId, cartItemId);
        });
      }}
      className="h-[160px] flex items-center justify-center hover:bg-destructive rounded-none border-l"
    >
      <Cross1Icon />
    </Button>
  );
};

export default RemoveCartButton;
