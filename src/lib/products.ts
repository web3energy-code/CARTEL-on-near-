import { supabase } from "./supabase";
import type { Product } from "../types";

export async function getPublishedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, description, price_near, category, image_url, seller_account_id, quantity, status, created_at"
    )
    .eq("status", "published")
    .gt("quantity", 0)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load CARTEL products:", error.message);
    throw new Error("Could not load marketplace listings.");
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    priceNear: String(row.price_near),
    category: row.category as Product["category"],
    imageUrl: row.image_url ?? "",
    sellerAccountId: row.seller_account_id,
    quantity: row.quantity,
    status: row.status as Product["status"],
    createdAt: row.created_at,
  }));
}
