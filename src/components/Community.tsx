import {siteConfig} from '../config/siteConfig';
import {Button} from './Button';
import {Section} from './Section';
import {SocialIcon} from './SocialIcon';

export function Community() {
  const email = siteConfig.contactEmail.trim();
  const hasEmail = email.length > 0;
  const enabledSocials = siteConfig.socialLinks.filter((s) => s.enabled);

  return (
    <Section
      id="community"
      kicker="Community"
      title="Join the Journey"
      subtitle="Share screenshots from your travels, post fan art, swap puzzle hints, and help shape future updates with your feedback and bug reports."
      className="bg-transparent"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {enabledSocials.map((social) => (
          <SocialIcon key={social.id} social={social} variant="card" />
        ))}
      </div>

      <div className="mt-8 stone-panel-subtle rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h3 className="font-display text-lg font-semibold text-white">
            Feedback, Fan Art &amp; Bug Reports
          </h3>
          <p className="text-sm text-[#cccccc]">
            {hasEmail
              ? 'Have a bug report, press inquiry, or fan creation to share? Reach out directly by email.'
              : 'Community links and direct contact details will appear here as soon as they are added in siteConfig.ts.'}
          </p>
        </div>

        {hasEmail && (
          <Button href={`mailto:${email}`} variant="secondary" size="md">
            Send Email
          </Button>
        )}
      </div>
    </Section>
  );
}
