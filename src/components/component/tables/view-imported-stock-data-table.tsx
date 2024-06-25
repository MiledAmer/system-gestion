"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { matierepremiere, measurement } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createArticles } from "@/actions/actions";

export default function ViewImportedStockDataTable({
  data,
}: {
  data: matierepremiere[];
}) {
  const [EditMode, SetEditMode] = useState<number | null>(null);
  const [Data, setData] = useState(data);
  const [EditRow, setEditRow] = useState<any | null>({});
  return (
    <form action={async () => await createArticles(Data)}>
      <DialogHeader className="flex py-4">
        <DialogTitle>Add Stocks</DialogTitle>
        <DialogClose asChild>
          <Button className="w-fit self-end" type="submit">
            Save
          </Button>
        </DialogClose>
      </DialogHeader>
      <Table className="border shadow-sm rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Article number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Data &&
            Data.map((row: matierepremiere, index: number) => (
              <>
                {EditMode == index ? (
                  <TableRow key={row.numeroarticle}>
                    <TableCell className="font-medium">
                      <Input
                        name="article-number"
                        required
                        onChange={(e) =>
                          setEditRow({
                            ...EditRow,
                            numeroarticle: e.target.value,
                          })
                        }
                        defaultValue={row.numeroarticle}
                      ></Input>
                    </TableCell>
                    <TableCell>
                      <Input
                        required
                        name="description"
                        onChange={(e) =>
                          setEditRow({
                            ...EditRow,
                            designation: e.target.value,
                          })
                        }
                        defaultValue={row.designation || ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        required
                        name="type"
                        onChange={(e) =>
                          setEditRow({ ...EditRow, type: e.target.value })
                        }
                        defaultValue={row.type || ""}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        required
                        name="quantite"
                        onChange={(e) =>
                          setEditRow({
                            ...EditRow,
                            quantite: parseFloat(e.target.value),
                          })
                        }
                        defaultValue={row.quantite}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        required
                        name="unit-price"
                        onChange={(e) =>
                          setEditRow({
                            ...EditRow,
                            prixunitaire: parseFloat(e.target.value),
                          })
                        }
                        defaultValue={row.prixunitaire}
                      />
                    </TableCell>
                    <TableCell>
                      {row.date.toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right flex flex-row-reverse">
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => {
                          const NewData = Data.map(
                            (row: matierepremiere, i: number) => {
                              if (i === index) {
                                return EditRow;
                              }
                              return row;
                            }
                          );
                          setData(NewData);
                          setEditRow({});
                          SetEditMode(null);
                        }}
                      >
                        Comfirm
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={row.numeroarticle}>
                    <TableCell className="font-medium">
                      {row.numeroarticle}
                    </TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.quantite}</TableCell>
                    <TableCell>{row.prixunitaire}</TableCell>
                    <TableCell>
                      {row.date.toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right flex flex-row-reverse">
                      <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => {
                          SetEditMode(index);
                          setEditRow(row);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
        </TableBody>
      </Table>
    </form>
  );
}
