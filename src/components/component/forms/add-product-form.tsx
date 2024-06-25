"use client";
import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { createProduct } from "@/actions/actions";

interface Article {
  name: string;
  quantity: number;
}

export function AddProductForm() {
  const [productNumber, setProductNumber] = useState<string>("");
  
  const [articles, setArticles] = useState<Article[]>([
    { name: "Article 1", quantity: 1 },
    { name: "Article 2", quantity: 2 },
  ]);

  const addArticle = () => {
    setArticles([...articles, { name: "", quantity: 1 }]);
  };

  const removeArticle = (index: number) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
  };

  const updateArticle = (
    index: number,
    field: keyof Article,
    value: string | number
  ) => {
    const updatedArticles = [...articles];
    //@ts-ignore
    updatedArticles[index][field] = value;
    setArticles(updatedArticles); 
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Product Number:", productNumber);
    console.log("Articles:", articles);
    await createProduct(articles, productNumber);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-auto" size="sm">
          Create New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6" >
          <div className="grid gap-2">
            <Label htmlFor="productNumber">Product Number</Label>
            <Input
              id="productNumber"
              name="productNumber"
              value={productNumber}
              onChange={(e) => setProductNumber(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Articles</Label>
              <Button size="sm" onClick={addArticle}>
                Add Article
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        name={`articles[${index}]`}
                        value={article.name}
                        onChange={(e) =>
                          updateArticle(index, "name", e.target.value)
                        }
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        name={`quantities[${index}]`}
                        value={article.quantity}
                        onChange={(e) =>
                          updateArticle(
                            index,
                            "quantity",
                            parseFloat(e.target.value)
                          )
                        }
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArticle(index)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
