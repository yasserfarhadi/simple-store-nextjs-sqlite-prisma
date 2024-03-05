import React from 'react';
import { auth } from '../../../../auth';
import { getUserCart } from '@/data/cart';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import QuantitySelect from '@/components/quantity-select';
import RemoveCartButton from '@/components/remove-cart-button';

const CartPage = async () => {
  const session = await auth();
  const userId = session?.user?.id!;
  let cartItems = await getUserCart(userId);
  const totalPrice = cartItems.reduce((cumm, curr) => {
    const itemPrice = curr.quantity * curr.product.price;
    return cumm + itemPrice;
  }, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-wider">
        Total: ${totalPrice.toFixed(2)}
      </h1>
      {cartItems.map((item) => (
        <Card
          key={item.id}
          className="p-0 bg-primary overflow-hidden text-secondary"
        >
          <CardContent className="rounded-md p-0 flex">
            <div className="relative w-40 h-40">
              <Image
                src={item.product.image}
                width={200}
                height={200}
                alt={item.product.title}
                className="absolute"
              />
            </div>
            <div className="flex-grow p-4 flex flex-col justify-around">
              <div className="flex items-center gap-1">
                <h5 className="font-semibold text-lg tracking-wider">
                  {item.product.brand}
                </h5>
                <p className="font-semibold text-md tracking-wider text-muted-foreground">
                  {item.product.title}
                </p>
              </div>
              <p className="font-semibold text-md tracking-wider">
                ${item.product.price.toFixed(2)}
              </p>
              <QuantitySelect
                quantity={item.quantity}
                productId={item.productId}
              />
              <p className="text-lg font-semibold tracking-wider">
                total: ${(item.quantity * item.product.price).toFixed(2)}
              </p>
            </div>
            <RemoveCartButton cartItemId={item.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartPage;
