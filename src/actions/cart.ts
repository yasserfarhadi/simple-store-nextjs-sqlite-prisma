'use server';
import { getCartByUserAndProducId } from '@/data/cart';
import { getProductById } from '@/data/product';
import { getUserById } from '@/data/user';
import { prisma } from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function addToCart(productId: string, userId: string) {
  try {
    if (!userId) throw 'No user ID Provided';
    if (!productId) throw 'No product ID Provided';

    const existingUser = await getUserById(userId);
    if (!existingUser) throw 'No User Found';

    const existingProduct = await getProductById(productId);
    if (!existingProduct) throw 'No Product Found';

    const existingCartItem = await getCartByUserAndProducId(userId, productId);
    if (existingCartItem) throw 'Already in cart';

    await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity: 1,
      },
    });
    revalidatePath(`/product/${productId}`);
    revalidateTag('cart-count');
    return;
  } catch (error) {
    throw error;
  }
}
