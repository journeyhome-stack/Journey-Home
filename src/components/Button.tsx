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
    ? 'bg-[#0f1410] text-[#7a8a7e] border border-[#1a2e1f] cursor-not-allowed'
    : variant === 'primary'
      ? 'bg-[#22c55e] text-black font-bold border border-[#22c55e] hover:bg-[#4ade80] hover:border-[#4ade80] active:translate-y-px'
      : variant === 'secondary'
        ? 'bg-[#14532d] text-white font-bold border border-[#22c55e] hover:bg-[#166534] hover:border-[#4ade80] active:translate-y-px'
        : 'bg-[#0b100c] text-[#4ade80] font-medium border border-[#166534] hover:border-[#22c55e] hover:bg-[#0f1f14] hover:text-white active:translate-y-px';

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
