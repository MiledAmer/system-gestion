"use server";

import { db } from "@/server/db";
import {
  matierepremiere,
  measurement,
  product,
  production,
  productstate,
  utilisation,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Article {
  name: string;
  quantity: number;
}

export async function updateArticles(Articles:matierepremiere[]){
  const updatePromises = Articles.map(Article =>
    db.matierepremiere.update({
      where: { numeroarticle: Article.numeroarticle },
      data: {
        ...Article
      },
    })
  );
  try {
    const Articles = await Promise.all(updatePromises)
    if(!Articles) throw new Error("Error creating articles")
      revalidatePath("/viewdata/stocks");
  }catch(error){
    console.log(error)
  }
}
export async function createArticles(Articles:matierepremiere[]){
  try {
    const articles = await db.matierepremiere.createMany({data:Articles,skipDuplicates: true,})
    if(!articles) throw new Error("Error creating articles")
    revalidatePath("/viewdata/stocks");
  } catch (error) {
    console.log(error)
  }
}
export async function createArticle(formData: FormData) {
  const rawFormData: matierepremiere = {
    numeroarticle: formData.get("article-number") as string,
    designation: formData.get("description") as string,
    type: formData.get("type") as measurement,
    quantite: parseFloat(formData.get("quantity") as string),
    prixunitaire: parseFloat(formData.get("unit-price") as string),
    date: new Date(),
  };

  const article = await db.matierepremiere.create({ data: rawFormData });
  if (article) {
    revalidatePath("/viewdata/stocks");
  } else {
    console.log("ma 5edmetch");
  }
}

export async function updateArticle(row: matierepremiere, formData: FormData) {
  const updatedArticle = await db.matierepremiere.update({
    where: {
      numeroarticle: row.numeroarticle,
    },
    data: {
      designation: formData.get("description") as string,
      type: formData.get("type") as measurement,
      quantite: parseFloat(formData.get("quantity") as string),
      prixunitaire: parseFloat(formData.get("unit-price") as string),
      date: new Date(),
    },
  });
  console.log(updatedArticle);
  revalidatePath("/viewdata/stocks");
}

export async function articleExists(articleNumber: string) {
  const article = await db.matierepremiere.findUnique({
    where: {
      numeroarticle: articleNumber,
    },
  });
  return article !== null;
}

//articles exists
export async function articlesExists(articles: utilisation[]) {
  let exists = true;
  articles.forEach(async (article) => {
    if (!(await articleExists(article.numeroarticle))) {
      exists = false;
    }
  });
  return exists;
}

//to delete an article i must delete all production rows with the article number and all utilisation rows with the article number then all product rows with the article number
export async function deleteArticle(row: matierepremiere, formData: FormData) {
  // Get all the products that use this article
  const allProdectThatUsesThisArticle = await db.utilisation.findMany({
    where: {
      numeroarticle: row.numeroarticle,
    },
  });

  const deleteproducts = allProdectThatUsesThisArticle.map((product) => {
    // Use the function deleteProduct to delete the product
    return deleteProduct(product);
  });

  // Wait for all product deletions to complete
  Promise.all(deleteproducts).then(async () => {
    // Then delete the article
    const deletedArticle = await db.matierepremiere.delete({
      where: {
        numeroarticle: row.numeroarticle,
      },
    });
    revalidatePath("/viewdata/stocks");
    console.log(deletedArticle);
  });
}

export async function articleUsage(articleNumber: string) {
  const usage = await db.utilisation.findMany({
    where: {
      numeroarticle: articleNumber,
    },
  });
  return usage;
}

//article in of
//get all the of that use this article, the of don't have the article number but the product number
export async function articleInOF(articleNumber: string) {
  const result = await db.production.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      product: {
        include: {
          utilisation: {
            where: {
              numeroarticle: articleNumber,
            },
          },
        },
      },
    },
    where: {
      etat: "a_produire",
    },
  });
  return result;
}

//get all the products
export async function getProducts() {
  const products = await db.product.findMany();
  return products;
}

export async function createProduct(
  articles: Article[],
  productNumber: string
) {
  const rawFormData = {
    numeroproduit: productNumber as string,
  };
  const product = await db.product.create({ data: rawFormData });
  articles.forEach(async (article) => {
    const rawArticleData = {
      numeroproduit: product.numeroproduit,
      numeroarticle: article.name,
      quantite: article.quantity,
    };
    console.log(rawArticleData);
    if (await articleExists(article.name)) {
      await db.utilisation.create({ data: rawArticleData });
    }
  });
  if (product) {
    revalidatePath("/viewdata/productchain");
  } else {
    console.log("ma 5edmetch");
  }
}

export async function ProductInOF (productNumber: string){
  try { 
    const data = await db.production.findMany({
      where: { numeroproduit: productNumber },
      orderBy: {
        date: "desc",
      },
    });
    if(!data) throw new Error("no data")
    return data
  } catch (error) {
    console.log(error)    
  }
}

//product exists
export async function productExists(productNumber: string) {
  const product = await db.product.findUnique({
    where: {
      numeroproduit: productNumber,
    },
  });
  return product !== null;
}

//product details
export async function getProductDetails(productNumber: string) {
  const productDetails = await db.utilisation.findMany({
    where: {
      numeroproduit: productNumber,
    },
  });
  return productDetails;
}

//delete product
//must delete all utilisation rows with the product number
export async function deleteProduct(row: product) {
  // delete all production rows with the product number
  const deleteProduction = await db.production.deleteMany({
    where: {
      numeroproduit: row.numeroproduit,
    },
  });

  // delete all utilisation rows with the product number
  const deletedUtilisations = await db.utilisation.deleteMany({
    where: {
      numeroproduit: row.numeroproduit,
    },
  });

  // delete the product
  const deletedProduct = await db.product.delete({
    where: {
      numeroproduit: row.numeroproduit,
    },
  });
  console.log(deletedProduct);
  revalidatePath("/viewdata/productchain");
}

// create the of
export async function createOf(formData: FormData) {
  // check if product exists
  const productNumber = formData.get("productNumber") as string;
  console.log("product number: ", productNumber);
  if (!(await productExists(productNumber))) {
    console.log("Product does not exist");
    return;
  }

  // get product details
  const productDetails = await getProductDetails(productNumber);

  // check if all articles exist
  if (!(await articlesExists(productDetails))) {
    console.log("Articles does not exist");
    return;
  }

  // create the of
  const rawFormData: production = {
    numeroof: formData.get("ofNumber") as string,
    numeroproduit: productNumber,
    quantity: parseFloat(formData.get("quantity") as string),
    etat: "a_produire", // default
    date: new Date(formData.get("Date") as string),
  };

  const of = await db.production.create({ data: rawFormData });
  if (of) {
    revalidatePath("/viewdata/viewdata/productchain");
  } else {
    console.log("ma 5edmetch");
  }
}

//update of
export async function updateOf(row: string, formdata: FormData) {
  const updatedOf = await db.production.update({
    where: {
      numeroof: row,
    },
    data: {
      numeroproduit: formdata.get("productNumber") as string,
      quantity: parseFloat(formdata.get("quantity") as string),
      etat: formdata.get("State") as productstate,
      date: new Date(formdata.get("Date") as string),
    },
  });
  console.log(updatedOf);
  revalidatePath("/viewdata/viewdata/productchain");
}

