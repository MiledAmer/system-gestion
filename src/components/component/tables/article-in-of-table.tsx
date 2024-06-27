"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ActionResponse, articleInOF } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default async function ArticleInOFTable({
  Getter,
}: {
  Getter: ActionResponse;
}) {
  const { toast } = useToast();
  const data = Getter.Response?.Result;
  useEffect(() => {
    if (Getter.Error) {
      toast({
        description: Getter.Error,
        variant: "error",
        icon: "error",
      });
    }
  }, [Getter]);
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="mx-auto">OF number</TableHead>
            <TableHead className="mx-auto">Product</TableHead>
            <TableHead className="mx-auto">State</TableHead>
            <TableHead className="mx-auto">Date of manufacture</TableHead>
            <TableHead className="mx-auto">use</TableHead>
            <TableHead className="mx-auto">theoretical inventory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map(
              (row: any) =>
                row.product.utilisation.length > 0 && (
                  <TableRow key={row.numeroof}>
                    <TableCell className="font-medium mx-auto">
                      {row.numeroof}
                    </TableCell>
                    <TableCell className="mx-auto">
                      {row.product.numeroproduit}
                    </TableCell>
                    <TableCell className="mx-auto">{row.etat}</TableCell>
                    <TableCell className="mx-auto">
                      {row.date.toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="mx-auto">
                      {row.quantity * row.product.utilisation[0].quantite}
                    </TableCell>

                    <TableCell className="mx-auto">{"test"}</TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
    </div>
  );
}
