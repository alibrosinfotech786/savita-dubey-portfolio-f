"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBlogStore } from "@/store/blogStore";
import { withAuth } from "@/components/withAuth";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, X } from "lucide-react";

function EditPostPage() {
  const { fetchPostById, updatePost, currentPost } = useBlogStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Finance");
  const [isPremium, setIsPremium] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPostById(id).then(() => setLoading(false));
  }, [id, fetchPostById]);

  // Populate form fields when currentPost loads
  useEffect(() => {
    if (!currentPost) return;
    setTitle(currentPost.title || "");
    setSlug(currentPost.slug || "");
    setContent(currentPost.content || "");
    setExcerpt(currentPost.excerpt || "");
    setCategory(currentPost.category || "Finance");
    setIsPremium(!!currentPost.is_premium);
    if (currentPost.cover_image) {
      const fullPath = currentPost.cover_image.startsWith('http')
        ? currentPost.cover_image
        : `${process.env.NEXT_PUBLIC_STORAGE_URL}${currentPost.cover_image.replace(/^\//, '').replace(/^storage\//, '')}`;
      setExistingImage(fullPath);
    }
  }, [currentPost]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { 
      setCoverImage(file); 
      setPreviewUrl(URL.createObjectURL(file));
      setExistingImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    setSaving(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("category", category);
    formData.append("is_premium", isPremium ? "1" : "0");
    if (coverImage) formData.append("cover_image", coverImage);
    formData.append("_method", "PUT");

    const success = await updatePost(id, formData);
    if (success) {
      toast.success("Post updated successfully");
      router.push("/admin/dashboard/posts");
    } else {
      toast.error("Failed to update post.");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/dashboard/posts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
            <p className="text-sm text-muted-foreground">Update article content and settings</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg" />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full rounded-md border-2 border-dashed border-input bg-muted/30 overflow-hidden flex items-center justify-center hover:border-primary/50 transition-colors">
                {previewUrl || existingImage ? (
                  <>
                    <img src={previewUrl || existingImage!} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { 
                        setCoverImage(null); 
                        setPreviewUrl(null); 
                        setExistingImage(null);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-destructive hover:bg-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Click to upload</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs text-muted-foreground">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="font-mono text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={(v) => v && setCategory(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="AML/KYC">AML/KYC</SelectItem>
                    <SelectItem value="Audit">Audit</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="premium" className="text-sm cursor-pointer">Premium Content</Label>
                <Switch id="premium" checked={isPremium} onCheckedChange={setIsPremium} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Excerpt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Short description for SEO..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                className="resize-none text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditPostPage, ["admin"]);
