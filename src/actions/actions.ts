'use server';

import { db } from "@/server/db";
import { matierepremiere, measurement, production, utilisation } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Article {
  name: string;
  quantity: number;
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

 const article = await db.matierepremiere.create({data: rawFormData})
 if (article){
  revalidatePath('/viewdata/stocks')
 }else{
  console.log("ma 5edmetch")
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
  })
  console.log(updatedArticle)
  revalidatePath('/viewdata/stocks')
}

export async function articleExists(articleNumber: string) {
  const article = await db.matierepremiere.findUnique({
    where: {
      numeroarticle: articleNumber,
    },
  });
  return article !== null;
}

export async function deleteArticle(row: matierepremiere, formData:FormData) {
  const deletedArticle = await db.matierepremiere.delete({
    where: {
      numeroarticle: row.numeroarticle,
    },
  })
  console.log(deletedArticle)
  revalidatePath('/viewdata/stocks')
}

export async function createProduct(articles:Article[] ,productNumber: string) {
  const rawFormData = {
    numeroproduit: productNumber as string,
    
  };
  const product = await db.product.create({data: rawFormData})
  articles.forEach(async (article) => {
    const rawArticleData = {
      numeroproduit: product.numeroproduit,
      numeroarticle: article.name,
      quantite: article.quantity,
    };
    console.log(rawArticleData)
    if (await articleExists(article.name)){
      await db.utilisation.create({data: rawArticleData})
    }
  })
  if (product){
    revalidatePath('/viewdata/productchain')
   }else{
    console.log("ma 5edmetch")
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
export async function getProductDetails(productNumber: string){
  const productDetails = await db.utilisation.findMany({
    where: {
      numeroproduit: productNumber,
    },
  });
  return productDetails;
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




// create the of
export async function createOf(formData: FormData) {
  // check if product exists
  const productNumber = formData.get("productNumber") as string;
  console.log("product number: ",productNumber)
  if (!(await productExists(productNumber))) {
    console.log("Product does not exist");
    return;
  }

  // get product details
  const productDetails = await getProductDetails(productNumber);

  // check if all articles exist
  if(!await articlesExists(productDetails)){
    console.log("Articles does not exist");
    return;
  }
  
  // create the of
  const rawFormData: production = {
    numeroof: formData.get("ofNumber") as string,
    numeroproduit: productNumber,
    quantity: parseFloat(formData.get("quantity") as string),
    etat: "a_produire", // default
    date: new Date(),
  };

  const of = await db.production.create({data: rawFormData})
  if (of){
    revalidatePath('/viewdata/viewdata/productchain')
   }else{
    console.log("ma 5edmetch")
   }
}