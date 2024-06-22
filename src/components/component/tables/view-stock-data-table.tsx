import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { matierepremiere } from "@prisma/client";
import TableButtons from "./table-button";
import { Button } from "../../ui/button";
import { deleteArticle } from "@/actions/actions";
import { UpdateArticleForm } from "../forms/update-article-form";

export default async function ViewStockDataTable({
  data,
}: {
  data: matierepremiere[];
}) {
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
                  <TableButtons row={row} />
                  <UpdateArticleForm row={row} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
