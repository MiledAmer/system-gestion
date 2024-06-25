import ArticleInProductsTable from "../tables/article-in-products-table";
import ArticleInOFTable from "../tables/article-in-of-table";

export async function ArticleDetailsPage({ articleNumber }: { articleNumber: string}) {
  

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">Article: {articleNumber.replace("%20"," ")}</h2>
      </div>
      <ArticleInProductsTable articleNumber={articleNumber}/>
      <ArticleInOFTable articleNumber={articleNumber.replace("%20", " ")}/>
    </main>
  );
}
 