import { onErrorAvatar } from "@/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function Avatar({ src, alt = "Avatar", className = "w-8 h-8" }: AvatarProps) {

  return (
    <img
      src={String(src)}
      alt={alt}
      onError={onErrorAvatar}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
