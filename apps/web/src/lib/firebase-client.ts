import { getFunctions } from "firebase/functions";
import { app } from "@hive/core";

export const functions = getFunctions(app);
