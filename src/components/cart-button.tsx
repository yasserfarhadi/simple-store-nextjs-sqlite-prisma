import Link from 'next/link';
import React from 'react';
import { CiShoppingCart } from 'react-icons/ci';

interface Props {
  cartCount: number;
}

const CartButton = ({ cartCount }: Props) => {
  return (
    <Link href="/cart">
      <div className="relative">
        <CiShoppingCart className="w-12 h-12" />
        {cartCount > 0 && (
          <div className="absolute top-0 -right-2 w-7 h-7 bg-slate-700 flex items-center justify-center rounded-full font-semibold text-xl">
            <span>{cartCount}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartButton;
