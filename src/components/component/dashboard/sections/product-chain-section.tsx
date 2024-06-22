import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  CircleCheckIcon,
  ClockIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "../../../icons/dashboard-icons";
import { Button } from "../../../ui/button";

export default function ProductChainSection() {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Production Chain</h2>
        <Link
          href="#"
          className="text-gray-900 hover:text-primary-600 dark:text-gray-50"
          prefetch={false}
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCartIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              -3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Shipped Orders
            </CardTitle>
            <TruckIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">321</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Delivered Orders
            </CardTitle>
            <CircleCheckIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">298</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
        <Link
          href="/viewdata/productchain"
          className="rounded-lg bg-slate-950 px-3 py-2 text-white transition-all hover:text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Manage Production
        </Link>
      </div>
    </section>
  );
}
