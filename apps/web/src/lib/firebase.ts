// Re-export firebase client from core package
import { logger, db, auth, type Post, type User, type Space } from "@hive/core";

export { logger, db, auth };
export type { Post, User, Space };
