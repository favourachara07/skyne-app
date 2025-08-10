// app/community/[slug]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  mockComments,
  mockPosts,
  mockUsers,
  Post,
  Comment,
} from "@/app/components/community/array";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChartBar,
  Heart,
  HeartIcon,
  ShareIcon,
} from "lucide-react";
import Image from "next/image";
import UserAvatar from "@/app/components/community/UserAvatar";
import { PostTags } from "@/app/components/community/Tags";
import CommentSection from "@/app/components/community/CommentSection";

export default function SinglePostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find the post by slug
  const post = useMemo(() => {
    return mockPosts.find((p) => p.slug === slug);
  }, [slug]);

  const [postData, setPostData] = useState<Post | null>(post || null);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  // Mock current user
  const currentUser = mockUsers[0];

  if (!postData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/community"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  const isLiked = currentUser
    ? postData.likedBy.includes(currentUser.id)
    : false;
  const timeAgo = getTimeAgo(postData.createdAt);

  const handleLikePost = () => {
    setPostData((prev) => {
      if (!prev) return prev;

      const newIsLiked = !prev.likedBy.includes(currentUser.id);
      return {
        ...prev,
        likes: newIsLiked ? prev.likes + 1 : prev.likes - 1,
        likedBy: newIsLiked
          ? [...prev.likedBy, currentUser.id]
          : prev.likedBy.filter((id) => id !== currentUser.id),
      };
    });
  };

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      createdAt: new Date().toISOString(),
      postId: postData.id,
      parentId,
      likes: 0,
      likedBy: [],
    };

    setComments((prev) => [...prev, newComment]);

    // Update post comment count
    setPostData((prev) =>
      prev
        ? {
            ...prev,
            comments: [...prev.comments, newComment],
          }
        : prev
    );
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const isCommentLiked = comment.likedBy.includes(currentUser.id);
          return {
            ...comment,
            likes: isCommentLiked ? comment.likes - 1 : comment.likes + 1,
            likedBy: isCommentLiked
              ? comment.likedBy.filter((id) => id !== currentUser.id)
              : [...comment.likedBy, currentUser.id],
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Community
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Post Card */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Post Image */}
          {postData.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <Image
                width={800}
                height={450}
                src={postData.imageUrl}
                alt={postData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {/* Author & Time */}
            <div className="flex items-center justify-between mb-4">
              <UserAvatar user={postData.author} size="sm" showTitle={true} />
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {postData.title}
            </h1>

            {/* Tags */}
            <PostTags tags={postData.tags} className="mb-4" />

            {/* Content */}
            <div className="prose prose-sm max-w-none mb-6">
              {postData.content
                .split("\n")
                .map((para, idx) =>
                  para.trim() ? <p key={idx}>{para}</p> : <br key={idx} />
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleLikePost}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-red-600"
                }`}
              >
                {isLiked ? (
                  <Heart className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">{postData.likes}</span>
              </button>
              <a
                href="#comments"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
              >
                <ChartBar className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {postData.comments.length}
                </span>
              </a>
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: postData.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <ShareIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </article>

        {/* Comment Section */}
        <div id="comments" className="mt-10">
          <CommentSection
            comments={comments}
            postId={postData.id}
            currentUserId={currentUser.id}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        </div>
      </div>
    </div>
  );
}

// Utility function to calculate time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
}
