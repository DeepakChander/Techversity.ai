"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  Send,
  GraduationCap,
  Users,
  Briefcase,
  HeadphonesIcon,
  Plus,
  Minus,
  Globe,
  ChevronRight,
  Shield,
  Star,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { useGSAP, gsap } from "@/hooks/useGSAP";

// ============================================
// Schema & Types
// ============================================

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  inquiryType: z.enum(
    ["admissions", "partnership", "programs", "general"],
    { message: "Please select an inquiry type" }
  ),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ============================================
// Data
// ============================================

const contactChannels = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    description: "Our team responds within 4 hours",
    value: "admissions@techversity.ai",
    href: "mailto:admissions@techversity.ai",
    accent: "from-blue-start to-blue-mid",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Call Us",
    description: "Mon–Fri, 9 AM – 6 PM (EST)",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
    accent: "from-cyan to-blue-mid",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Visit Us",
    description: "By appointment only",
    value: "New York, United States",
    href: undefined,
    accent: "from-purple to-blue-start",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Response Time",
    description: "Average first response",
    value: "Under 4 hours",
    href: undefined,
    accent: "from-coral to-orange",
  },
];

const inquiryTypes = [
  { value: "admissions" as const, label: "Admissions", icon: <GraduationCap className="w-4 h-4" /> },
  { value: "partnership" as const, label: "Partnership", icon: <Briefcase className="w-4 h-4" /> },
  { value: "programs" as const, label: "Programs", icon: <Globe className="w-4 h-4" /> },
  { value: "general" as const, label: "General Inquiry", icon: <MessageSquare className="w-4 h-4" /> },
];

const departments = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Admissions Office",
    email: "admissions@techversity.ai",
    description: "Program eligibility, applications, and enrollment guidance",
    accent: "blue-start",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Program Advisors",
    email: "advisors@techversity.ai",
    description: "Academic guidance, program selection, and career alignment",
    accent: "cyan",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Partnership Department",
    email: "partnerships@techversity.ai",
    description: "Institutional partnerships, corporate programs, and collaborations",
    accent: "purple",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "Student Support",
    email: "support@techversity.ai",
    description: "Ongoing student assistance, documentation, and technical support",
    accent: "coral",
  },
];

const contactFAQs = [
  {
    question: "How quickly will I receive a response?",
    answer:
      "Our advisory team guarantees an initial response within 4 hours during business hours (Mon–Fri, 9 AM – 6 PM EST). For inquiries received outside business hours, you'll hear back by the next business morning.",
  },
  {
    question: "How do I apply for a program?",
    answer:
      "You can start your application directly from our Apply page, or reach out through this contact form selecting 'Admissions' as your inquiry type. An advisor will guide you through the entire process, including eligibility assessment and document requirements.",
  },
  {
    question: "How can my institution partner with Techversity.ai?",
    answer:
      "We welcome partnerships with accredited universities and professional organizations. Select 'Partnership' in the contact form or email partnerships@techversity.ai directly. Our team will schedule an introductory call to explore collaboration opportunities.",
  },
  {
    question: "Can I schedule a one-on-one consultation?",
    answer:
      "Absolutely. Simply submit an inquiry through the form and mention you'd like a personal consultation. Our advisors offer complimentary 30-minute sessions to discuss your goals, eligibility, and recommended programs.",
  },
  {
    question: "What information should I include in my inquiry?",
    answer:
      "For the fastest, most helpful response, include: your professional background, the program(s) you're interested in, your timeline, and any specific questions. This helps our advisors tailor their guidance to your situation.",
  },
];

// ============================================
// Sub-components
// ============================================

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-blue-start to-cyan"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0 }}
      />
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 px-4 text-left group"
        aria-expanded={isOpen}
      >
        <h4
          className={`font-medium text-base transition-colors duration-200 ${
            isOpen ? "text-slate-900" : "text-slate-600"
          } group-hover:text-slate-900`}
        >
          {question}
        </h4>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.3, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-slate-500 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-4" />
    </div>
  );
}

