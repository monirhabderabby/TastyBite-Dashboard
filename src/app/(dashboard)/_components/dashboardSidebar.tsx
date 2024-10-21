"use client";

import Logo from "@/components/common/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navMenus } from "@/data/menus";
import { ChevronRight, LogOut, SquareKanban } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar className="w-72">
            <SidebarHeader className="border-b">
                <div className="mx-auto">
                    <Logo />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-5 mt-5">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={pathname === "/" ? true : false}
                                >
                                    <SquareKanban className="w-6" />
                                    <Link href={"/"} className="text-base">
                                        Overview
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                        <SidebarMenu>
                            {navMenus.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={
                                                    pathname.includes(item.url)
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {item.icon && (
                                                    <item.icon className="w-6" />
                                                )}

                                                <span className="text-base">
                                                    {item.title}
                                                </span>

                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem
                                                        key={subItem.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                            >
                                                                <span className="text-base">
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto mx-auto mb-8 space-y-2">
                <div className="flex justify-center items-center gap-x-4">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={""} alt="user image" />
                        <AvatarFallback className="rounded-full">
                            TB
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Alan Donald
                        </span>
                        <span className="truncate text-xs">
                            alan@donald@gmail.com
                        </span>
                    </div>
                </div>
                <Button className="bg-primary-black flex justify-center items-center gap-x-2">
                    <LogOut className="w-4" />
                    Log out
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardSidebar;
