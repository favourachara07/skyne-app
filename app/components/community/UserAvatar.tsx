// components/UserAvatar.tsx

import { Check } from "lucide-react";
import { User } from "./array";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showTitle?: boolean;
  showVerified?: boolean;
}

export default function UserAvatar({ 
  user, 
  size = 'md', 
  showTitle = true, 
  showVerified = true 
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Image
            width={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
            height={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
          src={user.avatar}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
        />
        {user.verified && showVerified && (
          <Check className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
        )}
      </div>
      <div className="flex flex-col">
        <h4 className={`font-semibold text-gray-900 ${textSizeClasses[size]}`}>
          {user.name}
        </h4>
        {user.title && showTitle && (
          <p className="text-sm text-gray-600">{user.title}</p>
        )}
      </div>
    </div>
  );
}