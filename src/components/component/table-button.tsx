'use client'
import React from "react";
import { Button } from "../ui/button";
import { deleteArticle } from "@/actions/actions";
import { matierepremiere } from "@prisma/client";

export default function TableButtons({ row }: { row: matierepremiere }) {
  const deleteArticleRow = deleteArticle.bind(null, row);
  return (
    <form>
      <Button type="button" variant="outline" size="sm" className="mr-2">
        Edit
      </Button>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="text-red-500"
        formAction={deleteArticleRow}
      >
        Delete
      </Button>
    </form>
  );
}
