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
import { createOf } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

export function AddOfForm() {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Create OF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add OF</DialogTitle>
          <DialogDescription>
            Enter the details of the article you want to add.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          action={async (FormData) => {
            const Setter = await createOf(FormData);
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
              <Label htmlFor="ofNumber">OF Number</Label>
              <Input id="ofNumber" name="ofNumber" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productNumber">Product Number</Label>
              <Input id="productNumber" name="productNumber" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Date">Production date</Label>
              <Input id="Date" type="Date" name="Date" required />
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
