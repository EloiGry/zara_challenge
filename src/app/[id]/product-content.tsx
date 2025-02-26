import { getProductById } from '@/api/products';
import { ProductSection } from '@/components/sections/product/product';
import { SimilarProducts } from '@/components/sections/similar-products/similar-products';
import { Specs } from '@/components/sections/specs/specs';

export async function ProductContent({ id }: Readonly<{ id: string }>) {
  const data = await getProductById(id);

  return (
    <>
      <ProductSection product={data} />
      <Specs specs={data.specs} />
      <SimilarProducts data={data.similarProducts} />
    </>
  );
}
