"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppStore = void 0;
const zustand_1 = require("zustand");
exports.useAppStore = (0, zustand_1.create)((set) => ({
    theme: 'system',
    setTheme: (theme) => set({ theme }),
}));
//# sourceMappingURL=useAppStore.js.map