import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function ViewProductChainDataTable() {
  return (
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>OF number</TableHead>
            <TableHead>Product number</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Apple Inc.</TableCell>
            <TableCell>100</TableCell>
            <TableCell>$120.00</TableCell>
            <TableCell>$12,000.00</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Microsoft Corp.</TableCell>
            <TableCell>50</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>$12,500.00</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Amazon.com, Inc.</TableCell>
            <TableCell>75</TableCell>
            <TableCell>$3,000.00</TableCell>
            <TableCell>$225,000.00</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Tesla, Inc.</TableCell>
            <TableCell>25</TableCell>
            <TableCell>$800.00</TableCell>
            <TableCell>$20,000.00</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
