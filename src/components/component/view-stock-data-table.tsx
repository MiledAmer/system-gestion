import { db } from "@/server/db";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default async function ViewStockDataTable() {
  const data = await db.matierepremiere.findMany();

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
          
          {data && data.map((row) => (
            <TableRow key={row.numeroarticle}>
              <TableCell className="font-medium">{row.numeroarticle}</TableCell>
              <TableCell>{row.designation}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.quantite}</TableCell>
              <TableCell>{row.prixunitaire}</TableCell>
              <TableCell>{row.date.toISOString().split('T')[0]}</TableCell>
              <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
