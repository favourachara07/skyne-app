// app/community/page.tsx
'use client';

import { mockPosts, mockUsers, Post } from '@/app/components/community/array';
import CreatePostForm from '@/app/components/community/CreatePostForm';
import PostCard from '@/app/components/community/PostCard';
import Sidebar from '@/app/components/community/Sidebar';
import { Magnet, MagnetIcon, PlusIcon, X } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'discussed'>('latest');

  // Mock current user (in real app, this would come from auth)
  const currentUser = mockUsers[0];

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }

    // Sort posts
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'discussed':
        return filtered.sort((a, b) => b.comments.length - a.comments.length);
      default: // 'latest'
        return filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [posts, selectedCategory, selectedTags, searchQuery, sortBy]);

  const handleCreatePost = (postData: Omit<Post, "id" | "author" | "createdAt" | "updatedAt" | "likes" | "likedBy" | "comments">) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      author: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setShowCreatePost(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(currentUser.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== currentUser.id)
            : [...post.likedBy, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community</h1>
              <p className="mt-2 text-gray-600">
                Connect with others and share your skincare journey
              </p>
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <PlusIcon className="w-5 h-5" />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              onCategorySelect={setSelectedCategory}
              onTagSelect={handleTagSelect}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post Form */}
            {showCreatePost && (
              <div className="mb-8">
                <CreatePostForm
                  onSubmit={handleCreatePost}
                  onCancel={() => setShowCreatePost(false)}
                />
              </div>
            )}

            {/* Search and Filters Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Magnet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'discussed')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="discussed">Most Discussed</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        Category: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full"
                      >
                        #{tag.replace('-', ' ')}
                        <button
                          onClick={() => handleTagSelect(tag)}
                          className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Search: &quot;{searchQuery}&quot;
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}

                    <button
                      onClick={clearFilters}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUser.id}
                    onLike={handleLikePost}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MagnetIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search terms, or be the first to create a post on this topic!
                    </p>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Create Post
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-8">
                <button className="px-8 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg font-medium transition-colors shadow-sm">
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}