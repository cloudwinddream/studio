"use client";

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfileProvider } from '@/contexts/user-profile-context';
import { ThemeProvider } from 'next-themes'; // For potential dark mode toggle later

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfileProvider>
         <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
         </ThemeProvider>
      </UserProfileProvider>
    </QueryClientProvider>
  );
}
