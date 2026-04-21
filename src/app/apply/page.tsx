"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";

/* ─── Schema (unchanged from previous) ─── */
const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  program: z.string().min(1, "Please indicate a pathway"),
  experience: z.string().min(1, "Please indicate years of experience"),
  field: z.string().min(2, "Professional field is required"),
  currentRole: z.string().min(2, "Current role is required"),
  goals: z.string().min(10, "A brief note is required — what would conferment mean?"),
  howHeard: z.string().optional(),
  consent: z.literal(true, { message: "Please indicate consent to proceed" }),
});

type FormData = z.infer<typeof schema>;

interface Chapter {
  roman: string;
  title: string;
  kicker: string;
  fields: (keyof FormData)[];
}

const CHAPTERS: Chapter[] = [
  {
    roman: "I",
    title: "Who you are.",
    kicker: "CHAPTER I · IDENTIFICATION",
    fields: ["firstName", "lastName", "email", "phone", "country"],
  },
  {
    roman: "II",
    title: "The pathway.",
    kicker: "CHAPTER II · PROGRAMME",
    fields: ["program", "experience", "field"],
  },
  {
    roman: "III",
    title: "The record.",
    kicker: "CHAPTER III · WORK",
    fields: ["currentRole", "goals", "howHeard"],
  },
  {
    roman: "IV",
    title: "Consent.",
    kicker: "CHAPTER IV · TO PROCEED",
    fields: ["consent"],
  },
];

