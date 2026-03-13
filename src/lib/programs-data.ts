// ============================================
// TECHVERSITY.AI - Program Page Data
// ============================================

export interface ProgramPageData {
  id: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  accentColor: string;
  accentGradient: string;
  duration: string;
  format: string;
  overview: string;
  benefits: {
    title: string;
    description: string;
  }[];
  eligibility: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  documents: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const PROGRAM_PAGES: Record<string, ProgramPageData> = {
  "honorary-doctorate": {
    id: "honorary-doctorate",
    title: "Honorary Doctorate",
    subtitle: "Doctor Honoris Causa",
    heroDescription:
      "A prestigious academic recognition awarded to accomplished professionals whose work has made a significant impact in their industry or society.",
    accentColor: "#1a6dff",
    accentGradient: "from-blue-start to-blue-mid",
    duration: "4-6 months",
    format: "Portfolio & Achievement-Based",
    overview:
      "The Honorary Doctorate (Doctor Honoris Causa) is the highest form of academic recognition, traditionally awarded by universities to individuals who have demonstrated exceptional achievement in their professional field. Unlike traditional doctoral programs, it does not require coursework or examinations — instead, it recognizes the real-world impact of your career.",
    benefits: [
      {
        title: "Professional Prestige",
        description:
          "Add 'Dr.' to your name with a legitimate, university-issued credential recognized worldwide.",
      },
      {
        title: "Career Advancement",
        description:
          "Open doors to board positions, speaking engagements, and leadership opportunities.",
      },
      {
        title: "Global Recognition",
        description:
          "Credential issued by an accredited university, recognized across industries and borders.",
      },
      {
        title: "No Coursework Required",
        description:
          "Based on your existing professional achievements — no exams, no classes, no thesis.",
      },
      {
        title: "Fast Track",
        description:
          "Complete the process in as little as 4-6 months with our streamlined advisory support.",
      },
      {
        title: "Networking",
        description:
          "Join an exclusive alumni network of accomplished professionals from 12+ countries.",
      },
    ],
    eligibility: [
      "Minimum 10 years of professional experience in your field",
      "Demonstrable impact or significant contributions to your industry",
      "Leadership roles or entrepreneurial achievements",
      "Published work, patents, or industry recognition (preferred but not required)",
      "Clean professional and ethical record",
    ],
    process: [
      {
        step: 1,
        title: "Application Submission",
        description:
          "Complete our online application with your CV, professional achievements, and career highlights.",
      },
      {
        step: 2,
        title: "Profile Assessment",
        description:
          "Our advisory team reviews your profile and matches you with the most suitable university partner.",
      },
      {
        step: 3,
        title: "Portfolio Preparation",
        description:
          "We help you compile a comprehensive portfolio documenting your professional contributions.",
      },
      {
        step: 4,
        title: "University Review",
        description:
          "Your portfolio is submitted to the university's honorary doctorate committee for evaluation.",
      },
      {
        step: 5,
        title: "Award & Ceremony",
        description:
          "Upon approval, receive your doctorate at a formal university ceremony or via official dispatch.",
      },
    ],
    documents: [
      "Current CV/Resume (detailed)",
      "Professional portfolio or achievements summary",
      "Government-issued identification",
      "Professional references (2-3)",
      "Evidence of professional impact (awards, publications, media coverage)",
      "Passport-sized photographs",
    ],
    faqs: [
      {
        question: "Is an Honorary Doctorate a real degree?",
        answer:
          "Yes. An Honorary Doctorate (Doctor Honoris Causa) is a legitimate academic recognition issued by accredited universities. It is widely recognized across industries and allows you to use the title 'Dr.' professionally.",
      },
      {
        question: "How is this different from buying a degree?",
        answer:
          "We are not selling degrees. Techversity.ai is an advisory service that connects qualified professionals with accredited universities. The university makes the final decision on awarding the doctorate based on your genuine achievements.",
      },
      {
        question: "Can I use the title 'Dr.' after receiving this?",
        answer:
          "Yes. Upon receiving your Honorary Doctorate from an accredited university, you are entitled to use the prefix 'Dr.' in professional and social contexts.",
      },
      {
        question: "What if my application is not accepted?",
        answer:
          "If the university does not approve your application, you receive a full refund of advisory fees. We also offer re-evaluation with an alternative university partner if eligible.",
      },
    ],
  },
  dba: {
    id: "dba",
    title: "Doctor of Business Administration",
    subtitle: "DBA",
    heroDescription:
      "An advanced doctoral program for senior business professionals seeking to contribute original research to business practice and theory.",
    accentColor: "#00e5ff",
    accentGradient: "from-cyan to-blue-mid",
    duration: "18-36 months",
    format: "Online + Applied Research",
    overview:
      "The Doctor of Business Administration (DBA) is a practice-oriented doctoral degree designed for experienced business leaders and executives. It bridges the gap between academic research and real-world business application, allowing you to develop solutions for industry challenges while earning the highest business credential.",
    benefits: [
      {
        title: "Applied Research Focus",
        description:
          "Conduct research directly applicable to your industry and organization.",
      },
      {
        title: "Executive-Level Credential",
        description:
          "Position yourself at the pinnacle of business education and leadership.",
      },
      {
        title: "Flexible Online Format",
        description:
          "Study on your schedule with asynchronous content and virtual residencies.",
      },
      {
        title: "Expert Supervision",
        description:
          "Work with experienced doctoral supervisors who understand business practice.",
      },
      {
        title: "Publication Opportunities",
        description:
          "Contribute to business knowledge with peer-reviewed publications.",
      },
      {
        title: "Global Cohort",
        description:
          "Learn alongside senior professionals from diverse industries and countries.",
      },
    ],
    eligibility: [
      "Master's degree in business or related field (MBA preferred)",
      "Minimum 5 years of senior management or executive experience",
      "Clear research interest aligned with business practice",
      "Strong professional and academic references",
      "English proficiency (IELTS 6.5+ or equivalent)",
    ],
    process: [
      {
        step: 1,
        title: "Application & Consultation",
        description:
          "Submit your application and meet with our advisory team to discuss your research interests and goals.",
      },
      {
        step: 2,
        title: "University Matching",
        description:
          "We match you with a partner university whose DBA program aligns with your research area.",
      },
      {
        step: 3,
        title: "Enrollment & Orientation",
        description:
          "Complete enrollment, meet your supervisor, and begin your doctoral journey.",
      },
      {
        step: 4,
        title: "Research & Coursework",
        description:
          "Complete doctoral-level modules while developing your research proposal and methodology.",
      },
      {
        step: 5,
        title: "Thesis & Defense",
        description:
          "Submit your doctoral thesis and defend your research before an academic panel.",
      },
    ],
    documents: [
      "Master's degree certificate and transcripts",
      "Current CV/Resume",
      "Research proposal outline (500-1000 words)",
      "Professional references (2-3)",
      "Government-issued identification",
      "English proficiency certificate (if applicable)",
    ],
    faqs: [
      {
        question: "What is the difference between a DBA and a PhD?",
        answer:
          "A DBA focuses on applied business research — solving real-world business problems. A PhD is more theoretical and academic in nature. The DBA is designed for practitioners, while the PhD prepares you for academic or research careers.",
      },
      {
        question: "Can I complete the DBA while working full-time?",
        answer:
          "Yes. Our partner universities offer flexible online formats specifically designed for working executives. Most of your work is asynchronous, with occasional virtual residencies.",
      },
      {
        question: "What research topics can I pursue?",
        answer:
          "You can research any topic relevant to business practice — leadership, strategy, innovation, digital transformation, organizational behavior, marketing, finance, and more.",
      },
    ],
  },
  phd: {
    id: "phd",
    title: "Doctor of Philosophy",
    subtitle: "PhD",
    heroDescription:
      "A rigorous, research-intensive doctoral program for professionals committed to advancing knowledge and making original contributions to their field.",
    accentColor: "#7b2ff7",
    accentGradient: "from-purple to-blue-start",
    duration: "24-48 months",
    format: "Research-Intensive (Online/Hybrid)",
    overview:
      "The Doctor of Philosophy (PhD) is the most prestigious research degree, representing the highest level of academic achievement. Our partner universities offer PhD programs designed for working professionals who wish to conduct rigorous, original research while maintaining their careers.",
    benefits: [
      {
        title: "Original Research",
        description:
          "Make a genuine contribution to knowledge in your field of expertise.",
      },
      {
        title: "Academic Career Path",
        description:
          "Qualify for university teaching, research, and advisory positions.",
      },
      {
        title: "Thought Leadership",
        description:
          "Establish yourself as a recognized expert and thought leader in your domain.",
      },
      {
        title: "Rigorous Methodology",
        description:
          "Develop advanced research skills applicable across industries.",
      },
      {
        title: "Flexible Structure",
        description:
          "Online and hybrid formats designed for working professionals.",
      },
      {
        title: "Global Impact",
        description:
          "Contribute to international academic discourse and policy.",
      },
    ],
    eligibility: [
      "Master's degree in a relevant field",
      "Strong academic record and research aptitude",
      "Clear research question and area of investigation",
      "Professional or academic references (2-3)",
      "English proficiency (IELTS 7.0+ or equivalent)",
      "Previous research experience or publications (preferred)",
    ],
    process: [
      {
        step: 1,
        title: "Research Proposal",
        description:
          "Work with our team to refine your research question and develop a preliminary proposal.",
      },
      {
        step: 2,
        title: "University & Supervisor Matching",
        description:
          "We match you with a university and supervisor whose expertise aligns with your research.",
      },
      {
        step: 3,
        title: "Enrollment & Ethics Approval",
        description:
          "Complete enrollment, submit your research proposal, and obtain ethics approval.",
      },
      {
        step: 4,
        title: "Research & Writing",
        description:
          "Conduct your research, collect data, analyze findings, and write your thesis with ongoing supervision.",
      },
      {
        step: 5,
        title: "Thesis Defense (Viva Voce)",
        description:
          "Present and defend your thesis before an examining panel of academic experts.",
      },
    ],
    documents: [
      "Master's degree certificate and transcripts",
      "Detailed research proposal (2000-3000 words)",
      "Current CV/Resume with publication list",
      "Academic and professional references (3)",
      "Government-issued identification",
      "English proficiency certificate (if applicable)",
      "Writing sample or previous publication",
    ],
    faqs: [
      {
        question: "How long does a PhD typically take?",
        answer:
          "Our partner universities offer PhD programs that can be completed in 24-48 months for working professionals, depending on your research scope and pace.",
      },
      {
        question: "Do I need to attend campus?",
        answer:
          "Most of our partner programs are fully online or hybrid, with optional residency periods. Specific requirements vary by university.",
      },
      {
        question: "Can I pursue a PhD in any field?",
        answer:
          "Our partner universities offer PhD programs across business, technology, education, social sciences, and other fields. Contact us to discuss your specific research interest.",
      },
    ],
  },
};
