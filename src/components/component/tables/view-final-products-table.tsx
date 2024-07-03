import { db } from "@/server/db";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { getFinalProducts } from "@/actions/actions";


export default async function ViewFinalProductsDataTable() {
  const data = await getFinalProducts()
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
          </TableRow>
        </TableHeader>
        <TableBody>
        {data && data.Response?.Result.map((row) => (
            <TableRow key={row.numeroof}>
              <TableCell className="font-medium">{row.numeroof}</TableCell>
              <TableCell>{row.numeroproduit}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.date.toISOString().split('T')[0]}</TableCell>
              <TableCell>{row.etat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
