"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StaggerItem } from "@/components/Animations";
import { ShareModal } from "@/components/ShareModal";
import { useState } from "react";

interface BlogCardProps {
  post: {
    id: string | number;
    slug?: string;
    title: string;
    excerpt?: string | null;
    description?: string;
    category?: string | null;
    tag?: string | null;
    cover_image?: string | null;
    image?: string | null;
    is_premium?: boolean;
    created_at?: string;
    date?: string;
    readTime?: string;
    author?: { name?: string };
    author_name?: string;
  };
  hasSubscription?: boolean;
}

export default function BlogCard({ post, hasSubscription = false }: BlogCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const id = post.id || post.slug || "";
  const coverImage = post.image || post.cover_image;

  const imageSrc = coverImage
    ? coverImage.startsWith("http") || coverImage.startsWith("/dummy")
      ? coverImage
      : `${process.env.NEXT_PUBLIC_STORAGE_URL}${coverImage.startsWith("/") ? coverImage.substring(1) : coverImage}`
    : "https://images.unsplash.com/photo-1454165833767-02755157f8fe?auto=format&fit=crop&q=80&w=800";

  return (
    <StaggerItem>
      <div className="group block h-full relative">
        <Link href={`/blog?id=${id}`} className="block h-full">
          <div className="h-full rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              <Image
                src={imageSrc}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {post.is_premium && !hasSubscription && (
                  <div className="flex items-center gap-1 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    <Lock className="h-3 w-3" /> Premium
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {post.category || post.tag}
                </Badge>
                {post.readTime && (
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                )}
              </div>

              <h3 className="font-semibold text-base text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                {post.excerpt || post.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {post.author?.name || post.author_name || "Savita Dubey"}
                </span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </div>
          </div>
        </Link>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsShareModalOpen(true); }}
          className="absolute top-3 right-3 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground hover:bg-background hover:text-primary transition-colors w-7 h-7 rounded-full shadow-sm"
          aria-label="Share"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        post={{...post, id}} 
      />
    </StaggerItem>
  );
}
