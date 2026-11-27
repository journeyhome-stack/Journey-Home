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
    ? 'bg-[#1a2234]/80 text-[#979082] border border-amber-200/12 cursor-not-allowed shadow-none'
    : variant === 'primary'
      ? 'bg-gradient-to-b from-[#e4ab53] to-[#b87b29] text-[#0c111d] font-semibold border border-[#f5d491]/60 shadow-[0_6px_22px_-6px_rgba(228,171,83,0.55)] hover:from-[#f0ba64] hover:to-[#c98730] hover:shadow-[0_8px_28px_-4px_rgba(240,186,100,0.65)] active:translate-y-px'
      : variant === 'secondary'
        ? 'bg-gradient-to-b from-[#1a2b3c] to-[#111c2b] text-[#efe8d8] font-medium border border-teal-300/35 shadow-[0_6px_20px_-8px_rgba(45,212,191,0.38)] hover:border-teal-300/65 hover:text-white hover:shadow-[0_8px_26px_-6px_rgba(45,212,191,0.5)] active:translate-y-px'
        : 'bg-transparent text-[#dcd4c4] font-medium border border-amber-200/20 hover:border-amber-200/45 hover:bg-white/5 hover:text-white active:translate-y-px';

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg whitespace-nowrap shrink-0 transition-all duration-200 ${sizeClasses} ${variantClasses} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
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
