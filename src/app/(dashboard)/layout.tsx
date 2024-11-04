import DashboardSidebar from "./_components/dashboardSidebar";
// import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <div className="w-72">
                    <DashboardSidebar />
                </div>
                <div className="flex-1 mt-[61px] border-t p-5">{children}</div>
            </div>
        </SidebarProvider>
    );
}
