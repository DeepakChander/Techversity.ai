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
        icon: "Award",
        accent: "#3A82FF",
        duration: "4-6 months",
      },
      {
        label: "Doctor of Business Administration",
        href: "/programs/dba",
        description: "Advanced business research and leadership",
        icon: "Briefcase",
        accent: "#22D3EE",
        duration: "18-36 months",
      },
      {
        label: "Doctor of Philosophy",
        href: "/programs/phd",
        description: "Rigorous academic research program",
        icon: "GraduationCap",
        accent: "#7b2ff7",
        duration: "24-48 months",
      },
    ],
  },
  { label: "Universities", href: "/universities" },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Why Techversity",
        href: "/about",
        description: "The firm, its posture, and who it serves.",
        icon: "Sparkles",
        accent: "#ff8c42",
      },
      {
        label: "How It Works",
        href: "/how-it-works",
        description: "The advisory in five verbs, step by step.",
        icon: "Route",
        accent: "#34d399",
      },
      {
        label: "FAQs",
        href: "/faqs",
        description: "The questions we are asked — answered in full.",
        icon: "HelpCircle",
        accent: "#94A3B8",
      },
    ],
  },
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
    title: "Bachelor's & Master's Programs",
    shortTitle: "Bachelor's & Master's",
    description:
      "Advanced bachelor's and master's programs tailored for working professionals. Coming soon.",
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
    id: "sbs-swiss",
    name: "SBS Swiss Business School",
    location: "Kloten, Switzerland",
    region: "Europe",
    flag: "🇨🇭",
    description:
      "A Swiss-accredited private business school with a triple-international accreditation footprint.",
    fullDescription:
      "Founded in Zurich in 1998, SBS Swiss Business School operates under the Swiss Higher Education Act and holds accreditations from ACBSP, IACBE, and the British Accreditation Council. It delivers doctoral and executive programmes across a ten-country partner network.",
    programs: ["DBA", "EMBA", "MBA"],
    specializations: ["Strategy", "AI in Business", "Finance", "Entrepreneurship"],
    coordinates: { lat: 47.45, lng: 8.57 },
    featured: true,
    established: "1998",
    accreditation: "ACBSP · IACBE · BAC",
    accent: "1E2A47",
    website: "sbs.edu",
    logo: null,
  },
  {
    id: "eu-global",
    name: "EU Global",
    location: "San Ġiljan, Malta",
    region: "Europe",
    flag: "🇲🇹",
    description:
      "A Malta-licensed institute offering EQF Level 8 doctorates portable across the European Higher Education Area.",
    fullDescription:
      "European Global Institute of Innovation & Technology operates under Malta Further & Higher Education Authority licence 2024-018. Its DBA and Doctor Honoris Causa programmes are ECTS-aligned and recognised across the Lisbon Convention signatory states.",
    programs: ["Honorary Doctorate", "DBA", "MBA"],
    specializations: ["Data Science", "Sustainability", "Digital Marketing", "Healthcare Management"],
    coordinates: { lat: 35.92, lng: 14.49 },
    featured: true,
    established: "2024",
    accreditation: "MFHEA Malta · EQF Level 8",
    accent: "1B3A6B",
    website: "euglobal.edu.eu",
    logo: "/logos/eu-global.webp",
  },
  {
    id: "amu-paris",
    name: "American Management University",
    location: "Paris, France",
    region: "Europe",
    flag: "🇫🇷",
    description:
      "Paris-headquartered non-profit operating under the French Code of Education, with a full doctoral ladder.",
    fullDescription:
      "AMU operates under the Rector of the Paris Academy with international memberships including ACBSP, IACBE, ASIC UK, and CMI. It confers PhD, DBA, Doctor of Professional Studies, Doctor of Strategic Leadership, and the rare Doctor of Humane Letters to distinguished contributors.",
    programs: ["Honorary Doctorate", "PhD", "DBA"],
    specializations: ["Business", "Leadership", "Education Administration", "Research"],
    coordinates: { lat: 48.87, lng: 2.28 },
    featured: true,
    established: "2018",
    accreditation: "French Ministry · ACBSP · IACBE",
    accent: "102447",
    website: "amu.edu.eu",
    logo: "/logos/amu-paris.webp",
  },
  {
    id: "esdst",
    name: "ESDST",
    location: "Puteaux, France",
    region: "Europe",
    flag: "🇫🇷",
    description:
      "The European School of Data Science and Technology — a specialist DBA institution parented by Rushford (Switzerland).",
    fullDescription:
      "ESDST specialises in data-driven doctoral education with DBA programmes in Data Science and Business Analytics. Delivered fully online in six-module blocks across two years, programmes are backed by eduQua (via parent Rushford Business School), IACBE, and AACSB memberships.",
    programs: ["DBA"],
    specializations: ["Data Science", "Business Analytics", "AI & Machine Learning", "Financial Analytics"],
    coordinates: { lat: 48.88, lng: 2.24 },
    featured: true,
    established: "2021",
    accreditation: "eduQua · IACBE · AACSB member",
    accent: "0E3A6B",
    website: "esdst.eu",
    logo: "/logos/esdst.webp",
  },
  {
    id: "central-global",
    name: "Central Global University",
    location: "Kutaisi, Georgia",
    region: "Europe",
    flag: "🇬🇪",
    description:
      "A Georgian higher-education institution with ACBSP-candidate DBA programmes and expanding Dubai operations.",
    fullDescription:
      "Central Global University offers doctoral and professional-doctorate programmes across business, finance, maritime, education, and marketing. Its DBA follows an ACBSP accreditation pathway and has been evaluated as equivalent to a US DBA by recognised credential evaluators.",
    programs: ["Honorary Doctorate", "PhD", "DBA"],
    specializations: ["Business Administration", "Maritime Business", "Educational Leadership", "Finance"],
    coordinates: { lat: 42.27, lng: 42.72 },
    featured: false,
    established: "2020",
    accreditation: "ACBSP Candidate · Georgian Recognition",
    accent: "0B2545",
    website: "centralglobaluniversity.org",
    logo: "/logos/central-global.webp",
  },
  {
    id: "dunster",
    name: "Dunster Business School",
    location: "Switzerland",
    region: "Europe",
    flag: "🇨🇭",
    description:
      "A Switzerland-based online business school with a three-year DBA and a global distance-learning footprint.",
    fullDescription:
      "Dunster Business School serves an online global network, offering a three-year DBA alongside Honorary DBA and PhD programmes. The institution is currently pursuing full ACBSP accreditation as a candidate and maintains AACSB and QS Stars affiliations.",
    programs: ["Honorary Doctorate", "DBA", "MBA"],
    specializations: ["Sustainable Business", "Ethical Leadership", "Global Management", "Education Leadership"],
    coordinates: { lat: 46.9, lng: 7.45 },
    featured: false,
    established: "2024",
    accreditation: "ACBSP Candidate",
    accent: "7A1F2B",
    website: "dunster.ch",
    logo: "/logos/dunster.webp",
  },
  {
    id: "texas-global",
    name: "Texas Global University",
    location: "Boulder, Colorado, USA",
    region: "North America",
    flag: "🇺🇸",
    description:
      "A US-registered institution specialising in publication-based doctoral pathways for senior practitioners.",
    fullDescription:
      "Texas Global University focuses on publication-based doctoral routes — awarding PhDs on the strength of a candidate's published research record rather than traditional coursework. It also confers Honorary Doctorates and post-doctoral fellowships to accomplished professionals.",
    programs: ["Honorary Doctorate", "PhD", "Fellowship"],
    specializations: ["Publication-based PhD", "Post-PhD", "Professional Research", "Fellowship"],
    coordinates: { lat: 40.01, lng: -105.27 },
    featured: false,
    established: "2022",
    accreditation: "US-registered · Publication-based pathway",
    accent: "5A554E",
    website: "texasglobaluniversity.us",
    logo: "/logos/texas-global.webp",
  },
  {
    id: "kennedy",
    name: "Kennedy University",
    location: "Multi-jurisdictional",
    region: "Europe",
    flag: "🌍",
    description:
      "A distance-learning institution offering doctorates, honorary doctorates, and professorships across multiple jurisdictions.",
    fullDescription:
      "Kennedy University operates across Saint Lucia, France, and Somalia, positioned as a daughter institution of Kennedy University of Baptist (Florida). Its programmes span counselling psychology, media communication, theology, public administration, and business, with both earned and honorary doctoral pathways.",
    programs: ["Honorary Doctorate", "PhD", "DBA"],
    specializations: ["Counselling Psychology", "Media Communication", "Theology", "Public Administration"],
    coordinates: { lat: 48.87, lng: 2.35 },
    featured: false,
    established: "2019",
    accreditation: "French Ministry · QAHE · ECLBS",
    accent: "8C2A2A",
    website: "kennedy.edu.eu",
    logo: "/logos/kennedy.webp",
  },
] as const;

