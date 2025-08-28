"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = exports.app = exports.isFirebaseConfigured = exports.firebaseAuth = exports.adminFirestore = exports.dbAdmin = void 0;
// Re-export Firebase admin utilities for easier importing
var firebase_admin_1 = require("../firebase-admin");
Object.defineProperty(exports, "dbAdmin", { enumerable: true, get: function () { return firebase_admin_1.dbAdmin; } });
Object.defineProperty(exports, "adminFirestore", { enumerable: true, get: function () { return firebase_admin_1.adminFirestore; } });
Object.defineProperty(exports, "firebaseAuth", { enumerable: true, get: function () { return firebase_admin_1.firebaseAuth; } });
Object.defineProperty(exports, "isFirebaseConfigured", { enumerable: true, get: function () { return firebase_admin_1.isFirebaseConfigured; } });
var firebase_1 = require("../firebase");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return firebase_1.app; } });
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return firebase_1.auth; } });
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return firebase_1.db; } });
//# sourceMappingURL=index.js.map