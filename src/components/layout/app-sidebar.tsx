"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Sparkles,
  UserCog,
  CalendarDays,
  ScrollText,
  Dice3,
  SunMoon, // For theme toggle example
  Settings,
  LayoutDashboard,
  BookOpenText,
  Puzzle,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/dashboard', label: 'Daily Forecast', icon: Sparkles },
  { href: '/calendar', label: 'Perpetual Calendar', icon: CalendarDays },
  { href: '/bazi-chart', label: 'Bazi Chart', icon: BookOpenText },
  { href: '/little-six-arts', label: 'Little Six Arts', icon: Puzzle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <SunMoon className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
            {APP_NAME}
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, className: "bg-card text-card-foreground border-border shadow-md" }}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
           <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              tooltip={{ children: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`, className: "bg-card text-card-foreground border-border shadow-md" }}
            >
              <SunMoon className="h-5 w-5" />
              <span>Toggle Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings" passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/settings'}
                tooltip={{ children: "Settings", className: "bg-card text-card-foreground border-border shadow-md" }}
              >
                <a>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
