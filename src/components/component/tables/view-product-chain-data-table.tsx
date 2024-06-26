import { db } from "@/server/db";
import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { UpdateOfForm } from "../forms/update-of-form";


export default async function ViewProductChainDataTable() {
  const data = await db.production.findMany();
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OF number</TableHead>
            <TableHead>Product number</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>State</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {data && data.map((row) => (
            <TableRow key={row.numeroof}>
              <TableCell className="font-medium">{row.numeroof}</TableCell>
              <TableCell>{row.numeroproduit}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.date.toISOString().split('T')[0]}</TableCell>
              <TableCell>{row.etat}</TableCell>
              <TableCell className="text-right">
              <UpdateOfForm row={row}/>
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
