import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GaugeIcon, PackageIcon, PackageXIcon } from "../icons/dashboard-icons";
import { Button } from "../ui/button";


export default function StockSection() {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-950">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Stock Management</h2>
            <Link href="#" className="text-gray-900 hover:text-primary-600 dark:text-gray-50" prefetch={false}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <PackageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <GaugeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">987</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">-2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                <PackageXIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Reorder Level</CardTitle>
                <GaugeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">No change from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Link href='/viewData/stocks' className="rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200">Manage Stock</Link>
          </div>
        </section>
  )
}
