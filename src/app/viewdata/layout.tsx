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
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ViewDataLayout>{children}</ViewDataLayout>
      </body>
    </html>
  );
}
