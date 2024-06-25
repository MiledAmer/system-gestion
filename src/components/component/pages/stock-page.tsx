import { Button } from "@/components/ui/button";
import ViewStockDataTable from "../tables/view-stock-data-table";
import { AddArticleForm } from "../forms/add-article-form";
import { db } from "@/server/db";

export async function StockPage() {
  const data = await db.matierepremiere.findMany();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">Stocks</h2>
        <AddArticleForm />
      </div>
      <ViewStockDataTable data={data}/>
    </main>
  );
}
