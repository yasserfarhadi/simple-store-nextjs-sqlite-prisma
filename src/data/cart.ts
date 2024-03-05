import 'server-only';
import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export async function getCartByUserAndProducId(
  userId: string,
  productId: string
) {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });
    return cartItem;
  } catch (error) {
    throw error;
  }
}

export const getCartCount = unstable_cache(
  async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { cartItems: true },
      });
      if (!user) throw 'No User Found';
      return user.cartItems.length;
    } catch (error) {
      throw error;
    }
  },
  ['cart-count']
);

export async function getUserCart(userId: string) {
  try {
    const userWithCart = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!userWithCart) throw 'User Not Found!';
    return userWithCart.cartItems;
  } catch (error) {
    throw error;
  }
}
