import { authenticate } from "../shopify.server";
import { saveShopSession } from "~/db/sessionService"; // adjust if your path is different
import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  const session = await authenticate.admin(request);

  if (session?.shop && session?.accessToken) {
    await saveShopSession({
      shop: session.shop,
      accessToken: session.accessToken,
      scope: session.scope,
      expires: session.expires, // this may be null if offline tokens
    });
  }

  return redirect("/"); // or wherever you want to land after login
};
