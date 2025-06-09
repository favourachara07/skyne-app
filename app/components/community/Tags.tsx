// components/Tags.tsx

import { popularTags } from "./array";

interface TagsProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  maxTags?: number;
}

export default function Tags({ selectedTags, onTagSelect, maxTags = 12 }: TagsProps) {
  const displayTags = popularTags.slice(0, maxTags);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              #{tag.replace('-', ' ')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Alternative inline tags component for posts
interface PostTagsProps {
  tags: string[];
  className?: string;
}

export function PostTags({ tags, className = '' }: PostTagsProps) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-md"
        >
          #{tag.replace('-', ' ')}
        </span>
      ))}
    </div>
  );
}