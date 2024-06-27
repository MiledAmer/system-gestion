"use client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ActionResponse, ProductInOF } from "@/actions/actions";
import { useEffect } from "react";

export default async function ProductInOFTable({
  Getter,
}: {
  Getter: ActionResponse;
}) {
  const { toast } = useToast();
  const data = Getter.Response?.Result;
  useEffect(() => {
    if (Getter.Error) {
      toast({ description: Getter.Error, icon: "error", variant: "error" });
    }
  }, [Getter]);
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="mx-auto">OF number</TableHead>
            <TableHead className="mx-auto">Quantity</TableHead>
            <TableHead className="mx-auto">State</TableHead>
            <TableHead className="mx-auto">Date of manufacture</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map(
              (row: any) =>
                true && (
                  <TableRow key={row.numeroof}>
                    <TableCell className="font-medium mx-auto">
                      {row.numeroof}
                    </TableCell>
                    <TableCell className="mx-auto">{row.quantity}</TableCell>
                    <TableCell className="mx-auto">{row.etat}</TableCell>
                    <TableCell className="mx-auto">
                      {row.date.toISOString().split("T")[0]}
                    </TableCell>
                  </TableRow>
                )
            )}
        </TableBody>
      </Table>
    </div>
  );
}
