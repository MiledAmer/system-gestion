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
import { updateArticle } from "@/actions/actions";
import { matierepremiere } from "@prisma/client";

export function UpdateArticleForm({ row }: { row: matierepremiere }) {
  const updateRow = updateArticle.bind(null, row);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="mr-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Article</DialogTitle>
          <DialogDescription>
            Fill out the form to update the article {row.numeroarticle} in your
            inventory.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" action={updateRow}>
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
            <Select name="type">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piece">piece</SelectItem>
                <SelectItem value="metre">metre</SelectItem>
                {/* <SelectItem value="other">Other</SelectItem> */}
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
            />
          </div>
          <DialogFooter>
            <Button type="submit">Update Article</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
