"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import nextDynamic from "next/dynamic";
import { WaitlistForm } from "../../components/landing/ui/WaitlistForm";

// Lazily load heavy 3D components to reduce initial JS for this route
const Scene = nextDynamic(() => import("../../components/landing/3d/Scene").then(m => m.Scene), { ssr: false });
const CorkBoard = nextDynamic(() => import("../../components/landing/3d/CorkBoard").then(m => m.CorkBoard), { ssr: false });
const PostItNote = nextDynamic(() => import("../../components/landing/3d/PostItNote").then(m => m.PostItNote), { ssr: false });
const PushPin = nextDynamic(() => import("../../components/landing/3d/PushPin").then(m => m.PushPin), { ssr: false });
const FloatingText = nextDynamic(() => import("../../components/landing/3d/FloatingText").then(m => m.FloatingText), { ssr: false });

/**
 * Landing Page - 3D Interactive Experience
 *
 * "Finally YOUR campus" - Student autonomy messaging
 *
 * Features:
 * - 3D Cork bulletin board with realistic materials
 * - Interactive post-it notes with flip animations
 * - Mouse parallax effect
 * - Glassmorphic waitlist form overlay
 * - Post-processing effects (bloom, DOF, vignette)
 */

// Post-it note data with authentic student messages
const postItNotes = [
  {
    position: [-2.5, 1.5, 0.05] as [number, number, number],
    rotation: [0, 0, -0.1] as [number, number, number],
    color: "#FFE97F",
    frontText: "Study group\nforming",
    backText: "Join us @ Capen\n3rd floor ✨"
  },
  {
    position: [0.5, 1.8, 0.05] as [number, number, number],
    rotation: [0, 0, 0.15] as [number, number, number],
    color: "#FF9ECD",
    frontText: "Anyone at\nCapen?",
    backText: "I'm there now!\n- Sarah 📚"
  },
  {
    position: [2.8, 1.2, 0.05] as [number, number, number],
    rotation: [0, 0, -0.08] as [number, number, number],
    color: "#A6E3FF",
    frontText: "Free pizza\n@ Ellicott",
    backText: "4pm today\nBring friends! 🍕"
  },
  {
    position: [-3, -0.5, 0.05] as [number, number, number],
    rotation: [0, 0, 0.12] as [number, number, number],
    color: "#CAFFBF",
    frontText: "Selling calc\ntextbook $20",
    backText: "DM me!\n@hivestudent"
  },
  {
    position: [-0.8, 0.2, 0.05] as [number, number, number],
    rotation: [0, 0, -0.05] as [number, number, number],
    color: "#FFE97F",
    frontText: "Anyone else\nup late?",
    backText: "We're all in\nthis together 🌙"
  },
  {
    position: [2.2, -0.3, 0.05] as [number, number, number],
    rotation: [0, 0, 0.18] as [number, number, number],
    color: "#FF9ECD",
    frontText: "Walmart run\n2pm",
    backText: "Need anything?\nLet me know!"
  },
  {
    position: [-2, -1.5, 0.05] as [number, number, number],
    rotation: [0, 0, -0.15] as [number, number, number],
    color: "#A6E3FF",
    frontText: "Gym buddy\nwanted",
    backText: "Alumni @ 6am\nLFG! 💪"
  },
  {
    position: [0.8, -1.2, 0.05] as [number, number, number],
    rotation: [0, 0, 0.08] as [number, number, number],
    color: "#CAFFBF",
    frontText: "Lost airpods\n@ Knox",
    backText: "Found them!\nThanks HIVE 🎧"
  },
  {
    position: [3.2, -1.8, 0.05] as [number, number, number],
    rotation: [0, 0, -0.12] as [number, number, number],
    color: "#FFE97F",
    frontText: "CS 250\nstudy sesh",
    backText: "Tonight 8pm\nLockwood 🖥️"
  },
  {
    position: [-1.5, 0.8, 0.05] as [number, number, number],
    rotation: [0, 0, 0.2] as [number, number, number],
    color: "#FF9ECD",
    frontText: "Who's going\nto the game?",
    backText: "I got tickets!\nLet's go! 🏀"
  },
];

// Push pin positions (one per post-it)
const pushPinPositions = [
  [-2.5, 1.9, 0.15] as [number, number, number],
  [0.5, 2.2, 0.15] as [number, number, number],
  [2.8, 1.6, 0.15] as [number, number, number],
  [-3, -0.1, 0.15] as [number, number, number],
  [-0.8, 0.6, 0.15] as [number, number, number],
  [2.2, 0.1, 0.15] as [number, number, number],
  [-2, -1.1, 0.15] as [number, number, number],
  [0.8, -0.8, 0.15] as [number, number, number],
  [3.2, -1.4, 0.15] as [number, number, number],
  [-1.5, 1.2, 0.15] as [number, number, number],
];

const pushPinColors = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFD93D", // Yellow
  "#6BCF7F", // Green
  "#95A3F3", // Purple
  "#FF6B9D", // Pink
  "#FFA07A", // Salmon
  "#87CEEB", // Sky blue
  "#DDA15E", // Brown
  "#B19CD9", // Lavender
];

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A0A0B]">
      {/* 3D Scene */}
      <Scene>
        {/* Cork Board Background */}
        <CorkBoard />

        {/* Hero Floating Text */}
        <FloatingText
          text="Finally YOUR campus"
          position={[0, 2.5, 1]}
          fontSize={0.45}
        />

        {/* Post-It Notes */}
        {postItNotes.map((note, index) => (
          <PostItNote
            key={index}
            position={note.position}
            rotation={note.rotation}
            color={note.color}
            frontText={note.frontText}
            backText={note.backText}
          />
        ))}

        {/* Push Pins */}
        {pushPinPositions.map((position, index) => (
          <PushPin
            key={index}
            position={position}
            color={pushPinColors[index]}
          />
        ))}
      </Scene>

      {/* 2D Overlay - Subtext */}
      <div className="fixed top-[60vh] left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl max-w-2xl">
          <p className="text-center text-white/90 text-lg leading-relaxed">
            Built by students, for students.<br />
            No top-down control. Just your community.
          </p>
        </div>
      </div>

      {/* Waitlist Form */}
      <WaitlistForm />

      {/* Loading Fallback */}
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-screen bg-[#0A0A0B]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-[#F5C842] rounded-full animate-spin mx-auto" />
            <p className="text-white/70 text-sm">Loading your campus...</p>
          </div>
        </div>
      }>
      </Suspense>
    </div>
  );
}
