import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ProductInOF } from "@/actions/actions";

export default async function ProductInOFTable({
  productNumber,
}: {
  productNumber: string;
}) {
  const data = await ProductInOF(productNumber);

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
              (row) =>
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
