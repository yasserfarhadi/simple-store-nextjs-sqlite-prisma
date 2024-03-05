import AddToCartButton from '@/components/ui/add-to-cart-button';
import { getCartByUserAndProducId } from '@/data/cart';
import { getAllProducts, getProductById } from '@/data/product';
import Image from 'next/image';
import React from 'react';
import { auth } from '../../../../../auth';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((prod) => ({ id: prod.id }));
}

interface Props {
  params: {
    id: string;
  };
}
const ProductDetail = async ({ params: { id } }: Props) => {
  const session = await auth();
  const userId = session?.user?.id;
  const product = await getProductById(id);
  let isInCart = false;
  if (userId) {
    const cartItem = await getCartByUserAndProducId(userId, id);
    isInCart = !!cartItem;
  }

  return (
    <div className="flex flex-col border rounded-xl overflow-hidden gap-y-6 md:flex-row md:h-full">
      <div className="w-full md:w-1/2">
        <div className="pb-[70%] relative bg-white md:hidden">
          <Image
            src={product.image}
            width={500}
            height={500}
            alt={product.title}
            className="absolute h-full w-full object-contain"
          />
        </div>
        <div className="hidden relative bg-white md:block">
          <Image
            src={product.image}
            width={500}
            height={500}
            alt={product.title}
            className="hidden h-full w-full max-h-[500px] object-contain md:block"
          />
        </div>
      </div>
      <div className="flex-grow p-4 flex flex-col justify-center pb-8">
        <h5 className="font-semibold text-lg tracking-wider">
          {product.brand}
        </h5>
        <p className="font-semibold text-md tracking-wider text-muted-foreground">
          {product.title}
        </p>
        <p className="font-semibold text-md tracking-wider">
          ${product.price},00
        </p>
        <React.Suspense>
          <AddToCartButton productId={product.id} isInCart={isInCart} />
        </React.Suspense>
      </div>
    </div>
  );
};

export default ProductDetail;
