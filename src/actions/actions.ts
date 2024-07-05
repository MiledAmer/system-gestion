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
export type ActionResponse = {
  Response?: { message: string; Result: any };
  Error?: string;
};

export async function updateArticles(Articles: matierepremiere[]) {
  const updatePromises = Articles.map((Article) =>
    db.matierepremiere.update({
      where: { numeroarticle: Article.numeroarticle },
      data: {
        ...Article,
      },
    })
  );
  try {
    const Articles = await Promise.all(updatePromises);
    if (!Articles) throw new Error("Error updating articles");
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Articles Updated" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}
export async function createArticles(Articles: matierepremiere[]) {
  try {
    const articles = await db.matierepremiere.createMany({
      data: Articles,
      skipDuplicates: true,
    });
    if (!articles) throw new Error("Error creating articles");
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Articles Created" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}
export async function createArticle(formData: FormData) {
  try {
    const rawFormData: matierepremiere = {
      numeroarticle: formData.get("article-number") as string,
      designation: formData.get("description") as string,
      type: formData.get("type") as measurement,
      quantite: parseFloat(formData.get("quantity") as string),
      quantiteTheorique: parseFloat(formData.get("quantity") as string),
      prixunitaire: parseFloat(formData.get("unit-price") as string),
      date: new Date(),
    };
    const article = await db.matierepremiere.create({ data: rawFormData });
    if (!article) {
      throw new Error("Error creating article");
    }
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Article Created" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function updateArticle(row: matierepremiere, formData: FormData) {
  try {
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
    if (!updatedArticle) throw new Error("Error updating article");
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Article Updated" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function articleExists(articleNumber: string) {
  try {
    const article = await db.matierepremiere.findUnique({
      where: {
        numeroarticle: articleNumber,
      },
    });
    return {
      Response: { Result: article !== null, message: "Verification Done" },
    };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function getArticlePrice(id: string) {
  try {
    const article = await db.matierepremiere.findUnique({
      where: {
        numeroarticle: id,
      },
    });
    return { Response: { Result: article?.prixunitaire, message: "success" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//articles exists
export async function articlesExists(articles: utilisation[]) {
  try {
    let exists = true;
    articles.forEach(async (article) => {
      if (!(await articleExists(article.numeroarticle)).Response?.Result) {
        exists = false;
      }
    });
    return { Result: { Response: exists, message: "Verification Done" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//to delete an article i must delete all production rows with the article number and all utilisation rows with the article number then all product rows with the article number
export async function deleteArticle(row: matierepremiere, formData: FormData) {
  try {
    // Get all the products that use this article
    const allProdectThatUsesThisArticle = await db.utilisation.findMany({
      where: {
        numeroarticle: row.numeroarticle,
      },
    });

    const deleteproducts = allProdectThatUsesThisArticle.map((product) => {
      // Use the function deleteProduct to delete the product
      return deleteProduct(product.numeroproduit);
    });

    // Wait for all product deletions to complete
    Promise.all(deleteproducts).then(async () => {
      // Then delete the article
      const deletedArticle = await db.matierepremiere.delete({
        where: {
          numeroarticle: row.numeroarticle,
        },
      });
      if (!deletedArticle) throw new Error("Error deleting articles");
    });
    revalidatePath("/viewdata/stocks");
    return { Response: { message: "Articles Deleted" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function articleUsage(articleNumber: string) {
  try {
    const usage = await db.utilisation.findMany({
      where: {
        numeroarticle: articleNumber,
      },
    });
    if (!usage) throw new Error("usage not found");
    return { Response: { Result: usage, message: "Usage Found" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//article in of
//get all the of that use this article, the of don't have the article number but the product number
export async function articleInOF(articleNumber: string) {
  try {
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
    if (!result) throw new Error("article in of not found");
    return { Response: { Result: result, message: "Article in OF found" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//get all the products
export async function getProducts() {
  try {
    const products = await db.product.findMany();
    return { Response: { Result: products, message: "Products found" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function createProduct(
  articles: Article[],
  productNumber: string,
  labourCost: number
) {
  try {
    let totalPrice = 0;
    const rawFormData: product = {
      numeroproduit: productNumber as string,
      prix: 0,
      prix_main_oeuvre: labourCost,
    };
    const product = await db.product.create({ data: rawFormData });
    for (const article of articles) {
      const rawArticleData = {
        numeroproduit: product.numeroproduit,
        numeroarticle: article.name,
        quantite: article.quantity,
      };
      if ((await articleExists(article.name)).Response?.Result) {
        const articlePrice = (await getArticlePrice(article.name)).Response
          ?.Result; // Cette fonction doit être définie pour récupérer le prix de l'article
        if (articlePrice) {
          console.log("article price: ", articlePrice);
          console.log("article quantity: ", article.quantity);
          totalPrice += articlePrice * article.quantity; // Calculer le prix total
          console.log("total price: ", totalPrice);
        }

        await db.utilisation.create({ data: rawArticleData });
      }
    }
    if (!product) {
      throw new Error("Error creating product");
    }

    await db.product.update({
      where: { numeroproduit: productNumber },
      data: { prix: totalPrice },
    });

    revalidatePath("/viewdata/productchain");
    return { Response: { message: "Product Created" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

export async function ProductInOF(productNumber: string) {
  try {
    const data = await db.production.findMany({
      where: { numeroproduit: productNumber },
      orderBy: {
        date: "desc",
      },
    });
    if (!data) throw new Error("product in OF not found");
    return { Response: { Result: data, message: "Product in OF found" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//product exists
export async function productExists(productNumber: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        numeroproduit: productNumber,
      },
    });
    return {
      Response: { Result: product !== null, message: "Verification done" },
    };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//product details
export async function getProductDetails(productNumber: string) {
  try {
    const productDetails = await db.utilisation.findMany({
      where: {
        numeroproduit: productNumber,
      },
    });
    return {
      Response: { Result: productDetails, message: "Product details found" },
    };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//delete product
//must delete all utilisation rows with the product number
export async function deleteProduct(id: string) {
  try {
    // delete all production rows with the product number
    const deleteProduction = await db.production.deleteMany({
      where: {
        numeroproduit: id,
      },
    });

    // delete all utilisation rows with the product number
    const deletedUtilisations = await db.utilisation.deleteMany({
      where: {
        numeroproduit: id,
      },
    });

    // delete the product
    const deletedProduct = await db.product.delete({
      where: {
        numeroproduit: id,
      },
    });
    revalidatePath("/viewdata/productchain");
    return { Response: { message: "Product deleted successfully" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

// create the of
export async function createOf(formData: FormData) {
  try {
    // check if product exists
    const productNumber = formData.get("productNumber") as string;
    console.log("product number: ", productNumber);
    const ProductExists = await productExists(productNumber);
    if (!ProductExists.Response?.Result) {
      throw new Error("Product Doesn't Exist");
    }

    // get product details
    const Getter = await getProductDetails(productNumber);
    const productDetails = Getter?.Response?.Result;

    // check if all articles exist
    if (productDetails && !(await articlesExists(productDetails))) {
      throw new Error("Article doesnt exist");
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
    if (!of) {
      throw new Error("Error creating OF");
    }
    revalidatePath("/viewdata/viewdata/productchain");
    return { Response: { message: " OF Created" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//update of
export async function updateOf(row: string, formdata: FormData) {
  try {
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
    if (!updatedOf) throw new Error("error updating of");
    revalidatePath("/viewdata/viewdata/productchain");
    return { Response: { message: "OF Updated" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}

//get final products
export async function getFinalProducts() {
  try {
    const data = await db.production.findMany({
      where: {
        etat: "produit_fini",
      },
    });
    return { Response: { Result: data, message: "Final products found" } };
  } catch (error: any) {
    return { Error: error?.message };
  }
}
