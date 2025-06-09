// components/Sidebar.tsx
import { mockCategories } from './array';
import Tags from './Tags';

interface SidebarProps {
  selectedCategory: string;
  selectedTags: string[];
  onCategorySelect: (categoryId: string) => void;
  onTagSelect: (tag: string) => void;
}

export default function Sidebar({
  selectedCategory,
  selectedTags,
  onCategorySelect,
  onTagSelect
}: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-orange-50 border-l-4 border-orange-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className={`font-medium ${
                selectedCategory === category.id 
                  ? 'text-orange-700' 
                  : 'text-gray-700'
              }`}>
                {category.name}
              </span>
              <span className={`text-sm px-2 py-1 rounded-full ${category.color}`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <Tags
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
        maxTags={10}
      />

      {/* Community Stats */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-4">Community Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">Total Posts</span>
            <span className="font-bold text-orange-900">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">Active Members</span>
            <span className="font-bold text-orange-900">8,432</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">Expert Contributors</span>
            <span className="font-bold text-orange-900">127</span>
          </div>
        </div>
      </div>
    </div>
  );
}