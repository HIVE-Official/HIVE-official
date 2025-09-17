// Firebase module exports
// Admin exports (server-side)
export { 
  dbAdmin, 
  authAdmin, 
  storageAdmin,
  type AdminAuth,
  type AdminFirestore,
  type AdminStorage 
} from './admin/firebase-admin';

// Client exports (browser-side)
export { 
  auth as authClient, 
  db as dbClient, 
  storage as storageClient,
  app as firebaseApp
} from './client/firebase-client';

// Collection definitions
export * from './collections/firebase-collections';
