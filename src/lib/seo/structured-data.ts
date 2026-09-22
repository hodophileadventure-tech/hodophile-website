import { siteConfig } from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

function normalizeText(value?: string | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function absoluteSchemaUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) {
    return siteConfig.siteUrl;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, siteConfig.siteUrl).toString();
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: absoluteSchemaUrl("/logo.webp"),
    description: normalizeText(siteConfig.description) ?? undefined,
    email: normalizeText(siteConfig.email) ?? undefined,
    telephone: normalizeText(siteConfig.phone) ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot# 111-113C, Dupatta Gali, PECHS, Block 2",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      postalCode: "75400",
      addressCountry: "PK",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: normalizeText(siteConfig.description) ?? undefined,
    inLanguage: "en",
  };
}

export function buildWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description?: string | null;
  url: string;
}) {
  const pageTitle = normalizeText(title) ?? siteConfig.name;
  const pageDescription = normalizeText(description) ?? normalizeText(siteConfig.description);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: absoluteSchemaUrl(url),
    ...(pageDescription ? { description: pageDescription } : {}),
  };
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[] = []) {
  const validItems = items
    .filter((item) => item && normalizeText(item.name) && item.url)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name.trim(),
      item: absoluteSchemaUrl(item.url),
    }));

  if (validItems.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems,
  };
}

export function buildHomePageSchema() {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema({
      title: `${siteConfig.name} | Domestic tours across Pakistan`,
      description: siteConfig.description,
      url: "/",
    }),
  ];
}

export function buildPageSchema({
  title,
  description,
  url,
  breadcrumbs,
}: {
  title: string;
  description?: string | null;
  url: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  const pageSchema = buildWebPageSchema({ title, description, url });
  const breadcrumbSchema = buildBreadcrumbListSchema(breadcrumbs ?? []);
  const schemas: Record<string, unknown>[] = [pageSchema];

  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  return schemas;
}
