"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryKeys = exports.queryClient = void 0;
// Query client and keys
var query_client_1 = require("./query-client");
Object.defineProperty(exports, "queryClient", { enumerable: true, get: function () { return query_client_1.queryClient; } });
Object.defineProperty(exports, "queryKeys", { enumerable: true, get: function () { return query_client_1.queryKeys; } });
// Space queries
__exportStar(require("./space-queries"), exports);
// Profile queries
__exportStar(require("./profile-queries"), exports);
// Tool queries
__exportStar(require("./tool-queries"), exports);
// Feed queries
__exportStar(require("./feed-queries"), exports);
// Auth queries
__exportStar(require("./auth-queries"), exports);
//# sourceMappingURL=index.js.map