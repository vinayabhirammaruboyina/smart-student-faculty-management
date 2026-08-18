import { getInitials } from '../../utils/helpers';

const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg', '2xl': 'w-20 h-20 text-xl' };

export default function Avatar({ name, src, size = 'md', className = '' }) {
  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ${className}`} />;
  }
  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
  return (
    <div className={`${sizes[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${className}`}>
      {getInitials(name)}
    </div>
  );
}
