"use client";

import { forwardRef, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { EditorialImage } from "@/components/ui/EditorialImage";

const schema = z.object({
  name: z.string().min(2, "Your name is required"),
  title: z.string().min(2, "A title or role is required"),
  country: z.string().min(2, "Country is required"),
  message: z
    .string()
    .min(10, "A brief note is required — even a sentence helps"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: FormData) => {
    console.log("Contact message:", data);
    setSent(true);
  };

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="bg-[var(--color-canvas-ivory)]">
          <div className="max-w-[960px] mx-auto px-8 lg:px-14 pt-40 lg:pt-48 pb-24 lg:pb-32">
            {/* ─── Header ─── */}
            <div className="text-center">
              <IndexNumeral index="CONTACT" label="A private conversation" />
              <motion.h1
                className="type-display text-[var(--color-ink-primary)] mt-10 leading-[0.92]"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                A private conversation.
              </motion.h1>
              <motion.p
                className="type-display-italic text-[var(--color-ink-muted)] mt-8 text-[20px] max-w-[44ch] mx-auto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Write to the firm directly. Your note will be read by a partner — usually the same day — and replied to candidly.
              </motion.p>
            </div>

            {/* ─── Editorial accent image ─── */}
            <div className="mt-16 lg:mt-20 max-w-[520px] mx-auto">
              <EditorialImage
                src="/images/editorial/contact-header.webp"
                alt="A closed leather correspondence portfolio in deep navy, a fountain pen, and an unopened cream envelope on warm walnut"
                motion="mask"
                aspect={1}
                wrapperClassName="w-full"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>

            {/* ─── The email (larger than the form) ─── */}
            <div className="mt-16 lg:mt-20 py-14 lg:py-20 text-center border-y border-[var(--color-canvas-paper-edge)]">
              <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                By post
              </span>
              <a
                href="mailto:admissions@techversity.ai"
                className="group mt-8 block type-display text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-700 ease-[var(--ease-editorial)]"
                style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)", lineHeight: 1 }}
                data-cursor-label="write"
              >
                <span className="link-editorial">admissions@techversity.ai</span>
              </a>
              <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[18px] max-w-[44ch] mx-auto">
                For most senior audiences, this is the preferred channel. It reaches a partner directly.
              </p>
            </div>

            {/* ─── The form (below, smaller) ─── */}
            <div className="mt-20 lg:mt-28">
              <div className="flex items-end justify-between mb-14 pb-8 border-b border-[var(--color-canvas-paper-edge)]">
                <div>
                  <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                    Or by form
                  </span>
                  <h2
                    className="type-display text-[var(--color-ink-primary)] mt-5"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 0.95 }}
                  >
                    {sent ? "Received, with thanks." : "Leave a message."}
                  </h2>
                </div>
                <span className="type-mono-meta text-[var(--color-ink-whisper)] hidden sm:block">
                  FOUR FIELDS · TWO MINUTES
                </span>
              </div>

              {sent ? (
                <div className="py-14 text-center">
                  <p className="type-display-italic text-[var(--color-ink-muted)] text-[20px] max-w-[42ch] mx-auto">
                    A partner will reply within the day. If urgent, write to{" "}
                    <a
                      href="mailto:admissions@techversity.ai"
                      className="link-editorial text-[var(--color-ink-primary)]"
                    >
                      admissions@techversity.ai
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>
                  <div className="grid md:grid-cols-2 gap-10">
                    <FieldText
                      label="Name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <FieldText
                      label="Title / role"
                      placeholder="e.g. Chairman, Founder, Dean"
                      error={errors.title?.message}
                      {...register("title")}
                    />
                  </div>
                  <FieldText
                    label="Country"
                    error={errors.country?.message}
                    {...register("country")}
                  />
                  <FieldTextarea
                    label="Your message"
                    placeholder="A sentence or a page — both are welcome."
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <div className="pt-8 border-t border-[var(--color-canvas-paper-edge)] flex items-center justify-between gap-6 flex-wrap">
                    <span className="type-mono-meta text-[var(--color-ink-muted)]">
                      REPLIES WITHIN 48 HOURS · STRICTLY CONFIDENTIAL
                    </span>
                    <ButtonV2
                      type="submit"
                      variant="heritage"
                      size="md"
                      showArrow
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending…" : "Send the note"}
                    </ButtonV2>
                  </div>
                </form>
              )}
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
        rows={5}
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
