"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = exports.defaultNS = void 0;
const i18next_1 = require("i18next");
const react_i18next_1 = require("react-i18next");
const i18next_browser_languagedetector_1 = require("i18next-browser-languagedetector");
// Import your translations
const common_json_1 = require("./locales/en/common.json");
exports.defaultNS = 'common';
exports.resources = {
    en: {
        common: common_json_1.default,
    },
};
i18next_1.default
    // pass the i18n instance to react-i18next.
    .use(react_i18next_1.initReactI18next)
    // detect user language
    .use(i18next_browser_languagedetector_1.default)
    // init i18next
    .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    defaultNS: exports.defaultNS,
    resources: exports.resources,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});
exports.default = i18next_1.default;
