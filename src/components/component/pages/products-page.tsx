import { AddProductForm } from "../forms/add-product-form";
import ViewProductsTable from "../tables/view-products-table";

export default function ProductsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">Products</h2>
        <div className="ml-auto flex flex-row space-x-4">
          <AddProductForm />
        </div>
      </div>
      <ViewProductsTable />
    </main>
  )
}
