import ViewProductChainDataTable from "../tables/view-product-chain-data-table";
import { AddOfForm } from "../forms/add-of-form";
import { AddProductForm } from "../forms/add-product-form";

export function ProductChainPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">Product chain</h2>
        <div className="ml-auto flex flex-row space-x-4">
          <AddProductForm />
          <AddOfForm />
        </div>
      </div>
      <ViewProductChainDataTable />
    </main>
  );
}
