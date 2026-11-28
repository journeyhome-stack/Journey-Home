import type {ReactNode} from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  external = false,
  className = '',
  ariaLabel,
  type = 'button',
}: ButtonProps) {
  const sizeClasses =
    size === 'sm'
      ? 'min-h-[40px] px-4 py-2 text-xs'
      : size === 'lg'
        ? 'min-h-[48px] px-7 py-3 text-sm sm:text-base'
        : 'min-h-[44px] px-5 py-2.5 text-sm';

  const variantClasses = disabled
    ? 'bg-[#1a1a1a] text-[#8a8a8a] border border-[#2e2e2e] cursor-not-allowed'
    : variant === 'primary'
      ? 'bg-[#facc15] text-black font-bold border border-[#facc15] hover:bg-[#fde047] hover:border-[#fde047] active:translate-y-px'
      : variant === 'secondary'
        ? 'bg-[#22c55e] text-black font-bold border border-[#22c55e] hover:bg-[#4ade80] hover:border-[#4ade80] active:translate-y-px'
        : 'bg-[#121212] text-white font-medium border border-[#3a3a3a] hover:border-[#facc15] hover:text-[#facc15] active:translate-y-px';

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${sizeClasses} ${variantClasses} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={
          onClick
            ? (e) => {
                if (!external) {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        aria-label={ariaLabel}
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
