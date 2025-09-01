// Mock firebase admin for client-side usage
// In production, this should only be used on server-side
export const adminFirestore = {
    collection: (name) => ({
        doc: (id) => ({
            get: async () => null,
            set: async (data) => data,
            update: async (data) => data,
            delete: async () => true,
        }),
        add: async (data) => ({ id: 'mock-id', ...data }),
        where: (field, op, value) => ({
            get: async () => ({ docs: [] }),
        }),
    }),
    batch: () => ({
        set: () => { },
        update: () => { },
        delete: () => { },
        commit: async () => true,
    }),
    runTransaction: async (fn) => fn(),
};
//# sourceMappingURL=firebase-admin.js.map