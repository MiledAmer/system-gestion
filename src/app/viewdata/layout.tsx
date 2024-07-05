import ViewDataLayout from "@/components/component/viewdata/view-data-layout";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster />
      <ViewDataLayout>{children}</ViewDataLayout>
    </div>
  );
}
