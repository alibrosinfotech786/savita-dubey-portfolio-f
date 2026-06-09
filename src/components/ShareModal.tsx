"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Copy, Share2 } from "lucide-react";

import {
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string | number;
    title: string;
    excerpt?: string | null;
    author_name?: string;
    category?: string | null;
  };
}

export function ShareModal({
  isOpen,
  onClose,
  post,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined"
      ? window.location.origin
      : "");

  const url = `${baseUrl}/blog?id=${post.id}`;

  const title = post.title || "Blog Post";
  const category = post.category || "General";
  const author = post.author_name || "Savita Dubey";
  const excerpt = post.excerpt || "";

  const shareMessage = `📖 ${title}

Category: ${category}
Author: ${author}

${excerpt}

Read More:
${url}`;

  const encodedMessage =
    encodeURIComponent(shareMessage);

  const encodedUrl =
    encodeURIComponent(url);

  const encodedTitle =
    encodeURIComponent(title);

  const encodedExcerpt =
    encodeURIComponent(
      `${title}\n\n${excerpt}`
    );

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,

    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,

    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedExcerpt}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      toast.success(
        "Link copied successfully"
      );

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error(
        "Failed to copy link"
      );
    }
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shareItems = [
    {
      name: "WhatsApp",
      href: shareLinks.whatsapp,
      icon: (
        <FaWhatsapp className="w-6 h-6" />
      ),
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      name: "Facebook",
      href: shareLinks.facebook,
      icon: (
        <FaFacebook className="w-6 h-6" />
      ),
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      name: "LinkedIn",
      href: shareLinks.linkedin,
      icon: (
        <FaLinkedin className="w-6 h-6" />
      ),
      bg: "bg-sky-100",
      color: "text-sky-700",
    },
    {
      name: "X",
      href: shareLinks.twitter,
      icon: (
        <FaXTwitter className="w-6 h-6" />
      ),
      bg: "bg-zinc-100",
      color: "text-zinc-900",
    },
    {
      name: "Telegram",
      href: shareLinks.telegram,
      icon: (
        <FaTelegram className="w-6 h-6" />
      ),
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Share Article
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border p-4 bg-muted/30">
            <h3 className="font-semibold line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {excerpt}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {shareItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </div>

                <span className="text-xs font-medium">
                  {item.name}
                </span>
              </a>
            ))}

            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Copy className="w-6 h-6" />
              </div>

              <span className="text-xs font-medium">
                {copied
                  ? "Copied!"
                  : "Copy Link"}
              </span>
            </button>
          </div>

          {typeof navigator !==
            "undefined" &&
            navigator.share && (
              <Button
                onClick={
                  handleNativeShare
                }
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                More Sharing Options
              </Button>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}