import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@prisma/client';

const ProductCard = ({ brand, image, price, title, id }: Product) => {
  return (
    <Card className="w-[400px] md:w-full shadow-md bg-primary text-secondary p-0 overflow-hidden max-h-96">
      <Link href={`/product/${id}`} className="h-full">
        <CardContent className="h-full p-0 flex flex-col ">
          <div className="pb-[70%] relative bg-white">
            <Image
              src={image}
              width={500}
              height={500}
              alt={title}
              className="absolute h-full w-full object-contain"
            />
          </div>
          <div className="flex-grow p-4">
            <h5 className="font-semibold text-lg tracking-wider">{brand}</h5>
            <p className="font-semibold text-md tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="font-semibold text-md tracking-wider">${price},00</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
