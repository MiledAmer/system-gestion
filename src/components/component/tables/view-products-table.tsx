import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { deleteProduct, getProducts } from "@/actions/actions";
import DeleteButtons from "./delete-button";
import Link from "next/link";

export default async function ViewProductsTable() {
  const data = await getProducts();
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row.numeroproduit}>
                <TableCell>{row.numeroproduit}</TableCell>
                <TableCell className="text-right flex flex-row-reverse">
                  <form
                    action={async () => {
                      "use server";
                      await deleteProduct(row);
                    }}
                  >
                    <DeleteButtons />
                  </form>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Link href={`/viewdata/products/${row.numeroproduit}`} className="mr-2">
                    <Button variant="outline" size="sm">
                      details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
