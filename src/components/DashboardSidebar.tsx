"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Package, Users, Settings, LogOut, BookOpen, CreditCard, ShieldCheck, BarChart2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function DashboardSidebar() {
  const { user, logout } = useAuthStore();
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const isSuperAdmin = user?.role === "superadmin";
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const adminLinks = [
    { title: "Overview", icon: LayoutDashboard, url: "/admin/dashboard" },
    { title: "Manage Posts", icon: FileText, url: "/admin/dashboard/posts" },
    { title: "Packages", icon: Package, url: "/admin/dashboard/packages" },
    { title: "Users", icon: Users, url: "/admin/dashboard/users" },
    { title: "Reports", icon: BarChart2, url: "/admin/dashboard/reports" },
    ...(isSuperAdmin ? [{ title: "Subscriptions", icon: ShieldCheck, url: "/admin/dashboard/platform" }] : []),
    { title: "Settings", icon: Settings, url: "/admin/dashboard/settings" },
  ];

  const userLinks = [
    { title: "My Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Browse Blogs", icon: BookOpen, url: "/blog" },
    { title: "Available Plans", icon: Package, url: "/dashboard/plans-purchase" },
    { title: "My Subscriptions", icon: CreditCard, url: "/dashboard/plans" },
    { title: "Settings", icon: Settings, url: "/dashboard/settings" },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-16 flex items-center justify-start group-data-[state=collapsed]:justify-center px-4 group-data-[state=collapsed]:px-0 transition-all duration-200 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 font-bold text-xl overflow-hidden group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:w-full">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs shrink-0 shadow-lg shadow-primary/20 transition-all duration-200 group-data-[state=collapsed]:w-8 group-data-[state=collapsed]:h-8">
            SD
          </div>
          <span className="truncate group-data-[state=collapsed]:hidden leading-tight animate-in fade-in slide-in-from-left-2 duration-300">
            Savita Dubey
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 group-data-[state=collapsed]:px-0 transition-all duration-200 overflow-x-hidden">
        <SidebarGroup className="group-data-[state=collapsed]:p-0">
          <SidebarGroupLabel className="px-2 group-data-[state=collapsed]:hidden transition-all text-xs font-semibold uppercase tracking-wider opacity-50">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 group-data-[state=collapsed]:items-center">
              {links.map((link) => (
                <SidebarMenuItem key={link.title} className="w-full flex justify-center">
                  <SidebarMenuButton 
                    render={<Link href={link.url} />}
                    tooltip={link.title} 
                    isActive={pathname === link.url}
                    className="h-10 w-full transition-all flex items-center justify-start group-data-[state=collapsed]:justify-center px-4 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:size-9"
                  >
                    <link.icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-data-[state=collapsed]:scale-110" />
                    <span className="font-medium group-data-[state=collapsed]:hidden ml-3 truncate transition-all">{link.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 transition-all duration-200 group-data-[state=collapsed]:p-0">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <SidebarMenuButton 
              size="lg" 
              className="h-12 w-full flex items-center justify-start group-data-[state=collapsed]:justify-center transition-all overflow-hidden !px-2 group-data-[state=collapsed]:!px-0" 
            />
          }>
            <div className="flex items-center justify-start group-data-[state=collapsed]:justify-center w-full">
              <Avatar className="h-8 w-8 rounded-lg shrink-0 border border-sidebar-border/50">
                <AvatarFallback className="rounded bg-primary/10 text-[10px] font-bold uppercase">
                  {user?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 text-left text-xs leading-tight group-data-[state=collapsed]:hidden pl-3 min-w-0">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate opacity-60 uppercase text-[10px]">{user?.role}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={state === "collapsed" ? "right" : "top"}
            align={state === "collapsed" ? "start" : "end"}
            className="w-56"
            sideOffset={12}
          >
            <div className="px-2 py-1.5 font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to log back in to access your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
