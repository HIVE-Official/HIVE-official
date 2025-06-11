"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  defaultNS: () => defaultNS,
  resources: () => resources
});
module.exports = __toCommonJS(index_exports);
var import_i18next = __toESM(require("i18next"));
var import_react_i18next = require("react-i18next");
var import_i18next_browser_languagedetector = __toESM(require("i18next-browser-languagedetector"));

// src/locales/en/common.json
var common_default = {
  welcome: "Welcome to HIVE"
};

// src/index.ts
var defaultNS = "common";
var resources = {
  en: {
    common: common_default
  }
};
import_i18next.default.use(import_react_i18next.initReactI18next).use(import_i18next_browser_languagedetector.default).init({
  debug: process.env.NODE_ENV === "development",
  fallbackLng: "en",
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false
    // not needed for react as it escapes by default
  }
});
var index_default = import_i18next.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultNS,
  resources
});
