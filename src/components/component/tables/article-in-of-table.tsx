import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { articleInOF } from "@/actions/actions";

export default async function ArticleInOFTable({
  articleNumber,
}: {
  articleNumber: string;
}) {
  const data = await articleInOF(articleNumber);
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
            <TableHead className="mx-auto">real inventory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((row) =>(
            row.product.utilisation.length > 0 && 
              <TableRow key={row.numeroof}>
                <TableCell className="font-medium mx-auto">{row.numeroof}</TableCell>
                <TableCell className="mx-auto">{row.product.numeroproduit}</TableCell>
                <TableCell className="mx-auto">{row.etat}</TableCell>
                <TableCell className="mx-auto">{row.date.toISOString().split('T')[0]}</TableCell>
                <TableCell className="mx-auto">{row.quantity*row.product.utilisation[0].quantite}</TableCell>
                <TableCell className="mx-auto">{"test"}</TableCell>
                <TableCell className="mx-auto">{"test"}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
