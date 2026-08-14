import React from 'react';

interface AvatarInitialsProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvatarInitials: React.FC<AvatarInitialsProps> = ({ 
  name, 
  size = 'md',
  className = '' 
}) => {
  // Получаем инициалы (первая буква имени и фамилии)
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return parts[0]?.[0]?.toUpperCase() || '?';
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl'
  };

  // Генерируем стабильный цвет на основе имени
  const getColor = (fullName: string): string => {
    const colors = [
      'bg-orange-500',
      'bg-orange-600',
      'bg-amber-500',
      'bg-red-500'
    ];
    const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${getColor(name)} rounded-full flex items-center justify-center text-white font-bold font-unbounded shadow-lg ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};
