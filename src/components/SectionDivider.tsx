type DividerKind = 'ruins' | 'waves' | 'canopy' | 'peaks' | 'clouds';

interface SectionDividerProps {
  kind: DividerKind;
  flip?: boolean;
}

export function SectionDivider({kind, flip = false}: SectionDividerProps) {
  const transformClass = flip ? 'scale-y-[-1]' : '';

  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${transformClass}`} aria-hidden="true">
      {kind === 'ruins' && (
        <svg viewBox="0 0 1440 72" className="w-full h-10 sm:h-14 text-[#0a0a0a]" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 72V44h110V28h24v16h18V20h28v24h145V34h36v10h190V18h22v26h14V12h30v32h195V30h45v14h210V22h28v22h18V26h26v18h195V36h40v8h126v28H0Z"
          />
          <path
            stroke="#facc15"
            strokeWidth="1.5"
            fill="none"
            d="M0 44h110V28h24v16h18V20h28v24h145V34h36v10h190V18h22v26h14V12h30v32h195V30h45v14h210V22h28v22h18V26h26v18h195V36h40v8h126"
          />
        </svg>
      )}
      {kind === 'waves' && (
        <svg viewBox="0 0 1440 64" className="w-full h-9 sm:h-12 text-black" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 32c140 24 280-24 420 0s280 24 420 0 280-24 420 0 120 12 180 4v28H0V32Z"
          />
          <path
            stroke="#22c55e"
            strokeWidth="1.5"
            fill="none"
            d="M0 32c140 24 280-24 420 0s280 24 420 0 280-24 420 0 120 12 180 4"
          />
        </svg>
      )}
      {kind === 'canopy' && (
        <svg viewBox="0 0 1440 64" className="w-full h-9 sm:h-12 text-[#0a0a0a]" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 64V42l70-18 65 20 85-28 75 24 90-22 80 24 105-28 95 26 85-20 75 22 95-26 85 24 95-22 80 22 100-24 85 20 75-18 55 18v22H0Z"
          />
          <path
            stroke="#22c55e"
            strokeWidth="1.2"
            fill="none"
            d="M0 42l70-18 65 20 85-28 75 24 90-22 80 24 105-28 95 26 85-20 75 22 95-26 85 24 95-22 80 22 100-24 85 20 75-18 55 18"
          />
        </svg>
      )}
      {kind === 'peaks' && (
        <svg viewBox="0 0 1440 68" className="w-full h-10 sm:h-14 text-black" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 68V48l130-26 115 20 165-34 140 28 175-24 130 24 165-30 140 28 165-22 115 24v32H0Z"
          />
          <path
            stroke="#facc15"
            strokeWidth="1.4"
            fill="none"
            d="M0 48l130-26 115 20 165-34 140 28 175-24 130 24 165-30 140 28 165-22 115 24"
          />
        </svg>
      )}
      {kind === 'clouds' && (
        <svg viewBox="0 0 1440 64" className="w-full h-9 sm:h-12 text-black" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 44c65-16 145-16 210 0 65-20 160-20 225 0 70-18 165-18 235 0 65-22 165-22 230 0 70-18 165-18 235 0 70-16 150-16 215 0 35-10 65-10 90-4v24H0V44Z"
          />
          <path
            stroke="#22c55e"
            strokeWidth="1.2"
            fill="none"
            d="M0 44c65-16 145-16 210 0 65-20 160-20 225 0 70-18 165-18 235 0 65-22 165-22 230 0 70-18 165-18 235 0 70-16 150-16 215 0 35-10 65-10 90-4"
          />
        </svg>
      )}
    </div>
  );
}
