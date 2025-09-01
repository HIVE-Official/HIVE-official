// Temporary stub for @hive/ui to enable compilation testing
import React from 'react';

// Basic component stubs
export const Button = ({ children, className, onClick, ...props }: any) => 
  React.createElement('button', { className, onClick, ...props }, children);
  
export const Input = ({ className, ...props }: any) => 
  React.createElement('input', { className, ...props });
  
export const Card = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const CardContent = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const CardHeader = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const CardTitle = ({ children, className }: any) => 
  React.createElement('h3', { className }, children);
  
export const CardDescription = ({ children, className }: any) => 
  React.createElement('p', { className }, children);
  
export const Alert = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const AlertDescription = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const Badge = ({ children, className }: any) => 
  React.createElement('span', { className }, children);
  
export const Avatar = ({ className, ...props }: any) => 
  React.createElement('div', { className, ...props });
  
export const Separator = ({ className }: any) => 
  React.createElement('hr', { className });
  
export const Tabs = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const TabsContent = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const TabsList = ({ children, className }: any) => 
  React.createElement('div', { className }, children);
  
export const TabsTrigger = ({ children, className }: any) => 
  React.createElement('button', { className }, children);
  
export const Checkbox = ({ className, ...props }: any) => 
  React.createElement('input', { type: 'checkbox', className, ...props });
  
export const Switch = ({ className, ...props }: any) => 
  React.createElement('input', { type: 'checkbox', className, ...props });
  
export const Tooltip = ({ children }: any) => children;
export const TooltipContent = ({ children }: any) => children;
export const TooltipProvider = ({ children }: any) => children;
export const TooltipTrigger = ({ children }: any) => children;

// Additional missing components
export const Display = ({ children, className }: any) => React.createElement('h1', { className }, children);
export const Heading = ({ children, className }: any) => React.createElement('h2', { className }, children);
export const ProfileCard = ({ children, className }: any) => React.createElement('div', { className }, children);
export const SpaceCard = ({ children, className }: any) => React.createElement('div', { className }, children);
export const ToolCard = ({ children, className }: any) => React.createElement('div', { className }, children);
export const FeedCard = ({ children, className }: any) => React.createElement('div', { className }, children);
export const NotificationCard = ({ children, className }: any) => React.createElement('div', { className }, children);
export const SearchBar = ({ children, className }: any) => React.createElement('div', { className }, children);
export const UserItem = ({ children, className }: any) => React.createElement('div', { className }, children);
export const HiveText = ({ children, className }: any) => React.createElement('div', { className }, children);
export const LoadingSpinner = ({ className }: any) => React.createElement('div', { className }, 'Loading...');
export const ErrorBoundary = ({ children }: any) => children;
export const useUnifiedAuth = () => ({ user: null, loading: false });