import { PROFILE } from "@/lib/constants";

const SITE_URL = "https://shmksumsun.xyz";

function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.nameEn,
  jobTitle: "AI Vibe Coder & Web3 Native",
  url: SITE_URL,
  sameAs: [
    PROFILE.links.github,
    PROFILE.links.linkedin,
  ],
  email: PROFILE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seoul",
    addressCountry: "KR",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Terminal Odyssey",
  url: SITE_URL,
  author: { "@type": "Person", name: PROFILE.name },
  description: "AI Vibe Coder & Web3 Native — 엄상현의 개인 사이트",
  inLanguage: "ko",
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
    </>
  );
}
