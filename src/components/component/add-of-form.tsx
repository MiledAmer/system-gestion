"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function AddOfForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">Create OF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add OF</DialogTitle>
          <DialogDescription>
            Enter the details of the article you want to add.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ofNumber">OF Number</Label>
              <Input id="ofNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productNumber">Product Number</Label>
              <Input id="productNumber" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" min={1} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="articleNumber">Article Number</Label>
              <Input id="articleNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="articleNumberQuantity">
                Article Quantity
              </Label>
              <Input
                id="articleNumberQuantity"
                type="number"
                min={1}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Add Article</Button>
            <Button type="submit">Add OF</Button>
          </DialogFooter>
        </form>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article Number</TableHead>
                <TableHead>Article Number Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>123456</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
