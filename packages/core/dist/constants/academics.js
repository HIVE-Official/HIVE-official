"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRADUATION_YEARS = exports.ACADEMIC_LEVELS = void 0;
exports.ACADEMIC_LEVELS = [
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate" },
    { value: "phd", label: "Ph.D." },
];
exports.GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);
//# sourceMappingURL=academics.js.map