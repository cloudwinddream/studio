"use client";

import type { UserProfile } from '@/lib/types';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { USER_PROFILE_STORAGE_KEY } from '@/lib/constants';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
      if (storedProfile) {
        setUserProfileState(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to load user profile from local storage:", error);
    }
    setIsLoading(false);
  }, []);

  const setUserProfile = (profile: UserProfile | null) => {
    setUserProfileState(profile);
    setIsLoading(true);
    try {
      if (profile) {
        localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
      } else {
        localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save user profile to local storage:", error);
    }
    setIsLoading(false);
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
