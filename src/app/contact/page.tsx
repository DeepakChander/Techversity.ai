"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MapPin, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof schema>;

const contactMethods = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    description: "Our team responds within 4 hours",
    value: "admissions@techversity.ai",
    href: "mailto:admissions@techversity.ai",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Response Time",
    description: "Average first response",
    value: "Under 4 hours",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Global Reach",
    description: "Serving professionals in",
    value: "12+ countries",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-all";

  return (
    <>
      <div className="main-content">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Have questions about our programs? Our advisory team is ready to
              help you find the right path.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact methods */}
            <div className="lg:col-span-2 space-y-6">
              {contactMethods.map((method, i) => (
                <motion.div
                  key={method.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary text-sm">
                      {method.title}
                    </h3>
                    <p className="text-text-muted text-xs mb-1">
                      {method.description}
                    </p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="text-cyan text-sm hover:underline"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-text-primary text-sm font-medium">
                        {method.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-cyan" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-text-secondary">
                    We&apos;ll get back to you within 4 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        className={inputClass}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-xs text-coral mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-coral mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Subject *
                    </label>
                    <input
                      {...register("subject")}
                      className={inputClass}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="text-xs text-coral mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className={inputClass}
                      placeholder="Tell us about your inquiry..."
                    />
                    {errors.message && (
                      <p className="text-xs text-coral mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
