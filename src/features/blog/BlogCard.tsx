"use client";

import Image from "next/image";
import { BlogPost } from "@/data/blog";
import Card from "@/components/Card";
import { StaggerItem } from "@/components/Animations";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <StaggerItem>
      <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col p-0">
        <div className="relative w-full h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ color: "var(--accent)", background: "var(--accent-light)" }}>
              {post.tag}
            </span>
            <span className="text-xs" style={{ color: "var(--muted-2)" }}>{post.readTime}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold mb-2 leading-snug" style={{ color: "var(--foreground)" }}>
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1" style={{ color: "var(--muted)" }}>
            {post.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs" style={{ color: "var(--muted-2)" }}>{post.date}</span>
          </div>
        </div>
      </Card>
    </StaggerItem>
  );
}
