"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SunMoon } from 'lucide-react'; // Using SunMoon as a placeholder logo/icon
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <SunMoon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-primary">{APP_NAME}</span>
        </Link>
      </div>
      <div className="ml-auto">
        {/* Placeholder for user menu or other actions */}
        {/* <Button variant="ghost" size="icon">
          <UserCircle className="h-5 w-5" />
        </Button> */}
      </div>
    </header>
  );
}
