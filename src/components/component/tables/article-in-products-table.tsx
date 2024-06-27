"use client";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ActionResponse, articleUsage } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

export default async function ArticleInProductsTable({
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
  }, [Getter]);
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="mx-auto">Product number</TableHead>
            <TableHead className="mx-auto">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((row: any) => (
              <TableRow key={row.numeroproduit}>
                <TableCell>{row.numeroproduit}</TableCell>
                <TableCell>{row.quantite}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
