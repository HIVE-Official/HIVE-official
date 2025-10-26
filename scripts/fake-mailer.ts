#!/usr/bin/env ts-node
// Bounded Context Owner: Identity & Access Management Guild
// Simple script to write outbound magic-link emails to a local file so tests can inspect them.
import { promises as fs } from "node:fs";
import { resolve } from "node:path";

async function main() {
  const [, , email, link] = process.argv;
  if (!email || !link) {
    console.error("Usage: ts-node fake-mailer.ts <email> <link>");
    process.exit(1);
  }

  const outPath = resolve(process.cwd(), "temp", "outbox.log");
  const line = `${new Date().toISOString()}\t${email}\t${link}\n`;
  await fs.mkdir(resolve(process.cwd(), "temp"), { recursive: true });
  await fs.appendFile(outPath, line, "utf8");
  console.log(`Wrote magic link for ${email} to ${outPath}`);
}

void main();
