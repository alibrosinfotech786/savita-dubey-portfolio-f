"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";
import { usePackageStore } from "@/store/packageStore";
import Section from "@/components/Section";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { FadeInStagger } from "@/components/Animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lock, ArrowLeft, Calendar, User, Clock, Loader2, ChevronLeft, ChevronRight, XIcon, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShareModal } from "@/components/ShareModal";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import DOMPurify from "dompurify";

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, hasSubscription }: { post: any; hasSubscription: boolean }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  return (
    <div className="group flex flex-col h-full rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={post.cover_image 
            ? (post.cover_image.startsWith('http') || post.cover_image.startsWith('/dummy')
                ? post.cover_image 
                : `${process.env.NEXT_PUBLIC_STORAGE_URL}${post.cover_image.startsWith('/') ? post.cover_image.substring(1) : post.cover_image}`)
            : "https://images.unsplash.com/photo-1454165833767-02755157f8fe?auto=format&fit=crop&q=80&w=800"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {post.is_premium && (
            <div className="flex items-center gap-1 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              <Lock className="h-3 w-3" /> Premium
            </div>
          )}
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsShareModalOpen(true); }}
            className="flex items-center justify-center bg-background/80 backdrop-blur-sm text-foreground hover:bg-background hover:text-primary transition-colors w-7 h-7 rounded-full shadow-sm"
            aria-label="Share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">{post.category || "Finance"}</Badge>
        </div>

        <h3 className="font-semibold text-base text-card-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => router.push(`/blog?id=${post.id}`)}
          >
            Read More
          </Button>
          {(post.is_premium && !hasSubscription && (user?.role !== 'admin' && user?.role !== 'superadmin')) && (
            <Button
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push(user ? "/dashboard/plans-purchase" : "/register")}
            >
              Get Access
            </Button>
          )}
        </div>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        post={post} 
      />
    </div>
  );
}

const DUMMY_POSTS = [
  {
    id: "dummy-1",
    title: "Sustainable Wealth Management in the Digital Age",
    excerpt: "Explore how modern compliance and digital tools are reshaping long-term investment strategies.",
    content: "<h3>The Evolution of Wealth Management</h3><p>In the digital age, managing wealth is no longer just about picking the right stocks; it's about navigating a complex landscape of regulatory requirements and digital platforms. To succeed, investors must balance growth with rigorous compliance standards.</p><h4>Key Pillars of Modern Wealth Management</h4><ul><li>Digital Security and Asset Protection</li><li>Regulatory Compliance and AML Standards</li><li>Sustainable Growth Strategies</li></ul><p>By leveraging technology and adhering to global governance standards, financial professionals can offer more transparent and effective advisory services.</p>",
    category: "Finance",
    cover_image: "/dummy/img1.png",
    created_at: new Date().toISOString(),
    author_name: "Savita Dubey",
    is_premium: false,
    slug: "dummy-1"
  },
  {
    id: "dummy-2",
    title: "The Future of Global Compliance Standards",
    excerpt: "A deep dive into upcoming regulatory changes and their impact on international banking.",
    content: "<h3>Understanding Global Compliance Shifts</h3><p>As international markets become more interconnected, the need for standardized compliance frameworks has never been higher. Banking institutions are facing increased scrutiny from global regulators, demanding more sophisticated AML/KYC processes.</p><h4>Key Challenges for 2026</h4><ul><li>Emerging Regulatory Frameworks in APAC</li><li>The Role of AI in Compliance Monitoring</li><li>Cross-border Payment Transparency</li></ul><p>Adopting proactive compliance measures is essential for maintaining market integrity and avoiding multi-billion dollar penalties.</p>",
    category: "Compliance",
    cover_image: "/dummy/img2.png",
    created_at: new Date().toISOString(),
    author_name: "Savita Dubey",
    is_premium: true,
    slug: "dummy-2"
  },
  {
    id: "dummy-3",
    title: "Leadership in Times of Financial Turmoil",
    excerpt: "Key strategies for maintaining team morale and operational excellence during market shifts.",
    content: "<h3>Navigating Financial Uncertainty</h3><p>True leadership is tested not when markets are rising, but when they are volatile. Effective leaders in the financial sector must maintain clarity of purpose and communicate transparently to keep their teams focused on long-term objectives.</p><h4>Leadership Strategies for Success</h4><ul><li>Transparent Communication and Trust Building</li><li>Agile Decision Making in Volatile Environments</li><li>Supporting Team Mental Resilience</li></ul><p>By focusing on empathy and data-driven decisions, leaders can guide their organizations through the most challenging financial cycles.</p>",
    category: "Leadership",
    cover_image: "/dummy/img3.png",
    created_at: new Date().toISOString(),
    author_name: "Savita Dubey",
    is_premium: false,
    slug: "dummy-3"
  }
];

