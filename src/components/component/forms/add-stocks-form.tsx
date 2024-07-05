"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { matierepremiere } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import ViewImportedStockDataTable from "../tables/view-imported-stock-data-table";
import { cn } from "@/lib/utils";

function AddStocksForm() {
  const [Data, setData] = useState<unknown[]>([]);
  const [State, setState] = useState("Upload");
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming the data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON format
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        raw: false, // Use raw: false to get strings instead of raw values
        dateNF: "yyyy-mm-dd", // Specify date format
      });
      jsonData.forEach((row: any) => {
        Object.keys(row).forEach((key) => {
          if (typeof row[key] === "string" && key === "Date") {
            const parsedDate = new Date(row[key]);
            if (!isNaN(parsedDate.getTime())) {
              row[key] = parsedDate;
            }
          }
        });
      });
      const TypedData: matierepremiere[] = jsonData.map((row: any) => {
        const TypedRow: matierepremiere = {
          numeroarticle: row["Article number"],
          designation: row["Description"],
          type: row["Type"],
          quantite: parseFloat(row["Quantity"]),
          quantiteTheorique: parseFloat(row["Quantity"]),
          prixunitaire: parseFloat(row["Unit Price"]),
          date: row["Date"],
        };
        return TypedRow;
      });
      console.log(TypedData, jsonData);
      setData(TypedData);
      setState("Confirm");
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add Stocks
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "sm:max-w-[600px] max-h-[80vh] overflow-auto",
          State === "Confirm" && "sm:max-w-fit"
        )}
      >
        {State === "Upload" ? (
          <>
            <DialogHeader>
              <DialogTitle>Add Stocks</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4 py-8 px-4">
              <Label htmlFor="stocks-file" className="text-right">
                Upload Excel File
              </Label>
              <Input
                onChange={handleUpload}
                id="stocks-file"
                name="stocks-file"
                className="col-span-3"
                type="file"
                required
              />
            </div>
          </>
        ) : (
          <ViewImportedStockDataTable data={Data as matierepremiere[]} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddStocksForm;
