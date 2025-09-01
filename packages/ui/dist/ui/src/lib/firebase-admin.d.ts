export declare const adminFirestore: {
    collection: (name: string) => {
        doc: (id: string) => {
            get: () => Promise<null>;
            set: (data: any) => Promise<any>;
            update: (data: any) => Promise<any>;
            delete: () => Promise<boolean>;
        };
        add: (data: any) => Promise<any>;
        where: (field: string, op: string, value: any) => {
            get: () => Promise<{
                docs: never[];
            }>;
        };
    };
    batch: () => {
        set: () => void;
        update: () => void;
        delete: () => void;
        commit: () => Promise<boolean>;
    };
    runTransaction: (fn: Function) => Promise<any>;
};
//# sourceMappingURL=firebase-admin.d.ts.map