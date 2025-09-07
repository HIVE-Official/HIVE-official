// Mock firebase admin for client-side usage
// In production, this should only be used on server-side

export const adminFirestore = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      get: async () => null,
      set: async (data: any) => data,
      update: async (data: any) => data,
      delete: async () => true,
    }),
    add: async (data: any) => ({ id: 'mock-id', ...data }),
    where: (field: string, op: string, value: any) => ({
      get: async () => ({ docs: [] }),
    }),
  }),
  
  batch: () => ({
    set: () => {},
    update: () => {},
    delete: () => {},
    commit: async () => true,
  }),
  
  runTransaction: async (fn: () => void) => fn(),
};