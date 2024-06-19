import Link from "next/link";
import { BellIcon, Package2Icon } from "../icons/dashboard-icons";
import { Button } from "../ui/button";

export default function AppBar() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 font-bold text-lg"
          prefetch={false}
        >
          <Package2Icon className="w-6 h-6" />
          Acme Dashboard
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="#" className="hover:text-gray-300" prefetch={false}>
            History
          </Link>
          <Link href="#" className="hover:text-gray-300" prefetch={false}>
            Alerts
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <BellIcon className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src="/placeholder.svg"
            width="32"
            height="32"
            className="rounded-full"
            alt="Avatar"
          />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}