// ============================================
// Main Page Component
// ============================================

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const selectedInquiry = watch("inquiryType");

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submission:", data);
    setSubmitted(true);
  };

  // GSAP scroll animations
  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelectorAll(".hero-animate"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, []);

  useGSAP(() => {
    if (!departmentsRef.current) return;
    gsap.from(departmentsRef.current.querySelectorAll(".dept-card"), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: departmentsRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-start/50 focus:ring-1 focus:ring-blue-start/20 transition-all duration-300 text-[15px]";

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="min-h-screen">
          {/* ============================================
              SECTION 1: Hero
              ============================================ */}
          <section
            ref={heroRef}
            className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden"
          >
            {/* Light gradient background */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-50/50 via-white to-white" aria-hidden="true" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <span className="hero-animate inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-5">
                Contact Us
              </span>

              <h1 className="hero-animate text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                Get in Touch With Our{" "}
                <GradientText as="span" className="font-bold">
                  Academic Team
                </GradientText>
              </h1>

              <p className="hero-animate text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you&apos;re exploring programs, seeking partnership opportunities,
                or have questions about admissions — our advisory team is here to guide you.
              </p>

              <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-cyan to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500" />
                  <Button
                    size="lg"
                    className="relative"
                    onClick={() =>
                      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                  >
                    <Send className="w-5 h-5" />
                    Send an Inquiry
                  </Button>
                </div>
                <Button href="/apply" variant="outline" size="lg">
                  Apply for a Program
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* ============================================
              SECTION 2: Contact Channels
              ============================================ */}
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {contactChannels.map((channel, i) => (
                  <motion.div
                    key={channel.title}
                    className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -2 }}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${channel.accent} flex items-center justify-center text-white mb-4 opacity-90 group-hover:opacity-100 transition-opacity`}
                    >
                      {channel.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-slate-900 text-[15px] mb-1">
                      {channel.title}
                    </h3>
                    <p className="text-slate-500 text-xs mb-2">
                      {channel.description}
                    </p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="text-blue-start text-sm font-medium hover:text-blue-mid transition-colors inline-flex items-center gap-1 group/link"
                      >
                        {channel.value}
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    ) : (
                      <span className="text-slate-900 text-sm font-medium">
                        {channel.value}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
              SECTION 3: Contact Form + Map
              ============================================ */}
          <section className="py-16 lg:py-24" id="inquiry-form">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Form */}
                <div ref={formRef} className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-3">
                      Send a Message
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">
                      How Can We Help?
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Fill out the form below and our team will get back to you within 4 hours.
                    </p>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 px-8 rounded-2xl bg-white border border-slate-200"
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-start/15 to-cyan/15 flex items-center justify-center mx-auto mb-6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                          <Check className="w-10 h-10 text-blue-start" />
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-3">
                          Message Sent Successfully
                        </h2>
                        <p className="text-slate-600 max-w-md mx-auto mb-8">
                          Thank you for reaching out. A member of our advisory team will
                          respond within 4 hours during business hours.
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-start" />
                            <span>Response within <strong className="text-slate-900">4 hours</strong></span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-start" />
                            <span>Check your inbox</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="mt-8 text-sm text-blue-start hover:text-blue-mid transition-colors underline underline-offset-4"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 p-8 md:p-10 rounded-2xl bg-white border border-slate-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Full Name <span className="text-coral">*</span>
                            </label>
                            <input
                              {...register("name")}
                              className={inputClass}
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="text-xs text-coral mt-1.5">{errors.name.message}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Email Address <span className="text-coral">*</span>
                            </label>
                            <input
                              {...register("email")}
                              type="email"
                              className={inputClass}
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <p className="text-xs text-coral mt-1.5">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Phone Number <span className="text-slate-500 text-xs">(optional)</span>
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            className={inputClass}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        {/* Inquiry Type - visual selector */}
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-3">
                            Inquiry Type <span className="text-coral">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {inquiryTypes.map((type) => (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => setValue("inquiryType", type.value, { shouldValidate: true })}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 text-center ${
                                  selectedInquiry === type.value
                                    ? "bg-blue-50 border-blue-200 text-slate-900"
                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-600"
                                }`}
                              >
                                <div
                                  className={`transition-colors ${
                                    selectedInquiry === type.value ? "text-blue-start" : ""
                                  }`}
                                >
                                  {type.icon}
                                </div>
                                <span className="text-xs font-medium">{type.label}</span>
                              </button>
                            ))}
                          </div>
                          {errors.inquiryType && (
                            <p className="text-xs text-coral mt-1.5">{errors.inquiryType.message}</p>
                          )}
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Your Message <span className="text-coral">*</span>
                          </label>
                          <textarea
                            {...register("message")}
                            rows={5}
                            className={`${inputClass} resize-none`}
                            placeholder="Tell us about your inquiry, goals, or any questions you have..."
                          />
                          {errors.message && (
                            <p className="text-xs text-coral mt-1.5">{errors.message.message}</p>
                          )}
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                          <p className="text-xs text-slate-500">
                            <Shield className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                            Your information is secure and will never be shared.
                          </p>
                          <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                          >
                            {isSubmitting ? "Sending..." : "Send Inquiry"}
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sidebar: Map + Office */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Map embed placeholder */}
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-slate-200 bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative w-full h-[260px] bg-slate-100">
                      {/* Stylized map placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-14 h-14 rounded-full bg-blue-start/15 flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-7 h-7 text-blue-start" />
                          </div>
                          <p className="text-slate-900 font-heading font-semibold text-sm">
                            New York, United States
                          </p>
                          <p className="text-slate-500 text-xs mt-1">Global Advisory Services</p>
                        </div>
                      </div>
                      {/* Decorative grid */}
                      <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-slate-900 text-sm mb-1">
                        Office Location
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        New York, NY, United States
                        <br />
                        Appointments available Mon–Fri
                      </p>
                    </div>
                  </motion.div>

                  {/* Quick stats */}
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                      <p className="text-2xl font-heading font-bold text-slate-900">4hr</p>
                      <p className="text-slate-500 text-xs mt-1">Avg. Response</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                      <p className="text-2xl font-heading font-bold text-slate-900">12+</p>
                      <p className="text-slate-500 text-xs mt-1">Countries Served</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-orange fill-orange" />
                        <p className="text-2xl font-heading font-bold text-slate-900">4.8</p>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">Client Rating</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center">
                      <p className="text-2xl font-heading font-bold text-slate-900">100%</p>
                      <p className="text-slate-500 text-xs mt-1">Refund Guarantee</p>
                    </div>
                  </motion.div>

                  {/* Trust note */}
                  <motion.div
                    className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan/[0.06] border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">
                      <strong className="text-slate-900">Free consultation.</strong>{" "}
                      Every inquiry receives a personalized response from a dedicated
                      academic advisor — no automated replies, no chatbots.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              SECTION 4: Academic Support / Departments
              ============================================ */}
          <section ref={departmentsRef} className="py-16 lg:py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                className="text-center mb-14"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-3">
                  Specialized Support
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">
                  Reach the Right Department
                </h2>
                <p className="text-slate-600 max-w-lg mx-auto">
                  Connect directly with the team best suited to help with your specific needs.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {departments.map((dept) => (
                  <div
                    key={dept.title}
                    className="dept-card p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-${dept.accent}/10 flex items-center justify-center text-${dept.accent} mb-4 group-hover:scale-105 transition-transform`}
                    >
                      {dept.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-slate-900 text-[15px] mb-1">
                      {dept.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">
                      {dept.description}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-blue-start text-sm font-medium hover:text-blue-mid transition-colors inline-flex items-center gap-1 group/link"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {dept.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
              SECTION 5: FAQ
              ============================================ */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Left heading */}
                <motion.div
                  className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
                    FAQ
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                    Common Questions About Contacting Us
                  </h2>
                  <p className="text-slate-600">
                    Quick answers to help you get the most out of your interaction with our team.
                  </p>
                </motion.div>

                {/* Right accordion */}
                <div className="lg:col-span-3">
                  <div className="space-y-0">
                    {contactFAQs.map((faq, i) => (
                      <FAQAccordionItem
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={faqOpen === i}
                        onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
              SECTION 6: Final CTA (dark contrast section)
              ============================================ */}
          <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Dark contrast background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-start/20" />
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div
                  className="absolute w-[700px] h-[450px] rounded-full opacity-[0.12]"
                  style={{
                    background: "radial-gradient(ellipse, #1a6dff 0%, transparent 70%)",
                    top: "0%",
                    left: "10%",
                    filter: "blur(100px)",
                    animation: "aurora-1 15s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute w-[500px] h-[350px] rounded-full opacity-[0.08]"
                  style={{
                    background: "radial-gradient(ellipse, #00e5ff 0%, transparent 70%)",
                    top: "20%",
                    right: "10%",
                    filter: "blur(100px)",
                    animation: "aurora-2 18s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute w-[400px] h-[300px] rounded-full opacity-[0.06]"
                  style={{
                    background: "radial-gradient(ellipse, #7b2ff7 0%, transparent 70%)",
                    bottom: "0%",
                    left: "40%",
                    filter: "blur(80px)",
                    animation: "aurora-3 20s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                  Ready to Take the{" "}
                  <span className="bg-gradient-to-r from-blue-start via-cyan to-coral bg-[length:200%_auto] bg-clip-text text-transparent shimmer-text">
                    Next Step?
                  </span>
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  Join accomplished professionals from 12+ countries who have turned their
                  career achievements into academic recognition.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-cyan to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500" />
                    <Button href="/apply" size="lg" className="relative">
                      Apply for a Program
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button href="/programs" variant="outline" size="lg">
                    Explore Programs
                  </Button>
                  <Button href="/universities" variant="ghost" size="lg">
                    View Universities
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-start" />
                    <span>
                      Response in <strong className="text-white">4 hours</strong>
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange" />
                    <span>
                      Rated <strong className="text-white">4.8/5</strong>
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-start" />
                    <span>
                      <strong className="text-white">100%</strong> Refund Guarantee
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
}
