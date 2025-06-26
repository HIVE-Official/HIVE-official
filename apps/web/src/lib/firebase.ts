// Re-export firebase client from core package
import { logger, db, type Post, type User, type Space } from "@hive/core";

export { logger, db };
export type { Post, User, Space };
