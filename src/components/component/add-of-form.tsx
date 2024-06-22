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
          <DialogFooter>
            <Button type="submit">Add OF</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
