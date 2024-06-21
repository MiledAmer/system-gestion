'use server';

import { db } from "@/server/db";
import { matierepremiere, measurement } from "@prisma/client";
import { revalidatePath } from "next/cache";


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


export async function deleteArticle(row: matierepremiere, formData:FormData) {
  const deletedArticle = await db.matierepremiere.delete({
    where: {
      numeroarticle: row.numeroarticle,
    },
  })
  console.log(deletedArticle)
  revalidatePath('/viewdata/stocks')
}