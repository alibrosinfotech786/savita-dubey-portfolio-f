"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Calendar, XIcon } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";

export default function GlobalBlogAnnouncement() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [latestPost, setLatestPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkLatestPost = async () => {
      try {
        const response = await api.get('/posts?per_page=1');
        const data = response.data?.data;
        
        if (isMounted && data && data.length > 0) {
          const post = data[0];
          setLatestPost(post);
          
          const timer = setTimeout(() => {
            const storedId = localStorage.getItem("lastViewedBlogPost");
            if (storedId !== String(post.id)) {
              setOpen(true);
              localStorage.setItem("lastViewedBlogPost", String(post.id));
            }
          }, 1000); // Small delay to let the page load smoothly
          
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Failed to fetch latest post", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkLatestPost();
    
    return () => { isMounted = false; };
  }, []);

  if (!latestPost || loading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px] p-0 border-none overflow-hidden bg-transparent shadow-2xl" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>📰 New Article Published</DialogTitle>
        </DialogHeader>

        <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 shadow-2xl flex flex-col sm:flex-row">
          {/* Close button - Top Right */}
          <div className="absolute top-3 right-3 z-20">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-black/40 hover:bg-black/60 text-white border-none h-8 w-8 backdrop-blur-md transition-colors"
              onClick={() => setOpen(false)}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Cover Image Section */}
          <div className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-muted">
            <Image
              src={latestPost.cover_image 
                ? (latestPost.cover_image.startsWith('http') || latestPost.cover_image.startsWith('/dummy')
                    ? latestPost.cover_image 
                    : `${process.env.NEXT_PUBLIC_STORAGE_URL}${latestPost.cover_image.startsWith('/') ? latestPost.cover_image.substring(1) : latestPost.cover_image}`)
                : "https://images.unsplash.com/photo-1454165833767-02755157f8fe?auto=format&fit=crop&q=80&w=800"}
              alt={latestPost.title}
              fill
              className="object-cover"
              unoptimized
            />
            {latestPost.is_premium && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">
                <Lock className="h-3 w-3" /> Premium
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-6 sm:w-3/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-primary flex items-center gap-1.5">
                📰 New Article Published
              </span>
            </div>

            <div className="mb-2">
              <Badge variant="secondary" className="text-xs bg-secondary/50 font-normal">
                {latestPost.category || "Finance"}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-foreground leading-tight mb-3 line-clamp-2">
              {latestPost.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
              {latestPost.excerpt}
            </p>

            <div className="mt-auto flex flex-col gap-4">
              <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(latestPost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Button 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-transform hover:-translate-y-0.5"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/blog?id=${latestPost.id}`);
                  }}
                >
                  Read Article
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex-1 hover:bg-muted/50"
                  onClick={() => setOpen(false)}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
