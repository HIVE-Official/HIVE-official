import type { Firestore, DocumentData, DocumentReference, CollectionReference } from 'firebase-admin/firestore';
import type { Auth, UserRecord } from 'firebase-admin/auth';

export class MockFirestore implements Partial<Firestore> {
  private data: Map<string, DocumentData> = new Map();

  collection(path: string): CollectionReference {
    return {
      doc: (id: string) => this.doc(`${path}/${id}`),
      id: path,
      parent: null,
      path: path,
    } as unknown as CollectionReference;
  }

  doc(path: string): DocumentReference {
    return {
      set: async (data: DocumentData) => {
        this.data.set(path, data);
      },
      get: async () => ({
        exists: this.data.has(path),
        data: () => this.data.get(path),
      }),
      id: path.split('/').pop() || '',
      path: path,
      parent: this.collection(path.split('/').slice(0, -1).join('/')),
    } as unknown as DocumentReference;
  }
}

export class MockAuth implements Partial<Auth> {
  async getUser(uid: string): Promise<UserRecord> {
    return {
      uid,
      email: `${uid}@example.com`,
      emailVerified: true,
    } as unknown as UserRecord;
  }

  async createUser(properties: { email: string; }): Promise<UserRecord> {
    return {
      uid: 'mock-uid',
      ...properties,
      emailVerified: true,
    } as unknown as UserRecord;
  }
}

export const mockDbAdmin = new MockFirestore();
export const mockAuthAdmin = new MockAuth(); 