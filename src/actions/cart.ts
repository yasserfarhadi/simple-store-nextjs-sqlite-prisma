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

export async function changeQuantity(
  userId: string,
  productId: string,
  quantity: number
) {
  if (!userId || !productId || !quantity)
    throw 'userId, productId and quantity is required!';

  try {
    const existingUser = await getUserById(userId);
    if (!existingUser) throw 'No User Found';

    const existingCartItem = await getCartByUserAndProducId(
      existingUser.id,
      productId
    );
    if (!existingCartItem) throw 'Cart Item Not Found!';

    if (existingCartItem.quantity === quantity) return;

    await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity },
    });
    revalidatePath('/cart');
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart(userId: string, cartItemId: string) {
  if (!userId || !cartItemId) throw 'CartItemId and UserId is required';

  try {
    const existingUser = await getUserById(userId);
    if (!existingUser) throw 'No User Found';

    await prisma.cartItem.delete({
      where: { id: cartItemId, userId: existingUser.id },
    });
  } catch (error) {
    throw error;
  }

  revalidatePath('/cart');
}
