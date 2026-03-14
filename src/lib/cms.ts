import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

export type Locale = "tr" | "en";

function getFilePath(locale: Locale = "tr") {
  return path.join(process.cwd(), "data", `cms_${locale}.json`);
}

export type CmsData = {
  site: {
    brandName: string;
    tagline: string;
    footerLine1: string;
    footerLine2: string;
  };
  home: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    pill1Title: string;
    pill1Text: string;
    pill2Title: string;
    pill2Text: string;
    cardTitle: string;
    cardModTitle: string;
    cardModText: string;
    cardDuration: string;
    cardDurationText: string;
    cardLevel: string;
    cardLevelText: string;
    cardBottomText: string;
    cardBottomBadge: string;
    cardNote: string;
    features: { title: string; description: string }[];
    steps: { number: string; title: string; description: string }[];
    cta: { title: string; subtitle: string; buttonPri: string; buttonSec: string; };
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  contact: {
    intro: string;
    infoText: string;
    email: string;
    phone: string;
    address: string;
  };
  courses: {
    badge: string;
    title: string;
    intro: string;
    items: {
      id: number;
      title: string;
      level: string;
      duration: string;
      highlight: string;
    }[];
  };
  shop: {
    badge: string;
    title: string;
    intro: string;
    items: {
      id: number;
      name: string;
      price: string;
      priceValue?: number;
      image?: string;
      tag: string;
      info: string;
      description?: string;
    }[];
  };
  faq: {
    title: string;
    intro: string;
    items: { id: number; question: string; answer: string }[];
  };
  blog: {
    badge: string;
    title: string;
    intro: string;
    items: {
      id: number;
      title: string;
      category: string;
      excerpt: string;
      image?: string;
    }[];
  };
  news: {
    items: {
      id: number;
      title: string;
      date: string;
      image?: string;
      link?: string;
    }[];
  };
  announcements: {
    items: {
      id: number;
      title: string;
      content: string;
      date: string;
      isImportant?: boolean;
    }[];
  };
  partners: {
    items: {
      id: number;
      name: string;
      logo: string;
      link?: string;
    }[];
  };
};

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  if (localeCookie && localeCookie.value === "en") return "en";
  return "tr";
}

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, { path: "/" });
}

export function readCms(locale: Locale = "tr"): CmsData {
  const raw = fs.readFileSync(getFilePath(locale), "utf-8");
  return JSON.parse(raw);
}

export async function readCmsWithLocale(): Promise<CmsData> {
  const loc = await getLocale();
  return readCms(loc);
}

export function writeCms(partial: Partial<CmsData>, locale: Locale = "tr") {
  const current = readCms(locale);
  const merged: CmsData = {
    ...current,
    ...partial,
    site: {
      ...current.site,
      ...(partial.site ?? {}),
    },
    home: {
      ...current.home,
      ...(partial.home ?? {}),
    },
    about: {
      ...current.about,
      ...(partial.about ?? {}),
    },
    contact: {
      ...current.contact,
      ...(partial.contact ?? {}),
    },
    courses: {
      ...current.courses,
      ...(partial.courses ?? {}),
    },
    shop: {
      ...current.shop,
      ...(partial.shop ?? {}),
    },
    faq: {
      ...current.faq,
      ...(partial.faq ?? {}),
    },
    blog: {
      ...current.blog,
      ...(partial.blog ?? {}),
    },
    news: {
      ...current.news,
      ...(partial.news ?? {}),
    },
    announcements: {
      ...current.announcements,
      ...(partial.announcements ?? {}),
    },
    partners: {
      ...current.partners,
      ...(partial.partners ?? {}),
    },
  };

  fs.writeFileSync(getFilePath(locale), JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}

