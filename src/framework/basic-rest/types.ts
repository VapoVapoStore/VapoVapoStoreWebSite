import { QueryKey } from "react-query";

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  subcategory?: string;
  status?: string;
  per_page?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type CategoryChildrenVapo = {
  id: number;
  name: string;
}; export type CategoryImageVapo = {
  thumbnail: string;
  original: string
};
export type CategoryVapo = {
  id: number;
  name: string;
  slug: string;
  image?: CategoryImageVapo;
  sub_category_id: number;
  sub_category_name: string;
  icon?: string;
  productCount?: number;
  children: CategoryChildrenVapo[]
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
};

export type ProductVapo = {
  id: number;
  code?: number;
  name: string;
  description: string;
  quantity: number;
  category: CategoryVapo;
  price: number;
  sale_price?: number;
  slug: string
  image: string;
  gallery?: string[];
  variations?: object;
  created_on: string;
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};
