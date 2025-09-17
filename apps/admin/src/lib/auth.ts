"use client";

import { useState, useEffect } from 'react';
import type { AdminUser } from './admin-auth';
import { logger } from '@hive/core';

// Admin role permissions
const ADMIN_ROLES = {
  super_admin: ['read', 'write', 'delete', 'manage_admins'],
  admin: ['read', 'write', 'delete'],
  moderator: ['read', 'write'],
  viewer: ['read'],
} as const;

/**
 * Get current admin user from session
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    // In development, return test admin
    if (process.env.NODE_ENV === 'development') {
      return {
        id: 'test-admin',
        email: 'admin@hive.com',
        role: 'admin' as const,
        permissions: ADMIN_ROLES.admin,
        lastLogin: new Date(),
      };
    }
    
    // In production, check Firebase auth and admin status
    const response = await fetch('/api/admin/session', {
      method: 'GET',
      credentials: 'include',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.admin || null;
  } catch (error) {
    logger.error('Error getting current admin:', error);
    return null;
  }
}

/**
 * Client-side admin authentication hook
 */
export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In development, use test admin
        if (process.env.NODE_ENV === 'development') {
          setAdmin({
            id: 'test-admin',
            email: 'admin@hive.com',
            role: 'admin' as const,
            permissions: ADMIN_ROLES.admin,
            lastLogin: new Date(),
          });
          return;
        }
        
        // In production, check Firebase auth
        const adminUser = await getCurrentAdmin();
        if (adminUser) {
          setAdmin(adminUser);
        } else {
          setError('Not authenticated or not an admin');
        }
      } catch (err) {
        logger.error('Admin auth error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    admin,
    loading,
    error,
    isAuthenticated: !!admin,
    isSuperAdmin: admin?.role === 'super_admin',
    canWrite: admin?.permissions?.includes('write') || false,
    canDelete: admin?.permissions?.includes('delete') || false,
    refresh: async () => {
      const adminUser = await getCurrentAdmin();
      setAdmin(adminUser);
    },
  };
}
