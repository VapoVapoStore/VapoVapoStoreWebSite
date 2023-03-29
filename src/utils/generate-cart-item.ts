

interface Item {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  sale_price?: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item) {
  const { id, name, slug, image, price, sale_price } = item;
  return {
    id: id,
    name,
    slug,
    image: image,
    price: sale_price ? sale_price : price,
  };
}
