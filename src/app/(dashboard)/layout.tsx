import { Toaster } from "@/components/ui/toaster";
import DashboardSidebar from "./_components/dashboardSidebar";
// import "./globals.css";
import CheckAdmin from "@/components/check-admin/check-admin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckAdmin>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="w-72">
            <DashboardSidebar />
          </div>
          <div className="flex-1">
            <div className="h-[62px] border-b"></div>
            <ScrollArea className="p-5 h-[calc(100vh-62px)]">
              {children}
            </ScrollArea>
            <Toaster />
          </div>
        </div>
      </SidebarProvider>
    </CheckAdmin>
  );
}
