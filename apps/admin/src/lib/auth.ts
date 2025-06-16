// Placeholder auth function for admin
// TODO: Implement proper admin authentication
export function getCurrentAdmin() {
  // For now, return a mock admin to allow the build to pass
  // This should be replaced with proper Firebase Admin SDK authentication
  return {
    id: "admin-1",
    email: "admin@hive.com",
    role: "admin",
  };
}
