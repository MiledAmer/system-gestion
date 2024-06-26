import { ProductInOF } from "@/actions/actions";
import ProductInOFTable from "../tables/product-in-of-table";
import ProductUsageTable from "../tables/product-usage-table";

export async function ProductDetailsPage({
  productNumber,
}: {
  productNumber: string;
}) {
  const Getter = await ProductInOF(productNumber);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">
          Product: {productNumber?.replace("%20", " ")}
        </h2>
      </div>
      <ProductUsageTable productNumber={productNumber.replace("%20", " ")} />
      <ProductInOFTable Getter={Getter} />
    </main>
  );
}
