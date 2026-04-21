/**
 * Legal content — structured for the editorial long-read template.
 * Each section: optional H2 title + body blocks (paragraphs or bullet lists).
 */

export interface LegalBlock {
  kind: "p" | "ul";
  /** For "p" — single string (may contain inline markdown **bold** + [link](url)). */
  /** For "ul" — array of strings. */
  text?: string;
  items?: string[];
}

export interface LegalSection {
  title?: string;
  blocks: LegalBlock[];
}

export interface LegalPageContent {
  slug: string;
  kicker: string;
  title: string;
  dek: string;
  updated: string;
  sections: LegalSection[];
}

const CONTACT_BLOCK: LegalSection = {
  title: "If you have questions",
  blocks: [
    {
      kind: "p",
      text: "Write to the firm at [admissions@techversity.ai](mailto:admissions@techversity.ai). A partner will reply within the day.",
    },
  ],
};

export const LEGAL_PAGES: Record<string, LegalPageContent> = {
  privacy: {
    slug: "privacy",
    kicker: "POLICY · PRIVACY",
    title: "On your information.",
    dek: "How Techversity collects, uses, and safeguards personal information during the advisory.",
    updated: "March 2026",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: "Techversity Advisory (*\"we,\" \"us,\" or \"the firm\"*) treats every submission as privileged correspondence. This policy explains how we collect, use, disclose, and safeguard information when you visit the website or begin a conversation with a partner.",
          },
        ],
      },
      {
        title: "What we collect",
        blocks: [
          {
            kind: "p",
            text: "Information is collected only when you choose to share it — by writing, applying, or otherwise corresponding with the firm.",
          },
          {
            kind: "ul",
            items: [
              "**Personal data** — name, contact details, professional history, and educational background that you voluntarily provide as part of the advisory.",
              "**Usage data** — browser type, operating system, access times, pages viewed, and referring URL. Collected in aggregate, never linked to individuals.",
              "**Cookies** — see the [Cookie Policy](/cookies) for specifics.",
            ],
          },
        ],
      },
      {
        title: "How we use your information",
        blocks: [
          {
            kind: "ul",
            items: [
              "To review, advise on, and shepherd your application.",
              "To correspond with you about the advisory.",
              "To match you with the institution best suited to your record.",
              "To comply with legal or regulatory obligations, where required.",
            ],
          },
        ],
      },
      {
        title: "With whom we share it",
        blocks: [
          {
            kind: "p",
            text: "We share relevant portions of your application with the partner institution under consideration — only with your prior consent, and only for the purposes of your conferment. We do not sell personal information. We do not share it with third parties for marketing.",
          },
        ],
      },
      {
        title: "How long we retain it",
        blocks: [
          {
            kind: "p",
            text: "Application records are retained for the duration of the advisory plus seven years, to honour institutional record-keeping norms. You may request deletion at any point after conferment.",
          },
        ],
      },
      CONTACT_BLOCK,
    ],
  },

  terms: {
    slug: "terms",
    kicker: "POLICY · TERMS",
    title: "On the advisory.",
    dek: "The terms under which Techversity introduces candidates to accredited institutions.",
    updated: "March 2026",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: "By engaging with the Techversity website or advisory, you agree to the terms below. These are written plainly. If anything is unclear, please write to the firm — we would rather explain than obscure.",
          },
        ],
      },
      {
        title: "What the firm does",
        blocks: [
          {
            kind: "p",
            text: "Techversity is an **advisory**, not a university. We introduce, vet, and shepherd applications to accredited institutions. We do not confer degrees. All academic decisions — acceptance, conferment, and the award itself — are made by the institution.",
          },
        ],
      },
      {
        title: "What we ask of you",
        blocks: [
          {
            kind: "ul",
            items: [
              "Provide accurate information — including a truthful account of your professional record.",
              "Comply with applicable laws in your jurisdiction.",
              "Do not misrepresent your qualifications, achievements, or identity.",
              "Treat correspondence with institution partners professionally.",
            ],
          },
        ],
      },
      {
        title: "Limitation of liability",
        blocks: [
          {
            kind: "p",
            text: "The firm's role is advisory. We do not guarantee acceptance, conferment, or any specific outcome from any institution. Where fees are paid, our liability is limited to the fees paid for advisory services — see the [Refund Policy](/refund) for the circumstances under which those are returned.",
          },
        ],
      },
      {
        title: "Changes to these terms",
        blocks: [
          {
            kind: "p",
            text: "The firm may update these terms from time to time. Material changes will be noted with a revised *Last updated* date. Continued use of the site or advisory after changes constitutes acceptance.",
          },
        ],
      },
      CONTACT_BLOCK,
    ],
  },

  refund: {
    slug: "refund",
    kicker: "POLICY · REFUNDS",
    title: "On fees returned.",
    dek: "The circumstances in which Techversity returns advisory fees.",
    updated: "March 2026",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: "The firm's posture is plain: we do not earn fees for work that does not result in conferment. The schedule below sets out the conditions under which fees are returned.",
          },
        ],
      },
      {
        title: "Full refund",
        blocks: [
          {
            kind: "p",
            text: "If no partner institution accepts your application, all advisory fees paid are returned in full. This is not a goodwill gesture — it is the firm's standard operating term.",
          },
        ],
      },
      {
        title: "Partial refund",
        blocks: [
          {
            kind: "ul",
            items: [
              "**Before university review** — 75% of advisory fees returned.",
              "**After university review, before enrolment** — 50% returned.",
              "**After enrolment is formally confirmed** — the advisory work is complete; no refund is payable.",
            ],
          },
        ],
      },
      {
        title: "How to request a refund",
        blocks: [
          {
            kind: "p",
            text: "Write to [admissions@techversity.ai](mailto:admissions@techversity.ai) with your application reference. Refunds are processed within fourteen business days to the original payment method.",
          },
        ],
      },
      CONTACT_BLOCK,
    ],
  },

  cookies: {
    slug: "cookies",
    kicker: "POLICY · COOKIES",
    title: "On the small files.",
    dek: "How Techversity uses cookies and similar technologies on the website.",
    updated: "March 2026",
    sections: [
      {
        blocks: [
          {
            kind: "p",
            text: "This policy explains how the firm uses cookies on the Techversity website. Cookies are small text files stored by your browser when you visit a site — they help the page remember who you are, what you have viewed, and what you prefer.",
          },
        ],
      },
      {
        title: "Types of cookies used",
        blocks: [
          {
            kind: "ul",
            items: [
              "**Essential** — required for the site to function. These cannot be disabled without breaking the page.",
              "**Analytics** — help us understand, in aggregate, how the site is used. Never linked to individuals.",
              "**Preference** — remember your settings (such as theme, once available) between visits.",
            ],
          },
        ],
      },
      {
        title: "Managing cookies",
        blocks: [
          {
            kind: "p",
            text: "You may disable cookies in your browser settings. Note that disabling essential cookies will break parts of the site. Analytics and preference cookies can be disabled without loss of function.",
          },
        ],
      },
      {
        title: "Third parties",
        blocks: [
          {
            kind: "p",
            text: "The firm does not share cookie data with third parties for advertising. Limited analytics may be processed by a single first-party provider under the firm's data-processing agreement.",
          },
        ],
      },
      CONTACT_BLOCK,
    ],
  },
};

