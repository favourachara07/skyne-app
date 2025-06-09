// components/CommentSection.tsx
'use client';

import { useState } from 'react';
import UserAvatar from './UserAvatar';
import { ChartBar, ChartBarBig, Heart, HeartIcon } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  likes: number;
  likedBy: string[];
  parentId?: string; // <-- Add this line
}

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  currentUserId?: string;
  onAddComment?: (content: string, parentId?: string) => void;
  onLikeComment?: (commentId: string) => void;
}

export default function CommentSection({
  comments,
  currentUserId,
  onAddComment,
  onLikeComment
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (replyContent.trim() && onAddComment) {
      onAddComment(replyContent, parentId);
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  // Group comments by parent/replies
  const topLevelComments = comments.filter(comment => !comment.parentId);
  const replies = comments.filter(comment => comment.parentId);

  const getCommentReplies = (commentId: string) => {
    return replies.filter(reply => reply.parentId === commentId);
  };

  return (
    <div className="space-y-6">
      {/* Add New Comment */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Join the Discussion ({comments.length} comments)
        </h3>
        
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts or ask a question..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Be respectful and helpful in your comments
            </p>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {topLevelComments.map((comment) => {
          const commentReplies = getCommentReplies(comment.id);
          const isLiked = currentUserId ? comment.likedBy.includes(currentUserId) : false;

          return (
            <div key={comment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <UserAvatar 
                  user={{
                    id: comment.author.id,
                    name: comment.author.name,
                    avatar: comment.author.avatarUrl || '', // fallback to empty string if undefined
                  }} 
                  size="sm" 
                  showTitle={true}
                />
                <span className="text-sm text-gray-500">
                  {getTimeAgo(comment.createdAt)}
                </span>
              </div>

              {/* Comment Content */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {/* Comment Actions */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => onLikeComment && onLikeComment(comment.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isLiked
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                  }`}
                >
                  {isLiked ? (
                    <Heart className="w-4 h-4" />
                  ) : (
                    <HeartIcon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{comment.likes}</span>
                </button>

                <button
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                >
                  <ChartBarBig className="w-4 h-4" />
                  <span className="text-sm font-medium">Reply</span>
                </button>
              </div>

              {/* Reply Form */}
              {replyTo === comment.id && (
                <div className="mb-4 pl-4 border-l-2 border-orange-200">
                  <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="space-y-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Reply to ${comment.author.name}...`}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={!replyContent.trim()}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplyTo(null);
                          setReplyContent('');
                        }}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Replies */}
              {commentReplies.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                  {commentReplies.map((reply) => {
                    const isReplyLiked = currentUserId ? reply.likedBy.includes(currentUserId) : false;
                    
                    return (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        {/* Reply Header */}
                        <div className="flex items-start justify-between mb-3">
                          <UserAvatar 
                            user={{
                              id: reply.author.id,
                              name: reply.author.name,
                              avatar: reply.author.avatarUrl || '',
                            }} 
                            size="sm" 
                            showTitle={false}
                          />
                          <span className="text-sm text-gray-500">
                            {getTimeAgo(reply.createdAt)}
                          </span>
                        </div>

                        {/* Reply Content */}
                        <div className="mb-3">
                          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {reply.content}
                          </p>
                        </div>

                        {/* Reply Actions */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onLikeComment && onLikeComment(reply.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-200 ${
                              isReplyLiked
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-red-600'
                            }`}
                          >
                            {isReplyLiked ? (
                              <Heart className="w-3.5 h-3.5" />
                            ) : (
                              <HeartIcon className="w-3.5 h-3.5" />
                            )}
                            <span className="text-xs font-medium">{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {comments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <ChartBar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
            <p className="text-gray-600">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}