export const UNIVERSITY_REGIONS = [
  "All Regions",
  "North America",
  "Europe",
] as const;

export const COLLABORATION_MODEL = [
  {
    title: "Joint Research Programs",
    description: "Collaborative research initiatives that combine institutional expertise with professional industry experience, producing impactful scholarship.",
    icon: "FlaskConical",
  },
  {
    title: "Academic Accreditation",
    description: "All degrees and credentials are conferred directly by accredited universities, ensuring global recognition and institutional legitimacy.",
    icon: "BadgeCheck",
  },
  {
    title: "Global Faculty Network",
    description: "Access to distinguished professors and mentors from partner institutions across continents, bringing diverse perspectives to your research.",
    icon: "Users",
  },
  {
    title: "Professional Doctorate Pathways",
    description: "Structured pathways designed for working professionals, balancing academic rigor with practical applicability in your field.",
    icon: "Route",
  },
] as const;

export const IMPACT_STATS = [
  { value: 10, suffix: "+", label: "Partner Universities" },
  { value: 3, suffix: "", label: "Continents" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 6, suffix: "+", label: "Doctoral Programs" },
  { value: 98, suffix: "%", label: "Acceptance Rate" },
  { value: 4.8, suffix: "/5", label: "Satisfaction Score" },
] as const;

export const ACCREDITATIONS = [
  {
    name: "National Accreditation",
    description: "Recognized by national education authorities in the United States",
    region: "United States",
  },
  {
    name: "EU Academic Recognition",
    description: "Compliant with European Higher Education Area (EHEA) standards",
    region: "European Union",
  },
  {
    name: "Bologna Process",
    description: "Aligned with the Bologna Process framework for degree compatibility across 49 countries",
    region: "International",
  },
  {
    name: "Quality Assurance Standards",
    description: "All partner institutions undergo rigorous quality assurance and periodic review",
    region: "Global",
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
    { label: "All Programs", href: "/programs" },
  ],
  university: [
    { label: "Partner Universities", href: "/universities" },
    { label: "Accreditations", href: "/universities#accreditations" },
    { label: "Global Network", href: "/universities#network" },
  ],
  company: [
    { label: "About the firm", href: "/about" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
    { label: "Begin a conversation", href: "/apply" },
  ],
  resources: [
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
