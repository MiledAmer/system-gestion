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
  console.log(data);
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
          {data &&
            data.map((row) =>
              row.product.production.map((production) => (
                <TableRow key={production.numeroof}>
                  <TableCell className="mx-auto">
                    {production.numeroof}
                  </TableCell>
                  <TableCell className="mx-auto">
                    {row.product.numeroproduit}
                  </TableCell>
                  <TableCell className="mx-auto">
                    {production.etat}
                  </TableCell>
                  <TableCell className="mx-auto">{}</TableCell>
                  <TableCell className="mx-auto">{row.quantite}</TableCell>
                  <TableCell className="mx-auto">{}</TableCell>
                  <TableCell className="mx-auto">{}</TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
      </Table>
    </div>
  );
}
