// components/PostCard.tsx
import UserAvatar from './UserAvatar';
import { PostTags } from './Tags';
import Link from 'next/link';
import { ChartBar, Heart, HeartIcon, ShareIcon } from 'lucide-react';
import { Post } from './array';

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: (postId: string) => void;
}

export default function PostCard({ post, currentUserId, onLike }: PostCardProps) {
  const isLiked = currentUserId ? post.likedBy.includes(currentUserId) : false;
  const timeAgo = getTimeAgo(post.createdAt);
  
  // Truncate content for preview
  const previewContent = post.content.length > 200 
    ? post.content.substring(0, 200) + '...'
    : post.content;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Post Image */}
      {post.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <UserAvatar 
            user={post.author} 
            size="sm" 
            showTitle={true}
          />
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>

        {/* Post Title */}
        <Link href={`/community/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors cursor-pointer line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Post Preview Content */}
        <div className="prose prose-sm max-w-none mb-4">
          <p className="text-gray-700 leading-relaxed">
            {previewContent.split('\n')[0]} {/* Show first paragraph */}
          </p>
        </div>

        {/* Tags */}
        <PostTags tags={post.tags.slice(0, 3)} className="mb-4" />

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike && onLike(post.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isLiked
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
              }`}
            >
              {isLiked ? (
                <Heart className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{post.likes}</span>
            </button>

            <Link href={`/community/${post.slug}`}>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200">
                <ChartBar className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments.length}</span>
              </button>
            </Link>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-all duration-200">
            <ShareIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Utility function to calculate time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}