"use client";
import React from "react";
import { Button } from "../../ui/button";

export default function DeleteButtons() {
  return (
    <Button type="submit" variant="outline" size="sm" className="text-red-500">
      Delete
    </Button>
  );
}
