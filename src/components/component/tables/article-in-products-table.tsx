import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { articleUsage } from "@/actions/actions";


export default async function ArticleInProductsTable({ articleNumber }: { articleNumber: string}) {
  const data = await articleUsage(articleNumber.replace("%20", " "));
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
            data.map((row) => (
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
