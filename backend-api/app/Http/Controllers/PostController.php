<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // Public List with pagination (limited content for premium)
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 9);
        $posts = Post::latest()->paginate($perPage);

        $posts->getCollection()->transform(function ($post) {
            if ($post->is_premium) {
                $post->content = null; // Don't expose premium content in list
            }
            return $post;
        });

        return response()->json($posts);
    }

    // Public Show — returns post data even for premium (403 with post metadata)
    public function show($id, Request $request)
    {
        $post = Post::findOrFail($id);

        if ($post->is_premium) {
            $user = $request->user('sanctum');

            // Not logged in — return metadata only with 403
            if (!$user) {
                return response()->json([
                    'message' => 'premium_required',
                    'post' => [
                        'id'         => $post->id,
                        'title'      => $post->title,
                        'excerpt'    => $post->excerpt,
                        'category'   => $post->category,
                        'author_name'=> $post->author_name,
                        'cover_image'=> $post->cover_image,
                        'is_premium' => true,
                        'created_at' => $post->created_at,
                        'content'    => null,
                    ],
                ], 403);
            }

            // Admin always has access
            if ($user->isAdmin()) {
                return response()->json($post);
            }

            // Check active package
            $hasActivePackage = $user->packages()
                ->wherePivot('status', 'active')
                ->wherePivot('expires_at', '>', now())
                ->exists();

            if (!$hasActivePackage) {
                return response()->json([
                    'message' => 'package_required',
                    'post' => [
                        'id'         => $post->id,
                        'title'      => $post->title,
                        'excerpt'    => $post->excerpt,
                        'category'   => $post->category,
                        'author_name'=> $post->author_name,
                        'cover_image'=> $post->cover_image,
                        'is_premium' => true,
                        'created_at' => $post->created_at,
                        'content'    => null,
                    ],
                ], 403);
            }
        }

        return response()->json($post);
    }

    // Admin: Create post (supports file upload for cover_image)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'content'     => 'required|string',
            'excerpt'     => 'nullable|string',
            'cover_image' => 'nullable|image|max:10240',
            'author_name' => 'nullable|string',
            'is_premium'  => 'required',
            'category'    => 'nullable|string',
            'slug'        => 'nullable|string',
        ]);

        // Handle file upload
        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('covers', 'public');
            $validated['cover_image'] = $path;
        }

        $validated['slug']        = Str::slug($validated['title']) . '-' . uniqid();
        $validated['author_name'] = $validated['author_name'] ?? 'Savita Dubey';

        $post = Post::create($validated);
        return response()->json($post, 201);
    }

    // Admin: Update post (supports file upload)
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $request->validate([
            'title'       => 'nullable|string|max:255',
            'cover_image' => 'nullable|image|max:10240',
            // is_premium might come as string "1" or "0"
        ]);

        $data = $request->except(['cover_image', '_method']);

        if ($request->hasFile('cover_image')) {
            // Delete old image if it exists and is stored in 'covers'
            if ($post->cover_image && !Str::startsWith($post->cover_image, 'http')) {
                Storage::disk('public')->delete($post->cover_image);
            }

            $path = $request->file('cover_image')->store('covers', 'public');
            $data['cover_image'] = $path;
        }

        $post->update($data);
        return response()->json($post);
    }

    // Admin: Delete post
    public function destroy(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $post->update(['is_deleted' => 1]);
        return response()->json(['message' => 'Post deleted']);
    }
}
