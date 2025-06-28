// Test environment loading
console.log("🔍 Testing environment variables...");

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "NEXT_PUBLIC_FIREBASE_API_KEY:",
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Present" : "❌ Missing"
);
console.log(
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID:",
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);
console.log(
  "FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID ? "✅ Present" : "❌ Missing"
);
console.log(
  "FIREBASE_CLIENT_EMAIL:",
  process.env.FIREBASE_CLIENT_EMAIL ? "✅ Present" : "❌ Missing"
);
console.log(
  "FIREBASE_PRIVATE_KEY:",
  process.env.FIREBASE_PRIVATE_KEY
    ? "✅ Present (length: " + process.env.FIREBASE_PRIVATE_KEY.length + ")"
    : "❌ Missing"
);

console.log("\n📁 Current working directory:", process.cwd());
console.log("📄 Environment files check:");
const fs = require("fs");
const path = require("path");

// Check for .env files
const envFiles = [".env.local", ".env", ".env.development"];
envFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} not found`);
  }
});

// Check apps/web/.env.local
const webEnvPath = path.join(process.cwd(), "apps", "web", ".env.local");
if (fs.existsSync(webEnvPath)) {
  console.log("✅ apps/web/.env.local exists");
} else {
  console.log("❌ apps/web/.env.local not found");
}
