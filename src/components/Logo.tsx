interface LogoProps {
  className?: string;
  compact?: boolean;
  size?: 'md' | 'lg';
}

const LOGO_SRC = './assets/logo.png';

export function Logo({className = '', compact = false, size = 'md'}: LogoProps) {
  const sizeClass =
    size === 'lg'
      ? 'h-20 w-20'
      : compact
        ? 'h-10 w-10'
        : 'h-14 w-14';

  return (
    <span className={`inline-flex items-center whitespace-nowrap shrink-0 ${className}`}>
      <img
        src={LOGO_SRC}
        alt="Journey Home"
        className={`${sizeClass} object-contain rounded-md select-none`}
      />
    </span>
  );
}
