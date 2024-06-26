import { Button } from "@/components/ui/button";
import ViewStockDataTable from "../tables/view-stock-data-table";
import { AddArticleForm } from "../forms/add-article-form";
import { db } from "@/server/db";
import AddStocksForm from "../forms/add-stocks-form";
import UpdateStocksForm from "../forms/update-stocks-form";

export async function StockPage() {
  const data = await db.matierepremiere.findMany();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg md:text-2xl">Stocks</h2>
        <span className="flex gap-8">
          <AddArticleForm />
          <AddStocksForm />
          <UpdateStocksForm ExistingData={data} />
        </span>
      </div>
      <ViewStockDataTable data={data} />
    </main>
  );
}
