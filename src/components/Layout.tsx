import React from 'react';
import { useOnlinePresence } from '../hooks/useOnlinePresence';
import BottomNavigation from './navigation/BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useOnlinePresence(); // Gestisce lo stato online globalmente

  return (
    <div className="min-h-screen theme-bg">
      {children}
      <BottomNavigation />
    </div>
  );
} 