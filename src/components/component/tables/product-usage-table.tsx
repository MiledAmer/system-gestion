import { db } from "@/server/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

export default async function ProductUsageTable({
  productNumber,
}: {
  productNumber: string;
}) {
  const data = await db.utilisation.findMany({
    where: {
      numeroproduit: productNumber,
    },
  });
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="mx-auto">Article number</TableHead>
            <TableHead className="mx-auto">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row.numeroarticle}>
                <TableCell className="font-medium mx-auto">
                  {row.numeroarticle}
                </TableCell>
                <TableCell className="mx-auto">{row.quantite}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
