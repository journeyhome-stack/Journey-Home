import {useState} from 'react';
import {siteConfig} from '../config/siteConfig';
import {Section} from './Section';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faq[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section
      id="faq"
      kicker="Questions"
      title="Frequently Asked Questions"
      subtitle="Everything confirmed so far about platforms, controls, and saving."
      className="bg-transparent"
    >
      <div className="max-w-3xl space-y-3">
        {siteConfig.faq.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-button-${item.id}`;

          return (
            <div key={item.id} className="stone-panel-subtle rounded-xl overflow-hidden">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#141414] transition-colors"
                >
                  <span className="font-display text-base sm:text-lg font-medium text-white">
                    {item.question}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`w-5 h-5 text-[#22c55e] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-3 text-sm sm:text-base text-[#d4d4d4] leading-relaxed border-t border-[#262626]"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