export default function ApplyPage() {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const chapter = CHAPTERS[chapterIdx];
  const isLast = chapterIdx === CHAPTERS.length - 1;

  const next = async () => {
    const valid = await trigger(chapter.fields);
    if (valid) setChapterIdx((i) => Math.min(i + 1, CHAPTERS.length - 1));
  };

  const back = () => setChapterIdx((i) => Math.max(i - 1, 0));

  const onSubmit = (data: FormData) => {
    console.log("Application submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <div className="main-content">
          <Navbar />
          <main className="min-h-screen bg-[var(--color-canvas-ivory)] flex items-center">
            <div className="max-w-[900px] mx-auto px-8 lg:px-14 py-40 text-center">
              <IndexNumeral index="/" label="Received" />
              <p
                className="type-display text-[var(--color-ink-primary)] mt-12 leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Your application is with a partner.
              </p>
              <p className="type-display-italic text-[var(--color-ink-muted)] mt-8 text-[20px] max-w-[46ch] mx-auto">
                We read every submission personally. You will hear from us — candidly — within 48 hours.
              </p>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="bg-[var(--color-canvas-ivory)]">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-14 pt-40 lg:pt-48 pb-24 lg:pb-32">
            <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
              {/* ─── Left: editorial intake ─── */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <IndexNumeral index="APPLY" label="The conversation" />
                  <h1
                    className="type-display text-[var(--color-ink-primary)] mt-10 leading-[0.95]"
                    style={{ fontSize: "clamp(2.75rem, 6vw, 5.25rem)" }}
                  >
                    Every application is read by a partner — not a form processor.
                  </h1>
                  <p className="type-display-italic text-[var(--color-ink-muted)] mt-8 text-[19px] max-w-[38ch]">
                    Take your time. The form is unhurried because the conversation will be.
                  </p>
                  <dl className="mt-12 pt-8 border-t border-[var(--color-canvas-paper-edge)] grid grid-cols-2 gap-6 max-w-[32rem]">
                    <div>
                      <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                        Response
                      </dt>
                      <dd className="type-ui text-[var(--color-ink-primary)] text-[14px] mt-2">
                        Within 48 hours
                      </dd>
                    </div>
                    <div>
                      <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                        Review
                      </dt>
                      <dd className="type-ui text-[var(--color-ink-primary)] text-[14px] mt-2">
                        Human, by a partner
                      </dd>
                    </div>
                    <div>
                      <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                        Confidence
                      </dt>
                      <dd className="type-ui text-[var(--color-ink-primary)] text-[14px] mt-2">
                        Absolute
                      </dd>
                    </div>
                    <div>
                      <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                        Fee
                      </dt>
                      <dd className="type-ui text-[var(--color-ink-primary)] text-[14px] mt-2">
                        None for the first conversation
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* ─── Right: form ─── */}
              <div className="lg:col-span-7">
                <div className="border border-[var(--color-canvas-paper-edge)] bg-[var(--color-canvas-bone)] p-8 lg:p-12">
                  {/* Chapter progress ticker */}
                  <div className="flex items-center justify-between pb-10 mb-10 border-b border-[var(--color-canvas-paper-edge)]">
                    <span className="type-mono-meta text-[var(--color-ink-muted)]">
                      {chapter.kicker}
                    </span>
                    <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                      {chapter.roman} OF {CHAPTERS[CHAPTERS.length - 1].roman}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={chapterIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h2
                          className="type-display text-[var(--color-ink-primary)]"
                          style={{
                            fontSize: "clamp(2rem, 4vw, 3.25rem)",
                            lineHeight: 0.95,
                          }}
                        >
                          {chapter.title}
                        </h2>

                        <div className="mt-10 flex flex-col gap-8">
                          {chapterIdx === 0 && (
                            <>
                              <div className="grid md:grid-cols-2 gap-6">
                                <FieldText
                                  label="First name"
                                  error={errors.firstName?.message}
                                  {...register("firstName")}
                                />
                                <FieldText
                                  label="Last name"
                                  error={errors.lastName?.message}
                                  {...register("lastName")}
                                />
                              </div>
                              <FieldText
                                label="Email"
                                type="email"
                                error={errors.email?.message}
                                {...register("email")}
                              />
                              <div className="grid md:grid-cols-2 gap-6">
                                <FieldText
                                  label="Telephone"
                                  type="tel"
                                  error={errors.phone?.message}
                                  {...register("phone")}
                                />
                                <FieldText
                                  label="Country of residence"
                                  error={errors.country?.message}
                                  {...register("country")}
                                />
                              </div>
                            </>
                          )}

                          {chapterIdx === 1 && (
                            <>
                              <FieldSelect
                                label="Which pathway interests you"
                                error={errors.program?.message}
                                {...register("program")}
                              >
                                <option value="">Select a pathway</option>
                                <option value="honorary-doctorate">
                                  Honorary Doctorate
                                </option>
                                <option value="dba">Doctor of Business Administration</option>
                                <option value="phd">Doctor of Philosophy</option>
                                <option value="unsure">I am uncertain — please advise</option>
                              </FieldSelect>
                              <FieldSelect
                                label="Years of professional experience"
                                error={errors.experience?.message}
                                {...register("experience")}
                              >
                                <option value="">Select range</option>
                                <option value="10-15">10–15 years</option>
                                <option value="15-20">15–20 years</option>
                                <option value="20-30">20–30 years</option>
                                <option value="30+">30 years or more</option>
                              </FieldSelect>
                              <FieldText
                                label="Your professional field"
                                placeholder="e.g. technology, finance, medicine, the arts"
                                error={errors.field?.message}
                                {...register("field")}
                              />
                            </>
                          )}

                          {chapterIdx === 2 && (
                            <>
                              <FieldText
                                label="Current role or title"
                                error={errors.currentRole?.message}
                                {...register("currentRole")}
                              />
                              <FieldTextarea
                                label="What would a conferment mean"
                                placeholder="A few sentences are plenty. We read every word."
                                error={errors.goals?.message}
                                {...register("goals")}
                              />
                              <FieldText
                                label="How you heard of the firm"
                                placeholder="Referral, publication, or otherwise (optional)"
                                error={errors.howHeard?.message}
                                {...register("howHeard")}
                              />
                            </>
                          )}

                          {chapterIdx === 3 && (
                            <>
                              <div className="border border-[var(--color-canvas-paper-edge)] p-6 bg-[var(--color-canvas-ivory)]">
                                <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                                  Review
                                </span>
                                <p className="type-ui text-[var(--color-ink-primary)] text-[16px] mt-4 leading-[1.6]">
                                  Your application is ready to submit. A partner will read it and reply within 48 hours. All information remains confidential and is used only for the advisory.
                                </p>
                              </div>

                              <label className="flex items-start gap-4 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  {...register("consent")}
                                  className="mt-1 w-4 h-4 accent-[var(--color-heritage-navy)]"
                                />
                                <span className="type-ui text-[var(--color-ink-primary)] text-[15px] leading-[1.5]">
                                  I consent to Techversity Advisory reviewing my submission and contacting me at the details provided above.
                                </span>
                              </label>
                              {errors.consent?.message && (
                                <p className="type-mono-meta text-[var(--color-heritage-crimson)] text-[12px] mt-1">
                                  {errors.consent.message}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Chapter controls */}
                    <div className="flex items-center justify-between mt-14 pt-10 border-t border-[var(--color-canvas-paper-edge)]">
                      {chapterIdx > 0 ? (
                        <button
                          type="button"
                          onClick={back}
                          className="group type-mono-label text-[var(--color-ink-muted)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 inline-flex items-center gap-3"
                        >
                          <span
                            aria-hidden
                            className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-x-1"
                          >
                            ←
                          </span>
                          <span>Previous chapter</span>
                        </button>
                      ) : (
                        <span />
                      )}

                      {!isLast ? (
                        <ButtonV2
                          type="button"
                          onClick={next}
                          variant="heritage"
                          size="md"
                          showArrow
                        >
                          Continue
                        </ButtonV2>
                      ) : (
                        <ButtonV2
                          type="submit"
                          variant="heritage"
                          size="md"
                          showArrow
                        >
                          Submit application
                        </ButtonV2>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

/* ─── Field components ─── */

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const FieldText = forwardRef<HTMLInputElement, InputProps>(function FieldText(
  { label, error, ...rest },
  ref
) {
  return (
    <div>
      <label className="type-mono-label text-[var(--color-heritage-crimson)] block">
        {label}
      </label>
      <input
        ref={ref}
        {...rest}
        className="w-full mt-3 pb-3 bg-transparent border-b border-[var(--color-ink-whisper)] type-ui text-[var(--color-ink-primary)] text-[17px] focus:outline-none focus:border-[var(--color-heritage-navy)] transition-colors duration-300"
      />
      {error && (
        <p className="type-mono-meta text-[var(--color-heritage-crimson)] text-[11px] mt-2">
          · {error}
        </p>
      )}
    </div>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: React.ReactNode;
};

const FieldSelect = forwardRef<HTMLSelectElement, SelectProps>(function FieldSelect(
  { label, error, children, ...rest },
  ref
) {
  return (
    <div>
      <label className="type-mono-label text-[var(--color-heritage-crimson)] block">
        {label}
      </label>
      <select
        ref={ref}
        {...rest}
        className="w-full mt-3 pb-3 bg-transparent border-b border-[var(--color-ink-whisper)] type-ui text-[var(--color-ink-primary)] text-[17px] focus:outline-none focus:border-[var(--color-heritage-navy)] transition-colors duration-300 appearance-none cursor-pointer"
      >
        {children}
      </select>
      {error && (
        <p className="type-mono-meta text-[var(--color-heritage-crimson)] text-[11px] mt-2">
          · {error}
        </p>
      )}
    </div>
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const FieldTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function FieldTextarea(
  { label, error, ...rest },
  ref
) {
  return (
    <div>
      <label className="type-mono-label text-[var(--color-heritage-crimson)] block">
        {label}
      </label>
      <textarea
        ref={ref}
        {...rest}
        rows={4}
        className="w-full mt-3 pb-3 bg-transparent border-b border-[var(--color-ink-whisper)] type-ui text-[var(--color-ink-primary)] text-[17px] resize-none focus:outline-none focus:border-[var(--color-heritage-navy)] transition-colors duration-300"
      />
      {error && (
        <p className="type-mono-meta text-[var(--color-heritage-crimson)] text-[11px] mt-2">
          · {error}
        </p>
      )}
    </div>
  );
});
