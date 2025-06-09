// types/community.ts
export interface User {
  id: string;
  name: string;
  avatar: string;
  title?: string; // e.g., "Dermatologist", "Skincare Enthusiast"
  verified?: boolean;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  likes: number;
  likedBy: string[]; // user IDs
  comments: Comment[];
  imageUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  postId: string;
  parentId?: string; // for replies
  likes: number;
  likedBy: string[];
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

// data/mockData.ts
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Adanna Okafor",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face&fm=webp",
    title: "Dermatologist",
    verified: true,
  },
  {
    id: "2",
    name: "Kemi Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9c1e15b?w=150&h=150&fit=crop&crop=face&fm=webp",
    title: "Skincare Enthusiast",
  },
  {
    id: "3",
    name: "Tunde Adebayo",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&fm=webp",
    title: "Beauty Blogger",
  },
  {
    id: "4",
    name: "Fatima Hassan",
    avatar:
      "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=150&h=150&fit=crop&crop=face&fm=webp",
    title: "Esthetician",
  },
];

export const mockCategories: Category[] = [
  {
    id: "all",
    name: "All Posts",
    color: "bg-orange-100 text-orange-800",
    count: 24,
  },
  {
    id: "acne",
    name: "Acne Treatment",
    color: "bg-blue-100 text-blue-800",
    count: 8,
  },
  {
    id: "hyperpigmentation",
    name: "Hyperpigmentation",
    color: "bg-purple-100 text-purple-800",
    count: 6,
  },
  {
    id: "skincare-routine",
    name: "Skincare Routine",
    color: "bg-green-100 text-green-800",
    count: 10,
  },
  {
    id: "product-reviews",
    name: "Product Reviews",
    color: "bg-pink-100 text-pink-800",
    count: 5,
  },
  {
    id: "expert-advice",
    name: "Expert Advice",
    color: "bg-indigo-100 text-indigo-800",
    count: 7,
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This is such helpful advice! I've been struggling with similar issues.",
    author: mockUsers[1],
    createdAt: "2025-06-07T10:30:00Z",
    postId: "1",
    likes: 3,
    likedBy: ["2", "3", "4"],
  },
  {
    id: "2",
    content:
      "Thank you for sharing your experience. Have you tried niacinamide?",
    author: mockUsers[0],
    createdAt: "2025-06-07T11:15:00Z",
    postId: "1",
    parentId: "1",
    likes: 2,
    likedBy: ["1", "3"],
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    slug: "effective-acne-treatment-routine",
    title: "My Effective Acne Treatment Routine for Dark Skin",
    content: `After years of struggling with acne-prone skin, I finally found a routine that works for melanin-rich skin. Here's what transformed my skin:

**Morning Routine:**
- Gentle cleanser with salicylic acid
- Niacinamide serum (10%)
- Lightweight moisturizer with hyaluronic acid
- SPF 50 (non-comedogenic)

**Evening Routine:**
- Double cleanse
- Retinol (started with 0.25%, now using 0.5%)
- Moisturizer with ceramides
- Spot treatment for active breakouts

The key is consistency and patience. It took about 3 months to see significant improvement, but now my skin is clearer than it's been in years!`,
    author: mockUsers[1],
    createdAt: "2025-06-07T09:00:00Z",
    updatedAt: "2025-06-07T09:00:00Z",
    tags: ["acne", "routine", "dark-skin", "retinol"],
    category: "acne",
    likes: 45,
    likedBy: ["2", "3", "4"],
    comments: [mockComments[0], mockComments[1]],
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=300&fit=crop&fm=webp",
  },
  {
    id: "2",
    slug: "hyperpigmentation-treatment-guide",
    title: "Complete Guide to Treating Hyperpigmentation on African Skin",
    content: `Hyperpigmentation is one of the most common skin concerns for people with darker skin tones. Here's my comprehensive approach:

**Understanding the Causes:**
- Post-inflammatory hyperpigmentation (PIH)
- Melasma
- Sun damage
- Hormonal changes

**Treatment Options:**
1. **Topical Treatments:**
   - Hydroquinone (2-4%)
   - Kojic acid
   - Vitamin C
   - Alpha arbutin

2. **Professional Treatments:**
   - Chemical peels (glycolic, lactic acid)
   - Microneedling
   - Laser therapy (with experienced providers)

**Prevention is Key:**
- Daily SPF use (minimum SPF 30)
- Gentle skincare routine
- Avoid picking at skin

Remember, treating hyperpigmentation takes time and consistency. Results typically show after 6-12 weeks of consistent use.`,
    author: mockUsers[0],
    createdAt: "2025-06-06T14:30:00Z",
    updatedAt: "2025-06-06T14:30:00Z",
    tags: ["hyperpigmentation", "expert-advice", "treatment", "prevention"],
    category: "hyperpigmentation",
    likes: 78,
    likedBy: ["1", "2", "3"],
    comments: [],
    imageUrl:
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=600&h=300&fit=crop&fm=webp",
  },
];

export const popularTags = [
  "acne",
  "hyperpigmentation",
  "skincare-routine",
  "product-review",
  "dark-skin",
  "sensitive-skin",
  "anti-aging",
  "sunscreen",
  "retinol",
  "vitamin-c",
  "moisturizer",
  "cleanser",
];
