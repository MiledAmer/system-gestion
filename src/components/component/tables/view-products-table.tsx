"use client";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ActionResponse, deleteProduct, getProducts } from "@/actions/actions";
import DeleteButtons from "./delete-button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { product } from "@prisma/client";

export default async function ViewProductsTable({
  Getter,
}: {
  Getter: ActionResponse;
}) {
  const { toast } = useToast();
  const data = Getter.Response?.Result;
  useEffect(() => {
    if (Getter.Error) {
      toast({ description: Getter.Error, variant: "error", icon: "error" });
    }
  });
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product number</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Labour cost</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((row: product) => (
              <TableRow key={row.numeroproduit}>
                <TableCell>{row.numeroproduit}</TableCell>
                <TableCell>{row.prix}</TableCell>
                <TableCell>{row.prix_main_oeuvre}</TableCell>
                <TableCell className="text-right flex flex-row-reverse">
                  <form
                    action={async () => {
                      const Setter = await deleteProduct(row.numeroproduit);
                      if (Setter.Error) {
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
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Link
                    href={`/viewdata/products/${row.numeroproduit}`}
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
