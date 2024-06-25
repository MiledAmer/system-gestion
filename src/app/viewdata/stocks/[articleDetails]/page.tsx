import { ArticleDetailsPage } from "@/components/component/pages/article-details-page";
type Props = {
  params: {
    articleDetails: string;
  };
};

const Page: React.FC<Props> = async ({ params }) => {
  const { articleDetails } = params;
  return (
    <ArticleDetailsPage articleNumber={articleDetails}/>
  )
}

export default Page;