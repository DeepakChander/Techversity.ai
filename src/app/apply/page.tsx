"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  program: z.string().min(1, "Please select a program"),
  experience: z.string().min(1, "Please select your experience level"),
  field: z.string().min(2, "Professional field is required"),
  currentRole: z.string().min(2, "Current role is required"),
  goals: z.string().min(10, "Please describe your goals"),
  howHeard: z.string().optional(),
  consent: z.literal(true, { message: "You must agree to proceed" }),
});

type FormData = z.infer<typeof schema>;

const programLabels: Record<string, string> = {
  "honorary-doctorate": "Honorary Doctorate",
  "dba": "Doctor of Business Administration (DBA)",
  "phd": "Doctor of Philosophy (PhD)",
};

const steps = [
  { title: "Personal Info", fields: ["firstName", "lastName", "email", "phone", "country"] },
  { title: "Program Selection", fields: ["program", "experience", "field"] },
  { title: "Professional Details", fields: ["currentRole", "goals", "howHeard"] },
  { title: "Review & Submit", fields: ["consent"] },
];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const watchAll = watch();

  const nextStep = async () => {
    const fields = steps[step].fields as (keyof FormData)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: FormData) => {
    console.log("Application submitted:", data);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-start/50 focus:ring-1 focus:ring-blue-start/20 transition-all appearance-none";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
  const errorClass = "text-xs text-red-500 mt-1";

  if (submitted) {
    return (
      <>
        <div className="main-content">
        <Navbar />
        <main id="main-content" className="min-h-screen flex items-center justify-center pt-20">
          <motion.div
            className="max-w-md mx-auto px-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-blue-start" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
              Application Submitted!
            </h1>
            <p className="text-slate-600 mb-8">
              Thank you for your application. Our advisory team will contact you
              within 4 hours to discuss the next steps.
            </p>
            <Button href="/">Return Home</Button>
          </motion.div>
        </main>
        </div>
        <PreFooter />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="main-content">
      <Navbar />
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">
              Apply Now
            </h1>
            <p className="text-slate-600">
              Start your journey to academic recognition.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all ${
                    i <= step
                      ? "bg-gradient-to-br from-blue-start to-cyan text-white"
                      : "bg-slate-100 border border-slate-200 text-slate-400"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-2 transition-colors ${
                      i < step ? "bg-blue-start" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step title */}
          <h2 className="text-xl font-heading font-bold text-slate-900 mb-6">
            {steps[step].title}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Step 1: Personal Info */}
              {step === 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        {...register("firstName")}
                        className={inputClass}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className={errorClass}>{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        {...register("lastName")}
                        className={inputClass}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className={errorClass}>{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={inputClass}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className={errorClass}>{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Country *</label>
                    <input
                      {...register("country")}
                      className={inputClass}
                      placeholder="United States"
                    />
                    {errors.country && (
                      <p className={errorClass}>{errors.country.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* Step 2: Program Selection */}
              {step === 1 && (
                <>
                  <div>
                    <label className={labelClass}>Program of Interest *</label>
                    <select {...register("program")} className={inputClass}>
                      <option value="">Select a program</option>
                      <option value="honorary-doctorate">
                        Honorary Doctorate
                      </option>
                      <option value="dba">
                        Doctor of Business Administration (DBA)
                      </option>
                      <option value="phd">Doctor of Philosophy (PhD)</option>
                    </select>
                    {errors.program && (
                      <p className={errorClass}>{errors.program.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      Years of Professional Experience *
                    </label>
                    <select {...register("experience")} className={inputClass}>
                      <option value="">Select experience level</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10-15">10-15 years</option>
                      <option value="15-20">15-20 years</option>
                      <option value="20+">20+ years</option>
                    </select>
                    {errors.experience && (
                      <p className={errorClass}>{errors.experience.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      Professional Field *
                    </label>
                    <input
                      {...register("field")}
                      className={inputClass}
                      placeholder="e.g., Technology, Finance, Healthcare"
                    />
                    {errors.field && (
                      <p className={errorClass}>{errors.field.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Professional Details */}
              {step === 2 && (
                <>
                  <div>
                    <label className={labelClass}>Current Role *</label>
                    <input
                      {...register("currentRole")}
                      className={inputClass}
                      placeholder="e.g., CEO, VP Engineering, Director"
                    />
                    {errors.currentRole && (
                      <p className={errorClass}>
                        {errors.currentRole.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      What are your goals? *
                    </label>
                    <textarea
                      {...register("goals")}
                      rows={4}
                      className={inputClass}
                      placeholder="Tell us about your academic and professional goals..."
                    />
                    {errors.goals && (
                      <p className={errorClass}>{errors.goals.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      How did you hear about us?
                    </label>
                    <select {...register("howHeard")} className={inputClass}>
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Step 4: Review */}
              {step === 3 && (
                <>
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-3">
                    <h3 className="font-heading font-semibold text-slate-900 mb-4">
                      Application Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Name:</span>
                        <p className="text-slate-900">
                          {watchAll.firstName} {watchAll.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Email:</span>
                        <p className="text-slate-900">{watchAll.email}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Program:</span>
                        <p className="text-slate-900">{programLabels[watchAll.program] || watchAll.program}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Field:</span>
                        <p className="text-slate-900">{watchAll.field}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Role:</span>
                        <p className="text-slate-900">
                          {watchAll.currentRole}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Experience:</span>
                        <p className="text-slate-900">
                          {watchAll.experience} years
                        </p>
                      </div>
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1 accent-blue-start"
                    />
                    <span className="text-sm text-slate-500">
                      I agree to the{" "}
                      <a href="/privacy" className="text-blue-start hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="/terms" className="text-blue-start hover:underline">
                        Terms & Conditions
                      </a>
                      . I consent to being contacted by the Techversity.ai team
                      regarding my application.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className={errorClass}>{errors.consent.message}</p>
                  )}
                </>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit">
                  Submit Application
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
}
