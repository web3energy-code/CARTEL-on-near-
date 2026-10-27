export type ProductCategory =
  | 'Electronics'
  | 'Fashion'
  | 'Digital goods'
  | 'Home & living'
  | 'Collectibles'
  | 'Other';

export interface Product {
  id: string;
  title: string;
  description: string;
  priceNear: string;
  category: ProductCategory;
  imageUrl: string;
  sellerAccountId: string;
  quantity: number;
  status: 'published' | 'draft' | 'sold';
  createdAt: string;
}

export interface SellerProfile {
  accountId: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
}

export interface MarketplaceOrder {
  id: string;
  productId: string;
  buyerAccountId: string;
  sellerAccountId: string;
  amountNear: string;
  status:
    | 'pending'
    | 'payment_verified'
    | 'fulfilled'
    | 'cancelled'
    | 'disputed';
  transactionHash?: string;
  createdAt: string;
}
