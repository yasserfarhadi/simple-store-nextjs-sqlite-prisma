import 'server-only';
import { prisma } from '@/lib/db';
import { cache } from 'react';

export const getAllProducts = cache(
  async (q?: string, sort?: 'asc' | 'desc') => {
    try {
      const query: any = {};
      if (q && q.trim()) {
        query.where = {
          OR: [
            {
              brand: {
                contains: q,
              },
            },
            {
              title: {
                contains: q,
              },
            },
          ],
        };
      }
      if (sort) {
        query.orderBy = {
          price: sort,
        };
      }
      const products = await prisma.product.findMany(query);

      return products;
    } catch (error) {
      throw error;
    }
  }
);

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw new Error('Product not found');

    return product;
  } catch (error) {
    throw error;
  }
}