// ─── Blog List ────────────────────────────────────────────────────────────────
function BlogList() {
  const { token } = useAuthStore();
  const { posts, loading, fetchPosts, lastPage, total } = useBlogStore();
  const { hasSubscription, checkSubscription } = usePackageStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (token) {
      checkSubscription();
    }
  }, [token, checkSubscription]);

  useEffect(() => { 
    fetchPosts(page, 9); 
  }, [page, fetchPosts]);

  return (
    <>
      <PageHero
        subtitle="The Exchange"
        title={<>Perspectives on <span style={{ color: "var(--accent)" }}>Finance & Leadership</span></>}
        description="Thought leadership on finance, compliance, and governance — written for professionals who want to think more clearly and act more decisively."
      />
      <Section style={{ background: "var(--surface)" }}>
        <Container>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {posts.length > 0 ? (
    posts.map((post: any) => (
      <BlogCard
        key={post.id}
        post={post}
        hasSubscription={hasSubscription}
      />
    ))
  ) : (
    <div className="col-span-full text-center py-10">
      No posts found
    </div>
  )}
</div>

              {/* Pagination */}
              {posts.length > 0 && lastPage > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {lastPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                    disabled={page === lastPage}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  );
}

// ─── Blog Detail ──────────────────────────────────────────────────────────────
function BlogDetail({ id }: { id: string }) {
  const { currentPost: post, loading: storeLoading, fetchPostById, clearCurrentPost } = useBlogStore();
  const { hasSubscription, checkSubscription } = usePackageStore();
  const { user, token } = useAuthStore();
  const router = useRouter();

  const [locked, setLocked] = useState(false);
  const [lockReason, setLockReason] = useState<"login" | "package" | null>(null);
  const [localPost, setLocalPost] = useState<any>(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      checkSubscription();
    }
  }, [token, checkSubscription]);

  useEffect(() => {
    const loadPost = async () => {
      if (id.startsWith('dummy')) {
        const dummy = DUMMY_POSTS.find(p => p.id === id);
        setLocalPost(dummy || null);
        
        if (dummy?.is_premium && user?.role !== 'admin' && user?.role !== 'superadmin') {
          if (!user) {
            setLocked(true);
            setLockReason("login");
          } else if (!hasSubscription) {
            setLocked(true);
            setLockReason("package");
          } else {
            setLocked(false);
          }
        } else {
          setLocked(false);
        }
        
        setLocalLoading(false);
        return;
      }

      setLocalLoading(true);
      const result = await fetchPostById(id);
      if (result.status === 403) {
        setLocked(true);
        setLockReason(result.message === "package_required" ? "package" : "login");
      } else {
        setLocked(false);
      }
      setLocalLoading(false);
    };
    
    loadPost();
    return () => clearCurrentPost();
  }, [id, fetchPostById, clearCurrentPost, user, hasSubscription]);

  const activePost = localPost || post;
  const isLoading = storeLoading || localLoading;

  if (isLoading) return (
    <div className="pt-40 flex justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  if (!activePost) return (
    <div className="pt-40 text-center text-muted-foreground">Post not found.</div>
  );

  return (
    <div className="pb-20 min-h-screen bg-background pt-24">
      <Container>
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{activePost.category}</Badge>
              {activePost.is_premium && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                  Premium
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 break-words">
              {activePost.title}
            </h1>
            {activePost.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 break-words overflow-hidden">
                {activePost.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />{activePost.author_name || "Savita Dubey"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(activePost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {activePost.cover_image && (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-muted">
              <Image
                src={activePost.cover_image.startsWith('http') || activePost.cover_image.startsWith('/dummy')
                  ? activePost.cover_image 
                  : `${process.env.NEXT_PUBLIC_STORAGE_URL}${activePost.cover_image.startsWith('/') ? activePost.cover_image.substring(1) : activePost.cover_image}`}
                alt={activePost.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <Separator className="mb-8" />

          {/* Content or Paywall */}
          {locked ? (
            <div className="relative">
              <div
                className="prose prose-slate dark:prose-invert max-w-none select-none pointer-events-none"
                style={{ filter: "blur(5px)", opacity: 0.3, maxHeight: 180, overflow: "hidden" }}
              >
                <p>This is premium content available exclusively to subscribers. Subscribe now to get full access to all articles, expert insights, and in-depth analysis from Savita Dubey on finance, compliance, and leadership.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              </div>

              <div className="mt-6">
                <Card className="border-primary/20 shadow-lg">
                  <CardContent className="py-10 text-center space-y-5">
                    <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lock className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        {lockReason === "package" ? "Subscription Required" : "Premium Article"}
                      </h2>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        {lockReason === "package"
                          ? "You're logged in but don't have an active subscription. Upgrade your plan to read this article."
                          : "This article is for premium subscribers only. Create a free account and subscribe to get full access."}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {lockReason === "package" ? (
                        <Button onClick={() => router.push("/dashboard/plans-purchase/")}>
                          View Plans
                        </Button>
                      ) : (
                        <>
                          <Button onClick={() => router.push("/register")}>
                            Get Started — It's Free
                          </Button>
                          <Button variant="outline" onClick={() => router.push("/login")}>
                            Sign In
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div
              className="prose prose-slate dark:prose-invert max-w-none break-words overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: typeof window !== "undefined"
                  ? DOMPurify.sanitize(activePost.content ?? "")
                  : activePost.content ?? ""
              }}
            />
          )}
        </div>
      </Container>
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        post={activePost} 
      />
    </div>
  );
}

// ─── Page Entry ───────────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <Suspense fallback={<div className="pt-40 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <BlogContent />
    </Suspense>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id) return <BlogDetail id={id} />;
  return <BlogList />;
}
