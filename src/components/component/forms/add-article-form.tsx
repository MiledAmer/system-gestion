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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createArticle } from "@/actions/actions";
import { useToast } from "@/components/ui/use-toast";

export function AddArticleForm() {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add Article
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Article</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new article to your inventory.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          action={async (FormData) => {
            const Setter = await createArticle(FormData);
            if (Setter?.Error) {
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="article-number" className="text-right">
              Article Number
            </Label>
            <Input
              id="article-number"
              name="article-number"
              placeholder="123456"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select name="type" defaultValue="piece" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piece">piece</SelectItem>
                <SelectItem value="metre">metre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="1"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit-price" className="text-right">
              Unit Price
            </Label>
            <Input
              id="unit-price"
              name="unit-price"
              type="number"
              placeholder="9.99"
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Article</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
