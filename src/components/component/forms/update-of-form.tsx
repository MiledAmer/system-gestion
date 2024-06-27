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
import { createOf, updateOf } from "@/actions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { production } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export function UpdateOfForm({ row }: { row: production }) {
  const { toast } = useToast();
  const updateOfWithNumber = updateOf.bind(null, row.numeroof);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="mr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update OF</DialogTitle>
          <DialogDescription>OF: {row.numeroof}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (Formdata) => {
            const Setter = await updateOfWithNumber(Formdata);
            if (Setter.Error) {
              toast({
                description: Setter.Error,
                variant: "error",
                icon: "error",
              });
            } else {
              toast({
                description: Setter.Response?.message,
                variant: "verified",
                icon: "verified",
              });
            }
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productNumber">Product Number</Label>
              <Input
                id="productNumber"
                name="productNumber"
                defaultValue={row.numeroproduit}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={row.quantity.toString()}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Date">Production date</Label>
              <Input
                id="Date"
                type="Date"
                name="Date"
                defaultValue={row.date.toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="State">State</Label>
              <Select name="State" defaultValue={row.etat} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a_produire">a produire</SelectItem>
                  <SelectItem value="en_production">en production</SelectItem>
                  <SelectItem value="produit_fini">produit fini</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add OF</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
