import { Logger } from '@repo/utils';
import { createClient } from '@/lib/supabase/client';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  rating: number;
  image: string;
  isVerified: boolean;
}

// Partial Supabase DB type for Products (since full types are not generated yet)
interface DBProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  condition: string;
  seller: string;
  is_verified: boolean;
  reviews?: { rating: number }[];
}

/**
 * Fetches a list of available products from Supabase.
 *
 * Architecture:
 * - Uses the Client-side Supabase client (Client Component usage).
 * - Maps the database schema (snake_case) to the UI model (camelCase).
 * - Aggregates reviews to calculate average ratings on the fly.
 *
 * @returns A promise resolving to an array of mapped Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  try {
    // Select specific columns for performance (avoiding 'select *')
    const { data, error } = await supabase
      .from('products')
      .select(
        'id, name, price, category, image_url, condition, seller, is_verified, reviews(rating)',
      )
      .gt('stock_count', 0); // Only show in-stock items

    if (error) {
      Logger.error('Error fetching products:', error);
      return [];
    }

    if (!data) return [];

    // Transformation Layer: DB -> UI
    return (data as unknown as DBProduct[]).map((item) => {
      // Calculate average rating from related reviews
      const ratings = item.reviews?.map((r) => r.rating) || [];
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
          : 0;

      return {
        id: item.id,
        title: item.name,
        price: Number(item.price),
        category: item.category,
        condition: item.condition,
        seller: item.seller,
        rating: Number(avgRating.toFixed(1)),
        image: item.image_url,
        isVerified: item.is_verified,
      };
    });
  } catch (err) {
    Logger.error('Unexpected error fetching products:', err);
    return [];
  }
}
