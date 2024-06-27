"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { matierepremiere } from "@prisma/client";
import { deleteArticle } from "@/actions/actions";
import { UpdateArticleForm } from "../forms/update-article-form";
import DeleteButtons from "./delete-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ViewStockDataTable({
  data,
}: {
  data: matierepremiere[];
}) {
  const { toast } = useToast();
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Article number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((row: matierepremiere) => (
              <TableRow key={row.numeroarticle}>
                <TableCell className="font-medium">
                  {row.numeroarticle}
                </TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.quantite}</TableCell>
                <TableCell>{row.prixunitaire}</TableCell>
                <TableCell>{row.date.toISOString().split("T")[0]}</TableCell>
                <TableCell className="text-right flex flex-row-reverse">
                  <form
                    action={async (formData: FormData) => {
                      const deleteArticleRow = deleteArticle.bind(null, row);
                      const Setter = await deleteArticleRow(formData);
                      if (Setter?.Error) {
                        toast({
                          description: Setter.Error,
                          variant: "error",
                          icon: "error",
                        });
                      } else {
                        toast({
                          description: Setter.Response?.message,
                          variant: "verified",
                          icon: "verified",
                        });
                      }
                    }}
                  >
                    <DeleteButtons />
                  </form>
                  <UpdateArticleForm row={row} />
                  <Link
                    href={`/viewdata/stocks/${row.numeroarticle}`}
                    className="mr-2"
                  >
                    <Button variant="outline" size="sm">
                      details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
