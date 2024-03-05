import React from 'react';
import { auth, signOut } from '../../../../auth';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import FilterBar from '@/components/filter-bar';
import { getAllProducts } from '@/data/product';
import ProductCard from '@/components/product-card';

interface Props {
  searchParams: {
    q: string;
    sort: 'asc' | 'desc';
  };
}

const StorePapge = async ({ searchParams: { q, sort } }: Props) => {
  const products = await getAllProducts(q, sort);

  return (
    <div className="space-y-12">
      <FilterBar />
      <div className="grid place-items-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            image={prod.image}
            title={prod.title}
            brand={prod.brand}
            id={prod.id}
            price={prod.price}
          />
        ))}
      </div>
    </div>
  );
};

export default StorePapge;
