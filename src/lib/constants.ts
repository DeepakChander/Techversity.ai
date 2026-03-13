// ============================================
// TECHVERSITY.AI - Site Constants & Content
// ============================================

export const SITE_CONFIG = {
  name: "Techversity.ai",
  tagline: "Powering the Techverse of Tomorrow",
  description:
    "Premier admissions advisory connecting accomplished professionals with accredited universities for Honorary Doctorates, DBAs, and PhDs.",
  email: "admissions@techversity.ai",
  url: "https://techversity.ai",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Honorary Doctorate",
        href: "/programs/honorary-doctorate",
        description: "Recognition of outstanding professional achievements",
      },
      {
        label: "Doctor of Business Administration",
        href: "/programs/dba",
        description: "Advanced business research and leadership",
      },
      {
        label: "Doctor of Philosophy",
        href: "/programs/phd",
        description: "Rigorous academic research program",
      },
    ],
  },
  { label: "Universities", href: "/universities" },
  { label: "Contact", href: "/contact" },
] as const;

export const PROGRAMS = [
  {
    id: "honorary-doctorate",
    title: "Honorary Doctorate",
    shortTitle: "Hon. Doctorate",
    description:
      "A prestigious recognition awarded to accomplished professionals whose work has made a significant impact in their industry.",
    duration: "4-6 months",
    format: "Portfolio-based",
    icon: "Award",
    href: "/programs/honorary-doctorate",
    featured: true,
    comingSoon: false,
  },
  {
    id: "dba",
    title: "Doctor of Business Administration",
    shortTitle: "DBA",
    description:
      "An advanced doctoral program designed for senior professionals seeking to contribute original research to business practice.",
    duration: "18-36 months",
    format: "Online + Research",
    icon: "Briefcase",
    href: "/programs/dba",
    featured: true,
    comingSoon: false,
  },
  {
    id: "phd",
    title: "Doctor of Philosophy",
    shortTitle: "PhD",
    description:
      "A rigorous research-focused doctoral program for professionals committed to advancing knowledge in their field.",
    duration: "24-48 months",
    format: "Research-intensive",
    icon: "GraduationCap",
    href: "/programs/phd",
    featured: false,
    comingSoon: false,
  },
  {
    id: "masters",
    title: "Master's Programs",
    shortTitle: "Master's",
    description:
      "Advanced master's programs tailored for working professionals. Coming soon.",
    duration: "Coming Soon",
    format: "TBA",
    icon: "BookOpen",
    href: "#",
    featured: false,
    comingSoon: true,
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Submit Your Application",
    description:
      "Complete our streamlined online application with your professional background, achievements, and academic goals. Our team reviews every application personally.",
    icon: "FileText",
  },
  {
    number: 2,
    title: "Personalized Consultation",
    description:
      "Within 4 hours, a dedicated advisor connects with you to understand your goals, assess your profile, and recommend the best-fit program and university.",
    icon: "Users",
  },
  {
    number: 3,
    title: "University Matching",
    description:
      "We match you with accredited partner universities based on your field, experience, and aspirations. You'll receive a detailed program proposal.",
    icon: "Building2",
  },
  {
    number: 4,
    title: "Enrollment & Support",
    description:
      "Once you accept, we handle all enrollment logistics. Your dedicated advisor provides end-to-end support throughout your academic journey.",
    icon: "CheckCircle2",
  },
  {
    number: 5,
    title: "Achievement & Beyond",
    description:
      "Complete your program with ongoing mentorship and support. Join our alumni network of accomplished professionals from 12+ countries.",
    icon: "Trophy",
  },
] as const;

export const WHY_US_POINTS = [
  {
    title: "Accredited Universities Only",
    description: "Every partner institution holds recognized accreditation",
  },
  {
    title: "4-Hour Response Guarantee",
    description: "Personal advisor contact within 4 hours of application",
  },
  {
    title: "12+ Countries Represented",
    description: "Global community of accomplished professionals",
  },
  {
    title: "End-to-End Support",
    description: "From application to graduation, we're with you every step",
  },
  {
    title: "4.8/5 Client Satisfaction",
    description: "Rated by professionals who've completed their programs",
  },
  {
    title: "Flexible Online Format",
    description: "Designed for busy professionals with demanding schedules",
  },
  {
    title: "Industry-Recognized Credentials",
    description: "Degrees and titles recognized across industries worldwide",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees with a clear refund policy",
  },
] as const;

