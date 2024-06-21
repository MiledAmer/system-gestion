'use client'
import React from "react";
import { Button } from "../ui/button";
import { deleteArticle } from "@/actions/actions";
import { matierepremiere } from "@prisma/client";

export default function TableButtons({row}: {row:matierepremiere}) {
  return (
    <div>
      <Button variant="outline" size="sm" className="mr-2">
        Edit
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-red-500"
        onSubmit={() => deleteArticle(row)}
      >
        Delete
      </Button>
    </div>
  );
}
