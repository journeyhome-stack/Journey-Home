import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {Button} from '../components/Button';
import type {PageId} from './SectionPage';

const API_BASE = 'https://vericore.journey-home-verify.workers.dev';
const RESEND_COOLDOWN_MS = 60_000;

type Step = 'email' | 'code' | 'success';
type StatusKind = '' | 'info' | 'success' | 'error';

interface StatusState {
  message: string;
  kind: StatusKind;
}

interface SignInPageProps {
  verifiedEmail: string | null;
  onVerified: (email: string) => void;
  onSignOut: () => void;
  onNavigate: (page: PageId) => void;
}

async function postJson<T extends Record<string, unknown>>(
  path: string,
  payload: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  let data: Record<string, unknown> = {};
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    // Non-JSON response fallback
  }

  if (!response.ok) {
    const errMsg =
      typeof data.error === 'string' && data.error.trim().length > 0
        ? data.error
        : 'Request failed. Please try again.';
    throw new Error(errMsg);
  }

  return data as T;
}

export function SignInPage({
  verifiedEmail,
  onVerified,
  onSignOut,
  onNavigate,
}: SignInPageProps) {
  const [step, setStep] = useState<Step>(() => (verifiedEmail ? 'success' : 'email'));
  const [emailInput, setEmailInput] = useState('');
  const [currentEmail, setCurrentEmail] = useState(() => verifiedEmail ?? '');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendUntil, setResendUntil] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [status, setStatus] = useState<StatusState>({message: '', kind: ''});

  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (verifiedEmail) {
      setCurrentEmail(verifiedEmail);
      setStep('success');
    }
  }, [verifiedEmail]);

  useEffect(() => {
    if (!resendUntil) {
      setRemainingSeconds(0);
      return;
    }

    const update = () => {
      const remaining = Math.max(0, Math.ceil((resendUntil - Date.now()) / 1000));
      setRemainingSeconds(remaining);
      if (remaining === 0) {
        setResendUntil(0);
      }
    };

    update();
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, [resendUntil]);

  const formattedCountdown = `${String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:${String(
    remainingSeconds % 60,
  ).padStart(2, '0')}`;

  const fillOtpFromString = useCallback((raw: string, startIndex = 0) => {
    const digits = raw.replace(/\D/g, '').slice(0, 6);
    if (!digits) return;

    if (digits.length > 1) {
      const next = Array.from({length: 6}, (_, idx) => digits[idx] ?? '');
      setOtpDigits(next);
      const focusIdx = Math.min(digits.length, 5);
      window.requestAnimationFrame(() => otpRefs.current[focusIdx]?.focus());
    } else {
      setOtpDigits((prev) => {
        const next = [...prev];
        next[startIndex] = digits;
        return next;
      });
      if (startIndex < 5) {
        window.requestAnimationFrame(() => otpRefs.current[startIndex + 1]?.focus());
      }
    }
  }, []);

  const handleOtpChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      setOtpDigits((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }

    if (digits.length > 1) {
      fillOtpFromString(digits, 0);
    } else {
      setOtpDigits((prev) => {
        const next = [...prev];
        next[index] = digits;
        return next;
      });
      if (index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      e.preventDefault();
      setOtpDigits((prev) => {
        const next = [...prev];
        next[index - 1] = '';
        return next;
      });
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData?.getData('text');
    if (pasted) {
      e.preventDefault();
      fillOtpFromString(pasted, index);
    }
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setStatus({message: 'Requesting your verification code…', kind: 'info'});

    try {
      const result = await postJson<{challengeId?: string}>('/api/send-code', {
        email: trimmed,
      });
      if (!result.challengeId) {
        throw new Error('The server response was incomplete.');
      }
      setChallengeId(result.challengeId);
      setCurrentEmail(trimmed);
      setOtpDigits(['', '', '', '', '', '']);
      setStep('code');
      setResendUntil(Date.now() + RESEND_COOLDOWN_MS);
      setStatus({message: 'Check your inbox or spam.', kind: 'success'});
      window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : 'Could not send the code.',
        kind: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!currentEmail || remainingSeconds > 0 || isResending) return;

    setIsResending(true);
    setStatus({message: 'Sending a new verification code…', kind: 'info'});

    try {
      const result = await postJson<{challengeId?: string}>('/api/send-code', {
        email: currentEmail,
      });
      if (!result.challengeId) {
        throw new Error('The server response was incomplete.');
      }
      setChallengeId(result.challengeId);
      setOtpDigits(['', '', '', '', '', '']);
      setResendUntil(Date.now() + RESEND_COOLDOWN_MS);
      setStatus({message: 'New code sent. Check your inbox or spam.', kind: 'success'});
      window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : 'Could not resend the code.',
        kind: 'error',
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (!challengeId || !/^[0-9]{6}$/.test(code)) {
      setStatus({message: 'Enter the 6-digit code.', kind: 'error'});
      const firstEmptyIdx = otpDigits.findIndex((d) => !d);
      if (firstEmptyIdx !== -1) {
        otpRefs.current[firstEmptyIdx]?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setStatus({message: 'Checking your code…', kind: 'info'});

    try {
      await postJson('/api/verify-code', {challengeId, code});
      setResendUntil(0);
      setStatus({message: '', kind: ''});
      setStep('success');
      onVerified(currentEmail);
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : 'That code could not be verified.',
        kind: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    onSignOut();
    setChallengeId(null);
    setCurrentEmail('');
    setEmailInput('');
    setOtpDigits(['', '', '', '', '', '']);
    setResendUntil(0);
    setStatus({message: '', kind: ''});
    setStep('email');
    window.setTimeout(() => emailFieldRef.current?.focus(), 50);
  };

  const steps = [
    {
      num: '01',
      name: 'Submit Email Address',
      note: 'Request a one-time challenge for your inbox.',
      active: step === 'email',
      done: step === 'code' || step === 'success',
    },
    {
      num: '02',
      name: 'Enter 6-Digit Code',
      note: 'Paste or type the verification code within the expiry window.',
      active: step === 'code',
      done: step === 'success',
    },
    {
      num: '03',
      name: 'Verification Complete',
      note: 'Receive confirmation or sign in with another address.',
      active: step === 'success',
      done: step === 'success',
    },
  ];

  return (
    <div className="bg-transparent text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-16">
        <div className="mb-8">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 min-h-[40px] text-sm font-semibold text-[#22c55e] hover:text-[#4ade80] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>

        <section
          aria-label="Email verification sign in"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
        >
          {/* Left progress rail */}
          <aside className="lg:col-span-5 flex flex-col justify-between gap-8 py-2">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#22c55e] uppercase mb-3">
                One-Time Email Verification
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                Verify your email in three steps.
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#cccccc] leading-relaxed max-w-md">
                Enter an email address to request a six-digit one-time verification code, confirm receipt from your inbox, and complete sign in.
              </p>
            </div>

            <ol aria-label="Verification progress" className="border-t border-[#14532d]">
              {steps.map((item) => (
                <li
                  key={item.num}
                  className={`grid grid-cols-[36px_1fr] gap-3 py-4 border-b border-[#14532d] transition-opacity ${
                    item.active || item.done ? 'opacity-100' : 'opacity-65'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold pt-0.5 tabular-nums ${
                      item.done
                        ? 'text-[#22c55e]'
                        : item.active
                          ? 'text-white'
                          : 'text-[#86efac]/60'
                    }`}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs sm:text-sm text-[#a3a3a3] mt-0.5">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          {/* Right verification console */}
          <div className="lg:col-span-7 stone-panel rounded-2xl p-6 sm:p-10 flex flex-col justify-center">
            {step === 'email' && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22c55e] mb-2 tabular-nums">
                  Step 1 of 3
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Sign in with your email.
                </h2>
                <p className="mt-2.5 mb-7 text-sm sm:text-base text-[#cccccc]">
                  Enter your email address. We&apos;ll send you a one-time verification code.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="signin-email"
                      className="block text-xs font-semibold text-white mb-2"
                    >
                      Email address
                    </label>
                    <input
                      ref={emailFieldRef}
                      id="signin-email"
                      name="email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      maxLength={254}
                      className="w-full h-13 px-4 rounded-xl border border-[#14532d] bg-[#030504] text-white placeholder-[#737373] text-sm sm:text-base focus:outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/25 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#22c55e] border border-[#22c55e] text-black text-sm font-bold hover:bg-[#4ade80] hover:border-[#4ade80] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Sending…' : 'Send code'}
                  </button>
                </form>
              </div>
            )}

            {step === 'code' && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22c55e] mb-2 tabular-nums">
                  Step 2 of 3
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Check your inbox.
                </h2>
                <p className="mt-2.5 mb-7 text-sm sm:text-base text-[#cccccc] break-words">
                  Enter the 6-digit code sent to{' '}
                  <strong className="text-white font-semibold">{currentEmail}</strong>.
                </p>

                <form onSubmit={handleCodeSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="otp-0"
                      className="block text-xs font-semibold text-white mb-2"
                    >
                      Verification code
                    </label>
                    <div
                      role="group"
                      aria-label="6-digit verification code"
                      className="grid grid-cols-6 gap-2 sm:gap-2.5"
                    >
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpRefs.current[idx] = el;
                          }}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          autoComplete={idx === 0 ? 'one-time-code' : undefined}
                          maxLength={idx === 0 ? 6 : 1}
                          aria-label={`Digit ${idx + 1} of 6`}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={(e) => handleOtpPaste(idx, e)}
                          required
                          className="w-full h-13 sm:h-15 rounded-xl border border-[#14532d] bg-[#030504] text-white font-mono text-xl sm:text-2xl font-semibold tabular-nums text-center focus:outline-none focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/25 transition-colors"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#22c55e] border border-[#22c55e] text-black text-sm font-bold hover:bg-[#4ade80] hover:border-[#4ade80] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isSubmitting ? 'Checking…' : 'Verify code'}
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-[#14532d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={remainingSeconds > 0 || isResending}
                      className="min-h-[40px] px-4 py-2 rounded-lg border border-[#166534] bg-[#030504] text-xs font-semibold text-white hover:border-[#22c55e] hover:text-[#4ade80] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      {isResending ? 'Sending…' : 'Resend code'}
                    </button>
                    <span className="font-mono text-xs tabular-nums text-[#a3a3a3]">
                      {remainingSeconds > 0
                        ? `Available in ${formattedCountdown}`
                        : 'You can request a new code'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="min-h-[40px] px-4 py-2 rounded-lg border border-[#166534] bg-[#030504] text-xs font-semibold text-white hover:border-[#22c55e] hover:text-[#4ade80] transition-colors cursor-pointer"
                  >
                    Use another email
                  </button>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div>
                <div
                  aria-hidden="true"
                  className="w-13 h-13 rounded-xl bg-[#22c55e]/15 border border-[#22c55e] text-[#4ade80] grid place-items-center mb-5"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22c55e] mb-2 tabular-nums">
                  Step 3 of 3
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Signed In!
                </h2>
                <p className="mt-2.5 mb-6 text-sm sm:text-base text-[#cccccc]">
                  Your email address was successfully verified.
                </p>

                <div className="mb-6 px-4 py-3.5 rounded-xl border border-[#14532d] bg-[#030504] flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#86efac] whitespace-nowrap">
                    Verified address
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-white truncate">
                    {currentEmail}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="#/"
                    onClick={() => onNavigate('home')}
                  >
                    Continue to Journey Home
                  </Button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#166534] bg-[#030504] text-sm font-semibold text-white hover:border-[#22c55e] hover:text-[#4ade80] transition-colors cursor-pointer"
                  >
                    Use another email
                  </button>
                </div>
              </div>
            )}

            {/* Status banner */}
            {status.message && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 min-h-[44px] px-3.5 py-2.5 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-medium ${
                  status.kind === 'error'
                    ? 'bg-red-950/40 border-red-500/60 text-red-300'
                    : status.kind === 'success'
                      ? 'bg-[#22c55e]/15 border-[#22c55e] text-[#86efac]'
                      : 'bg-[#030504] border-[#14532d] text-[#e5e5e5]'
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  {status.kind === 'success' ? (
                    <>
                      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M6.8 10.2l2.1 2.1 4.3-4.6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : status.kind === 'error' ? (
                    <>
                      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M10 6.5v4.2M10 13.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <>
                      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M10 9v4.5M10 6.5h.01"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </svg>
                <span>{status.message}</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
