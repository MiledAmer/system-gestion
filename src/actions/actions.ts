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
 revalidatePath('/viewdata/stocks')
}


export async function deleteArticle(data: matierepremiere) {
  const deletedArticle = await db.matierepremiere.delete({
    where: {
      numeroarticle: data.numeroarticle,
    },
  })
  console.log(deletedArticle)
  revalidatePath('/viewdata/stocks')
}