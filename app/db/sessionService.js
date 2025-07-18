import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Save or update a session for a Shopify store
 */
export async function saveShopSession({ shop, accessToken, scope, expires }) {
  return await prisma.session.upsert({
    where: { shop },
    update: {
      accessToken,
      scope,
      expires,
      isOnline: true,
    },
    create: {
      id: shop, // use shop as ID for simplicity
      shop,
      accessToken,
      scope,
      expires,
      isOnline: true,
    },
  });
}

/**
 * Get a session by shop domain
 */
export async function getShopSession(shop) {
  return await prisma.session.findUnique({
    where: { shop },
  });
}
