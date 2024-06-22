import { Button } from "@/components/ui/button";
import ViewUsersDataTable from "../tables/view-users-data-table";

export function UsersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h2 className="font-semibold text-lg md:text-2xl">Users</h2>
        <Button className="ml-auto" size="sm">
          Add OF
        </Button>
      </div>
      <ViewUsersDataTable />
    </main>
  );
}
