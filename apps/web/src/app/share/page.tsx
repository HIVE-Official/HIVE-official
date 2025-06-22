"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@hive/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";

import {
  ArrowLeft,
  Share2,
  Copy,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle,
  Users,
  Sparkles,
} from "lucide-react";

export default function ShareInvitePage() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [shareStats] = useState({
    totalInvites: 0,
    joinedFromInvites: 0,
  });

  // Generate UB-specific invite link
  const inviteLink = `${window.location.origin}/campus?ref=${searchParams.get("userId") || "ub-student"}&utm_source=friend_invite&utm_campaign=ub_launch`;

  const handleCopyLink = async () => {
    try {
      void navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareOnPlatform = (platform: string) => {
    const text =
      "Join me on HIVE - the exclusive social platform launching at UB! 🔥";
    const url = encodeURIComponent(inviteLink);
    const encodedText = encodeURIComponent(text);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
    };

    if (platform === "instagram") {
      // For Instagram, we'll copy the text and open Instagram
      navigator.clipboard.writeText(`${text} ${inviteLink}`);
      window.open("https://www.instagram.com/", "_blank");
    } else {
      window.open(
        shareUrls[platform as keyof typeof shareUrls],
        "_blank",
        "width=600,height=400"
      );
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareContent.title,
          text: shareContent.description,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/campus">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-zinc-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-display">
              Invite Your Friends
            </h1>
            <p className="text-zinc-400 mt-1 font-sans">
              Help us build the founding UB community on HIVE
            </p>
          </div>
        </div>

        {/* UB Launch Status */}
        <Card className="mb-8 bg-[#FFD700]/5 border-[#FFD700]/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-[#FFD700] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-[#FFD700] mb-2 font-display">
                  UB Founding Launch
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  HIVE is launching exclusively at University at Buffalo! Invite
                  your fellow UB students to join the founding community and
                  help shape the platform from day one.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-zinc-400 font-sans">
                    Invites Sent
                  </p>
                  <p className="text-xl font-bold text-white font-display">
                    {shareStats.totalInvites}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-sm text-zinc-400 font-sans">
                    Friends Joined
                  </p>
                  <p className="text-xl font-bold text-white font-display">
                    {shareStats.joinedFromInvites}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Link */}
        <Card className="mb-8 bg-zinc-900/30 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white font-display flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#FFD700]" />
              Your UB Invite Link
            </CardTitle>
            <CardDescription className="font-sans">
              Share this link with your UB friends to invite them to HIVE
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 bg-zinc-800/50 rounded-lg">
                <code className="flex-1 text-sm text-zinc-300 font-mono break-all">
                  {inviteLink}
                </code>
                <Button
                  onClick={handleCopyLink}
                  size="sm"
                  className="bg-[#FFD700] hover:bg-[#FFE255] text-black font-medium"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Sharing */}
        <Card className="mb-8 bg-zinc-900/30 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white font-display">
              Share on Social Media
            </CardTitle>
            <CardDescription className="font-sans">
              Spread the word about HIVE launching at UB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={() => shareOnPlatform("twitter")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-sans"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => shareOnPlatform("facebook")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => shareOnPlatform("instagram")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-sans"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Direct Message Template */}
        <Card className="mb-8 bg-zinc-900/30 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white font-display">
              Message Template
            </CardTitle>
            <CardDescription className="font-sans">
              Copy this message to send to your UB friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                Hey! 👋 I just joined HIVE - the new social platform launching
                exclusively at UB! It's designed specifically for college
                students and looks amazing. Want to join the founding UB
                community? Check it out: {inviteLink}
              </p>
            </div>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  `Hey! 👋 I just joined HIVE - the new social platform launching exclusively at UB! It's designed specifically for college students and looks amazing. Want to join the founding UB community? Check it out: ${inviteLink}`
                )
              }
              className="w-full mt-3 border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-sans"
              variant="outline"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Message
            </Button>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-zinc-900/30 border-zinc-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 font-display">
              Why Invite Friends?
            </h3>
            <div className="space-y-3 text-sm text-zinc-400 font-sans">
              <div>
                <strong className="text-white">Build the Community:</strong>
                <p>
                  HIVE is better with more UB students! Help us create an
                  amazing social platform that truly represents our campus.
                </p>
              </div>
              <div>
                <strong className="text-white">Shape the Platform:</strong>
                <p>
                  As founding members, you and your friends will help influence
                  how HIVE develops and what features we prioritize.
                </p>
              </div>
              <div>
                <strong className="text-white">Exclusive Access:</strong>
                <p>
                  HIVE is launching exclusively at UB first. Your friends won't
                  be able to join from anywhere else!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
