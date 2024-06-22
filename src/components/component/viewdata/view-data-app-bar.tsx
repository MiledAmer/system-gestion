import Link from 'next/link'
import React from 'react'
import { Package2Icon, SearchIcon } from '../../icons/stock-icons'
import { Input } from '../../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'

export default function ViewDataAppBar() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">Stock Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="flex-1 relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-8 h-8 w-[200px] sm:w-[300px] md:w-[400px]"
              />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                >
                  <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
  )
}
