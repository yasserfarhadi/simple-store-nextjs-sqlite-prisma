'use client';

import React from 'react';
import { Button } from './button';
import { CiShoppingCart } from 'react-icons/ci';
import { useSession } from 'next-auth/react';
import { addToCart } from '@/actions/cart';

interface Props {
  productId: string;
  isInCart: boolean;
}

const AddToCartButton = ({ productId, isInCart }: Props) => {
  const [pending, startTransition] = React.useTransition();
  const session = useSession();
  const userId = session.data?.user?.id;
  console.log(isInCart);
  async function addToCartHandler() {
    startTransition(async () => {
      if (productId && userId) await addToCart(productId, userId);
    });
  }

  return (
    <Button
      onClick={addToCartHandler}
      disabled={pending || isInCart}
      variant="secondary"
      className="font-semibold w-full mt-6"
    >
      <span>{isInCart ? 'Already in cart' : 'ADD TO CART'}</span>
      <CiShoppingCart className="w-6 h-6" />
    </Button>
  );
};

export default AddToCartButton;