export const UNIVERSITIES = [
  {
    id: "cc-university",
    name: "CC University",
    location: "United States",
    flag: "🇺🇸",
    description:
      "A forward-thinking institution committed to accessible, high-quality higher education for working professionals.",
    programs: ["Honorary Doctorate", "DBA", "PhD"],
    coordinates: { lat: 38.9, lng: -77.0 },
  },
  {
    id: "washington-digital",
    name: "Washington Digital University",
    location: "United States",
    flag: "🇺🇸",
    description:
      "Specializing in digital-era education, bridging technology and traditional academic excellence.",
    programs: ["Honorary Doctorate", "DBA"],
    coordinates: { lat: 47.6, lng: -122.3 },
  },
  {
    id: "euro-asian",
    name: "Euro-Asian University",
    location: "Estonia",
    flag: "🇪🇪",
    description:
      "A European institution fostering cross-cultural academic collaboration between East and West.",
    programs: ["Honorary Doctorate", "PhD"],
    coordinates: { lat: 59.4, lng: 24.7 },
  },
  {
    id: "esdst",
    name: "ESDST",
    location: "European Union",
    flag: "🇪🇺",
    description:
      "European School of Doctoral Studies and Training, focused on professional doctoral education.",
    programs: ["DBA", "PhD"],
    coordinates: { lat: 48.8, lng: 2.3 },
  },
] as const;

export const FAQS = [
  {
    question: "What is an Honorary Doctorate?",
    answer:
      "An Honorary Doctorate (Doctor Honoris Causa) is a prestigious academic recognition awarded to individuals who have made significant contributions to their field or society. Unlike traditional doctorates, it is based on professional achievements rather than coursework.",
  },
  {
    question: "Are these degrees accredited?",
    answer:
      "Yes. All our partner universities hold recognized accreditation from their respective national and international accreditation bodies. We only work with institutions that meet rigorous academic standards.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The Honorary Doctorate process typically takes 4-6 months. DBA programs run 18-36 months, and PhD programs 24-48 months. Timelines may vary based on individual progress and university requirements.",
  },
  {
    question: "Who is eligible to apply?",
    answer:
      "Our programs are designed for accomplished professionals, entrepreneurs, and leaders with significant industry experience. Specific eligibility criteria vary by program — our advisors can assess your profile during a free consultation.",
  },
  {
    question: "What is the investment?",
    answer:
      "Program fees vary by university and degree type. We offer transparent pricing with no hidden fees. Contact our admissions team for detailed fee structures and available payment plans.",
  },
  {
    question: "Can I study while working full-time?",
    answer:
      "Absolutely. All our programs are designed for working professionals with flexible online formats, asynchronous learning options, and accommodating schedules.",
  },
  {
    question: "What documents are required?",
    answer:
      "Typically: a current CV/resume, professional portfolio or achievements summary, identification documents, and academic transcripts (for DBA/PhD). Our team guides you through the entire documentation process.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes. We have a clear refund policy. If your application is not accepted by the university, you receive a full refund of advisory fees. Partial refunds are available at various stages — see our Refund Policy page for details.",
  },
  {
    question: "How is Techversity.ai different from other services?",
    answer:
      "We provide end-to-end advisory support with a personal advisor, 4-hour response guarantee, and exclusive partnerships with accredited universities. We're not a degree mill — we're a bridge to legitimate academic recognition.",
  },
  {
    question: "What countries do you serve?",
    answer:
      "We serve professionals globally, with a focus on the US, UK, Middle East, and Europe. Our partner universities accept international students, and our advisory services are available worldwide.",
  },
] as const;

export const FOOTER_LINKS = {
  programs: [
    { label: "Honorary Doctorate", href: "/programs/honorary-doctorate" },
    { label: "DBA", href: "/programs/dba" },
    { label: "PhD", href: "/programs/phd" },
  ],
  company: [
    { label: "About Us", href: "/#why-us" },
    { label: "Universities", href: "/universities" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
