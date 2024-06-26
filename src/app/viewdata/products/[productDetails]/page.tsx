import { ProductDetailsPage } from "@/components/component/pages/product-details-page";
type Props = {
  params: {
    productDetails: string;
  };
};

const Page: React.FC<Props> = async ({ params }) => {
  const { productDetails } = params;
  return <ProductDetailsPage productNumber={productDetails} />;
};

export default Page;
