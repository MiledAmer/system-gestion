'use server';

import { db } from "@/server/db";
import { matierepremiere, measurement } from "@prisma/client";
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
  const data = db.matierepremiere.findMany()
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