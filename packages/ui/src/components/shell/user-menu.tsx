"use client";

import React from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Bell,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full hover:bg-[rgba(255,255,255,0.08)]"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-[#FFD700] text-[#0A0A0A] text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className={`
          w-64 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl 
          border-[rgba(255,255,255,0.12)] text-white
          shadow-2xl
        `}
        align="end"
      >
        {/* User Info */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {user.name}
            </p>
            <p className="text-xs leading-none text-[#A1A1AA]">
              @{user.handle}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.12)]" />
        
        {/* Profile Actions */}
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.12)]" />
        
        {/* Account & Billing */}
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.12)]" />
        
        {/* Theme Toggle */}
        <DropdownMenuItem className="hover:bg-[rgba(255,255,255,0.08)] focus:bg-[rgba(255,255,255,0.08)]">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark mode</span>
          <span className="ml-auto text-xs text-[#A1A1AA]">⌘D</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.12)]" />
        
        {/* Sign Out */}
        <DropdownMenuItem 
          className="hover:bg-[rgba(255,85,85,0.1)] focus:bg-[rgba(255,85,85,0.1)] text-[#FF5555]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}