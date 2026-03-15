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
  overviewStats: {
    label: string;
    value: string;
  }[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  eligibility: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  documents: string[];
  programStructure: {
    title: string;
    description: string;
    phases: {
      name: string;
      duration: string;
      items: string[];
    }[];
  };
  specializations: {
    title: string;
    description: string;
    areas: {
      name: string;
      description: string;
    }[];
  };
  advisoryBoard: {
    title: string;
    description: string;
    members: {
      name: string;
      role: string;
      affiliation: string;
    }[];
  };
  accreditation: {
    title: string;
    description: string;
    points: string[];
  };
  testimonials: {
    name: string;
    title: string;
    country: string;
    quote: string;
  }[];
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
      "A prestigious academic recognition awarded to accomplished professionals whose work has made a significant impact in their industry or society. No coursework. No exams. Pure recognition of excellence.",
    accentColor: "#1a6dff",
    accentGradient: "from-blue-start to-blue-mid",
    duration: "4-6 Months",
    format: "Portfolio & Achievement-Based",
    overview:
      "The Honorary Doctorate (Doctor Honoris Causa) is the highest form of academic recognition, traditionally awarded by universities to individuals who have demonstrated exceptional achievement in their professional field. Unlike traditional doctoral programs, it does not require coursework or examinations — instead, it recognizes the real-world impact of your career. This prestigious credential has been conferred upon world leaders, industry pioneers, and accomplished professionals who have shaped their fields through sustained excellence and contribution.",
    overviewStats: [
      { label: "Average Processing", value: "4-6 Months" },
      { label: "Countries Represented", value: "12+" },
      { label: "Client Satisfaction", value: "4.8/5" },
      { label: "Acceptance Rate", value: "78%" },
    ],
    benefits: [
      {
        title: "Professional Prestige",
        description:
          "Add 'Dr.' to your name with a legitimate, university-issued credential recognized worldwide. Elevate your professional identity and personal brand.",
        icon: "Crown",
      },
      {
        title: "Career Advancement",
        description:
          "Open doors to board positions, keynote speaking engagements, advisory roles, and senior leadership opportunities across industries.",
        icon: "TrendingUp",
      },
      {
        title: "Global Recognition",
        description:
          "Credential issued by an accredited university, recognized across industries and international borders. Valid in professional and academic contexts.",
        icon: "Globe",
      },
      {
        title: "No Coursework Required",
        description:
          "Based entirely on your existing professional achievements — no exams, no classes, no thesis defense. Your career is your qualification.",
        icon: "Zap",
      },
      {
        title: "Streamlined Process",
        description:
          "Complete the entire process in as little as 4-6 months with our dedicated advisory team handling all logistics and coordination.",
        icon: "Rocket",
      },
      {
        title: "Elite Network Access",
        description:
          "Join an exclusive alumni network of accomplished professionals, entrepreneurs, and leaders from 12+ countries worldwide.",
        icon: "Users",
      },
    ],
    eligibility: [
      "Minimum 10 years of professional experience in your field",
      "Demonstrable impact or significant contributions to your industry",
      "Leadership roles, entrepreneurial achievements, or C-suite experience",
      "Published work, patents, or industry recognition (preferred but not required)",
      "Community service, philanthropy, or social impact contributions",
      "Clean professional and ethical record",
    ],
    process: [
      {
        step: 1,
        title: "Application Submission",
        description:
          "Complete our streamlined online application with your CV, professional achievements, and career highlights. Our team reviews every application personally within 4 hours.",
      },
      {
        step: 2,
        title: "Profile Assessment & Consultation",
        description:
          "A dedicated advisor evaluates your profile, discusses your goals, and recommends the best-fit university partner based on your field and achievements.",
      },
      {
        step: 3,
        title: "Portfolio Preparation",
        description:
          "We help you compile a comprehensive portfolio documenting your professional contributions, industry impact, and career milestones in university-required formats.",
      },
      {
        step: 4,
        title: "University Committee Review",
        description:
          "Your portfolio is submitted to the university's honorary doctorate committee for formal evaluation. Our team coordinates all communication and follow-ups.",
      },
      {
        step: 5,
        title: "Award & Conferral Ceremony",
        description:
          "Upon approval, receive your doctorate at a formal university ceremony or via official academic dispatch with full documentation and credentials.",
      },
    ],
    documents: [
      "Current CV/Resume (detailed professional history)",
      "Professional portfolio or achievements summary",
      "Government-issued identification (passport preferred)",
      "Professional references (2-3 from senior colleagues or industry leaders)",
      "Evidence of professional impact (awards, publications, media coverage, patents)",
      "Passport-sized photographs (formal academic format)",
    ],
    programStructure: {
      title: "Program Structure",
      description:
        "The Honorary Doctorate follows a structured evaluation process designed to thoroughly assess and document your professional achievements.",
      phases: [
        {
          name: "Phase 1 — Application & Assessment",
          duration: "2-3 Weeks",
          items: [
            "Online application submission",
            "Initial profile screening",
            "Personal consultation with advisor",
            "University partner recommendation",
          ],
        },
        {
          name: "Phase 2 — Portfolio Development",
          duration: "4-6 Weeks",
          items: [
            "Achievement documentation",
            "Professional impact compilation",
            "Reference collection and verification",
            "Portfolio formatting to university standards",
          ],
        },
        {
          name: "Phase 3 — University Review",
          duration: "4-8 Weeks",
          items: [
            "Committee submission",
            "Academic board evaluation",
            "Due diligence verification",
            "Formal approval decision",
          ],
        },
        {
          name: "Phase 4 — Conferral",
          duration: "2-4 Weeks",
          items: [
            "Ceremony scheduling or dispatch arrangement",
            "Credential preparation and issuance",
            "Alumni network onboarding",
            "Post-award support and guidance",
          ],
        },
      ],
    },
    specializations: {
      title: "Fields of Recognition",
      description:
        "Honorary Doctorates are awarded across a wide range of professional fields. Our partner universities recognize excellence in diverse domains.",
      areas: [
        {
          name: "Business & Entrepreneurship",
          description:
            "For visionary leaders who have built organizations, driven economic growth, or transformed industries through innovation.",
        },
        {
          name: "Technology & Innovation",
          description:
            "For pioneers in technology, digital transformation, AI, cybersecurity, and emerging tech who have advanced the field.",
        },
        {
          name: "Healthcare & Life Sciences",
          description:
            "For professionals who have contributed to medical advancement, public health, pharmaceutical innovation, or healthcare delivery.",
        },
        {
          name: "Education & Social Impact",
          description:
            "For educators, philanthropists, and social entrepreneurs who have made lasting contributions to communities and knowledge.",
        },
        {
          name: "Arts, Media & Culture",
          description:
            "For creatives, media leaders, and cultural figures who have shaped public discourse, art, or entertainment.",
        },
        {
          name: "Law, Governance & Policy",
          description:
            "For legal professionals, policymakers, and public servants who have influenced governance, justice, or regulatory frameworks.",
        },
      ],
    },
    advisoryBoard: {
      title: "Academic Advisory Council",
      description:
        "Our advisory council comprises distinguished academics and industry leaders who ensure the integrity and prestige of every nomination.",
      members: [
        {
          name: "Prof. Richard Harmon",
          role: "Chair, Academic Standards",
          affiliation: "Former Dean, School of Business",
        },
        {
          name: "Dr. Elena Vasquez",
          role: "Director, International Programs",
          affiliation: "European Education Council",
        },
        {
          name: "Prof. James Okafor",
          role: "Head, Research & Evaluation",
          affiliation: "Global Academic Alliance",
        },
        {
          name: "Dr. Sarah Chen",
          role: "Advisor, Professional Recognition",
          affiliation: "Asia-Pacific Education Board",
        },
      ],
    },
    accreditation: {
      title: "Accreditation & Recognition",
      description:
        "Every Honorary Doctorate facilitated through Techversity.ai is issued by a fully accredited university with recognized academic standing.",
      points: [
        "All partner universities hold recognized national and/or international accreditation",
        "Credentials are verified and authenticated through official academic channels",
        "Degrees are recognized for professional use including the 'Dr.' title prefix",
        "University transcripts and certificates provided in official academic format",
        "Apostille certification available for international credential recognition",
        "Full compliance with education regulatory frameworks in issuing jurisdictions",
      ],
    },
    testimonials: [
      {
        name: "Rajesh K.",
        title: "CEO & Founder, Tech Solutions",
        country: "UAE",
        quote:
          "Receiving my Honorary Doctorate was a defining moment in my career. Techversity.ai made the entire process seamless and professional. The credential has opened doors I never imagined.",
      },
      {
        name: "Dr. Amina H.",
        title: "Managing Director, FinCorp",
        country: "United Kingdom",
        quote:
          "As a woman in finance, this recognition validated decades of hard work. The advisory team was incredibly supportive, and the university ceremony was a moment I'll cherish forever.",
      },
      {
        name: "Michael T.",
        title: "Serial Entrepreneur",
        country: "United States",
        quote:
          "The professionalism and transparency from start to finish set Techversity.ai apart. My Honorary Doctorate from an accredited university has elevated my speaking engagements and board opportunities.",
      },
    ],
    faqs: [
      {
        question: "Is an Honorary Doctorate a real degree?",
        answer:
          "Yes. An Honorary Doctorate (Doctor Honoris Causa) is a legitimate academic recognition issued by accredited universities. It is widely recognized across industries and allows you to use the title 'Dr.' professionally. It carries the same academic standing as any honorary degree conferred by a university.",
      },
      {
        question: "How is this different from buying a degree?",
        answer:
          "We are not selling degrees. Techversity.ai is an advisory service that connects qualified professionals with accredited universities. The university independently evaluates each candidate and makes the final decision on awarding the doctorate based on genuine professional achievements.",
      },
      {
        question: "Can I use the title 'Dr.' after receiving this?",
        answer:
          "Yes. Upon receiving your Honorary Doctorate from an accredited university, you are entitled to use the prefix 'Dr.' in professional and social contexts, on business cards, email signatures, and official documents.",
      },
      {
        question: "What if my application is not accepted?",
        answer:
          "If the university does not approve your application, you receive a full refund of advisory fees. We also offer re-evaluation with an alternative university partner if eligible. Our acceptance rate is 78% because we pre-screen candidates carefully.",
      },
      {
        question: "How long does the entire process take?",
        answer:
          "The typical timeline is 4-6 months from application submission to credential conferral. This includes profile assessment, portfolio preparation, university review, and the formal award process.",
      },
      {
        question: "Do I need to attend a physical ceremony?",
        answer:
          "Attendance at a physical ceremony is optional. Many of our partner universities offer both in-person ceremonies and official academic dispatch options. You choose what works best for your schedule.",
      },
    ],
  },
  dba: {
    id: "dba",
    title: "Doctor of Business Administration",
    subtitle: "DBA — Applied Doctoral Research",
    heroDescription:
      "An advanced doctoral program for senior business professionals seeking to contribute original research to business practice and theory. Bridge the gap between academic rigor and real-world impact.",
    accentColor: "#00e5ff",
    accentGradient: "from-cyan to-blue-mid",
    duration: "18-36 Months",
    format: "Online + Applied Research",
    overview:
      "The Doctor of Business Administration (DBA) is a practice-oriented doctoral degree designed for experienced business leaders and executives. It bridges the gap between academic research and real-world business application, allowing you to develop evidence-based solutions for industry challenges while earning the highest business credential. Unlike a PhD, the DBA emphasizes applied research that directly impacts organizational strategy and industry practices.",
    overviewStats: [
      { label: "Program Duration", value: "18-36 Months" },
      { label: "Format", value: "100% Online" },
      { label: "Research Modules", value: "6-8 Modules" },
      { label: "Global Cohort", value: "30+ Countries" },
    ],
    benefits: [
      {
        title: "Applied Research Focus",
        description:
          "Conduct research directly applicable to your industry and organization. Solve real business problems with academic rigor and doctoral-level methodology.",
        icon: "Search",
      },
      {
        title: "Executive-Level Credential",
        description:
          "Position yourself at the pinnacle of business education and leadership. The DBA is the highest practice-oriented business credential available.",
        icon: "Award",
      },
      {
        title: "Flexible Online Format",
        description:
          "Study on your schedule with asynchronous content, virtual residencies, and accommodating deadlines designed for working executives.",
        icon: "Laptop",
      },
      {
        title: "Expert Supervision",
        description:
          "Work one-on-one with experienced doctoral supervisors who understand both academic research and business practice.",
        icon: "Users",
      },
      {
        title: "Publication Opportunities",
        description:
          "Contribute to business knowledge with peer-reviewed publications. Many DBA candidates publish in leading management journals.",
        icon: "BookOpen",
      },
      {
        title: "Global Executive Network",
        description:
          "Learn alongside senior professionals from diverse industries and 30+ countries. Build lifelong connections with business leaders.",
        icon: "Globe",
      },
    ],
    eligibility: [
      "Master's degree in business or related field (MBA preferred)",
      "Minimum 5 years of senior management or executive experience",
      "Clear research interest aligned with business practice",
      "Strong professional and academic references",
      "English proficiency (IELTS 6.5+ or equivalent)",
      "Demonstrated ability to commit to a multi-year research program",
    ],
    process: [
      {
        step: 1,
        title: "Application & Consultation",
        description:
          "Submit your application and meet with our advisory team to discuss your research interests, professional goals, and program expectations.",
      },
      {
        step: 2,
        title: "University Matching",
        description:
          "We match you with a partner university whose DBA program aligns with your research area, industry, and career objectives.",
      },
      {
        step: 3,
        title: "Enrollment & Orientation",
        description:
          "Complete enrollment, meet your assigned doctoral supervisor, attend orientation, and begin your structured doctoral journey.",
      },
      {
        step: 4,
        title: "Coursework & Research Development",
        description:
          "Complete doctoral-level modules in research methodology while developing your research proposal and refining your methodology.",
      },
      {
        step: 5,
        title: "Thesis Submission & Defense",
        description:
          "Submit your doctoral thesis (typically 60,000-80,000 words) and defend your research before an academic panel via viva voce.",
      },
    ],
    documents: [
      "Master's degree certificate and official transcripts",
      "Current CV/Resume with professional history",
      "Research proposal outline (500-1000 words)",
      "Professional references (2-3 from senior colleagues)",
      "Government-issued identification",
      "English proficiency certificate (if applicable)",
    ],
    programStructure: {
      title: "Program Structure",
      description:
        "The DBA program follows a structured yet flexible pathway designed to develop both your research capabilities and business expertise.",
      phases: [
        {
          name: "Year 1 — Foundation & Methodology",
          duration: "12 Months",
          items: [
            "Advanced research methodology modules",
            "Literature review and theoretical frameworks",
            "Research proposal development",
            "Quantitative & qualitative analysis training",
          ],
        },
        {
          name: "Year 2 — Research & Data Collection",
          duration: "12 Months",
          items: [
            "Ethics approval and research design finalization",
            "Primary data collection and fieldwork",
            "Data analysis and interpretation",
            "Progress reviews with doctoral supervisor",
          ],
        },
        {
          name: "Year 3 — Thesis & Defense",
          duration: "6-12 Months",
          items: [
            "Thesis writing and refinement",
            "Publication preparation (journal articles)",
            "Viva voce (thesis defense) preparation",
            "Final submission and graduation",
          ],
        },
      ],
    },
    specializations: {
      title: "Research Specializations",
      description:
        "DBA candidates can focus their applied research across a wide range of business disciplines.",
      areas: [
        {
          name: "Strategic Leadership & Management",
          description:
            "Research into organizational leadership, corporate strategy, change management, and executive decision-making.",
        },
        {
          name: "Digital Transformation & Innovation",
          description:
            "Explore how technology is reshaping business models, operations, and competitive advantage in the digital age.",
        },
        {
          name: "Finance & Investment",
          description:
            "Applied research in corporate finance, investment strategy, fintech, risk management, and financial markets.",
        },
        {
          name: "Marketing & Consumer Behavior",
          description:
            "Study consumer psychology, brand strategy, digital marketing, and market dynamics with practical business applications.",
        },
        {
          name: "Operations & Supply Chain",
          description:
            "Research into operational excellence, supply chain resilience, logistics innovation, and process optimization.",
        },
        {
          name: "Entrepreneurship & Venture Growth",
          description:
            "Explore startup ecosystems, scaling strategies, venture capital, and entrepreneurial decision-making.",
        },
      ],
    },
    advisoryBoard: {
      title: "Academic Advisory Council",
      description:
        "Our DBA advisory council ensures academic rigor while maintaining relevance to business practice.",
      members: [
        {
          name: "Prof. Richard Harmon",
          role: "Chair, Business Research",
          affiliation: "Former Dean, School of Business",
        },
        {
          name: "Dr. Elena Vasquez",
          role: "Director, Doctoral Programs",
          affiliation: "European Education Council",
        },
        {
          name: "Prof. James Okafor",
          role: "Head, Applied Research",
          affiliation: "Global Academic Alliance",
        },
        {
          name: "Dr. Sarah Chen",
          role: "Advisor, Executive Education",
          affiliation: "Asia-Pacific Business School Network",
        },
      ],
    },
    accreditation: {
      title: "Accreditation & Recognition",
      description:
        "All DBA programs facilitated through Techversity.ai are offered by fully accredited universities with recognized doctoral programs.",
      points: [
        "All partner universities hold recognized national and/or international accreditation",
        "DBA programs comply with academic standards for doctoral-level education",
        "Degrees are recognized for professional advancement and academic appointments",
        "University transcripts and certificates provided in official academic format",
        "Apostille certification available for international credential recognition",
        "Supervision provided by qualified doctoral faculty with research credentials",
      ],
    },
    testimonials: [
      {
        name: "James L.",
        title: "VP Strategy, Global Consulting Firm",
        country: "United States",
        quote:
          "The DBA program transformed how I approach business problems. The combination of academic rigor and practical application was exactly what I needed to elevate my strategic thinking.",
      },
      {
        name: "Dr. Fatima A.",
        title: "CEO, Healthcare Group",
        country: "Saudi Arabia",
        quote:
          "Completing my DBA while running a company seemed impossible, but the flexible format made it achievable. My research directly improved our organizational practices.",
      },
      {
        name: "David W.",
        title: "CFO, FinTech Startup",
        country: "Singapore",
        quote:
          "The doctoral supervision was world-class. My supervisor challenged my thinking and helped me produce research that was published in a top-tier business journal.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a DBA and a PhD?",
        answer:
          "A DBA focuses on applied business research — solving real-world business problems with academic rigor. A PhD is more theoretical and academic in nature. The DBA is designed for practitioners who want to stay in industry, while the PhD prepares candidates primarily for academic or pure research careers.",
      },
      {
        question: "Can I complete the DBA while working full-time?",
        answer:
          "Yes. Our partner universities offer flexible online formats specifically designed for working executives. Most coursework is asynchronous, with occasional virtual residencies. The program is structured to accommodate demanding professional schedules.",
      },
      {
        question: "What research topics can I pursue?",
        answer:
          "You can research any topic relevant to business practice — leadership, strategy, innovation, digital transformation, organizational behavior, marketing, finance, operations, entrepreneurship, and more. Your topic should connect to your professional experience.",
      },
      {
        question: "What is the thesis requirement?",
        answer:
          "The DBA thesis is typically 60,000-80,000 words of original applied research. You'll work closely with a doctoral supervisor throughout the research and writing process, culminating in a viva voce (oral defense).",
      },
      {
        question: "Is the DBA recognized for academic teaching?",
        answer:
          "Yes. A DBA qualifies you for university teaching positions, particularly in business schools that value practitioners with doctoral qualifications. Many DBA graduates teach part-time alongside their industry careers.",
      },
    ],
  },
  phd: {
    id: "phd",
    title: "Doctor of Philosophy",
    subtitle: "PhD — Original Research Program",
    heroDescription:
      "A rigorous, research-intensive doctoral program for professionals committed to advancing knowledge and making original contributions to their field. The gold standard of academic achievement.",
    accentColor: "#7b2ff7",
    accentGradient: "from-purple to-blue-start",
    duration: "24-48 Months",
    format: "Research-Intensive (Online/Hybrid)",
    overview:
      "The Doctor of Philosophy (PhD) is the most prestigious research degree, representing the highest level of academic achievement. Our partner universities offer PhD programs designed for working professionals who wish to conduct rigorous, original research while maintaining their careers. A PhD signifies mastery of your discipline and the ability to generate new knowledge through independent scholarly inquiry.",
    overviewStats: [
      { label: "Program Duration", value: "24-48 Months" },
      { label: "Format", value: "Online / Hybrid" },
      { label: "Thesis Requirement", value: "80,000+ Words" },
      { label: "Publications Expected", value: "1-3 Papers" },
    ],
    benefits: [
      {
        title: "Original Contribution to Knowledge",
        description:
          "Make a genuine, peer-reviewed contribution to your field of expertise. Your research advances understanding and shapes future practice.",
        icon: "Lightbulb",
      },
      {
        title: "Academic Career Path",
        description:
          "Qualify for university professorship, research directorships, and senior academic advisory positions at institutions worldwide.",
        icon: "GraduationCap",
      },
      {
        title: "Thought Leadership",
        description:
          "Establish yourself as a recognized expert and thought leader. Publish in peer-reviewed journals and speak at international conferences.",
        icon: "Mic",
      },
      {
        title: "Advanced Research Skills",
        description:
          "Develop rigorous research methodology skills — quantitative, qualitative, and mixed methods — applicable across industries and domains.",
        icon: "BarChart",
      },
      {
        title: "Flexible Structure",
        description:
          "Online and hybrid formats designed for working professionals. Progress at your own pace with regular supervisor check-ins.",
        icon: "Settings",
      },
      {
        title: "Global Academic Impact",
        description:
          "Contribute to international academic discourse, policy development, and cross-border knowledge exchange.",
        icon: "Globe",
      },
    ],
    eligibility: [
      "Master's degree in a relevant field from an accredited institution",
      "Strong academic record demonstrating research aptitude",
      "Clear research question and well-defined area of investigation",
      "Professional or academic references (2-3)",
      "English proficiency (IELTS 7.0+ or equivalent)",
      "Previous research experience or peer-reviewed publications (preferred)",
    ],
    process: [
      {
        step: 1,
        title: "Research Proposal Development",
        description:
          "Work with our advisory team to refine your research question, review literature, and develop a compelling preliminary research proposal.",
      },
      {
        step: 2,
        title: "University & Supervisor Matching",
        description:
          "We match you with a university and doctoral supervisor whose expertise, research interests, and methodology align with your proposed research.",
      },
      {
        step: 3,
        title: "Enrollment & Ethics Approval",
        description:
          "Complete enrollment, submit your formal research proposal for institutional review, and obtain ethics committee approval for your study.",
      },
      {
        step: 4,
        title: "Research, Data Collection & Writing",
        description:
          "Conduct your original research, collect and analyze data, and write your thesis under continuous supervision with regular milestone reviews.",
      },
      {
        step: 5,
        title: "Thesis Defense (Viva Voce)",
        description:
          "Present and defend your completed thesis before an examining panel of academic experts. Receive your PhD upon successful defense.",
      },
    ],
    documents: [
      "Master's degree certificate and official transcripts",
      "Detailed research proposal (2,000-3,000 words)",
      "Current CV/Resume with publication list (if applicable)",
      "Academic and professional references (3)",
      "Government-issued identification",
      "English proficiency certificate (if applicable)",
      "Writing sample or previously published research paper",
    ],
    programStructure: {
      title: "Program Structure",
      description:
        "The PhD follows a rigorous research pathway with defined milestones ensuring consistent progress toward your doctoral thesis.",
      phases: [
        {
          name: "Year 1 — Foundations & Proposal",
          duration: "12 Months",
          items: [
            "Comprehensive literature review",
            "Research methodology training",
            "Formal research proposal submission",
            "Ethics committee approval",
          ],
        },
        {
          name: "Year 2 — Research & Data Collection",
          duration: "12 Months",
          items: [
            "Primary research and data collection",
            "Data analysis and interpretation",
            "Conference paper submissions",
            "Annual progress review",
          ],
        },
        {
          name: "Year 3 — Thesis Writing & Defense",
          duration: "12-24 Months",
          items: [
            "Thesis drafting and revision",
            "Journal article publication preparation",
            "Pre-viva review with supervisor",
            "Viva voce (thesis defense) and graduation",
          ],
        },
      ],
    },
    specializations: {
      title: "Research Domains",
      description:
        "Our partner universities support PhD research across a range of disciplines. Your research should align with faculty expertise.",
      areas: [
        {
          name: "Business & Management Studies",
          description:
            "Theoretical and empirical research into organizational behavior, strategy, leadership, HRM, and management science.",
        },
        {
          name: "Information Technology & Computer Science",
          description:
            "Research in AI, machine learning, cybersecurity, data science, software engineering, and computational systems.",
        },
        {
          name: "Education & Learning Sciences",
          description:
            "Explore pedagogy, e-learning, curriculum design, educational policy, and learning technology effectiveness.",
        },
        {
          name: "Social Sciences & Humanities",
          description:
            "Research into sociology, psychology, political science, international relations, and cultural studies.",
        },
        {
          name: "Public Health & Healthcare Management",
          description:
            "Investigate health systems, epidemiology, health policy, healthcare technology, and population health outcomes.",
        },
        {
          name: "Environmental Studies & Sustainability",
          description:
            "Research into climate science, sustainable development, environmental policy, and green technology adoption.",
        },
      ],
    },
    advisoryBoard: {
      title: "Academic Advisory Council",
      description:
        "Our PhD advisory council ensures the highest standards of research quality and academic integrity.",
      members: [
        {
          name: "Prof. Richard Harmon",
          role: "Chair, Research Standards",
          affiliation: "Former Dean, Graduate Studies",
        },
        {
          name: "Dr. Elena Vasquez",
          role: "Director, Research Programs",
          affiliation: "European Education Council",
        },
        {
          name: "Prof. James Okafor",
          role: "Head, Research Ethics",
          affiliation: "Global Academic Alliance",
        },
        {
          name: "Dr. Sarah Chen",
          role: "Advisor, International Research",
          affiliation: "Asia-Pacific Research Network",
        },
      ],
    },
    accreditation: {
      title: "Accreditation & Recognition",
      description:
        "All PhD programs facilitated through Techversity.ai are offered by fully accredited universities with recognized research degree programs.",
      points: [
        "All partner universities hold recognized national and/or international accreditation",
        "PhD programs comply with the highest academic standards for doctoral research",
        "Degrees qualify for university teaching and academic appointments globally",
        "University transcripts, certificates, and thesis records provided in official format",
        "Apostille certification available for international credential recognition",
        "Supervision provided by qualified doctoral faculty with active research profiles",
      ],
    },
    testimonials: [
      {
        name: "Dr. Priya M.",
        title: "Assistant Professor, University",
        country: "India",
        quote:
          "My PhD journey through Techversity.ai was transformative. The supervisor matching was perfect, and I published two journal articles during my candidature. I now hold an academic appointment at a leading university.",
      },
      {
        name: "Dr. Thomas R.",
        title: "Research Director, NGO",
        country: "Germany",
        quote:
          "The flexibility of the program allowed me to conduct field research across three countries while maintaining my work. The academic rigor was on par with any top research university.",
      },
      {
        name: "Dr. Layla S.",
        title: "Policy Advisor, Government",
        country: "UAE",
        quote:
          "Earning my PhD gave me the credibility to influence policy at the national level. The research skills I developed have been invaluable in my advisory work.",
      },
    ],
    faqs: [
      {
        question: "How long does a PhD typically take?",
        answer:
          "Our partner universities offer PhD programs that can be completed in 24-48 months for working professionals, depending on your research scope, data collection timeline, and writing pace. Full-time equivalent is typically 36 months.",
      },
      {
        question: "Do I need to attend campus?",
        answer:
          "Most of our partner programs are fully online or hybrid, with optional residency periods for methodology workshops or supervisor meetings. Specific requirements vary by university and research design.",
      },
      {
        question: "Can I pursue a PhD in any field?",
        answer:
          "Our partner universities offer PhD programs across business, technology, education, social sciences, health, and environmental studies. Contact us to discuss your specific research interest and we'll identify the best-fit program.",
      },
      {
        question: "What is the thesis word count?",
        answer:
          "PhD theses typically range from 80,000-100,000 words, depending on the discipline and university requirements. This includes original research, literature review, methodology, findings, and conclusions.",
      },
      {
        question: "Are publications required?",
        answer:
          "While not always mandatory, most PhD programs expect candidates to submit 1-3 papers to peer-reviewed journals or conferences during their candidature. Our supervisors actively support publication efforts.",
      },
    ],
  },
};
