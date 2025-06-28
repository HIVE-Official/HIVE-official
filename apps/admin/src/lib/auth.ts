// Simple admin authentication check
// In production, this would integrate with Firebase Auth and check admin roles

export interface Admin {
  id: string
  email: string
  role: 'admin' | 'moderator'
  name: string
}

export function getCurrentAdmin(): Admin | null {
  // For development, return mock admin
  if (process.env.NODE_ENV === 'development') {
    return {
      id: 'admin-1',
      email: 'admin@hive.com',
      role: 'admin',
      name: 'Admin User'
    }
  }

  // In production, check actual authentication
  // This would check Firebase Auth and verify admin role
  return null
}
