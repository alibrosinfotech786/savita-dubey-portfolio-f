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
        // Debug logging for upload attempt
        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');
            \Log::info('Image upload attempt', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getClientMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'error' => $file->getError(),
                'is_valid' => $file->isValid(),
            ]);

            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image upload failed: ' . $file->getErrorMessage(),
                    'error_code' => 'UPLOAD_ERROR_' . $file->getError()
                ], 422);
            }

            $allowedFormats = ['jpeg', 'jpg', 'png', 'webp'];
            $extension = strtolower($file->getClientOriginalExtension());
            if (!in_array($extension, $allowedFormats)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only JPG, PNG, WEBP images are allowed.',
                    'error_code' => 'INVALID_FORMAT'
                ], 422);
            }
        }

        try {
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->validator->errors()->first(),
                'errors' => $e->errors(),
                'error_code' => 'VALIDATION_ERROR'
            ], 422);
        }

        // Handle file upload
        if ($request->hasFile('cover_image')) {
            try {
                $path = $request->file('cover_image')->store('covers', 'public');
                if (!$path) {
                    throw new \Exception("store() returned false");
                }
                $validated['cover_image'] = $path;
            } catch (\Exception $e) {
                \Log::error('Image store exception: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Image upload failed due to storage configuration.',
                    'error_code' => 'STORAGE_ERROR'
                ], 500);
            }
        }

        $validated['slug']        = Str::slug($validated['title']) . '-' . uniqid();
        $validated['author_name'] = $validated['author_name'] ?? 'Savita Dubey';

        try {
            $post = Post::create($validated);
            // Ensure compatibility with older frontend expectations (returns 201)
            // But we can just return the post object as before with success wrapped.
            // Wait, old return was: return response()->json($post, 201);
            // Frontend store/blogStore.ts check: response.status === 200 || response.status === 201
            return response()->json($post, 201);
        } catch (\Exception $e) {
            \Log::error('Post creation exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to save post to database.',
                'error_code' => 'DATABASE_ERROR'
            ], 500);
        }
    }

    // Admin: Update post (supports file upload)
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        if ($request->hasFile('cover_image')) {
            $file = $request->file('cover_image');
            \Log::info('Image upload attempt (update)', [
                'post_id' => $id,
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getClientMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'error' => $file->getError(),
                'is_valid' => $file->isValid(),
            ]);

            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image upload failed: ' . $file->getErrorMessage(),
                    'error_code' => 'UPLOAD_ERROR_' . $file->getError()
                ], 422);
            }

            $allowedFormats = ['jpeg', 'jpg', 'png', 'webp'];
            $extension = strtolower($file->getClientOriginalExtension());
            if (!in_array($extension, $allowedFormats)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only JPG, PNG, WEBP images are allowed.',
                    'error_code' => 'INVALID_FORMAT'
                ], 422);
            }
        }

        try {
            $request->validate([
                'title'       => 'nullable|string|max:255',
                'cover_image' => 'nullable|image|max:10240',
                // is_premium might come as string "1" or "0"
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->validator->errors()->first(),
                'errors' => $e->errors(),
                'error_code' => 'VALIDATION_ERROR'
            ], 422);
        }

        $data = $request->except(['cover_image', '_method']);

        if ($request->hasFile('cover_image')) {
            try {
                // Delete old image if it exists and is stored in 'covers'
                if ($post->cover_image && !\Illuminate\Support\Str::startsWith($post->cover_image, 'http')) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($post->cover_image);
                }

                $path = $request->file('cover_image')->store('covers', 'public');
                if (!$path) {
                    throw new \Exception("store() returned false");
                }
                $data['cover_image'] = $path;
            } catch (\Exception $e) {
                \Log::error('Image store exception (update): ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Image upload failed due to storage configuration.',
                    'error_code' => 'STORAGE_ERROR'
                ], 500);
            }
        }

        try {
            $post->update($data);
            return response()->json($post);
        } catch (\Exception $e) {
            \Log::error('Post update exception: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update post in database.',
                'error_code' => 'DATABASE_ERROR'
            ], 500);
        }
    }

    // Admin: Delete post
    public function destroy(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $post->update(['is_deleted' => 1]);
        return response()->json(['message' => 'Post deleted']);
    }
}
