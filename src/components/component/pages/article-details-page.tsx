import ArticleInProductsTable from "../tables/article-in-products-table";
import ArticleInOFTable from "../tables/article-in-of-table";
import { articleInOF, articleUsage } from "@/actions/actions";

export async function ArticleDetailsPage({
  articleNumber,
}: {
  articleNumber: string;
}) {
  const Getter = await articleUsage(articleNumber.replace("%20", " "));
  const OFGetter = await articleInOF(articleNumber.replace("%20", " "));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">
          Article: {articleNumber.replace("%20", " ")}
        </h2>
      </div>
      <ArticleInProductsTable Getter={Getter} />
      <ArticleInOFTable Getter={OFGetter} />
    </main>
  );
}
