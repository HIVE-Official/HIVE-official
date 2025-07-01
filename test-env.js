import fs from "fs";
import path from "path";

// Test environment loading
console.warn("🔍 Testing environment variables...");

console.warn("NODE_ENV:", process.env.NODE_ENV);
console.warn(
  "NEXT_PUBLIC_FIREBASE_API_KEY:",
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Present" : "❌ Missing"
);
console.warn(
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID:",
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);
console.warn(
  "FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID ? "✅ Present" : "❌ Missing"
);
console.warn(
  "FIREBASE_CLIENT_EMAIL:",
  process.env.FIREBASE_CLIENT_EMAIL ? "✅ Present" : "❌ Missing"
);
console.warn(
  "FIREBASE_PRIVATE_KEY:",
  process.env.FIREBASE_PRIVATE_KEY
    ? `✅ Present (length: ${  process.env.FIREBASE_PRIVATE_KEY.length  })`
    : "❌ Missing"
);

console.warn("\n📁 Current working directory:", process.cwd());
console.warn("📄 Environment files check:");

// Check for .env files
const envFiles = [".env.local", ".env", ".env.development"];
envFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.warn(`✅ ${file} exists`);
  } else {
    console.warn(`❌ ${file} not found`);
  }
});

// Check apps/web/.env.local
const webEnvPath = path.join(process.cwd(), "apps", "web", ".env.local");
if (fs.existsSync(webEnvPath)) {
  console.warn("✅ apps/web/.env.local exists");
} else {
  console.warn("❌ apps/web/.env.local not found");
}
