'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { changeQuantity } from '@/actions/cart';
import { useSession } from 'next-auth/react';

interface Props {
  quantity: number;
  productId: string;
}
const QuantitySelect = ({ quantity, productId }: Props) => {
  const [pending, startTransition] = React.useTransition();
  const session = useSession();
  const userId = session.data?.user?.id;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border  p-1.5 rounded-md min-w-[150px] max-w-[150px]">
        {`Quantity: ${quantity}`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px] max-w-[150px]">
        {new Array(10).fill(null).map((_item, index) => {
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                if (index + 1 === quantity) return;
                if (!userId) return;
                startTransition(async () => {
                  await changeQuantity(userId, productId, index + 1);
                });
              }}
              className="flex align-center justify-between"
            >
              {index + 1}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuantitySelect;