/**
 * Minimal inline formatter — supports **bold** and [text](href).
 * Returns an array of React nodes.
 */
export function formatInline(text: string): (string | { type: "link"; href: string; label: string } | { type: "strong"; label: string })[] {
  const result: (string | { type: "link"; href: string; label: string } | { type: "strong"; label: string })[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  const boldRe = /\*\*([^*]+)\*\*/g;

  // Tokenize — walk through finding links first, then bolds inside plain segments.
  let lastIndex = 0;
  const tokens: Array<{ start: number; end: number; node: { type: "link"; href: string; label: string } }> = [];
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    tokens.push({
      start: match.index,
      end: match.index + match[0].length,
      node: { type: "link", href: match[2], label: match[1] },
    });
  }

  // Process text, splitting by link positions
  if (tokens.length === 0) {
    // No links — just handle bolds
    lastIndex = 0;
    boldRe.lastIndex = 0;
    while ((match = boldRe.exec(text)) !== null) {
      if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index));
      result.push({ type: "strong", label: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) result.push(text.slice(lastIndex));
    return result;
  }

  lastIndex = 0;
  for (const tok of tokens) {
    if (tok.start > lastIndex) {
      const plain = text.slice(lastIndex, tok.start);
      // Handle bolds in the plain segment
      let plainLast = 0;
      boldRe.lastIndex = 0;
      while ((match = boldRe.exec(plain)) !== null) {
        if (match.index > plainLast) result.push(plain.slice(plainLast, match.index));
        result.push({ type: "strong", label: match[1] });
        plainLast = match.index + match[0].length;
      }
      if (plainLast < plain.length) result.push(plain.slice(plainLast));
    }
    result.push(tok.node);
    lastIndex = tok.end;
  }
  if (lastIndex < text.length) {
    const tail = text.slice(lastIndex);
    let tailLast = 0;
    boldRe.lastIndex = 0;
    while ((match = boldRe.exec(tail)) !== null) {
      if (match.index > tailLast) result.push(tail.slice(tailLast, match.index));
      result.push({ type: "strong", label: match[1] });
      tailLast = match.index + match[0].length;
    }
    if (tailLast < tail.length) result.push(tail.slice(tailLast));
  }

  return result;
}
